<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Court;

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

// Normalize string to array of Serbian letters/digraphs
function toAlphabetUnits($word) {
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
function serbianCompare($a, $b) {
	global $alphabetMap;

	$aUnits = toAlphabetUnits($a['name']);
	$bUnits = toAlphabetUnits($b['name']);

	$max = max(count($aUnits), count($bUnits));

	for ($i = 0; $i < $max; $i++) {
		$aChar = $aUnits[$i] ?? '';
		$bChar = $bUnits[$i] ?? '';

		$aIndex = $alphabetMap[$aChar] ?? PHP_INT_MAX;
		$bIndex = $alphabetMap[$bChar] ?? PHP_INT_MAX;

		if ($aIndex !== $bIndex) {
			return $aIndex - $bIndex;
		}
	}

	return 0;
}
usort($respons, function($a, $b) use ($alphabetMap) {
    $aUnits = toAlphabetUnits($a['name']);
    $bUnits = toAlphabetUnits($b['name']);

    $max = max(count($aUnits), count($bUnits));

    for ($i = 0; $i < $max; $i++) {
        $aChar = $aUnits[$i] ?? '';
        $bChar = $bUnits[$i] ?? '';

        $aIndex = $alphabetMap[$aChar] ?? PHP_INT_MAX;
        $bIndex = $alphabetMap[$bChar] ?? PHP_INT_MAX;

        if ($aIndex !== $bIndex) {
            return $aIndex - $bIndex;
        }
    }

    return 0;
});

		return $respons;
	}

	//
}
