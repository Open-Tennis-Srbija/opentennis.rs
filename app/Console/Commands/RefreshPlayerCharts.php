<?php

namespace App\Console\Commands;

use App\Models\Player;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use PlayerChartData;

class RefreshPlayerCharts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:refresh-player-charts';

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
        
        $player = Player::find(1);


        $this->comment('Updating '.$player->first_name.' '.$player->last_name.'...');

        $data = PlayerChartData::getChartData($player);


        $export = "<?php\n\nreturn " . var_export($data, true) . ";\n";
        Storage::disk('public')->put('charts/'.$player->uri.'.php', $export);

        $this->comment($player->first_name.' '.$player->last_name.' updated.');
    }
}
