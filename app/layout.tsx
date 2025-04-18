//app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "seo inspector",
  description: "View SEO components including seoData, metaTags, and static assets.",
  authors: [{ name: "Jesse Roper" }],
  openGraph: {
    type: "website",
    url: "https://seo-inspect.vercel.app",
    title: "seo inspector",
    description: "View SEO components including seoData, metaTags, and static assets.",
    images: [
      {
        url: "https://seo-inspect.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "seo inspector preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "seo inspector",
    description: "View SEO components including seoData, metaTags, and static assets.",
    images: ["https://seo-inspect.vercel.app/og.png"],
  },
  metadataBase: new URL("https://seo-inspect.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
