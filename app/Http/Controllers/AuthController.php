<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    public function register(Request $request){
        // Validate the request...
        $fields = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed'],
        ]);

        // Create a new user...

        $user = User::create($fields);

        Auth::login($user);

        return redirect()->route('home');
    }

    public function login(Request $request){
        // Validate the request...
        $fields = $request->validate([
            'username' => ['required', 'max:255'],
            'password' => ['required'],
        ], [
            'username.required' => 'Unesite korisničko ime.',
            'password.required' => 'Unesite lozinku.',
        ]);

        // Attempt to log the user in...
        if(Auth::attempt($fields, $request->remember)){
            $request->session()->regenerate();

            return redirect()->route('admin');
        }

        return back()->withErrors([
            'username' => 'Uneseni podaci nisu ispravni.',
            'password' => 'Uneseni podaci nisu ispravni.',
        ]);
    }

    public function logout(){
        Auth::logout();

        return redirect()->route('home');
    }

    public static function getDashboardData(){
        $players_ranked = PlayerController::getPlayers();
        $all_matches = TenisMatchController::getMatches();

        $popular_location = DB::table('tenis_matches')
        ->select('match_location', DB::raw('COUNT(*) as `count`'))
        ->groupBy('match_location')
        ->havingRaw('COUNT(*) > 1')
        ->get();

        $matches = [];
        if(count($all_matches)){
            for($i=0; $i<5; $i++){
                $match = $all_matches[$i];
                $match['number'] = count($all_matches) - $i;
                array_push($matches, $match);
            }
        }
       
        $location = '';
        if(isset($popular_location[0])){
            $location = $popular_location[0]->match_location;
        }
        
        $data = [
            'players' => array_slice($players_ranked, 0, 5),
            'matches' => $matches,
            'stats' => [
                'total_players' => count($players_ranked),
                'total_matches' => count($all_matches),
                'popular_location' => $location,
            ],
        ];

        return $data;
    }
    
}
