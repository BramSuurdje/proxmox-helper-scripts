module.exports = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },
  images: {
    domains: [
      "cdn.bramsuurd.nl",
      "raw.githubusercontent.com",
      "technitium.com",
      "github.com",
    ],
  },
};
