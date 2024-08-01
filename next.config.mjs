/** @type {import('next').NextConfig} */
const nextConfig = {
  // allow every domain for images

  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/analytics/:path*",
        destination: `https://${process.env.NEXT_PUBLIC_UMAMI_ANALYTICS_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;

