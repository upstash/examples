import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shorty",
  description: "URL shortener built with Stripe Projects, Supabase, and Upstash Redis.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <main className="mx-auto max-w-2xl px-6 py-12">{children}</main>
      </body>
    </html>
  );
}
