<?php

namespace Database\Seeders;

use App\Models\Player;
use App\Models\TenisMatch;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TenisMatchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = json_decode(file_get_contents(__DIR__ . '/matches.json'));

        foreach($data as $match){
            $model = new TenisMatch();

            $winner_fname = explode(' ',$match->winner)[0];
            $winner_lname = explode(' ',$match->winner)[1];

            $loser_fname = explode(' ',$match->loser)[0];
            $loser_lname = explode(' ',$match->loser)[1];


            $winner = Player::where('first_name', $winner_fname)->where('last_name', $winner_lname)->first();
            $loser = Player::where('first_name', $loser_fname)->where('last_name', $loser_lname)->first();

            if(!$winner){
                $winner = new Player();
                $winner->first_name = $winner_fname;
                $winner->last_name = $winner_lname;
                $winner->save();
            }

            if(!$loser){
                $loser = new Player();
                $loser->first_name = $loser_fname;
                $loser->last_name = $loser_lname;
                $loser->save();
            }

            $model->winner_id = $winner->id;
            $model->loser_id = $loser->id;
            $model->set_score = $match->set_score;
            $model->game_score = $match->game_score;

            $time = strtotime($match->date);
            $model->match_date = date('Y-m-d', $time);
            $model->match_location = $match->location;

            $model->save();
        }
    }
}
