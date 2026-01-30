import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.29.105',
        port: '3000',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
