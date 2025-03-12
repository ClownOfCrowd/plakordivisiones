/** @type {import('next').NextConfig} */
const nextConfig = {
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,
  experimental: {
    scrollRestoration: false
  },
  output: 'standalone',
  images: {
    domains: ['plakordivisiones.es'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  reactStrictMode: true,
  swcMinify: true
};

export default nextConfig; 