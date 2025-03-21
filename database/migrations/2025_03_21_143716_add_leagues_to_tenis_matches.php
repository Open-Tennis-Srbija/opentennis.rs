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
        Schema::table('tenis_matches', function (Blueprint $table) {
            $table->foreignId('league_id')->default(1)->constrained('leagues')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tenis_matches', function (Blueprint $table) {
            //
            $table->dropForeign(['league_id']);
            $table->dropColumn('league_id');

        });
    }
};
