import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Пропускаем запросы к админ-панели Strapi и связанным путям
  const strapiPaths = [
    '/admin',
    '/api',
    '/uploads',
    '/content-manager',
    '/content-type-builder',
    '/i18n',
    '/email',
    '/users-permissions',
    '/upload',
    '/documentation'
  ];
  
  // Проверяем, начинается ли путь с одного из путей Strapi
  const isStrapiPath = strapiPaths.some(path => 
    request.nextUrl.pathname === path || 
    request.nextUrl.pathname.startsWith(`${path}/`)
  );
  
  // Если это путь Strapi, пропускаем middleware
  if (isStrapiPath) {
    return NextResponse.next();
  }

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

  // Настраиваем CSP
  const cspHeader = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.google-analytics.com https://*.googletagmanager.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https://*.plakordivisiones.es https://*.google-analytics.com https://*.googletagmanager.com https://*.google.com https://*.googleapis.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "frame-src 'self' https://*.google.com https://www.google.com https://*.googleapis.com",
    "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com"
  ].join('; ');

  // Устанавливаем заголовок CSP
  response.headers.set('Content-Security-Policy', cspHeader);

  return response;
}

// Указываем, для каких путей применять middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 