<?php

namespace Database\Seeders;

use App\Models\Player;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlayerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $data = json_decode(file_get_contents(__DIR__ . '/players.json'));

        foreach($data as $player){
            $model = new Player();

            $model->first_name = $player->first_name;
            $model->last_name = $player->last_name;
            $model->club = $player->club;
            $model->location = $player->location;

            $model->save();
        }
      
    }
}
