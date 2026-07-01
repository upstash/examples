import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tiered Rate Limiting with Upstash Redis",
  description: "Demo: per-tier rate limits using @upstash/ratelimit and Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
