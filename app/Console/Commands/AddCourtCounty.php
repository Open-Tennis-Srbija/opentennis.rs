<?php

namespace App\Console\Commands;

use App\Models\Court;
use App\Models\TennisMatch;
use Illuminate\Console\Command;

class AddCourtCounty extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:add-court-county';

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
        $courts = Court::all();

        foreach ($courts as $court) {
            $match = TennisMatch::where('court_id', $court->id)->first();
            if($match) {
                $court->county = $match->county;
            } else {
                $court->county = ''; // Default value if no match is found
            }
            $court->save();
            $this->info("Updated court {$court->name} with county {$court->county}");
        }
    }
}
