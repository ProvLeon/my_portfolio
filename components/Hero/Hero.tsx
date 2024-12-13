"use client";
// components/Hero/Hero.tsx

import { useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { heading } from "@/constants";
import { HiArrowDown, HiDownload } from "react-icons/hi";
import { FloatingElements } from "./FloatingElements";
import { HeroButton } from "./HeroButton";

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadCV = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch("/CV.pdf");
      if (!response.ok) throw new Error("Failed to download CV");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Emmanuel_Lomotey_CV.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading CV:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden cursor-default">
      {/* Background Gradient Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />
        <div className="absolute top-20 left-0 w-72 h-72 bg-primary/20 rounded-full blur-[120px] opacity-50 animate-pulse-slow" />
        <div className="absolute bottom-20 right-0 w-72 h-72 bg-secondary/20 rounded-full blur-[120px] opacity-50 animate-pulse-slow delay-500" />
      </div>

      {/* Main Content */}
      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-4 py-20 lg:py-32 z-10 relative"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1">
            {/* Name Section */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold my-6"
            >
              <span className="text-white">Hi, I'm</span>
              <motion.span
                className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent relative inline-block"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              >
                Okantah
                <motion.span
                  className="absolute left-0 -bottom-2 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                />
              </motion.span>
            </motion.h1>

            {/* Animated Role */}
            <TypeAnimation
              sequence={[
                "Full Stack Developer",
                1000,
                "UI/UX Designer",
                1000,
                "Problem Solver",
                1000,
              ]}
              wrapper="h2"
              speed={50}
              repeat={Infinity}
              className="text-2xl md:text-4xl bg-gradient-to-r from-primary/80 via-secondary/80 to-accent/80 bg-clip-text text-transparent font-semibold mb-12"
            />

            {/* Description */}
            {heading.map((h, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="text-lg md:text-xl text-gray-400 leading-relaxed mb-8"
              >
                {h.description}
              </motion.p>
            ))}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4"
            >
              {/* View Work Button */}
              {
                /* <HeroButton href="#projects" primary>
                <span className="flex items-center gap-2">
                  View My Work
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    →
                  </motion.span>
                </span>
              </HeroButton> */
              }

              {/* Download CV Button */}
              <motion.button
                onClick={handleDownloadCV}
                disabled={isDownloading}
                className={`
                  relative overflow-hidden px-8 py-3 rounded-full
                  border border-primary/20 group
                  transition-all duration-300
                  ${isDownloading ? "cursor-wait" : "hover:border-primary/40"}
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"
                  initial={{ x: "-100%" }}
                  animate={isDownloading ? { x: "100%" } : { x: "-100%" }}
                  transition={{
                    duration: 1,
                    repeat: isDownloading ? Infinity : 0,
                    ease: "linear",
                  }}
                />

                <span className="relative flex items-center gap-2 text-primary group-hover:text-primary-light">
                  {isDownloading
                    ? (
                      <>
                        Downloading
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
                        />
                      </>
                    )
                    : (
                      <>
                        Download CV
                        <motion.div
                          animate={{ y: [0, 3, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                        >
                          <HiDownload className="w-5 h-5" />
                        </motion.div>
                      </>
                    )}
                </span>
              </motion.button>

              {/* Contact Button */}
              <HeroButton href="#contact" primary>
                <span className="flex items-center gap-2">
                  Contact Me
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    👋
                  </motion.span>
                </span>
              </HeroButton>
            </motion.div>

            {/* Download Status Message */}
            <AnimatePresence>
              {!isDownloading && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm text-gray-400 mt-4"
                >
                  Check out my full CV for more details
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Image - Right Side */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end order-1 lg:order-2">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
            >
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-conic from-primary via-secondary to-accent rounded-full animate-spin-slow blur-xl opacity-50" />

              {/* Inner Background */}
              <div className="absolute inset-[3px] bg-background rounded-full" />

              {/* Profile Image Container */}
              <div className="relative w-full h-full rounded-full border-2 border-primary p-1 overflow-hidden">
                <Image
                  src="/profile-pic.jpg"
                  alt="Emmanuel Lomotey"
                  fill
                  priority
                  className="object-cover rounded-full"
                  sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                />
              </div>

              {/* Rotating Border */}
              <motion.div
                className="absolute -inset-2 border-2 border-primary/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Glowing Dots */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-32 h-32 bg-primary/10 rounded-full"
                  style={{
                    top: `${40 + 45 * Math.cos((i * 2 * Math.PI) / 3)}%`,
                    left: `${50 + 45 * Math.sin((i * 2 * Math.PI) / 3)}%`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Floating Elements */}
      {/* <div className="absolute bottom-0 left-0 right-0"> */}
      <FloatingElements />
      {/* </div> */}

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() =>
          document.getElementById("about")?.scrollIntoView({
            behavior: "smooth",
          })}
        className="absolute bottom-18 left-1/2 transform -translate-x-1/2 group z-20"
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
            Scroll Down
          </span>
          <div className="w-8 h-12 border-2 border-primary/30 rounded-full p-1 group-hover:border-primary/50 transition-colors">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="w-2 h-2 bg-primary rounded-full mx-auto"
            />
          </div>
        </motion.div>
      </motion.button>

      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at center, ${
              Array(100).fill("").map((_, i) =>
                `${i % 2 ? "#fff" : "transparent"} ${i}px`
              ).join(",")
            })`,
          }}
        />
      </div>
    </section>
  );
}
