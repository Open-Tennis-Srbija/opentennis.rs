<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
@foreach($staticPages as $url => $config)
    <url>
        <loc>{{ url($url) }}</loc>
        <lastmod>{{ now()->toISOString() }}</lastmod>
        <changefreq>{{ $config['changefreq'] ?? 'monthly' }}</changefreq>
        <priority>{{ $config['priority'] ?? '0.5' }}</priority>
    </url>
@endforeach
</urlset>