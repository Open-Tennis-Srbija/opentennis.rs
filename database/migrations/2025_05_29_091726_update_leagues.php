<?php

use Carbon\Carbon;
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
        Schema::table('leagues', function (Blueprint $table) {
            $table->string('uri')->default('')->after('name');
            $table->string('county')->default('?')->after('uri');
            $table->foreignId('court_id')->default(1)->constrained('courts')->cascadeOnDelete();
            $table->date('date_begin')->default(Carbon::yesterday())->after('county');
            $table->date('date_end')->default(now())->after('date_begin');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('leagues', function(Blueprint $table){
            $table->dropIfExists('county');
            $table->dropIfExists('date_begins');
            $table->dropIfExists('date_end');
        });
    }
};
