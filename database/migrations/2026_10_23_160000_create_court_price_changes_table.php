<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Every saved change of a court's prices for a season, newest row = current prices
        Schema::create('court_price_changes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('court_id')->constrained('courts')->cascadeOnDelete();
            $table->enum('season', ['summer', 'winter']);
            $table->integer('morning')->nullable();
            $table->integer('afternoon')->nullable();
            $table->integer('weekend')->nullable();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->index(['court_id', 'season', 'created_at']);
        });

        // Start the history with the prices entered so far
        $courts = DB::table('courts')->whereNotNull('prices')->get(['id', 'prices', 'updated_at']);

        foreach ($courts as $court) {
            foreach (json_decode($court->prices, true) as $season => $prices) {
                if (!array_filter($prices, fn($price) => $price !== null)) {
                    continue;
                }

                DB::table('court_price_changes')->insert([
                    'court_id' => $court->id,
                    'season' => $season,
                    'morning' => $prices['morning'] ?? null,
                    'afternoon' => $prices['afternoon'] ?? null,
                    'weekend' => $prices['weekend'] ?? null,
                    'created_at' => $court->updated_at,
                    'updated_at' => $court->updated_at,
                ]);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('court_price_changes');
    }
};
