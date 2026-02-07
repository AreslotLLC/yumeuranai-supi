import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  /* リダイレクトが必要な場合はここに追加します */
  async redirects() {
    return [];
  },
};

export default nextConfig;
