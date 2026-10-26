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
        // Both keyed by season: {"summer": {...}, "winter": {...}}
        Schema::table('courts', function (Blueprint $table) {
            $table->json('court_types')->nullable();
            $table->json('prices')->nullable();
            // null = follow the global season setting
            $table->enum('season', ['summer', 'winter'])->nullable();
        });

        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->timestamps();
        });

        // Clubs usually move to winter prices from October until spring
        $month = (int) date('n');
        DB::table('settings')->insert([
            'key' => 'season',
            'value' => ($month >= 10 || $month <= 3) ? 'winter' : 'summer',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');

        Schema::table('courts', function (Blueprint $table) {
            $table->dropColumn(['court_types', 'prices', 'season']);
        });
    }
};
