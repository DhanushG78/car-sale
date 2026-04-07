import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
<<<<<<< HEAD
        protocol: "https",
        hostname: "images.unsplash.com",
=======
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
>>>>>>> a1a6ea26ca54eab8c6546f91c2993b340edb4007
      },
    ],
  },
};

export default nextConfig;
