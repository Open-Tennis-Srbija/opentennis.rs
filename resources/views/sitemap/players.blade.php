<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
@foreach($players as $player)
    <url>
        <loc>{{ url('/teniser/' . $player->uri) }}</loc>
        <lastmod>{{ $player->updated_at->toISOString() }}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
    </url>
@endforeach
</urlset>