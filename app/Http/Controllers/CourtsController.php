<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Court;
use App\Models\TennisMatch;
use Inertia\Inertia;

class CourtsController extends Controller
{
    public static function getCourts(){
        $courts = Court::where('id', '>', 1)->get();

        $serbianLatinAlphabet = [
            'a','b','c','č','ć','d','dž','đ','e','f','g','h','i','j','k','l','lj',
            'm','n','nj','o','p','r','s','š','t','u','v','z','ž'
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
            'id' => $court->id,
            'link' => $court->link
        ]);
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
        $court->save();

        return redirect('/tereni');
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
