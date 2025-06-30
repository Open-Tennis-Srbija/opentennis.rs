<?php

namespace App\Console\Commands;

use App\Models\Court;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class AddCourtUri extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:add-court-uri';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate URI slugs for all courts';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $courts = Court::all();

        foreach ($courts as $court) {
            $court->uri = Str::slug($court->name);
            $court->save();
            
            $this->info("Generated URI for {$court->name}: {$court->uri}");
        }
        
        $this->info("Finished generating URIs for " . $courts->count() . " courts.");
    }
}
