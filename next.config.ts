import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // Add more hostname patterns as needed
    ],
    /* config options here */
  },
  
};


export default nextConfig;
