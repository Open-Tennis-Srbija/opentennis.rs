<!DOCTYPE html>
<html lang="sr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    {{-- Google Search needs a >=48px icon and picks the opaque PNG; browser tabs
         (16/32px) pick the transparent .ico by size. --}}
    <link rel="icon" type="image/png" sizes="48x48" href="{{ asset('/favicon-48x48.png') }}">
    <link rel="icon" type="image/x-icon" sizes="16x16 32x32" href="{{ asset('/favicon.ico') }}">
    
    <title inertia>{{ $page['props']['seo']['title'] ?? config('seo.defaults.title') }}</title>

    <!-- SEO Meta Tags -->
    <meta name="description" content="{{ $page['props']['seo']['description'] ?? config('seo.defaults.description') }}" />
    <meta name="keywords" content="{{ $page['props']['seo']['keywords'] ?? config('seo.defaults.keywords') }}" />
    <meta name="author" content="{{ config('seo.defaults.author') }}" />
    <meta name="robots" content="{{ $page['props']['seo']['robots'] ?? 'index,follow' }}" />
    <meta name="language" content="Serbian" />
    
    <!-- Language Tags -->
    <meta http-equiv="content-language" content="sr">
    <link rel="alternate" hreflang="sr" href="{{ \App\Helpers\SEOHelper::canonicalUrl() }}" />
    <link rel="alternate" hreflang="x-default" href="{{ \App\Helpers\SEOHelper::canonicalUrl() }}" />
    
    <!-- Canonical Tag -->
    <link rel="canonical" href="{{ $page['props']['seo']['canonical'] ?? \App\Helpers\SEOHelper::canonicalUrl() }}" />
    
    
      <!-- Dynamic Twitter Card Meta Tags -->
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:title" content="{{ $page['props']['seo']['title'] ?? config('seo.defaults.title') }}"/>
      <meta name="twitter:description" content="{{ $page['props']['seo']['description'] ?? config('seo.defaults.description') }}"/>
      <!-- Default/dynamic twitter image (ots-social-media-share.png) -->
      <meta name="twitter:image" content="{{ $page['props']['seo']['og_image'] ?? asset('/ots-social-media-share.png') }}"/>
      <meta name="twitter:image:alt" content="open tennis srbija"/>
      <meta name="twitter:site" content="@opentennis"/>
      
      <!-- Dynamic Open Graph data -->
      <meta property="og:type" content="website"/>
      <meta property="og:locale" content="{{ config('seo.defaults.locale') }}"/>
      <meta property="og:url" content="{{ $page['props']['seo']['canonical'] ?? \App\Helpers\SEOHelper::canonicalUrl() }}"/>
      <meta property="og:title" content="{{ $page['props']['seo']['title'] ?? config('seo.defaults.title') }}"/>
      <!-- Default/dynamic og:image (ots-social-media-share.png) -->
      <meta property="og:image" content="{{ $page['props']['seo']['og_image'] ?? asset('/ots-social-media-share.png') }}"/>
      <meta property="og:description" content="{{ $page['props']['seo']['description'] ?? config('seo.defaults.description') }}"/>
      <meta property="og:image:width" content="900"/>
      <meta property="og:image:height" content="450"/>
      <meta property="og:site_name" content="Open Tennis Srbija"/>
    
    <!-- Structured Data JSON-LD -->
    @if(isset($page['props']['seo']['schema']))
      @foreach($page['props']['seo']['schema'] as $schema)
        <script type="application/ld+json">{!! json_encode($schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) !!}</script>
      @endforeach
    @else
      <!-- Default Organization Schema -->
      <script type="application/ld+json">
      {
        "@@context": "https://schema.org",
        "@@type": "SportsOrganization", 
        "name": "Open Tennis Srbija",
        "alternateName": "Srpska Tenis Liga",
        "url": "{{ url('/') }}",
        "logo": "{{ asset('/ots-logo.png') }}",
        "sport": "Tennis",
        "areaServed": {
          "@@type": "Country",
          "name": "Serbia"
        },
        "contactPoint": {
          "@@type": "ContactPoint",
          "contactType": "customer service",
          "areaServed": "RS",
          "availableLanguage": "Serbian"
        }
      }
      </script>
    @endif
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" />
    <!-- Google tag (gtag.js) -->
    @php $gaId = env('GOOGLE_ANALYTICS_ID'); @endphp
    @if($gaId)
    <script async src="https://www.googletagmanager.com/gtag/js?id={{ $gaId }}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', '{{ $gaId }}');
    </script>
    @endif
    {{-- Rendered by Blade, outside the Vue SSR bundle, so it is SSR-safe. --}}
    @php $first1000Key = config('services.first1000.embed_key'); @endphp
    @if($first1000Key)
    <script src="{{ config('services.first1000.embed_src') }}" data-key="{{ $first1000Key }}" 
    data-offset-top="50" 
    data-offset-top-mobile="50" 
    data-mobile-breakpoint="800" 
    data-z-index="10" 
    data-placeholder="Pitaj OTS AI" 
    data-placeholder-mobile="Pitaj OTS AI" 
    data-login-text="prijava"
    data-button-color="#ec008c" 
    data-offset-bottom-mobile="50"
    data-button-style="arrow"
    data-lang="sr"
    async></script>
    @endif
    @inertiaHead
  </head>
  <body>
    @vite('resources/js/app.js')
    @inertia
    @routes
</body>
</html>