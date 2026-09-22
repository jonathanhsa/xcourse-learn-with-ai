<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('name')->nullable()->change(); // Make name nullable since we ask it in onboarding
            $table->string('major')->nullable();
            $table->string('learning_method')->nullable();
            $table->string('study_goal')->nullable();
            $table->boolean('onboarding_completed')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('name')->nullable(false)->change();
            $table->dropColumn(['major', 'learning_method', 'study_goal', 'onboarding_completed']);
        });
    }
};
