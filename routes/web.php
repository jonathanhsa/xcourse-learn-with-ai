<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('onboarding', [\App\Http\Controllers\OnboardingController::class, 'show'])->name('onboarding.show');
    Route::post('onboarding', [\App\Http\Controllers\OnboardingController::class, 'store'])->name('onboarding.store');

    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::inertia('ai-agents', 'ai-agents')->name('ai-agents');
    Route::inertia('material-repository', 'material-repository')->name('material-repository');
    Route::post('ai-agents/chat', [\App\Http\Controllers\AiAgentController::class, 'chat'])->name('ai-agents.chat');
});

require __DIR__.'/settings.php';
