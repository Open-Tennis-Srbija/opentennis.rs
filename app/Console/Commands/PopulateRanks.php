<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Player;

class PopulateRanks extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:populate-ranks';

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
        $players = Player::all();

        $players = $players->sortByDesc('points');

        $rank = 1;

        foreach ($players as $player) {
            $player->rank = $rank;
            $player->save();
            $rank++;
        }

    }
}
