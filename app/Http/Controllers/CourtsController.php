<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Court;
use App\Models\Setting;
use Illuminate\Support\Facades\DB;
use App\Models\TennisMatch;
use App\Helpers\SEOHelper;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CourtsController extends Controller
{
    // Court types and prices fields of the add and edit court forms
    const SEASONAL_RULES = [
        'court_types.*.*' => 'nullable|integer|min:0|max:20',
        'prices.*.*' => 'nullable|integer|min:0|max:1000000',
    ];

    const SEASONAL_MESSAGES = [
        'court_types.*.*.integer' => 'Unesite broj.',
        'court_types.*.*.min' => 'Broj ne može biti negativan.',
        'court_types.*.*.max' => 'Najviše 20 terena.',
        'prices.*.*.integer' => 'Unesite broj.',
        'prices.*.*.min' => 'Cena ne može biti negativna.',
    ];

    public static function getCourts(){
        $courts = Court::where('id', '>', 1)->get();

        $serbianLatinAlphabet = [
            'a','b','c','č','ć','d','dž','đ','e','f','g','h','i','j','k','l','lj',
            'm','n','nj','o','p','r','s','š','t','u','v','w','x','y','z','ž'
        ];

        $respons = [];

        foreach($courts as $c){
            array_push($respons,[
                'name' => $c->name,
                'id' => $c->id
            ]);
        }

        $alphabetMap = [];
        foreach ($serbianLatinAlphabet as $i => $letter) {
            $alphabetMap[$letter] = $i;
        }

        usort($respons, function($a, $b) use ($alphabetMap) {
            return CourtsController::serbianCompare($a, $b, $alphabetMap);
        });

        return $respons;
    }
    public static function getCourtList(){
        $courts = Court::where('id', '>', 1)->get();
        $season = Court::currentSeason();

        $serbianLatinAlphabet = [
            'a','b','c','č','ć','d','dž','đ','e','f','g','h','i','j','k','l','lj',
            'm','n','nj','o','p','r','s','š','t','u','v','w','x','y','z','ž'
        ];

        $respons = [];

        foreach($courts as $c){
            $prices = $c->prices[$season] ?? null;

            array_push($respons,[
                'name' => $c->name,
                'prices' => $prices && array_filter($prices, fn($price) => $price !== null) ? $prices : null,
                'uri' => $c->uri,
                'id' => $c->id,
                'location' => $c->location,
                'phone' => $c->phone,
                'county' => $c->county,
                'points' => $c->get_points(),
                'matches_number' => $c->matches->count(),
                'player_number' => $c->getPlayerCount(),
                'link' => $c->link,
            ]);
        }

        $alphabetMap = [];
        foreach ($serbianLatinAlphabet as $i => $letter) {
            $alphabetMap[$letter] = $i;
        }

        usort($respons, function($a, $b) {
            return $b['points'] - $a['points']; // Descending by points only
        });

        return $respons;
    }
    /**
     * Courts list one page at a time, sorted in the database
     */
    public function getCourtsApi(Request $request){
        $perPage = min((int) $request->get('per_page', 100), 500);
        $sortBy = $request->get('sort_by', 'matches_number');
        $sortDir = $request->get('sort_dir', 'desc') === 'asc' ? 'asc' : 'desc';

        $allowedSorts = ['name', 'price', 'matches_number', 'player_number', 'county'];
        if (!in_array($sortBy, $allowedSorts)) {
            $sortBy = 'matches_number';
        }

        $season = Court::currentSeason();

        $playerNumber = DB::table('match_players')
            ->join('tennis_matches', 'match_players.tennis_match_id', '=', 'tennis_matches.id')
            ->whereColumn('tennis_matches.court_id', 'courts.id')
            ->selectRaw('count(distinct match_players.player_id)');

        $courts = Court::where('id', '>', 1)
            ->select('id', 'name', 'uri', 'county', 'location', 'phone', 'link', 'prices')
            ->withCount('matches')
            ->selectSub($playerNumber, 'player_number');

        // Wrapped so the counts and the current season's first price can be sorted on
        $query = DB::query()->fromSub($courts, 'c')
            ->select('c.*')
            // json_extract instead of json_value, MySQL only takes a literal path in json_value;
            // an unset price is a JSON null, which unquotes to the string 'null'
            ->selectRaw("cast(nullif(json_unquote(json_extract(prices, ?)), 'null') as unsigned) as price", ['$.' . $season . '.morning']);

        if ($sortBy === 'price') {
            // Courts without prices stay at the bottom either way
            $query->orderByRaw('price is null')->orderBy('price', $sortDir);
        } else {
            $query->orderBy($sortBy === 'matches_number' ? 'matches_count' : $sortBy, $sortDir);
        }

        // Same tie-breakers the list used when it sorted in the browser
        if ($sortBy !== 'matches_number') $query->orderByDesc('matches_count');
        if ($sortBy !== 'player_number') $query->orderByDesc('player_number');
        if ($sortBy !== 'name') $query->orderBy('name');
        $query->orderBy('id');

        return $query->paginate($perPage)->through(function ($court) use ($season) {
            $prices = json_decode($court->prices ?? 'null', true)[$season] ?? null;

            return [
                'name' => $court->name,
                'prices' => $prices && array_filter($prices, fn($price) => $price !== null) ? $prices : null,
                'uri' => $court->uri,
                'id' => $court->id,
                'location' => $court->location,
                'phone' => $court->phone,
                'county' => $court->county,
                'matches_number' => $court->matches_count,
                'player_number' => $court->player_number,
                'link' => $court->link,
            ];
        });
    }

    public static function getEditCourt($id){
        return Inertia::render('Auth/admin/courts/EditCourt', [
            'id' => $id 
        ]);
    }
    public static function getCourtForEdit($id){
        $court = Court::find($id);
        if(!$court){
            return response()->json(['error' => 'Court not found'], 404);
        }
        return response()->json([
            'name' => $court->name,
            'uri' => $court->uri,
            'id' => $court->id,
            'county' => $court->county,
            'location' => $court->location,
            'phone' => $court->phone,
            'link' => $court->link,
            'court_types' => $court->court_types,
            'prices' => $court->prices,
        ]);
    }

    public static function getCourt($uri){
        $court = Court::where('uri', $uri)->first();
        if(!$court){
            return redirect('/');
        }

        $matches = TennisMatch::where('court_id', $court->id)->get();
        $players = [];

        foreach($matches as $match){
            if(!in_array($match->winner, $players)){
                array_push($players, $match->winner);
            }
            if(!in_array($match->loser, $players)){
                array_push($players, $match->loser);
            }
        }

        return Inertia::render('courts/Court', [
            'court_id' => $court->id,
            'court' => self::get_court($court->id),
            'seo' => SEOHelper::generateCourtSEO($court),
        ]);
    }
       public static function get_court($id){
        $court = Court::where('id', $id)->first();
        $season = Court::currentSeason();

        return [
            'season' => $season,
            'court_types' => $court->seasonCourtTypes($season),
            'prices' => $court->prices[$season] ?? null,
            'name' => $court->name,
            'uri' => $court->uri,
            'points' => $court->get_points(),
            'player_number' => $court->getPlayerCount(),
            'match_number' => $court->getMatchCount(),
            'link' => $court->link,
            'phone' => $court->phone,
            'county' => $court->county,
            'location' => $court->location,
            'leagues' => $court->getLeagues(),
            'position' => $court->getPosition(),
            'players' => $court->getPlayers(),
            // Remove matches loading - will be handled by MatchTable component
        ];

    }

    /**
     * Get court matches with pagination for API
     */
    public function getCourtMatchesApi(Request $request, $id)
    {
        $page = $request->get('page', 1);
        $perPage = $request->get('per_page', 100);
        $sortBy = $request->get('sort_by', 'number');
        $sortDir = $request->get('sort_dir', 'desc');
        $offset = ($page - 1) * $perPage;

        $allowedSorts = ['number', 'date', 'set_score', 'county', 'winner', 'loser', 'league', 'court'];
        if (!in_array($sortBy, $allowedSorts)) {
            $sortBy = 'number';
        }
        $sortDir = $sortDir === 'asc' ? 'asc' : 'desc';
        
        $court = Court::find($id);
        if (!$court) {
            return response()->json(['error' => 'Court not found'], 404);
        }
        
        $matches = $court->getMatches($offset, $perPage, $sortBy, $sortDir);
        $totalMatches = $court->getMatchCount();
        $lastPage = ceil($totalMatches / $perPage);
        
        return response()->json([
            'data' => $matches,
            'current_page' => $page,
            'last_page' => $lastPage,
            'per_page' => $perPage,
            'total' => $totalMatches,
            'from' => $offset + 1,
            'to' => min($offset + $perPage, $totalMatches)
        ]);
    }

    public static function store(Request $request){
        $request->validate([
            'name' => 'required|string|max:255',
            'uri' => 'required|string|max:255|unique:courts,uri',
            'location' => 'string|max:255',
            'county' => 'string|max:255',
            'phone' => 'nullable|string|max:20',
        ] + self::SEASONAL_RULES, self::SEASONAL_MESSAGES);

        $court = new Court();
        $court->name = $request->input('name');
        $court->uri = Str::slug($request->input('uri'));
        $court->location = $request->input('location');
        $court->county = $request->input('county');
        $court->phone = $request->input('phone');
        $court->link = $request->input('link') ?? '';
        self::fillSeasonalFields($court, $request);

        DB::transaction(function () use ($court) {
            $court->save();
            self::recordPriceChanges($court, null);
        });

        return redirect('/tereni/'. $court->uri);
    }

    public static function updateCourt(Request $request){
        $court = Court::find($request->input('id'));
        if(!$court){
            return response()->json(['error' => 'Court not found'], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255',
        ] + self::SEASONAL_RULES, self::SEASONAL_MESSAGES);

        $oldPrices = $court->prices;
        self::fillSeasonalFields($court, $request);

        $court->name = $request->input('name');
        $court->link = $request->input('link') ?? '';
        if($request->input('uri') != $court->uri){
            $court->uri = Str::slug($request->input('uri'));
        } else {
            $court->uri = Str::slug($request->input('name'));
        }
        $court->phone = $request->input('phone');
        $court->location = $request->input('location');
        $court->county = $request->input('county');

        DB::transaction(function () use ($court, $oldPrices) {
            $court->save();
            self::recordPriceChanges($court, $oldPrices);
        });

        return redirect('/tereni/' . $court->uri);
    }

    public static function deleteCourt(Request $request){
        $court = Court::find($request->input('id'));
        if(!$court){
            return response()->json(['error' => 'Court not found'], 404);
        }

        $matches = TennisMatch::where('court_id', $court->id)->get();

        if($matches->count() > 0){
            foreach($matches as $match){
                $match->court_id = 1; // Assuming 1 is the default court
                $match->save();
            }
        }

        $court->delete();
        return redirect('/tereni');

    }
    public static function getSeason(){
        return Inertia::render('Auth/admin/courts/Season', [
            'season' => Court::currentSeason(),
        ]);
    }

    public static function updateSeason(Request $request){
        $data = $request->validate([
            'season' => 'required|in:summer,winter',
        ]);

        Setting::set('season', $data['season']);

        return redirect('/sezona');
    }

    private static function fillSeasonalFields($court, $request){
        $court->court_types = self::seasonalValues($request->input('court_types'), Court::COURT_TYPES);
        $court->prices = self::seasonalValues($request->input('prices'), Court::PRICE_TYPES);
    }

    // Adds a history row for each season whose prices differ from before the save
    private static function recordPriceChanges($court, $oldPrices){
        $empty = array_fill_keys(Court::PRICE_TYPES, null);

        foreach(Court::SEASONS as $season){
            $old = $oldPrices[$season] ?? $empty;
            $new = $court->prices[$season] ?? $empty;

            if($old === $new){
                continue;
            }

            $court->priceChanges()->create($new + [
                'season' => $season,
                'user_id' => auth()->id(),
            ]);
        }
    }

    // Keeps only known keys per season, null when nothing was entered.
    // $keys is either one list for all seasons or a list per season.
    private static function seasonalValues($input, $keys){
        $result = [];

        foreach(Court::SEASONS as $season){
            foreach($keys[$season] ?? $keys as $key){
                $value = $input[$season][$key] ?? null;
                $result[$season][$key] = ($value === null || $value === '') ? null : (int) $value;
            }
        }

        $hasValues = collect($result)->flatten()->filter(fn($value) => $value !== null)->isNotEmpty();

        return $hasValues ? $result : null;
    }

    // Normalize string to array of Serbian letters/digraphs
    private static function toAlphabetUnits($word) {
        $word = mb_strtolower($word, 'UTF-8');
        $units = [];
        $i = 0;
        $len = mb_strlen($word, 'UTF-8');

        while ($i < $len) {
            $two = mb_substr($word, $i, 2, 'UTF-8');
            $one = mb_substr($word, $i, 1, 'UTF-8');

            // Check for digraphs: dž, lj, nj
            if (in_array($two, ['dž', 'lj', 'nj'])) {
                $units[] = $two;
                $i += 2;
            } else {
                $units[] = $one;
                $i += 1;
            }
        }

        return $units;
    }

    // Sort function using custom Serbian alphabet
    private static function serbianCompare($a, $b, $alphabetMap) {
        $aUnits = self::toAlphabetUnits($a['name']);
        $bUnits = self::toAlphabetUnits($b['name']);

        $max = max(count($aUnits), count($bUnits));

        for ($i = 0; $i < $max; $i++) {
            $aChar = $aUnits[$i] ?? '';
            $bChar = $bUnits[$i] ?? '';

            $aIndex = $alphabetMap[$aChar] ?? -1;
            $bIndex = $alphabetMap[$bChar] ?? -1;

            if ($aIndex !== $bIndex) {
                return $aIndex - $bIndex;
            }
        }
        return 0;
    }
}
