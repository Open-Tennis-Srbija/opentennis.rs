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
        'uri',
        'county',
        'court_id',
        'date_begin',
        'date_end',
        'type',
        'tournament_series_id'
    ];

    protected $casts = [
        'date_begin' => 'date',
        'date_end' => 'date'
    ];


    public function getRank(){
        $raw_leagues = League::where('type', $this->type)->get();

        $leagues = [];

        foreach($raw_leagues as $league){
            array_push($leagues, [
                'id' => $league->id,
                'points' => $league->getPoints(),
            ]);
        }

        usort($leagues, function($a, $b) {
            return $b['points'] <=> $a['points'];
        });

        if(count($leagues) == 1) $position = 1;
        else
            $position = 0;
        
        foreach($leagues as $league){
            if($league['id'] == $this->id){
                return $position;
            }
            $position++;
        }

    }
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

    /**
     * Get the tournament series this league belongs to
     */
    public function tournamentSeries()
    {
        return $this->belongsTo(TournamentSeries::class);
    }

    /**
     * Get the court this league is played at
     */
    public function court()
    {
        return $this->belongsTo(Court::class);
    }

    /**
     * Scope for tournament type leagues
     */
    public function scopeTournaments($query)
    {
        return $query->where('type', 'tournament');
    }

    /**
     * Scope for league type leagues
     */
    public function scopeLeagues($query)
    {
        return $query->where('type', 'league');
    }
}
