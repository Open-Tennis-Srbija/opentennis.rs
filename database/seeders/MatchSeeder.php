<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TennisMatch;


class MatchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = json_decode(file_get_contents(__DIR__ . '/database_export.json'));

        foreach ($data->tenis_matches as $match) {

            $model = new TennisMatch();

            $model->court_id = $match->court_id;
            $model->league_id = $match->league_id;
            if(strlen($match->match_date) > 10)
                $model->date = date('Y-m-d', strtotime($match->match_date));
            else
                $model->date = $match->match_date;
            $model->set_score = $match->set_score;
            $model->game_score = $match->game_score;
            $model->county = $match->match_location;
            $model->winner_point_gain = 0;
            $model->loser_point_gain = 0;

            $model->save();

            $model->players()->attach($match->winner_id, ['team' => 'winner']);
            $model->players()->attach($match->loser_id, ['team' => 'loser']);

        }
    }
}
