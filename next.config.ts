import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'dgdemy.org', pathname: '/wp-content/uploads/**' },
      { protocol: 'http', hostname: 'dgdemy.org', pathname: '/wp-content/uploads/**' }
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
