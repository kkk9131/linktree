import type { NextConfig } from "next";

// Enable static export so the site can be hosted on GitHub Pages (or any static host).
// Set NEXT_PUBLIC_BASE_PATH=your-repo-name when building for a project page,
// e.g. `NEXT_PUBLIC_BASE_PATH=linktree npm run build`.
const repo = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/^\/+/g, "").replace(/\/+$/g, "") || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: repo ? `/${repo}` : undefined,
  assetPrefix: repo ? `/${repo}` : undefined,
};

export default nextConfig;
