import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
      remotePatterns: [{
        protocol: 'http',
        hostname: 'localhost'
      },
    {
      protocol: 'http',
      hostname: 'localhost:4000'
    }]
    },
    eslint: {
      ignoreDuringBuilds: true
    }
};

export default nextConfig;
