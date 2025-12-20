import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { routing } from './core/i18n/routing';

// IMPORTANT: Middleware MUST always run, even in dev mode
// With localePrefix: 'never', it performs internal URL rewriting:
//   User sees: /
//   Internally rewrites to: /en (default locale)
//   Matches route: app/[locale]/page.tsx
// Without this rewriting, all routes result in 404 errors
const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  // More restrictive matcher - only match actual page routes
  // Excludes: api, _next, _vercel, static files, and common bot endpoints
  matcher: ['/((?!api|_next|_vercel|monitoring|healthcheck|.*\\..*).*)']
};
