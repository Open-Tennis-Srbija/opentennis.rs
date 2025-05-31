<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\TenisMatchController;
use App\Models\Player;

class Test extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test';

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
$data = json_decode(file_get_contents(__DIR__ . '/database_export.json'));

foreach ($data->players as $player) {

        echo $player->category; 
        }
    }
}
