<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <link rel="icon" href="{{ asset('/favicon.png') }}">
    <meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:title" content="SRPSKA TENIS LIGA"/>
    <meta name="twitter:description" content="SRPSKA TENIS LIGA"/>
    <meta name="twitter:image:src"
          href="{{ asset('/social-media-preview.png') }}"/>
    <meta name="twitter:image:alt" content="srpskatenisliga.rs"/>
    <!-- Open Graph data -->
    <meta property="og:url" content="https://srpskatenisliga.rs"/>
    <meta property="og:title" content="SRPSKA TENIS LIGA"/>
    <meta property="og:image"
          href="{{ asset('/social-media-preview.png') }}"/>
    <meta property="og:description" content="SRPSKA TENIS LIGA"/>
    <meta property="og:site_name" content="srpskatenisliga.rs"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" />
    @vite('resources/js/app.js')
    @inertiaHead
    @routes
  </head>
  <body>
    @inertia
  </body>
</html>