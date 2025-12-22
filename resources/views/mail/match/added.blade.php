<h3>Novi meč:</h3>
<p><b>Pobednik:</b> {{ $winner }} </p>
<p><b>Gubitnik:</b> {{$loser}}</p>
<p><b>Rezultat:</b> {{ $set_score }}@if($game_score), {{$game_score}}@endif</p>
<p><b>Opstina:</b> {{ $location }}</p>
<p><b>Teren ili klub:</b>@if(!$court['link']) {{ $court['name'] }}@else <a href="{{$court['link']}}">{{$court['name']}}</a>@endif</p>
<p><b>Liga:</b> {{ $league['name'] }}</p>
<p><b>Datum</b> {{ $date }}</p>
<br>

<<<<<<< HEAD
<a href="{{ url('/mec/' . $match_uri) }}">Pogledaj dodat meč</a>
<br>
<a href="{{ url('/' . $winner_uri) }}">Pogledaj pobednika</a>
<br>
<a href="{{ url('/' . $loser_uri) }}">Pogledaj gubitnika</a>
<br>
<a href="{{ url('/mecevi') }}">Pogledaj mečeve</a>
=======
<a href="https://opentennis.rs/mec/{{$match_uri}}">Pogledaj dodat meč</a>
<br>
<a href="https://opentennis.rs/{{$winner_uri}}">Pogledaj pobednika</a>
<br>
<a href="https://opentennis.rs/{{$loser_uri}}">Pogledaj gubitnika</a>
<br>
<a href="https://opentennis.rs/mecevi">Pogledaj mečeve</a>
>>>>>>> ade4fe2 (Rebranding)
