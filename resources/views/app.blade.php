<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <link rel="icon" href="{{ asset('/favicon.png') }}">
    <meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:title" content="SRPSKA TENIS LIGA"/>
    <meta name="twitter:description" content="budi zdraviji, igraj više"/>
    <meta name="twitter:image:src"
          content="{{ asset('/stl-cover.png') }}"/>
    <meta name="twitter:image:alt" content="srpskatenisliga.rs"/>
    <!-- Open Graph data -->
    <meta property="og:url" content="https://srpskatenisliga.rs"/>
    <meta property="og:title" content="SRPSKA TENIS LIGA"/>
    <meta property="og:image"
          content="{{ asset('/stl-cover.png') }}"/>
    <meta property="og:description" content="budi zdraviji, igraj više"/>
    <meta property="og:site_name" content="srpskatenisliga.rs"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" />
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-8TR2L5FC85"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', 'G-8TR2L5FC85');
    </script>
    @inertiaHead
  </head>
  <body>
    @vite('resources/js/app.js')
    @inertia
    @routes
</body>
</html>
