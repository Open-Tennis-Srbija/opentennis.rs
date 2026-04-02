<?php

namespace App\Http\Controllers;

use App\Models\TournamentSeries;
use Illuminate\Http\Request;

class TournamentSeriesController extends Controller
{
    /**
     * Get all tournament series with names and IDs
     */
    public function index()
    {
        $series = TournamentSeries::select('id', 'name', 'uri', 'year', 'is_active', 'color')
            ->orderByRaw('name COLLATE utf8mb4_unicode_ci')
            ->get();

        return response()->json($series);
    }

    /**
     * Get all tournament series for static calls (like in routes)
     */
    public static function getAllSeries()
    {
        try {
            return TournamentSeries::select('id', 'name', 'uri', 'year', 'is_active', 'color')
                ->orderByRaw('name COLLATE utf8mb4_unicode_ci')
                ->get()
                ->toArray();
        } catch (\Exception $e) {
            // Return empty array if table doesn't exist (during migrations)
            return [];
        }
    }

    /**
     * Store a new tournament series
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'color' => 'required|string|regex:/^#[a-fA-F0-9]{6}$/',
        ]);

        $series = TournamentSeries::create([
            'name' => $validated['name'],
            'color' => $validated['color'],
            'uri' => \Str::slug($validated['name']),
            'is_active' => true
        ]);

        return response()->json($series, 201);
    }

    /**
     * Update an existing tournament series
     */
    public function update(Request $request, TournamentSeries $tournamentSeries)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'color' => 'required|string|regex:/^#[a-fA-F0-9]{6}$/',
        ]);

        $tournamentSeries->update([
            'name' => $validated['name'],
            'color' => $validated['color'],
            'uri' => \Str::slug($validated['name'])
        ]);

        return response()->json($tournamentSeries);
    }

    /**
     * Bulk update all tournament series
     */
    public function bulkUpdate(Request $request)
    {
        $validated = $request->validate([
            'series' => 'required|array',
            'series.*.id' => 'nullable|integer|exists:tournament_series,id',
            'series.*.name' => 'required|string|max:255',
            'series.*.color' => 'required|string|regex:/^#[a-fA-F0-9]{6}$/',
        ]);

        $results = [];

        foreach ($validated['series'] as $item) {
            if (!empty($item['id'])) {
                $series = TournamentSeries::find($item['id']);
                $series->update([
                    'name' => $item['name'],
                    'color' => $item['color'],
                    'uri' => \Str::slug($item['name']),
                ]);
                $results[] = $series;
            } else {
                $series = TournamentSeries::create([
                    'name' => $item['name'],
                    'color' => $item['color'],
                    'uri' => \Str::slug($item['name']),
                    'is_active' => true,
                ]);
                $results[] = $series;
            }
        }

        return response()->json($results);
    }

    /**
     * Delete a tournament series
     */
    public function destroy(TournamentSeries $tournamentSeries)
    {
        $tournamentSeries->delete();

        return response()->json(['message' => 'Tournament series deleted successfully']);
    }
}
