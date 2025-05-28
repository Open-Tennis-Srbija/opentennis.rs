<?php

namespace App\Console\Commands;

use App\Http\Controllers\PlayerController;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use PlayerChartData;

class RefreshPlayer extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:refresh-player {player_uri}';

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
        $playerUri = $this->argument('player_uri');
        $p = \App\Models\Player::where('uri', $playerUri)->first();

        if (!$p) {
            $this->error("Player with URI $playerUri not found.");
            return;
        }
            $data = [];

            $this->info('Updating '.$p->first_name.' '.$p->last_name.'...');

            $initial = PlayerController::getPlayerData($p->uri);
            $data['data'] = $initial;

            $data['charts'] = PlayerChartData::getChartData($p);

            Storage::disk('public')->put('/players/'.$p->uri.'.json', json_encode($data));
            $this->info($p->first_name.' '.$p->last_name.' updated.');
    }
}
