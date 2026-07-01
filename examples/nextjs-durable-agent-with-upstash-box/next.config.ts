import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@upstash/box", "@ai-sdk/harness-claude-code"],
};

export default nextConfig;
