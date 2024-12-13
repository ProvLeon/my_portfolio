// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollIndicator from "@/components/ScrollIndicator";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Emmanuel Okantah Lomotey | Portfolio",
  description: "Full Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <body className="font-inter text-white antialiased relative">
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
