<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\LeagueController;
use Illuminate\Support\Facades\Storage;
use LeagueChartData;

class UpdateLeagueStats extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-league-stats';

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
        // You can add your logic here to update league stats
        // For example, you can call a service or a model method to perform the update
        $data = [];
        $data['stats'] = LeagueController::getStatistics();
        $data['charts'] = LeagueChartData::getChartData();
        Storage::disk('public')->put('statistics.json', json_encode($data));
        $this->info('League stats updated successfully.');
    }
}
