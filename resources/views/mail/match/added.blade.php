<h3>Novi meč:</h3>
<p><b>Pobednik:</b> {{ $winner }} </p>
<p><b>Gubitnik:</b> {{$loser}}</p>
<p><b>Rezultat:</b> {{ $set_score }}@if($game_score), {{$game_score}}@endif</p>
<p><b>Opstina:</b> {{ $location }}</p>
<p><b>Teren ili klub:</b>@if(!$court['link']) {{ $court['name'] }}@else <a href="{{$court['link']}}">{{$court['name']}}</a>@endif</p>
<p><b>Liga:</b> {{ $league['name'] }}</p>
<p><b>Datum</b> {{ $date }}</p>
<br>

<a href="https://srpskatenisliga.rs/mec{{$match_uri}}">Pogledaj dodat meč</a>
<br>
<a href="https://srpskatenisliga.rs/{{$winner_uri}}">Pogledaj pobednika</a>
<br>
<a href="https://srpskatenisliga.rs/{{$loser_uri}}">Pogledaj gubitnika</a>
<br>
<a href="https://srpskatenisliga.rs/mecevi">Pogledaj mečeve</a>
