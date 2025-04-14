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
  },
  reactStrictMode: true,
  // This will help with the hydration error by forcing client-side rendering
  // for components that use random values
  experimental: {
    // This setting helps with components that generate random values
    optimizeFonts: true,
    scrollRestoration: true,
  }
}

module.exports = nextConfig