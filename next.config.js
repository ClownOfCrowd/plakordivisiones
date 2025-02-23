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
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.google.com https://*.googleapis.com https://*.gstatic.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.gstatic.com",
              "img-src 'self' data: https://*.google.com https://*.googleapis.com https://*.gstatic.com",
              "frame-src 'self' https://www.google.com https://*.google.com",
              "connect-src 'self' https://*.google.com https://*.googleapis.com https://www.google-analytics.com",
              "font-src 'self' data: https://fonts.gstatic.com"
            ].join('; ')
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          }
        ]
      }
    ];
  },
  // Webpack optimization
  webpack: (config, { dev, isServer }) => {
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