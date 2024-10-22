/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },
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
        destination: `https://${process.env.NEXT_PUBLIC_ANALYTICS_URL}/:path*`,
      },
    ];
  },
  experimental: {
    reactCompiler: true,
  }
};

export default nextConfig;
