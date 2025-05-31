<?php

namespace App\Console\Commands;

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

        foreach ($matches as $match) {
            [$winner_gains, $loser_gains] = NikolaAlgoV1::getMatchEloGains($match);
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
        //
    }
}
