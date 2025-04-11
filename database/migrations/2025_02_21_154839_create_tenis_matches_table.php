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
        Schema::create('tennis_matches', function (Blueprint $table) {
            $table->id();

            // Optional court and league
            $table->foreignId('court_id')->nullable()->constrained('courts')->onDelete('set null');
            $table->foreignId('league_id')->nullable()->constrained('leagues')->onDelete('set null');

            $table->string('set_score');
            $table->string('game_score')->nullable();
            $table->date('date');
            $table->string('county')->nullable();
            $table->integer('winner_point_gain');
            $table->integer('loser_point_gain');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tennis_matches');
    }
};
