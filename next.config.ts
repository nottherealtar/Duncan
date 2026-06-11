import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api-assets.clashroyale.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
