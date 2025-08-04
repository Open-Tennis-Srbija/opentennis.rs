<?php

namespace App\Console\Commands;

use App\Models\Player;
use Illuminate\Console\Command;
use App\Models\TennisMatch;
use NikolaAlgoV1;

class PopulatePoints extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:populate-points';

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
        $matches = TennisMatch::all();

        $players = Player::all();

        foreach($players as $player){
            $player->points = 0;
            $player->save();
        }

        foreach ($matches as $match) {
            [$winner_gains, $loser_gains] = NikolaAlgoV1::getMatchEloGains($match);

            if($match->winners()->count() == 1){
                $winner = $match->winners()->first();
                $loser = $match->losers()->first();
    
                $match->winner_point_gain = $winner_gains;
                $match->loser_point_gain = $loser_gains;
    
                $winner->points += $winner_gains;
                $loser->points += $loser_gains;

                $winner->save();
                $loser->save();
                $match->save();
            }
            else{
                $winner1 = $match->winners()->first();
                $winner2 = $match->winners()->skip(1)->first();
                $loser1 = $match->losers()->first();
                $loser2 = $match->losers()->skip(1)->first();

                $match->winner_point_gain = $winner_gains;
                $match->loser_point_gain = $loser_gains;

                $winner1->points += $winner_gains / 2;
                $winner2->points += $winner_gains / 2;
                $loser1->points += $loser_gains / 2;
                $loser2->points += $loser_gains / 2;

                $winner1->save();
                $winner2->save();
                $loser1->save();
                $loser2->save();
                $match->save();
            }

        }
        //
    }
}
