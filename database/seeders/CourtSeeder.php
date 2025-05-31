<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Court;

class CourtSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = json_decode(file_get_contents(__DIR__ . '/database_export.json'));

        foreach ($data->courts as $court) {
            $model = new Court();

            $model->name = $court->name;
            $model->link = $court->link;

            $model->save();

            $model->id = $court->id;

            $model->save();

        }

    }
}
