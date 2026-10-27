<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\DB;

class Court extends Model {
    use HasFactory;

    const SEASONS = ['summer', 'winter'];
    // Courts are open in summer and covered in winter
    const COURT_TYPES = [
        'summer' => ['hard', 'gravel'],
        'winter' => ['hard_indoor', 'gravel_indoor'],
    ];
    const PRICE_TYPES = ['morning', 'afternoon', 'weekend'];

    protected $fillable = [
        'name',
        'link',
    ];

    protected $casts = [
        'court_types' => 'array',
        'prices' => 'array',
    ];

    /**
     * The season currently set for all courts.
     */
    public static function currentSeason()
    {
        return Setting::get('season', 'summer');
    }

    /**
     * Number of courts of each type in a season, only the types that belong to it.
     */
    public function seasonCourtTypes($season)
    {
        if (!isset($this->court_types[$season])) return null;

        return array_intersect_key($this->court_types[$season], array_flip(self::COURT_TYPES[$season]));
    }

    /**
     * Courts of each type across all clubs in the current season.
     */
    public static function totalCourtTypes()
    {
        $season = self::currentSeason();
        $totals = array_fill_keys(self::COURT_TYPES[$season], 0);

        foreach (self::where('id', '>', 1)->whereNotNull('court_types')->get(['id', 'court_types']) as $court) {
            foreach ($court->seasonCourtTypes($season) ?? [] as $type => $count) {
                $totals[$type] += (int) $count;
            }
        }

        return $totals;
    }

    public function priceChanges()
    {
        return $this->hasMany(CourtPriceChange::class);
    }

    public function matches()
    {
        return $this->hasMany(TennisMatch::class, 'court_id');
    }


    public function getLeagues(){
        $matches = $this->matches;

        $leagues = [];
        foreach($matches as $match){
            $league = League::find($match->league_id);
            if(!in_array($league, $leagues) && $league->id > 1){
                array_push($leagues, $league);
            }
        }

        return $leagues;
    }

    public function getPosition(){
        $raw_courts = Court::where('id', '>', 1)->get();

        $courts = [];

        foreach($raw_courts as $court){
            array_push($courts, [
                'id' => $court->id,
                'points' => $court->get_points(),
            ]);
        }

        usort($courts, function($a, $b) {
            return $b['points'] <=> $a['points'];
        });

        $position = 1;
        foreach($courts as $court){
            if($court['id'] == $this->id){
                return $position;
            }
            $position++;
        }

    }

    public function get_points()
    {
        $points = 0;
        foreach ($this->matches as $match) {
            $points += $match->winner_point_gain;
            $points += $match->loser_point_gain;
        }
        return $points;
    }
    public function getMatchCount()
    {
        return TennisMatch::where('court_id', $this->id)->count();
    }

    public function getPlayerCount()
    {
        return DB::table('match_players')
            ->join('tennis_matches', 'match_players.tennis_match_id', '=', 'tennis_matches.id')
            ->where('tennis_matches.court_id', $this->id)
            ->distinct()
            ->count('match_players.player_id');
    }
    
    public function getMatches($offset = 0 , $limit = 100, $sortBy = 'number', $sortDir = 'desc'){
        $matches = TennisMatch::where('court_id', $this->id)->select('tennis_matches.*')->applySort($sortBy, $sortDir)->skip($offset)->take($limit)->get();

        $response = [];

        foreach($matches as $match){

            array_push($response, [
                'winner_point_gain' =>$match->winner_point_gain,
                'loser_point_gain' => $match->loser_point_gain,
                'winner1_name' => $match->winners()->first()->first_name . ' ' . $match->winners()->first()->last_name,
                'winner1_uri' => $match->winners()->first()->uri,
                'winner1_category' => $match->winners()->first()->category,
                'winner2_name' => $match->winners()->skip(1)->first() ? $match->winners()->skip(1)->first()->first_name . ' ' . $match->winners()->skip(1)->first()->last_name : null,
                'winner2_uri' => $match->winners()->skip(1)->first() ? $match->winners()->skip(1)->first()->uri : null,
                'winner2_category' => $match->winners()->skip(1)->first() ? $match->winners()->skip(1)->first()->category : null,
                'loser1_name' => $match->losers()->first()->first_name . ' ' . $match->losers()->first()->last_name,
                'loser1_uri' => $match->losers()->first()->uri,
                'loser1_category' => $match->losers()->first()->category,
                'loser2_name' => $match->losers()->skip(1)->first() ? $match->losers()->skip(1)->first()->first_name . ' ' . $match->losers()->skip(1)->first()->last_name : null,
                'loser2_uri' => $match->losers()->skip(1)->first() ? $match->losers()->skip(1)->first()->uri : null,
                'loser2_category' => $match->losers()->skip(1)->first() ? $match->losers()->skip(1)->first()->category : null,
                'set_score' => $match->set_score,
                'number' => $match->number,
                'game_score' => $match->game_score,
                'date' => $match->date,
                'county' => $match->county,
                'league' => League::find($match->league_id),
                'court'=> $this,
            ]);
        }
        return $response;
    }

    public function getPlayers(){
        $ids = $this->playerIds()->all();

        $raw_players = Player::whereIn('id', $ids)->get();

        $players = [];
        foreach($raw_players as $player){
            array_push($players, [
                'uri' => $player->uri,
                'name' => $player->first_name . ' ' . $player->last_name
            ]);
        }


        usort($players, function($a, $b) {
            return strcmp($a['name'], $b['name']);
        });

        return $players;
    }

    private function playerIds()
    {
        return DB::table('match_players')
            ->join('tennis_matches', 'match_players.tennis_match_id', '=', 'tennis_matches.id')
            ->where('tennis_matches.court_id', $this->id)
            ->distinct()
            ->pluck('match_players.player_id');
    }}
