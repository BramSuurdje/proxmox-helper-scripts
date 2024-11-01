/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config : any) => {
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

  output: "export",
  // basePath: "/proxmox-helper-scripts",
};

export default nextConfig;
