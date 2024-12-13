"use client";
// components/Layout/index.tsx

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import GradientCursor from "@/components/GradientCursor";
import FloatingNav from "@/components/FloatingNav";
import PageTransition from "@/components/PageTransition";
import Hero from "@/components/Hero/Hero";
import Projects from "@/components/Projects";
import Technologies from "@/components/Technologies";
import Timeline from "@/components/TimeLine";
import Accomplishments from "@/components/Accomplishments";
import Contact from "@/components/Contact";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time and resources
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.classList.remove("overflow-hidden");
    }, 2000); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading
          ? (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
            >
              <LoadingScreen />
            </motion.div>
          )
          : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <PageTransition>
                <main className="min-h-screen relative">
                  <GradientCursor />
                  <Header />
                  <FloatingNav />

                  {/* Background Pattern */}
                  <div className="fixed inset-0 -z-10 overflow-hidden">
                    <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center opacity-10" />
                    <div className="absolute inset-0 bg-gradient-radial from-transparent via-background to-background" />
                  </div>

                  {/* Main Content */}
                  <div className="container px-4 mx-auto py-8">
                    <section
                      id="hero"
                      className="min-h-screen flex items-center"
                    >
                      <Hero />
                    </section>

                    <section id="projects" className="py-20">
                      <Projects />
                    </section>

                    <section
                      id="technologies"
                      className="py-20 bg-background-light/5"
                    >
                      <Technologies />
                    </section>

                    <section id="timeline" className="py-20">
                      <Timeline />
                    </section>

                    <section
                      id="accomplishments"
                      className="py-20 bg-background-light/5"
                    >
                      <Accomplishments />
                    </section>

                    <section id="contact" className="py-20">
                      <Contact />
                    </section>
                  </div>

                  <Footer />
                  <ScrollToTop />
                </main>
              </PageTransition>
            </motion.div>
          )}
      </AnimatePresence>
    </>
  );
}

function LoadingScreen() {
  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Logo or Name */}
        <motion.h1
          className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          Emmanuel Lomotey
        </motion.h1>

        {/* Loading Spinner */}
        <LoadingSpinner />

        {/* Loading Text */}
        <motion.p
          className="text-gray-400"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          Loading amazing things...
        </motion.p>
      </motion.div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-[100px] animate-pulse-slow delay-500" />
      </div>
    </div>
  );
}
