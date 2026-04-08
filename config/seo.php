<?php

return [
    
    /*
    |--------------------------------------------------------------------------
    | Default SEO Settings
    |--------------------------------------------------------------------------
    |
    | These values are used as defaults for meta tags across the site.
    | They can be overridden on individual pages.
    |
    */
    
    'defaults' => [
        'title' => 'Open Tennis Srbija',
        'title_suffix' => ' - Open Tennis Srbija',
        'description' => 'Oficijalni sajt Open Tennis Srbija. Rangiranje tenisera rezultati mečeva lige & turniri. Pratite najbolje tenisere Srbije i njihove rezultate.',
        'keywords' => 'open tennis srbija, tenis srbija, rangiranje tenisera, tenis mečevi, tenis turniri, tenis lige srbija, srpska tenis liga',
        'author' => 'Open Tennis Srbija',
        'image' => '/images/og-default.jpg',
        'locale' => 'sr_RS',
    ],

    /*
    |--------------------------------------------------------------------------
    | Pages that should not be indexed
    |--------------------------------------------------------------------------
    |
    | These pages will have noindex, nofollow meta tags
    |
    */
    
    'noindex_pages' => [
        'mission',
        'find_player', // If implemented
    ],

    /*
    |--------------------------------------------------------------------------
    | SEO Templates
    |--------------------------------------------------------------------------
    |
    | Templates for generating dynamic SEO content based on page type
    |
    */
    
    'templates' => [
        'home' => [
            'title' => 'Open Tennis Srbija - Dokumentacija srpskog tenisa',
            'description' => 'Open Tennis Srbija je nezavisni volonterski projekat koji skuplja i organizuje podatke srpskog elitnog i rekreativnog tenisa. Dodaj tenisera, teren i meč - registracija nije potrebna.',
            'keywords' => 'open tennis srbija, tenis srbija, srpski tenis, rekreativni tenis, rangiranje tenisera, tenis mečevi, tenis turniri, tenis lige srbija',
        ],
        'player' => [
            'title' => ':name - Teniser',
            'description' => ':name je rangiran kao :rank. teniser Open Tennis Srbija sa :points poena. Pogledajte rezultate mečeva statistike i napredak kroz kategorije.',
            'keywords' => 'teniser srbija, poeni, rang, kategorija, statistike',
        ],
        'match' => [
            'title' => ':player1 vs :player2 :score',
            'description' => 'Rezultat meča između :player1 i :player2 je :score. Detalji meča set po set rezultat i statistike igrača u Open Tennis Srbija.',
            'keywords' => 'tenis meč, rezultat, skorovi, igrači, srbija',
        ],
        'league' => [
            'title' => ':name',
            'description' => ':name - Open Tennis Srbija. Rangiranje igrača rezultati mečeva i kompletne statistike lige.',
            'keywords' => 'tenis liga srbija, turnir, rangiranje, rezultati',
        ],
        'court' => [
            'title' => 'Teren :name',
            'description' => 'teren :name u :location. Informacije o terenu kontakt mečevi i igrači koji igraju na ovom terenu.',
            'keywords' => 'tenis tereni srbija, klubovi, kontakt, lokacija',
        ],
        'matches_list' => [
            'title' => 'Mečevi',
            'description' => 'Svi tenis mečevi Open Tennis Srbija. Rezultati skorovi datumi mečeva i statistike najboljih tenisera Srbije.',
            'keywords' => 'tenis mečevi srbija, rezultati, skorovi, najbolji teniseri',
        ],
        'players_list' => [
            'title' => 'Teniseri',
            'description' => 'Dokumentacija i kategorisanje svih tenisera u Srbiji. Lista svih teniskih meceva, terena, turnira i liga u Srbiji',
            'keywords' => 'rangiranje tenisera srbija, najbolji igrači, tenis, poeni, kategorije',
        ],
        'leagues_list' => [
            'title' => 'Lige',
            'description' => ':name - Open Tennis Srbija. Rangiranje igrača rezultati mečeva i kompletne statistike lige.',
            'keywords' => 'tenis liga srbija, turnir, rangiranje, rezultati',
        ],
        'courts_list' => [
            'title' => 'Tereni',
            'description' => 'teren :name u :location. Informacije o terenu kontakt mečevi i igrači koji igraju na ovom terenu.',
            'keywords' => 'tenis tereni srbija, klubovi, kontakt, lokacija',
        ],
        'tournaments_list' => [
            'title' => 'Turniri',
            'description' => 'Turniri u okviru Open Tennis Srbija.',
            'keywords' => 'tenis turniri srbija',
        ],
        'add_match' => [
            'title' => 'Dodaj meč',
            'description' => 'Dodajte novi tenis meč u Open Tennis Srbija.',
            'keywords' => 'dodaj meč, tenis',
        ],
        'rules' => [
            'title' => 'O nama',
            'description' => 'Open Tennis Srbija. Transparentan i dugoročan razvoj srpskog tenisa kroz skupljanje analizu i publikovanje svih podataka srpskog tenisa. Svi teniseri lige turniri tereni i mečevi na jednom mestu.',
            'keywords' => 'o nama, open tennis srbija, rekreativni tenis, kategorije tenisera, dodavanje mečeva, pravila, tenis srbija',
        ],
        'rewards' => [
            'title' => 'Nagrade partnera 2025',
            'description' => 'Nagrade partnera za 2025. godinu u Open Tennis Srbija.',
            'keywords' => 'nagrade, partneri, tenis',
        ],
        'mission' => [
            'title' => 'Misija',
            'description' => 'Misija Open Tennis Srbija.',
            'keywords' => 'misija, tenis',
            'robots' => 'noindex, nofollow',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Schema.org Markup
    |--------------------------------------------------------------------------
    |
    | Configuration for structured data markup
    |
    */
    
    'schema' => [
        'organization' => [
            'name' => 'Open Tennis Srbija',
            'url' => env('APP_URL', 'https://opentennis.rs'),
            'logo' => env('APP_URL', 'https://opentennis.rs') . '/images/logo.png',
            'sameAs' => [
                'https://www.facebook.com/srpskatenisliga',
                'https://www.instagram.com/srpskatenisliga',
            ],
            'contactPoint' => [
                'contactType' => 'customer service',
                'areaServed' => 'RS',
                'availableLanguage' => 'Serbian',
            ],
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Sitemap Configuration
    |--------------------------------------------------------------------------
    |
    | Settings for XML sitemap generation
    |
    */
    
    'sitemap' => [
        'enabled' => true,
        'cache_duration' => 3600, // 1 hour
        'static_pages' => [
            '/' => ['priority' => '1.0', 'changefreq' => 'daily'],
            '/mecevi' => ['priority' => '0.9', 'changefreq' => 'daily'],
            '/lige' => ['priority' => '0.8', 'changefreq' => 'weekly'],
            '/tereni' => ['priority' => '0.7', 'changefreq' => 'monthly'],
            '/turniri' => ['priority' => '0.8', 'changefreq' => 'weekly'],
            '/statistika' => ['priority' => '0.6', 'changefreq' => 'weekly'],
            '/misija' => ['priority' => '0.5', 'changefreq' => 'monthly'],
            '/o-nama' => ['priority' => '0.5', 'changefreq' => 'monthly'],
        ],
    ],

];