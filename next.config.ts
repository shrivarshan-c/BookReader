import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pixabay.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'stock.adobe.com',
      },
      {
        protocol: 'https',
        hostname: 'as2.ftcdn.net',
      },
      {
        protocol: 'https',
        hostname: '4kwallpapers.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
      },
    ],
    
  },
};



export default nextConfig;
