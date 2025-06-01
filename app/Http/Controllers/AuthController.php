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

            return redirect()->route('home');
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
}
