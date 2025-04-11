<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\PlayerController;
use App\Models\Player;
use Illuminate\Support\Facades\Storage;
use PlayerChartData;

class UpdatePlayer extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-player {playerId}';

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


        $this->info('Finding player with ID '.$this->argument('playerId').'...');

        $player = Player::find($this->argument('playerId'));

        if (!$player) {
            $this->error('Player with ID '.$this->argument('playerId').' not found.');
            return;
        }
        else{
            $this->info('Player with ID '.$this->argument('playerId').' found.');
        }

        $this->comment('Updating '.$player->first_name.' '.$player->last_name.'...');

        $initial = PlayerController::getPlayerData($player->uri);
        $data['data'] = $initial;

        $data['charts'] = PlayerChartData::getChartData($player);

        $export = "<?php\n\nreturn " . var_export($data, true) . ";\n";
        Storage::disk('public')->put('players/'.$player->uri.'.php', $export);

        $this->comment($player->first_name.' '.$player->last_name.' updated.');

    }
}
