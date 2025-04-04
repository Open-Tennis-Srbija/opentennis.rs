<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\PlayerController;
use Illuminate\Support\Facades\Storage;


class UpdateRankList extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-rank-list';

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
        $players = PlayerController::getPlayers();
        Storage::disk('public')->put('players.json', json_encode($players));
        $this->info('Players updated successfully.');
    }
}
