import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://opsflow-demo.vercel.app"
      : undefined,
};

export default nextConfig;
