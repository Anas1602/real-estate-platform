import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "images.unsplash.com",
      "plus.unsplash.com",
      "cloudinary.com",
      "res.cloudinary.com",
      "localhost",
    ],
  },
};

export default nextConfig;
