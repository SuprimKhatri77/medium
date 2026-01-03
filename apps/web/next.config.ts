import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'la27ndcybw.ufs.sh',
        protocol: 'https',
      },
      {
        hostname: 'utfs.io',
        protocol: 'https',
      },
      {
        hostname: 'lh3.googleusercontent.com',
        protocol: 'https',
      },
    ],
  },
  experimental: {
    typedEnv: true,
  },
}

export default nextConfig
