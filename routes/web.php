<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('onboarding', [\App\Http\Controllers\OnboardingController::class, 'show'])->name('onboarding.show');
    Route::post('onboarding', [\App\Http\Controllers\OnboardingController::class, 'store'])->name('onboarding.store');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
