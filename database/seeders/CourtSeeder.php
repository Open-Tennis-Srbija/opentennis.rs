<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Court;
use App\Models\TenisMatch;

class CourtSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $matches = TenisMatch::all();
        $first_court = new Court();
        $first_court->name = '';
        $first_court->link= '';
        $first_court->save();

        foreach($matches as $match){
            $courts = Court::all();

            $exists = false;
            foreach($courts as $court){
                if($court->name == $match->match_location){
                    $exists = true;
                    $match->court_id = $court->id;
                    $match->match_location = 'Beograd';
                }
            }
            if(!$exists){
                $court = new Court();

                if($match->match_location == "SC Karović Vrnjačka Banja"){
                    $match->match_location = "Vrnjačka Banja";
                    $court->name = 'SC Karović';
                }
                else{
                    $court->name = $match->match_location;
                    $match->match_location = 'Beograd';
                }

                $court->link = '';
                $court->save();
                $match->court_id = $court->id;
            }
            $match->save();
        }
    }
}
