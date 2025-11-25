import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "pmqp5qvm-3000.asse.devtunnels.ms"],
    },
  },
};

export default nextConfig;
