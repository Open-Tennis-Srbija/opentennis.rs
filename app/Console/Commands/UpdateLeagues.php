<?php

namespace App\Console\Commands;

use App\Http\Controllers\LeaguesController;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class UpdateLeagues extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-leagues';

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
        $this->info('matches updated successfully.');
        // you can add your logic here to update matches
        // for example, you can call a service or a model method to perform the update
        $leagues = LeaguesController::getLeaguesForList();

        Storage::disk('public')->put('leagues.json', json_encode($leagues));
    }
}
