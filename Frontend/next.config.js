/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
      },
    ],
    // Add image optimization settings
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  reactStrictMode: true,
  // Removed optimizeFonts as it's no longer recognized
  experimental: {
    scrollRestoration: true,
    optimizePackageImports: ['motion'],
    optimizeCss: true,
  },
  // Add tracing configuration
  tracing: {
    ignoreRootSpan: true
  }
}

module.exports = nextConfig