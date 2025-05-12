import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // ✅ Enable static export
  output: "export",

  // ✅ Disable Next.js image optimization (required for static export)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
