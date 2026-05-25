import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  /** /path/ → path/index.html — works better on Apache (cPanel) */
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
