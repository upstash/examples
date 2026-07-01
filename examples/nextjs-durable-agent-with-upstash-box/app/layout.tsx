import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stateful Agent with Upstash Box",
  description:
    "AI coding agent with a durable workspace that persists across sessions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "monospace", background: "#0f0f0f", color: "#e5e5e5" }}>
        {children}
      </body>
    </html>
  );
}
