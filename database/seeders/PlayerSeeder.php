<?php

namespace Database\Seeders;

use App\Models\Player;
use Illuminate\Database\Seeder;
use Helper;

class PlayerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $data = json_decode(file_get_contents(__DIR__ . '/database_export.json'));

        foreach ($data->players as $player) {
            $model = new Player();

            $uri_firstname = Helper::formatName($player->first_name);
            $uri_lastname = Helper::formatName($player->last_name);

            $uri = strtolower($uri_firstname) . '-' . strtolower($uri_lastname);

            $index = 0;

            while (Player::where('uri', $uri)->exists()) {
                $uri = $uri . $index;
                $index++;
            }


            $model->first_name = $player->first_name;
            $model->uri = $uri;
            $model->last_name = $player->last_name;
            $model->club = $player->club;
            $model->category = $player->category;

            if($player->location)
                $model->location = $player->location;
            else
                $model->location = 'Beograd';

            $model->location = $player->location;

            $model->save();

            $model->id = $player->id;
            $model->save();

        }
    }
}
