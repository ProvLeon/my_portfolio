import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollIndicator from "@/components/ScrollIndicator";
import { Analytics } from "@vercel/analytics/react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import GradientCursor from "@/components/GradientCursor";
import FloatingNav from "@/components/FloatingNav";
import PageTransition from "@/components/PageTransition";

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
    <html lang="en" className={`scroll-smooth ${inter.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning className="font-inter text-white antialiased relative">
        {/* Background layers */}
        <div className="fixed inset-0 -z-20">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-background bg-gradient-radial from-background-light via-background to-background-dark" />

          {/* Grid patterns */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
          <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center opacity-10" />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

          {/* Radial gradient accent */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-secondary/5 to-transparent" />
          </div>
        </div>

        {/* Global UI Elements */}
        <ScrollIndicator />
        <GradientCursor />
        <Header />
        <FloatingNav />

        {/* Main Content with Transition */}
        <PageTransition>
          <div className="relative z-0">{children}</div>
        </PageTransition>

        <Footer />
        <ScrollToTop />
        <Analytics />
      </body>
    </html>
  );
}
