<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class OnboardingController extends Controller
{
    public function show(Request $request)
    {
        if ($request->user()->onboarding_completed) {
            return redirect()->route('dashboard');
        }
        return Inertia::render('onboarding/index');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'major' => 'required|string|max:255',
            'learning_method' => 'required|string|max:255',
            'study_goal' => 'required|string|max:255',
        ]);

        $request->user()->update([
            ...$validated,
            'onboarding_completed' => true,
        ]);

        return redirect()->route('dashboard');
    }
}
