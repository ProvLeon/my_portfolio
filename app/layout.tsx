import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import ScrollIndicator from "@/components/ScrollIndicator";
import { Analytics } from "@vercel/analytics/react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import PageTransition from "@/components/PageTransition";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import { ThemeProvider } from "@/components/ThemeProvider";

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://okantah.netlify.app"),
  title: "Emmanuel Okantah Lomotey | Lead Product Designer & Engineer",
  description: "Senior Product Designer & Engineer specializing in high-end web experiences, system architecture, and production UI/UX.",
  openGraph: {
    title: "Emmanuel Okantah Lomotey | Lead Product Designer & Engineer",
    description: "Specializing in premium editorial design, system architecture, and production UI/UX.",
    url: "https://okantah.netlify.app",
    siteName: "Okantah Portfolio",
    images: [
      {
        url: "/profile-pic2.png",
        width: 800,
        height: 800,
        alt: "Emmanuel Okantah Lomotey profile",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emmanuel Okantah Lomotey | Lead Product Designer",
    description: "Specializing in premium editorial design, system architecture, and production UI/UX.",
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
    <html lang="en" className={`scroll-smooth ${inter.className}`} suppressHydrationWarning>
      <body suppressHydrationWarning className="antialiased relative bg-background text-foreground selection:bg-[#FF4500]/20 selection:text-[#FF4500] transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {/* Global UI Elements */}
          <ScrollIndicator />
          <Cursor />
        <Header />

        {/* Main Content with Transition */}
        <SmoothScroll>
          <PageTransition>
            <div className="relative z-10">{children}</div>
          </PageTransition>
        </SmoothScroll>

        <Footer />
          <ScrollToTop />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}


