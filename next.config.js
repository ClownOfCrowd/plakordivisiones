/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
  },
  images: {
    domains: ['www.plakordivisiones.es'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24, // 24 hours
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  optimizeFonts: true,
  swcMinify: true,
  i18n: {
    locales: ['es'],
    defaultLocale: 'es',
  },
  // Enhanced caching and performance headers
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on'
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin'
        },
        {
          key: 'Cache-Control',
          value: 'public, max-age=3600, must-revalidate'
        }
      ]
    },
    {
      source: '/:all*(svg|jpg|jpeg|png|webp|avif)',
      locale: false,
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
        {
          key: 'Accept-CH',
          value: 'DPR, Width, Viewport-Width',
        }
      ],
    },
    {
      source: '/fonts/:all*',
      locale: false,
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        }
      ],
    },
  ],
  // Webpack optimization
  webpack: (config, { dev, isServer }) => {
    // Optimize images
    config.module.rules.push({
      test: /\.(jpe?g|png|svg|webp|avif)$/i,
      use: [
        {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 80,
            },
            optipng: {
              enabled: true,
              optimizationLevel: 3,
            },
            pngquant: {
              quality: [0.65, 0.90],
              speed: 4,
            },
            webp: {
              quality: 80,
            },
            svgo: {
              enabled: true,
            },
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig; 