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
        // Create tournament_series table
        Schema::create('tournament_series', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('uri')->unique();
            $table->text('description')->nullable();
            $table->string('organizer')->nullable();
            $table->string('county')->nullable();
            $table->integer('year')->nullable();
            $table->date('date_begin')->nullable();
            $table->date('date_end')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Add foreign key to leagues table
        Schema::table('leagues', function (Blueprint $table) {
            $table->foreignId('tournament_series_id')->nullable()->after('type')->constrained('tournament_series')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Remove foreign key from leagues table
        Schema::table('leagues', function (Blueprint $table) {
            $table->dropForeign(['tournament_series_id']);
            $table->dropColumn('tournament_series_id');
        });

        // Drop tournament_series table
        Schema::dropIfExists('tournament_series');
    }
};
