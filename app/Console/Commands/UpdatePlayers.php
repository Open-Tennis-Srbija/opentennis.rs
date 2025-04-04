<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\PlayerController;
use App\Models\Player;
use Illuminate\Support\Facades\Storage;
use PlayerChartData;


class UpdatePlayers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-players';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update each player with the latest data';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // You can add your logic here to update players
        // For example, you can call a service or a model method to perform the update
        $players = Player::all();

        foreach($players as $player){
            $data = [];

            $this->info('Updating '.$player->first_name.' '.$player->last_name.'...');

            $initial = PlayerController::getPlayerData($player->uri);
            $data['data'] = $initial;

            $data['charts'] = PlayerChartData::getChartData($player);

            Storage::disk('public')->put('/players/'.$player->uri.'.json', json_encode($data));
            $this->info($player->first_name.' '.$player->last_name.' updated.');
        }
        $this->info('Players updated successfully.');
    }
}
