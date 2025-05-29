<?php

namespace App\Console\Commands;

use App\Http\Controllers\LeaguesController;
use App\Models\League;
use Illuminate\Console\Command;
use Illuminate\Container\Attributes\Storage;
use Illuminate\Support\Facades\Storage as FacadesStorage;

class UpdateAllLeagues extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-all-leagues';

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
            $leagues = League::where('id', '>', '1')->get();
            

            foreach($leagues as $l){
                $data = [];
    
                $this->info('Updating '.$l->name .'...');
    
                $data = LeaguesController::returnLeague($l);
    
                FacadesStorage::disk('public')->put('/leagues/'.$l->uri.'.json', json_encode($data));
                
                $this->info($l->name .' updated.');

            }
    }
}
