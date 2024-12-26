// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollIndicator from "@/components/ScrollIndicator";
import SeasonalEffects from "@/components/SeasonalEffects";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: "#3B82F6",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Emmanuel Okantah Lomotey | Portfolio",
  description: "Full Stack Developer Portfolio",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/favicon.ico",
    apple: {
      url: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#3B82F6",
      },
      {
        rel: "android-chrome",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "android-chrome",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <body className="font-inter text-white antialiased relative">
        {/* Seasonal effects */}
        <SeasonalEffects />
        {/* Background layers */}
        <div className="fixed inset-0 -z-20">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-background bg-gradient-radial from-background-light via-background to-background-dark" />

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

          {/* Radial gradient accent */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-secondary/5 to-transparent" />
          </div>
        </div>

        {/* Content */}
        <ScrollIndicator />
        <div className="relative z-0">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
