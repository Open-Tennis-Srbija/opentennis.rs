<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Config;

class SEOHelper
{
    public static function generateTitle($pageTitle = null, $useSuffix = true)
    {
        if (!$pageTitle) {
            return Config::get('seo.defaults.title', '');
        }

        $brand = Config::get('seo.defaults.title');

        if (!$useSuffix || str_contains($pageTitle, $brand)) {
            return $pageTitle;
        }

        return $pageTitle . Config::get('seo.defaults.title_suffix', '');
    }
    
    public static function generateDescription($template, $data = [])
    {
        $description = Config::get("seo.templates.{$template}.description", Config::get('seo.defaults.description'));
        
        foreach ($data as $key => $value) {
            $description = str_replace(":{$key}", $value, $description);
        }
        
        return $description;
    }
    
    public static function defaultImage()
    {
        return asset('ots-social-media-share.png');
    }

    public static function generatePlayerSEO($player)
    {
        $title = self::generateTitle(str_replace(':name', $player->first_name . ' ' . $player->last_name,
                           Config::get('seo.templates.player.title')));
        
        $description = self::generateDescription('player', [
            'name' => $player->first_name . ' ' . $player->last_name,
            'matches' => $player->matches()->count(),
            'wins' => $player->wins()->count(),
            'losses' => $player->losses()->count(),
        ]);
        
        return [
            'title' => $title,
            'description' => $description,
            'canonical' => url('/' . $player->uri),
            'og_image' => $player->photo ? asset('storage/' . $player->photo) : self::defaultImage(),
        ];
    }
    
    public static function generateMatchSEO($match)
    {
        $names = fn($players) => $players->map(fn($p) => trim($p->first_name . ' ' . $p->last_name))->implode(' / ');
        $winners = $names($match->winners) ?: 'Nepoznat';
        $losers = $names($match->losers) ?: 'Nepoznat';
        $score = $match->set_score ?: 'Rezultat nije unesen';

        $title = self::generateTitle(str_replace([':player1', ':player2', ':score'],
                           [$winners, $losers, $score],
                           Config::get('seo.templates.match.title')));

        $description = self::generateDescription('match', [
            'player1' => $winners,
            'player2' => $losers,
            'score' => $score,
        ]);

        return [
            'title' => $title,
            'description' => $description,
            'canonical' => request()->url(),
            'og_image' => self::defaultImage(),
        ];
    }
    
    public static function generateLeagueSEO($league)
    {
        $title = self::generateTitle(str_replace(':name', $league->name, Config::get('seo.templates.league.title')));
        
        $description = self::generateDescription('league', [
            'name' => $league->name,
        ]);
        
        return [
            'title' => $title,
            'description' => $description,
            'canonical' => url('/' . $league->uri),
            'og_image' => self::defaultImage(),
        ];
    }
    
    public static function generateCourtSEO($court)
    {
        $title = self::generateTitle(str_replace(':name', $court->name, Config::get('seo.templates.court.title')));
        
        $description = self::generateDescription('court', [
            'name' => $court->name,
            'location' => $court->county ?? 'Srbija',
        ]);
        
        return [
            'title' => $title,
            'description' => $description,
            'canonical' => url('/tereni/' . $court->uri),
            'og_image' => self::defaultImage(),
        ];
    }
    
    public static function generateStaticPageSEO($pageType, $customData = [])
    {
        $template = Config::get("seo.templates.{$pageType}");
        
        if (!$template) {
            return self::getDefaultSEO();
        }
        
        $title = $template['title'];
        $description = $template['description'] ?? Config::get('seo.defaults.description');
        $keywords = $template['keywords'] ?? Config::get('seo.defaults.keywords');
        $robots = $template['robots'] ?? 'index, follow';
        
        // Replace placeholders with custom data
        foreach ($customData as $key => $value) {
            $title = str_replace(":{$key}", $value, $title);
            $description = str_replace(":{$key}", $value, $description);
        }
        
        return [
            'title' => self::generateTitle($title),
            'description' => $description,
            'keywords' => $keywords,
            'robots' => $robots,
            'canonical' => request()->url(),
            'og_image' => self::defaultImage(),
        ];
    }
    
    public static function getDefaultSEO()
    {
        return [
            'title' => Config::get('seo.defaults.title'),
            'description' => Config::get('seo.defaults.description'),
            'keywords' => Config::get('seo.defaults.keywords'),
            'robots' => 'index, follow',
            'canonical' => request()->url(),
            'og_image' => self::defaultImage(),
        ];
    }
    
    public static function isNoindexPage($pageType)
    {
        return in_array($pageType, Config::get('seo.noindex_pages', []));
    }
    
    public static function generateJsonLD($type, $data = [])
    {
        switch ($type) {
            case 'organization':
                return self::getOrganizationSchema();
            case 'person':
                return self::getPersonSchema($data);
            case 'sports_event':
                return self::getSportsEventSchema($data);
            case 'place':
                return self::getPlaceSchema($data);
            case 'breadcrumb':
                return self::getBreadcrumbSchema($data);
            default:
                return null;
        }
    }
    
    private static function getOrganizationSchema()
    {
        $org = Config::get('seo.schema.organization');
        
        return [
            '@context' => 'https://schema.org',
            '@type' => 'SportsOrganization',
            'name' => $org['name'],
            'url' => $org['url'],
            'logo' => $org['logo'],
            'sameAs' => $org['sameAs'],
            'sport' => 'Tennis',
            'contactPoint' => [
                '@type' => 'ContactPoint',
                'contactType' => $org['contactPoint']['contactType'],
                'areaServed' => $org['contactPoint']['areaServed'],
                'availableLanguage' => $org['contactPoint']['availableLanguage'],
            ],
        ];
    }
    
    private static function getPersonSchema($player)
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'Person',
            'name' => $player['name'] ?? '',
            'sport' => 'Tennis',
            'url' => $player['url'] ?? '',
            'nationality' => [
                '@type' => 'Country',
                'name' => 'Serbia'
            ],
            'memberOf' => [
                '@type' => 'SportsOrganization',
                'name' => 'Open Tennis Srbija'
            ],
        ];
    }
    
    private static function getSportsEventSchema($match)
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'SportsEvent',
            'name' => $match['name'] ?? '',
            'sport' => 'Tennis',
            'startDate' => $match['date'] ?? '',
            'competitor' => [
                [
                    '@type' => 'Person',
                    'name' => $match['player1'] ?? ''
                ],
                [
                    '@type' => 'Person', 
                    'name' => $match['player2'] ?? ''
                ]
            ],
            'organizer' => [
                '@type' => 'SportsOrganization',
                'name' => 'Open Tennis Srbija'
            ],
        ];
    }
    
    private static function getPlaceSchema($court)
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'SportsActivityLocation',
            'name' => $court['name'] ?? '',
            'address' => [
                '@type' => 'PostalAddress',
                'addressCountry' => 'RS',
                'addressRegion' => $court['county'] ?? '',
            ],
            'sport' => 'Tennis',
        ];
    }
    
    private static function getBreadcrumbSchema($items)
    {
        $breadcrumbs = [
            '@context' => 'https://schema.org',
            '@type' => 'BreadcrumbList',
            'itemListElement' => []
        ];
        
        foreach ($items as $index => $item) {
            $breadcrumbs['itemListElement'][] = [
                '@type' => 'ListItem',
                'position' => $index + 1,
                'name' => $item['name'],
                'item' => $item['url']
            ];
        }
        
        return $breadcrumbs;
    }
}