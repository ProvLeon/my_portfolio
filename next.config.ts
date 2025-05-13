// next.config.js
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['your-domain.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizeCss: true,
    serverActions: {},
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
}

export default nextConfig;
