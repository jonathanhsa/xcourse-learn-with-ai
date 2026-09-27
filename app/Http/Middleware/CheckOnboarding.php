<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckOnboarding
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user() && !$request->user()->onboarding_completed) {
            // Avoid redirect loops and allow viewing the landing page, logout, and email verification
            if (
                !$request->routeIs('onboarding.*') && 
                !$request->routeIs('logout') && 
                !$request->routeIs('home') &&
                !$request->routeIs('verification.*')
            ) {
                return redirect()->route('onboarding.show');
            }
        }

        return $next($request);
    }
}
