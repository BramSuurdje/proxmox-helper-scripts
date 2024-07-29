/** @type {import('next').NextConfig} */
const nextConfig = {
  // allow every domain for images

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
