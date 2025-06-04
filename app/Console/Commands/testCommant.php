<?php

namespace App\Console\Commands;

use App\Models\Player;
use Illuminate\Console\Command;

class testCommant extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:asd';

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
        $ps = Player::all();

        foreach($ps as $p){
            echo ($p->first_name);
        }
    }
}
