import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Rate Limiting with Upstash Redis",
  description:
    "Demo: protect AI API endpoints from runaway costs using Upstash Redis rate limiting in Next.js.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
