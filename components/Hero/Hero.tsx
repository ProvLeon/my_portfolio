"use client";
// components/Hero/Hero.tsx

import { useMemo, useState } from "react";
import Image from "next/image";
// import { useMousePosition } from "@/hooks/useMousePosition";
import { useParallax } from "@/hooks/useParallax";
import { useTextScramble } from "@/hooks/useTextScramble";
// import { IconType } from "react-icons";

import {
  AnimatePresence,
  motion,
  useScroll,
  // useSpring,
  useTransform,
} from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { heading } from "@/constants";
import { HiDownload } from "react-icons/hi";
import { FloatingElements } from "./FloatingElements";
import { HeroButton } from "./HeroButton";

// const ANIMATION_SETTINGS = {
//   initialDelay: 0.3,
//   staggerDelay: 0.2,
//   springStiffness: 200,
// };

const COLORS = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  accent: "var(--color-accent)",
};

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const [isDownloading, setIsDownloading] = useState(false);
  // const parallax = useParallax(20);

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
    <section className="relative min-h-screen overflow-hidden cursor-default md:top-10">
      {/* <InteractiveBackground /> */}
      {/* <GlowingBorder> */}
      {/* <ParticleEffect /> */}

      {/* Background Gradient Effects */}
      {
        /* <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />
        <div className="absolute top-20 left-0 w-72 h-72 bg-primary/20 rounded-full blur-[120px] opacity-50 animate-pulse-slow" />
        <div className="absolute bottom-20 right-0 w-72 h-72 bg-secondary/20 rounded-full blur-[120px] opacity-50 animate-pulse-slow delay-500" />
      </div> */
      }

      {/* Main Content */}
      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-4 py-20 lg:py-32 z-10 relative"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          <div className="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1">
            <div className="p-8">
              <NameSection />
              {/* <SkillBadges /> */}

              {/* Animated Role */}
              <TypeAnimation
                sequence={[
                  "Full Stack Developer",
                  1000,
                  "UI/UX Designer",
                  1000,
                  "AI / ML Engineer",
                  1000,
                ]}
                wrapper="h2"
                speed={50}
                repeat={Infinity}
                className="text-xl md:text-2xl bg-gradient-to-r from-primary/80 via-secondary/80 to-accent/80 bg-clip-text text-transparent font-semibold mb-12"
              />

              {/* Description */}
              {heading.map((h, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-md md:text-lg text-gray-400 leading-relaxed mb-8"
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
                {/* </motion.div> */}
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
              whileHover={{ scale: 1.05 }}
              className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
            >
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-conic from-primary via-secondary to-accent rounded-full animate-spin-slow blur-2xl opacity-50" />

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
              <motion.div
                className="absolute -inset-5 border-2 border-secondary/20 rounded-full"
                animate={{ rotate: -360 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Glowing Dots */}
              {
                /* {[...Array(3)].map((_, i) => (
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
                ))} */
              }
            </motion.div>
            {/* <BackgroundEffects parallax={parallax} /> */}
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
        className="absolute -bottom-32 lg:bottom-32 left-1/2 transform -translate-x-1/2 group z-100"
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
      {
        /* <div className="absolute inset-0 pointer-events-none">
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
      </div> */
      }
      {/* </GlowingBorder> */}
    </section>
  );
}

// const ParticleEffect = () => {
//   const particles = useMemo(() =>
//     Array.from({ length: 50 }).map((_, i) => ({
//       id: i,
//       x: Math.random() * 100,
//       y: Math.random() * 100,
//       size: Math.random() * 3 + 1,
//     })), []);

//   return (
//     <div className="absolute inset-0 pointer-events-none">
//       {particles.map((particle) => (
//         <motion.div
//           key={particle.id}
//           className="absolute w-1 h-1 bg-primary/30 rounded-full"
//           style={{
//             left: `${particle.x}%`,
//             top: `${particle.y}%`,
//             width: particle.size,
//             height: particle.size,
//           }}
//           animate={{
//             y: [0, -30, 0],
//             opacity: [0, 1, 0],
//           }}
//           transition={{
//             duration: 3,
//             repeat: Infinity,
//             delay: Math.random() * 5,
//             ease: "easeInOut",
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// const InteractiveBackground = () => {
//   const mousePosition = useMousePosition();
//   const x = useSpring(mousePosition.x);
//   const y = useSpring(mousePosition.y);

//   return (
//     <motion.div
//       className="absolute inset-0 pointer-events-none"
//       style={{
//         background:
//           `radial-gradient(600px circle at ${x}px ${y}px, rgba(var(--color-primary-rgb), 0.15), transparent 40%)`,
//       }}
//     />
//   );
// };

// Enhance the name section with this new component
const NameSection = () => {
  // const parallax = useParallax(60);
  const letters = "Okantah".split("");
  const scrambledName = useTextScramble("</LEO>");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div className="relative py-4 mb-8">
      <GreetingAnimation />

      <div className="relative z-10">
        {/* Title */}
        <motion.p
          className="text-gray-400 text-xl mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          I'm
        </motion.p>

        {/* Main Name */}
        <motion.div
          className="relative inline-block w-full lg:ml-12"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <motion.h1
            className="text-7xl md:text-8xl font-bold tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block relative"
                // style={{
                //   x: parallax.x * (i + 1) * 0.5,
                //   y: parallax.y * (i + 1) * 0.5,
                // }}
                whileHover={{
                  scale: 1.2,
                  color: COLORS.primary,
                  transition: { duration: 0.2 },
                }}
              >
                <span className="relative z-10 bg-gradient-to-br from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                  {isHovered ? scrambledName[i] : letter}
                </span>

                {/* Enhanced Glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />

                {/* Add sparkle animation to last character */}
                {i === letters.length - 1 && (
                  <motion.div
                    className="absolute -right-6 -top-5"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <div className="relative flex justify-center items-center">
                      <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                      <span className="text-4xl">✨</span>
                    </div>
                  </motion.div>
                )}
              </motion.span>
            ))}
          </motion.h1>
        </motion.div>
      </div>
    </motion.div>
  );
};

// const BackgroundEffects = ({ parallax }) => (
//   <>
//     <motion.div
//       className="absolute inset-0 bg-gradient-conic from-primary/5 via-secondary/5 to-accent/5 rounded-3xl"
//       style={{
//         x: parallax.x * 3,
//         y: parallax.y * 3,
//       }}
//       animate={{
//         opacity: [0.3, 0.5, 0.3],
//       }}
//       transition={{
//         duration: 4,
//         repeat: Infinity,
//         ease: "linear",
//       }}
//     />

//     {/* Additional decorative elements */}
//     <div className="absolute inset-0 overflow-hidden">
//       <motion.div
//         className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-3xl"
//         animate={{
//           scale: [1, 1.2, 1],
//           opacity: [0.3, 0.5, 0.3],
//         }}
//         transition={{ duration: 4, repeat: Infinity }}
//       />
//     </div>
//   </>
// );

// const ExperienceCounter = () => {
//   const [count, setCount] = useState(0);
//   const targetCount = 3; // Years of experience

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCount((prev) => {
//         if (prev >= targetCount) {
//           clearInterval(interval);
//           return targetCount;
//         }
//         return prev + 0.1;
//       });
//     }, 50);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <motion.div
//       className="absolute -right-20 top-1/2 transform -translate-y-1/2"
//       initial={{ opacity: 0, x: 50 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ delay: 1 }}
//     >
//       <div className="relative">
//         <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
//           {count.toFixed(1)}+
//         </div>
//         <div className="text-sm text-gray-400 mt-1">
//           Years of<br />Experience
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// const SocialProof = () => {
//   const stats = [
//     { value: "50+", label: "Projects" },
//     { value: "20+", label: "Clients" },
//     { value: "5+", label: "Countries" },
//   ];

//   return (
//     <motion.div
//       className="flex gap-8 mt-12"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 1.2 }}
//     >
//       {stats.map((stat, i) => (
//         <motion.div
//           key={stat.label}
//           className="text-center"
//           whileHover={{ scale: 1.1 }}
//         >
//           <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
//             {stat.value}
//           </div>
//           <div className="text-sm text-gray-400">{stat.label}</div>
//         </motion.div>
//       ))}
//     </motion.div>
//   );
// };

// // Add this component for skill badges
// const SkillBadges = () => {
//   const skills = ["React", "Node.js", "TypeScript", "Python", "AWS"];

//   return (
//     <motion.div className="flex flex-wrap gap-2 mt-6">
//       {skills.map((skill, i) => (
//         <motion.span
//           key={skill}
//           className="px-3 py-1 bg-gradient-to-r from-primary/10 to-secondary/10
//                      rounded-full border border-primary/20 text-sm"
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 2 + i * 0.1 }}
//           whileHover={{
//             scale: 1.1,
//             backgroundColor: "rgba(var(--color-primary-rgb), 0.2)",
//           }}
//         >
//           {skill}
//         </motion.span>
//       ))}
//     </motion.div>
//   );
// };

const GlowingBorder = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    className="relative rounded-xl overflow-hidden"
    whileHover={{ scale: 1.02 }}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-30"
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      }}
    />
    <div className="relative bg-background/80 backdrop-blur-sm m-[1px] rounded-xl">
      {children}
    </div>
  </motion.div>
);

// const FloatingIcon = ({ icon: Icon, delay = 0 }) => (
//   <motion.div
//     className="absolute text-2xl text-primary/50"
//     initial={{ opacity: 0, y: 20 }}
//     animate={{
//       opacity: [0.3, 1, 0.3],
//       y: [0, -20, 0],
//     }}
//     transition={{
//       duration: 3,
//       delay,
//       repeat: Infinity,
//       ease: "easeInOut",
//     }}
//   >
//     <Icon />
//   </motion.div>
// );

const GreetingAnimation = ({ className }: { className?: string }) => {
  return (
    <motion.div
      className={`absolute -top-12 left-1/3 transform lg:-translate-x-1/2 md:-translate-x-1/2 lg:left-auto lg:-top-14 lg:right-0 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="relative">
        <motion.div
          className="text-sm px-4 py-2 bg-primary/10 rounded-full border border-primary/20
                     backdrop-blur-sm text-primary flex items-center gap-2"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="animate-pulse">👋</span>
          Hello, World!
        </motion.div>
        <motion.div
          className="absolute -bottom-1 left-1/2 w-2 h-2 bg-primary/20 rotate-45"
          style={{ transform: "translateX(-50%) rotate(45deg)" }}
        />
      </div>
    </motion.div>
  );
};
