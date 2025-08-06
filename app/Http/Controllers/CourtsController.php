<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Court;
use App\Models\TennisMatch;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CourtsController extends Controller
{
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

        $serbianLatinAlphabet = [
            'a','b','c','č','ć','d','dž','đ','e','f','g','h','i','j','k','l','lj',
            'm','n','nj','o','p','r','s','š','t','u','v','w','x','y','z','ž'
        ];

        $respons = [];

        foreach($courts as $c){
            array_push($respons,[
                'name' => $c->name,
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
    public static function getEditCourt($id){
        return Inertia::render('Auth/EditCourt', [
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
            'link' => $court->link
        ]);
    }

    public static function getCourt($uri){
        $court = Court::where('uri', $uri)->first();
        if(!$court){
            return response()->json(['error' => 'Court not found'], 404);
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

        return Inertia::render('Court', [
            'court_id' => $court->id     
        ]);
    }
       public static function get_court($id){
        $court = Court::where('id', $id)->first();

        return [
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
        $offset = ($page - 1) * $perPage;
        
        $court = Court::find($id);
        if (!$court) {
            return response()->json(['error' => 'Court not found'], 404);
        }
        
        $matches = $court->getMatches($offset, $perPage);
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
        ]);

        $court = new Court();
        $court->name = $request->input('name');
        $court->uri = Str::slug($request->input('uri'));
        $court->location = $request->input('location');
        $court->county = $request->input('county');
        $court->phone = $request->input('phone');
        $court->link = $request->input('link');
        $court->save();

        return redirect('/tereni/'. $court->uri);
    }

    public static function updateCourt(Request $request){
        $court = Court::find($request->input('id'));
        if(!$court){
            return response()->json(['error' => 'Court not found'], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $court->name = $request->input('name');
        $court->link = $request->input('link');
        if($request->input('uri') != $court->uri){
            $court->uri = Str::slug($request->input('uri'));
        } else {
            $court->uri = Str::slug($request->input('name'));
        }
        $court->phone = $request->input('phone');
        $court->location = $request->input('location');
        $court->county = $request->input('county');
        $court->save();

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
