<?php

namespace App\Console\Commands;

use App\Http\Controllers\LeaguesController;
use App\Models\League;
use Illuminate\Console\Command;
use Illuminate\Container\Attributes\Storage;
use Illuminate\Support\Facades\Storage as FacadesStorage;

class UpdateLeague extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-league {league_id}';

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
        $league_id = $this->argument('league_id');
        $l = League::find($league_id);

        if (!$l) {
            $this->error("League with id $league_id not found.");
            return;
        }
            $data = [];

            $this->info('Updating '.$l->name .'...');

            $data = LeaguesController::returnLeague($l);

            FacadesStorage::disk('public')->put('/leagues/'.$l->uri.'.json', json_encode($data));
            
            $this->info($l->name .' updated.');
    }
}
