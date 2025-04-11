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
        $data = json_decode(file_get_contents(__DIR__ . '/database_export.json'));

        foreach ($data->leagues as $league) {
            $model = new League();

            $model->name = $league->name;
            $model->link = $league->link;

            $model->save();

            $model->id = $league->id;

            $model->save();

        }

    }
}
