<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
@foreach($leagues as $league)
    <url>
        <loc>{{ url('/liga/' . $league->uri) }}</loc>
        <lastmod>{{ $league->updated_at->toISOString() }}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
@endforeach
</urlset>