import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'dgdemy.org', pathname: '/wp-content/uploads/**' },
      { protocol: 'http', hostname: 'dgdemy.org', pathname: '/wp-content/uploads/**' },
      { protocol: 'https', hostname: 'dl.dropbox.com', pathname: '/**' },
      { protocol: 'https', hostname: 'www.dropbox.com', pathname: '/**' },
      { protocol: 'https', hostname: 'dropbox.com', pathname: '/**' },
      { protocol: 'https', hostname: 'dl.dropboxusercontent.com', pathname: '/**' },
      { protocol: 'https', hostname: 'previews.dropbox.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
      { protocol: 'https', hostname: 'via.placeholder.com', pathname: '/**' },
      { protocol: 'https', hostname: 'imgur.com', pathname: '/**' },
      { protocol: 'https', hostname: 'i.imgur.com', pathname: '/**' },
      { protocol: 'https', hostname: 'i.ytimg.com', pathname: '/**' }
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
