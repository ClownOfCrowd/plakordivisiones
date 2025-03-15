/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'plakordivisiones.es', 'www.plakordivisiones.es'],
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
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    
    if (process.env.NODE_ENV === 'production') {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 244000,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          enforceSizeThreshold: 50000,
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    
    return config;
  },
  // Security headers - только для production, в development используем middleware
  async headers() {
    // В режиме разработки не применяем CSP через next.config.js
    if (process.env.NODE_ENV === 'development') {
      return [];
    }
    
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.google-analytics.com https://*.googletagmanager.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https://*.plakordivisiones.es https://*.google-analytics.com https://*.googletagmanager.com https://*.google.com https://*.googleapis.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "frame-src 'self' https://*.google.com https://www.google.com https://*.googleapis.com",
              "connect-src 'self' https://www.plakordivisiones.es https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com"
            ].join('; ')
          }
        ]
      }
    ];
  },
  async rewrites() {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
    const strapiPaths = [
      'admin',
      'api',
      'uploads',
      'content-manager',
      'content-type-builder',
      'i18n',
      'email',
      'users-permissions',
      'upload',
      'documentation'
    ];

    return strapiPaths.flatMap(path => [
      {
        source: `/${path}`,
        destination: `${strapiUrl}/${path}`,
      },
      {
        source: `/${path}/:slug*`,
        destination: `${strapiUrl}/${path}/:slug*`,
      }
    ]);
  },
};

module.exports = nextConfig; 