<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            // Sharing the auth user data
            'auth.user' => fn() => $request->user()
                ? $request->user()->only('id', 'name', 'email')
                : null,
            'headerStats' => [
                    'totalPlayers' => \App\Models\Player::count(),
                    'totalMatches' => \App\Models\TennisMatch::count(),
                    'totalTournaments' => \App\Models\League::where('type', 'tournament')->count(),
                    'totalLeagues' => \App\Models\League::where('type', 'league')->count(),
                    'totalCourts' => \App\Models\Court::count(),

                    // Add any other numbers you need
                ],
            ],
        );
    }
}
