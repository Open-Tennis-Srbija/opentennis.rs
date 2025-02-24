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
        Schema::create('tenis_matches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('winner_id')->constrained('players')->cascadeOnDelete();
            $table->foreignId('loser_id')->constrained('players')->cascadeOnDelete();
            $table->string('set_score');
            $table->string('game_score')->nullable();
            $table->date('match_date');
            $table->string('match_location');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tenis_matches');
    }
};
