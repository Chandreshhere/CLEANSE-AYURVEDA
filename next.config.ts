import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin the workspace root to avoid Next.js picking up higher-level lockfiles.
    root: process.cwd(),
  },
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
