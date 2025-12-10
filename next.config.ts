import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // ⬅️ tells Next.js to generate static HTML
  images: {
    unoptimized: true, // ⬅️ required for static export if using <Image>
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
