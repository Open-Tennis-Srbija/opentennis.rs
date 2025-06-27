<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\DB;

class Court extends Model {
    use HasFactory;

    protected $fillable = [
        'name',
        'link',
    ];

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
        $raw_courts = Court::all();

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
    
    public function getMatches(){
        $matches = TennisMatch::where('court_id', $this->id)->get();

        $response = [];

        foreach($matches as $match){

            array_push($response, [
                'winner_point_gain' =>$match->winner_point_gain,
                'loser_point_gain' => $match->loser_point_gain,
                'winner_uri' => $match->winners()->first()->uri,
                'loser_uri' => $match->losers()->first()->uri,
                'winner_name' => $match->winners()->first()->first_name . ' ' . $match->winners()->first()->last_name,
                'loser_name' => $match->losers()->first()->first_name . ' ' . $match->losers()->first()->last_name,
                'set_score' => $match->set_score,
                'number' => $match->number,
                'game_score' => $match->game_score,
                'date' => $match->date,
                'county' => $match->county,
                'league' => League::find($match->league_id),
                'court'=> $this,
            ]);
            usort($response, function($a, $b) {
                return $b['number'] <=> $a['number'];
            });
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
