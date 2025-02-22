import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Принудительный HTTPS
  if (process.env.NODE_ENV === 'production' && !request.url.includes('localhost')) {
    if (request.headers.get("x-forwarded-proto") !== "https") {
      return NextResponse.redirect(
        `https://${request.headers.get('host')}${request.nextUrl.pathname}`,
        301
      );
    }
  }

  // Добавление security headers
  const response = NextResponse.next();
  
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; font-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com;"
  );

  return response;
}

export const config = {
  matcher: '/:path*',
}; 