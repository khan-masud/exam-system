import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: true,
    serverActions: true,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
