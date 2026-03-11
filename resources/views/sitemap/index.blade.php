<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- Static Pages Sitemap -->
    <sitemap>
        <loc>{{ url('/sitemap-static.xml') }}</loc>
        <lastmod>{{ now()->toISOString() }}</lastmod>
    </sitemap>
    
    <!-- Players Sitemap -->
    <sitemap>
        <loc>{{ url('/sitemap-players.xml') }}</loc>
        <lastmod>{{ now()->toISOString() }}</lastmod>
    </sitemap>
    
    <!-- Matches Sitemap -->
    <sitemap>
        <loc>{{ url('/sitemap-matches.xml') }}</loc>
        <lastmod>{{ now()->toISOString() }}</lastmod>
    </sitemap>
    
    <!-- Leagues Sitemap -->
    <sitemap>
        <loc>{{ url('/sitemap-leagues.xml') }}</loc>
        <lastmod>{{ now()->toISOString() }}</lastmod>
    </sitemap>
    
    <!-- Courts Sitemap -->
    <sitemap>
        <loc>{{ url('/sitemap-courts.xml') }}</loc>
        <lastmod>{{ now()->toISOString() }}</lastmod>
    </sitemap>
</sitemapindex>