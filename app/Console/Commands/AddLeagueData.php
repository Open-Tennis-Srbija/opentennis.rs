<?php

namespace App\Console\Commands;

use App\Models\League;
use Illuminate\Console\Command;

class AddLeagueData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:add-league-data';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $l = League::find(2);
        $l->name = 'Topaco Letnja Liga 2025';
        $l->date_begin = '2025-04-14 00:00:00';
        $l->date_end = '2025-10-14 00:00:00';
        $l->county = 'Beograd';
        $l->save();

        $l = League::find(3);
        $l->name = 'BTK Letnja Liga 2025';
        $l->date_begin = '2025-04-14 00:00:00';
        $l->date_end = '2025-10-14 00:00:00';
        $l->county = 'Beograd';
        $l->save();

        $l = League::find(9);
        $l->name = 'Baseline Letnja Liga 2025';
        $l->date_begin = '2025-04-14 00:00:00';
        $l->date_end = '2025-10-14 00:00:00';
        $l->county = 'Beograd';
        $l->save();

        $l = League::find(10);
        $l->name = 'Baseline Beograd Open Turnir 2025';
        $l->date_begin = '2025-05-16 00:00:00';
        $l->date_end = '2025-05-18 00:00:00';
        $l->county = 'Beograd';
        $l->save();

        $l = League::find(11);
        $l->name = 'Prvenstvo Veterana Doboj Turnir 2025';
        $l->date_begin = '2025-06-13 00:00:00';
        $l->date_end = '2025-06-15 00:00:00';
        $l->county = 'Republika Srpska';
        $l->save();

        $l = League::find(12);
        $l->name = 'Vojvodina Open Turnir 2025';
        $l->date_begin = '2025-05-30 00:00:00';
        $l->date_end = '2025-05-01 00:00:00';
        $l->county = 'Novi Sad';
        $l->save();

    }
}
