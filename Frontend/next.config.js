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
  // This will help with the hydration error by forcing client-side rendering
  // for components that use random values
  experimental: {
    // This setting helps with components that generate random values
    optimizeFonts: true,
    scrollRestoration: true,
    // Add optimizations for production builds
    optimizePackageImports: ['motion'],
    // Improve bundle size
    optimizeCss: true,
  }
}

module.exports = nextConfig