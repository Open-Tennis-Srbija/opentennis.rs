<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
@foreach($matches as $match)
    @php
        $winnerUris = $match->winners->map(fn($p) => preg_replace('/\d+$/', '', $p->uri));
        $loserUris = $match->losers->map(fn($p) => preg_replace('/\d+$/', '', $p->uri));
        $slug = $winnerUris->concat($loserUris)->push($match->number)->implode('-');
    @endphp
    <url>
        <loc>{{ url('/mec/' . $slug) }}</loc>
        <lastmod>{{ $match->updated_at->toISOString() }}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>
@endforeach
</urlset>