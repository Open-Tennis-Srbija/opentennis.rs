<h3>Novi meč:</h3>
<p><b>Pobednik:</b> {{ $winner }} </p>
<p><b>Gubitnik:</b> {{$loser}}</p>
<p><b>Rezultat:</b> {{ $set_score }}, {{$game_score}}</p>
<p><b>Lokacija:</b> {{ $location }}</p>
<p><b>Datum</b> {{ $date }}</p>
<br>

<a href="https://srpskatenisliga.rs/teniser/{{$winner_id}}">Pogledaj pobednika</a>
<br>
<a href="https://srpskatenisliga.rs/teniser/{{$loser_id}}">Pogledaj gubitnika</a>
<br>
<a href="https://srpskatenisliga.rs/mecevi">Pogledaj mečeve</a>