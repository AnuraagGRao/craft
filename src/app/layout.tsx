import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Craft Studio · Anuraag G. Rao | Systems Architect & Creative Technologist",
  description: "Systems Architect & Creative Technologist in Bangalore. High-throughput edge infrastructure, zero-server privacy utilities, and tactile 60 FPS interfaces.",
  keywords: ["Anuraag G Rao", "Craft Studio", "Systems Architect", "Edge Computing", "Cloudflare Workers", "Web Crypto", "Creative Technologist", "Bangalore"],
  authors: [{ name: "Anuraag G. Rao", url: "https://anuraaggrao.com" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
