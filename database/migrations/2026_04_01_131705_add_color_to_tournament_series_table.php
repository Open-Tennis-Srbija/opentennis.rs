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
        Schema::table('tournament_series', function (Blueprint $table) {
            $table->string('color', 7)->default('#ebebeb')->after('name'); // 7 chars for hex color
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tournament_series', function (Blueprint $table) {
            $table->dropColumn('color');
        });
    }
};
