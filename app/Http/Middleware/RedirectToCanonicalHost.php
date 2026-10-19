<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * www.opentennis.rs and opentennis.rs were both serving the same pages,
 * which Google was indexing as duplicates. This forces every request
 * onto the host configured in APP_URL.
 */
class RedirectToCanonicalHost
{
    public function handle(Request $request, Closure $next): Response
    {
        $canonicalHost = parse_url(config('app.url'), PHP_URL_HOST);

        if ($canonicalHost && $request->getHost() !== $canonicalHost) {
            $url = rtrim(config('app.url'), '/') . $request->getRequestUri();

            return redirect()->away($url, 301);
        }

        return $next($request);
    }
}
