import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.plakordivisiones.es'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', 'lucide-react'],
    browsersListConfig: {
      desktop: [
        'last 2 Chrome versions',
        'last 2 Firefox versions',
        'last 2 Safari versions',
      ],
    },
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    emotion: true,
  },
  // Оптимизация бандла
  webpack: (config, { dev, isServer }) => {
    // Оптимизация только для продакшена
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
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
            name(module) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];
              return `vendor.${packageName.replace('@', '')}`;
            },
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      };

      config.optimization.minimize = true;
      
      config.module.rules.push({
        test: /\.(jpe?g|png|svg|gif|ico|webp|avif)$/,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
      });
    }
    return config;
  },
  // Оптимизация изображений
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Настройки производительности
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  i18n: {
    locales: ['es'],
    defaultLocale: 'es',
  },
  // Улучшенное кэширование
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
          key: 'Accept-CH',
          value: 'DPR, Width, Viewport-Width'
        },
        {
          key: 'Cache-Control',
          value: 'public, max-age=3600, must-revalidate'
        }
      ]
    },
    {
      source: '/:all*(svg|jpg|png|webp|avif)',
      locale: false,
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/fonts/:all*',
      locale: false,
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
};

export default withBundleAnalyzer(nextConfig); 