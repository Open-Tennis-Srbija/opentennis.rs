<?php

namespace App\Models;

use App\Http\Controllers\PlayerController;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\DB;
use NikolaAlgoV1;

class League extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'link',
    ];


    public function getMatchCount()
    {
        return TennisMatch::where('league_id', $this->id)->count();
    }

    public function getPlayerCount()
    {
        return DB::table('match_players')
            ->join('tennis_matches', 'match_players.tennis_match_id', '=', 'tennis_matches.id')
            ->where('tennis_matches.league_id', $this->id)
            ->distinct()
            ->count('match_players.player_id');
    }

    public function getMatches(){
        $matches = TennisMatch::where('league_id', $this->id)->get();

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
                'court' => Court::find($match->court_id),
                'league'=> $this,
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
            ->where('tennis_matches.league_id', $this->id)
            ->distinct()
            ->pluck('match_players.player_id');
    }


    public function getPoints()
    {
        $points = 0;

        $matches = TennisMatch::where('league_id', $this->id)->get();

        foreach ($matches as $match) {
            $points += $match->winner_point_gain + $match->loser_point_gain;
        }

        return $points;
    }
}
