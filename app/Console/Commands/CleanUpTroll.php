<?php

namespace App\Console\Commands;

use App\Models\Player;
use Carbon\Carbon;
use Illuminate\Console\Command;

class CleanUpTroll extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:clean-up-troll';

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
        $p = Player::where('uri','djordje-bradic')->first();

        $matches_regular = $p->matches()->where('created_at', '<', Carbon::today());
        $all_matches = $p->matches();

        // Get only matches that are NOT in matches_regular
        $matches_not_regular = $all_matches->diff($matches_regular);

        $points_to_deduct = 0;
        $match_count = 0;

        foreach($matches_not_regular as $match){
            $match_count++;
            $winners = $match->winners()->get();
            $losers = $match->losers()->get();

            $winner_points = $match->winner_point_gain;
            $loser_points = $match->loser_point_gain;

            if($winners->count() > 1){
                foreach($winners as $winner){
                    if($winner->id == $p->id){
                        $points_to_deduct += $winner_points;
                    }
                    $winner->points -= $winner_points;
                    $winner->save();
                }
            }
            else{
                if($winners->first()->id == $p->id){
                    $points_to_deduct += $winner_points;
                }
                $winners->first()->points -= $winner_points;
                $winners->first()->save();
            }

            if($losers->count() > 1){
                foreach($losers as $loser){
                    if($loser->id == $p->id){
                        $points_to_deduct += $loser_points;
                    }
                    $loser->points -= $loser_points;
                    $loser->save();
                }
            }
            else{
                if($losers->first()->id == $p->id){
                    $points_to_deduct += $loser_points;
                }
                $losers->first()->points -= $loser_points;
                $losers->first()->save();
            }

            $match->players()->detach();

            $match->delete();
        }

        $players = Player::all();

        $players = $players->sortByDesc('points');

        $index = 1;

        foreach($players as $player){
            $player->rank = $index;
            $player->save();
            $index++;
        }

        $this->info('adjusted ranks');
        $this->info("Deducted {$points_to_deduct} points from player {$p->uri}.");
        $this->info("Removed {$match_count} matches from player {$p->uri}.");
    }
}
