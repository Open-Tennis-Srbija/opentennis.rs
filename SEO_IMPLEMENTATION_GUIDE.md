# SEO Implementation Guide for Controllers

This guide shows how to implement the new SEO functionality in your Laravel controllers.

## Basic Usage

### In Your Controllers

Add SEO data to your Inertia responses:

```php
use App\Helpers\SEOHelper;

class PlayerController extends Controller 
{
    public function show($uri)
    {
        $player = Player::where('uri', $uri)->first();
        
        if (!$player) {
            abort(404);
        }
        
        // Generate SEO data
        $seoData = SEOHelper::generatePlayerSEO($player);
        
        // Add breadcrumb schema
        $breadcrumbs = SEOHelper::generateJsonLD('breadcrumb', [
            ['name' => 'Početna', 'url' => url('/')],
            ['name' => 'Teniseri', 'url' => url('/')],
            ['name' => $player->first_name . ' ' . $player->last_name, 'url' => url('/teniser/' . $player->uri)]
        ]);
        
        // Add person schema
        $personSchema = SEOHelper::generateJsonLD('person', [
            'name' => $player->first_name . ' ' . $player->last_name,
            'url' => url('/teniser/' . $player->uri),
        ]);
        
        return Inertia::render('players/Player', [
            'player' => $player,
            'seo' => [
                'title' => $seoData['title'],
                'description' => $seoData['description'],
                'canonical' => $seoData['canonical'],
                'og_image' => $seoData['og_image'],
                'schema' => [$breadcrumbs, $personSchema]
            ]
        ]);
    }
}
```

### For Match Details

```php
class TenisMatchController extends Controller 
{
    public function show($uri)
    {
        $match = TennisMatch::with(['winner', 'loser'])->where('uri', $uri)->first();
        
        $seoData = SEOHelper::generateMatchSEO($match);
        
        $sportsEventSchema = SEOHelper::generateJsonLD('sports_event', [
            'name' => $seoData['title'],
            'date' => $match->date,
            'player1' => $match->winner->first_name . ' ' . $match->winner->last_name,
            'player2' => $match->loser->first_name . ' ' . $match->loser->last_name,
        ]);
        
        return Inertia::render('matches/Match', [
            'match' => $match,
            'seo' => [
                'title' => $seoData['title'],
                'description' => $seoData['description'],
                'canonical' => $seoData['canonical'],
                'og_image' => $seoData['og_image'],
                'schema' => [$sportsEventSchema]
            ]
        ]);
    }
}
```

### For League Pages

```php
class LeaguesController extends Controller 
{
    public function show($uri)
    {
        $league = League::where('uri', $uri)->first();
        
        $seoData = SEOHelper::generateLeagueSEO($league);
        
        return Inertia::render('leagues/League', [
            'league' => $league,
            'seo' => $seoData
        ]);
    }
}
```

### For Court Pages

```php
class CourtsController extends Controller 
{
    public function show($uri)
    {
        $court = Court::where('uri', $uri)->first();
        
        $seoData = SEOHelper::generateCourtSEO($court);
        
        $placeSchema = SEOHelper::generateJsonLD('place', [
            'name' => $court->name,
            'county' => $court->county,
        ]);
        
        return Inertia::render('courts/Court', [
            'court' => $court,
            'seo' => [
                ...$seoData,
                'schema' => [$placeSchema]
            ]
        ]);
    }
}
```

## Key Points

1. **Always include SEO data** in your Inertia responses
2. **Use schema markup** for rich snippets - especially for players, matches, and organizations
3. **Generate breadcrumbs** for better navigation understanding
4. **Use Serbian language content** in all meta descriptions and titles
5. **Include canonical URLs** to prevent duplicate content issues

## Next Steps

1. Update all existing controllers to include SEO data
2. Test sitemap generation: `/sitemap.xml`
3. Verify meta tags in browser dev tools
4. Monitor Google Search Console for improvements
5. Consider implementing image optimization for better og:image performance

## Performance Notes

- Sitemaps are generated dynamically but should be cached in production
- Consider adding Redis caching for frequently accessed SEO data
- Monitor page load times to ensure SEO additions don't slow down the site