<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\League;


class LeagueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $league = new League([
            'name' => '',
            'link' => '',
        ]);

        $league->save();

        $league = new League([
            'name' => 'Topaco letnja liga',
            'link' => '',
        ]);

        $league->save();

        $league = new League([
            'name' => 'Beogradski Teniski Klub letnja liga',
            'link' => '',
        ]);

        $league->save();


    }
}
