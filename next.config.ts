import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin the workspace root to avoid Next.js picking up higher-level lockfiles.
    root: process.cwd(),
  },
};

export default nextConfig;
