<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
@foreach($matches as $match)
    <url>
        <loc>{{ url('/mec/' . $match->id) }}</loc>
        <lastmod>{{ $match->updated_at->toISOString() }}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>
@endforeach
</urlset>