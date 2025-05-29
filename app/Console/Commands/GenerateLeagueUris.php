<?php

namespace App\Console\Commands;

use App\Models\League;
use Illuminate\Console\Command;

class GenerateLeagueUris extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:generate-league-uris';

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
        //
        $leagues = League::where('id','>', 1)->get();

        foreach($leagues as $league){
            $uri = str_replace(' - ','-',$league->name);
            $uri = str_replace(' ','-',$uri);
            $uri = str_replace(',','',$uri);
            $uri = strtolower($uri);

            $league->uri = $uri;
            $league->save();
        }
    }
}
