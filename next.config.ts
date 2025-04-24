import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['*'],
    unoptimized: true,
  },
  /* config options here */
}

export default nextConfig
