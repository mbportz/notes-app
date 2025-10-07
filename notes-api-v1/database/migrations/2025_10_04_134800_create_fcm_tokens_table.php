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
        Schema::create('fcm_tokens', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('token', 255);             // FCM registration token from the browser
            $table->string('platform', 20)->default('web'); // 'web' | 'android' | 'ios' later
            $table->string('agent')->nullable();      // optional: user agent for debugging
            $table->timestamps();

            $table->unique(['user_id', 'token']);     // avoid duplicates per user
            $table->index('token');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fcm_tokens');
    }
};
