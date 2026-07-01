import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tiered Rate Limiting with Upstash Redis",
  description: "Demonstrate free, pro, and enterprise rate limits using @upstash/ratelimit.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", maxWidth: 640, margin: "48px auto", padding: "0 16px" }}>
        {children}
      </body>
    </html>
  );
}
