/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // 👈 increase limit
    },
  },
};

module.exports = nextConfig;
