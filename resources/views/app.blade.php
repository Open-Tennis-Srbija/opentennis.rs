<!DOCTYPE html>
<html lang="sr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <link rel="icon" href="{{ asset('/favicon.ico') }}">
    
    <!-- SEO Meta Tags -->
    <meta name="description" content="{{ $page['props']['seo']['description'] ?? config('seo.defaults.description') }}" />
    <meta name="keywords" content="{{ $page['props']['seo']['keywords'] ?? config('seo.defaults.keywords') }}" />
    <meta name="author" content="{{ config('seo.defaults.author') }}" />
    <meta name="robots" content="{{ $page['props']['seo']['robots'] ?? 'index,follow' }}" />
    <meta name="language" content="Serbian" />
    
    <!-- Language Tags -->
    <meta http-equiv="content-language" content="sr">
    <link rel="alternate" hreflang="sr" href="{{ url()->current() }}" />
    <link rel="alternate" hreflang="x-default" href="{{ url()->current() }}" />
    
    <!-- Canonical Tag -->
    <link rel="canonical" href="{{ $page['props']['seo']['canonical'] ?? url()->current() }}" />
    
    
      <!-- Dynamic Twitter Card Meta Tags -->
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:title" content="{{ $page['props']['seo']['title'] ?? config('seo.defaults.title') }}"/>
      <meta name="twitter:description" content="{{ $page['props']['seo']['description'] ?? config('seo.defaults.description') }}"/>
      <!-- Default/dynamic twitter image (ots-social-media-share.png) -->
      <meta name="twitter:image:src" content="{{ $page['props']['seo']['og_image'] ?? asset('/ots-social-media-share.png') }}"/>
      <meta name="twitter:image:alt" content="open tennis srbija"/>
      <meta name="twitter:site" content="@opentennis"/>
      
      <!-- Dynamic Open Graph data -->
      <meta property="og:type" content="website"/>
      <meta property="og:locale" content="{{ config('seo.defaults.locale') }}"/>
      <meta property="og:url" content="{{ $page['props']['seo']['canonical'] ?? url()->current() }}"/>
      <meta property="og:title" content="{{ $page['props']['seo']['title'] ?? config('seo.defaults.title') }}"/>
      <!-- Default/dynamic og:image (ots-social-media-share.png) -->
      <meta property="og:image" content="{{ $page['props']['seo']['og_image'] ?? asset('/ots-social-media-share.png') }}"/>
      <meta property="og:description" content="{{ $page['props']['seo']['description'] ?? config('seo.defaults.description') }}"/>
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
        "logo": "{{ asset('/images/logo.png') }}",
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
    @inertiaHead
  </head>
  <body>
    @vite('resources/js/app.js')
    @inertia
    @routes
</body>
</html>
