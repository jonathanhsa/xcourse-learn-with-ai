<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AiAgentController extends Controller
{
    /**
     * Handle the chat request.
     */
    public function chat(Request $request)
    {
        $request->validate([
            'messages' => 'required|array',
            'messages.*.role' => 'required|string|in:user,model',
            'messages.*.content' => 'required|string',
        ]);

        $apiKey = config('services.gemini.api_key');
        
        if (!$apiKey) {
            return response()->json(['error' => 'Gemini API key is not configured.'], 500);
        }

        // Map messages to Gemini's format
        $contents = collect($request->messages)->map(function ($msg) {
            return [
                'role' => $msg['role'],
                'parts' => [['text' => $msg['content']]],
            ];
        })->toArray();

        try {
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
            ])->withoutVerifying()->post("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={$apiKey}", [
                'contents' => $contents,
            ]);

            if ($response->successful()) {
                $data = $response->json();
                
                // Extract text from Gemini response
                $text = $data['candidates'][0]['content']['parts'][0]['text'] ?? '';
                
                return response()->json([
                    'success' => true,
                    'message' => $text,
                ]);
            }

            Log::error('Gemini API Error: ' . $response->body());
            
            return response()->json([
                'success' => false,
                'error' => 'Failed to get response from AI. Please try again.',
                'details' => config('app.debug') ? $response->json() : null,
            ], $response->status());

        } catch (\Exception $e) {
            Log::error('Gemini API Exception: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'error' => 'An unexpected error occurred while communicating with the AI.',
            ], 500);
        }
    }
}
