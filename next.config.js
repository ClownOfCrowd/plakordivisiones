/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'plakordivisiones.es'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24, // 24 hours
    dangerouslyAllowSVG: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  i18n: {
    locales: ['es'],
    defaultLocale: 'es',
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react']
  },
  // Настройка перенаправлений для админ-панели Strapi
  async rewrites() {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
    return [
      {
        source: '/admin',
        destination: `${strapiUrl}/admin`,
      },
      {
        source: '/admin/:path*',
        destination: `${strapiUrl}/admin/:path*`,
      },
      {
        source: '/api/:path*',
        destination: `${strapiUrl}/api/:path*`,
      },
      {
        source: '/uploads/:path*',
        destination: `${strapiUrl}/uploads/:path*`,
      },
      {
        source: '/content-manager/:path*',
        destination: `${strapiUrl}/content-manager/:path*`,
      },
      {
        source: '/content-type-builder/:path*',
        destination: `${strapiUrl}/content-type-builder/:path*`,
      },
      {
        source: '/i18n/:path*',
        destination: `${strapiUrl}/i18n/:path*`,
      },
      {
        source: '/email/:path*',
        destination: `${strapiUrl}/email/:path*`,
      },
      {
        source: '/users-permissions/:path*',
        destination: `${strapiUrl}/users-permissions/:path*`,
      },
      {
        source: '/upload/:path*',
        destination: `${strapiUrl}/upload/:path*`,
      },
      {
        source: '/documentation/:path*',
        destination: `${strapiUrl}/documentation/:path*`,
      },
    ];
  },
  // Security headers
  async headers() {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self' https://www.google.com https://www.youtube.com",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https://www.plakordivisiones.es https://*.google-analytics.com https://*.googletagmanager.com",
              "frame-src 'self' https://www.google.com https://www.youtube.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' " + strapiUrl + " https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com"
            ].join('; ')
          }
        ]
      }
    ];
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false }
    return config
  },
};

module.exports = nextConfig; 