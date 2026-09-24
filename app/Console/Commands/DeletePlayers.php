<?php

namespace App\Console\Commands;

use App\Models\Player;
use Illuminate\Console\Command;

class DeletePlayers extends Command
{
    protected $signature = 'app:delete-players
                            {file : Text file with player URIs or full URLs, one per line}
                            {--force : Actually delete (without it, only a dry run is performed)}';

    protected $description = 'Delete players listed by URI/URL in a text file. Players that have matches are skipped.';

    public function handle()
    {
        $file = $this->argument('file');

        if (!is_readable($file)) {
            $this->error("Cannot read {$file}");
            return self::FAILURE;
        }

        $uris = collect(file($file, FILE_IGNORE_NEW_LINES))
            ->map(fn($line) => trim($line))
            ->filter()
            ->map(fn($line) => urldecode(trim(parse_url($line, PHP_URL_PATH) ?: $line, '/')))
            ->unique()
            ->values();

        $dryRun = !$this->option('force');
        $deleted = 0;
        $skipped = 0;
        $missing = 0;

        foreach ($uris as $uri) {
            $player = Player::where('uri', $uri)->first();

            if (!$player) {
                $this->warn("not found:        {$uri}");
                $missing++;
                continue;
            }

            $matchCount = $player->matches()->count();

            if ($matchCount > 0) {
                $this->warn("SKIPPED ({$matchCount} matches): {$uri} [{$player->first_name} {$player->last_name}]");
                $skipped++;
                continue;
            }

            $this->line(($dryRun ? 'would delete:     ' : 'deleted:          ') . "{$uri} [{$player->first_name} {$player->last_name}]");

            if (!$dryRun) {
                $player->delete();
            }
            $deleted++;
        }

        $this->newLine();
        $this->info(($dryRun ? 'DRY RUN - nothing deleted. ' : '') . "{$deleted} " . ($dryRun ? 'to delete' : 'deleted') . ", {$skipped} skipped (have matches), {$missing} not found.");

        if ($dryRun) {
            $this->info('Re-run with --force to delete.');
        } elseif ($deleted) {
            $this->info('Run `php artisan app:populate-ranks` to close the gaps in ranks.');
        }

        return self::SUCCESS;
    }
}
