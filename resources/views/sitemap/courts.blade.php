<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
@foreach($courts as $court)
    <url>
        <loc>{{ url('/teren/' . $court->uri) }}</loc>
        <lastmod>{{ $court->updated_at->toISOString() }}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>
@endforeach
</urlset>