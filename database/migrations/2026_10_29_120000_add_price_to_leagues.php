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
        // One price per league or tournament, null when not entered
        Schema::table('leagues', function (Blueprint $table) {
            $table->integer('price')->nullable()->after('link');
        });

        // Every saved change of a league's price, newest row = current price
        Schema::create('league_price_changes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('league_id')->constrained('leagues')->cascadeOnDelete();
            $table->integer('price')->nullable();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->index(['league_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('league_price_changes');

        Schema::table('leagues', function (Blueprint $table) {
            $table->dropColumn('price');
        });
    }
};
