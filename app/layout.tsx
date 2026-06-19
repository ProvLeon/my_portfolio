import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollIndicator from "@/components/ScrollIndicator";
import { Analytics } from "@vercel/analytics/react";

import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import PageTransition from "@/components/PageTransition";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";

export const viewport: Viewport = {
  themeColor: "#3B82F6",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://okantah.netlify.app"),
  title: "Emmanuel Okantah Lomotey | Portfolio",
  description: "Full Stack Developer Portfolio",
  openGraph: {
    title: "Emmanuel Okantah Lomotey | Portfolio",
    description: "Full Stack Developer Portfolio",
    url: "https://okantah.netlify.app",
    siteName: "Okantah Portfolio",
    images: [
      {
        url: "/profile-pic2.png",
        width: 800,
        height: 800,
        alt: "Emmanuel Okantah Lomotey profile",
      },
      {
        url: "/images/blumen.png",
        width: 1200,
        height: 630,
        alt: "Featured project preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emmanuel Okantah Lomotey | Portfolio",
    description: "Full Stack Developer Portfolio",
    images: ["/profile-pic2.png"],
  },
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
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body suppressHydrationWarning className="antialiased relative bg-black selection:bg-white selection:text-black text-white">
        
        {/* Global UI Elements */}
        <ScrollIndicator />
        <Cursor />

        {/* Main Content with Transition */}
        <SmoothScroll>
          <PageTransition>
            <div className="relative z-0">{children}</div>
          </PageTransition>
        </SmoothScroll>

        <Footer />
        <ScrollToTop />
        <Analytics />
      </body>
    </html>
  );
}
