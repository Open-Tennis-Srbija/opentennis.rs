<?php

namespace App\Console\Commands;

use App\Models\Player;
use Illuminate\Console\Command;

class PrepareCharts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:prepare-charts';

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
        $data = json_decode(file_get_contents(storage_path('app/public/statistics.json')));
        if (empty($data->charts)) {
            $this->error('No charts data found in statistics.json');
            return;
        }
        $this->info('Preparing charts for statistics...');
        $export = "<?php\n\nreturn " . var_export($data->charts, true) . ";\n";
        file_put_contents(storage_path('app/public/charts/statistics.php'), $export);
        $this->info('Charts for statistics prepared successfully.');
    }
}
