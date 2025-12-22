
<h3>Novi dubl meč:</h3>
<p><b>Pobednici:</b> {{ $winner1 }} i {{ $winner2 }} </p>
<p><b>Gubitnici:</b> {{$loser1}} i {{$loser2}}</p>
<p><b>Rezultat:</b> {{ $set_score }}@if($game_score), {{$game_score}}@endif</p>
<p><b>Opstina:</b> {{ $location }}</p>
<p><b>Teren ili klub:</b>@if(!$court['link']) {{ $court['name'] }}@else <a href="{{$court['link']}}">{{$court['name']}}</a>@endif</p>
<p><b>Liga:</b> {{ $league['name'] }}</p>
<p><b>Datum</b> {{ $date }}</p>
<br>

<a href="https://opentennis.rs/mec/{{$match_uri}}">Pogledaj dodat meč</a>
<br>
<a href="https://opentennis.rs/{{$winner1_uri}}">Pogledaj {{$winner1}}</a>
<br>
<a href="https://opentennis.rs/{{$winner2_uri}}">Pogledaj {{$winner2}}</a>
<br>
<a href="https://opentennis.rs/{{$loser1_uri}}">Pogledaj {{$loser1}}</a>
<br>
<a href="https://opentennis.rs/{{$loser2_uri}}">Pogledaj {{$loser2}}</a>
<br>
<a href="https://opentennis.rs/mecevi">Pogledaj mečeve</a>
