"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  SiAmazon,
  SiDjango,
  SiDocker,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiTypescript,
} from "react-icons/si";

export function FloatingElements() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  const techStack = [
    {
      name: "React",
      Icon: SiReact,
      gradient: "from-[#61DAFB]/10 to-[#61DAFB]/5",
    },
    {
      name: "Next.js",
      Icon: SiNextdotjs,
      gradient: "from-white/10 to-black/5",
    },
    {
      name: "TypeScript",
      Icon: SiTypescript,
      gradient: "from-[#3178C6]/10 to-[#3178C6]/5",
    },
    {
      name: "Node.js",
      Icon: SiNodedotjs,
      gradient: "from-[#339933]/10 to-[#339933]/5",
    },
    {
      name: "Python",
      Icon: SiPython,
      gradient: "from-[#3776AB]/10 to-[#FFD43B]/5",
    },
    {
      name: "Django",
      Icon: SiDjango,
      gradient: "from-[#092E20]/10 to-[#44B78B]/5",
    },
    {
      name: "AWS",
      Icon: SiAmazon,
      gradient: "from-[#FF9900]/10 to-[#FF9900]/5",
    },
    {
      name: "Docker",
      Icon: SiDocker,
      gradient: "from-[#2496ED]/10 to-[#2496ED]/5",
    },
  ];

  // Stagger animation variants for tech pills
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      {/* Floating Orbs */}
      <motion.div
        className="absolute top-1/4 left-10 w-32 h-32"
        animate={{
          y: [0, 20, 0],
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-conic from-primary/20 via-secondary/20 to-accent/20 rounded-full blur-2xl" />
          <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent rounded-full animate-pulse-slow" />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-10 w-24 h-24"
        animate={{
          y: [0, -20, 0],
          rotate: [360, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-conic from-accent/20 via-primary/20 to-secondary/20 rounded-full blur-2xl" />
          <div className="absolute inset-0 bg-gradient-radial from-secondary/10 to-transparent rounded-full animate-pulse-slow" />
        </div>
      </motion.div>

      <div className="absolute bottom-4 md:bottom-16 w-full">
        <motion.div className="space-y-12">
          {/* First Row */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="relative h-12"
          >
            <motion.div
              className="flex gap-8 absolute whitespace-nowrap"
              animate={{
                x: ["0%", "-50%"],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...techStack, ...techStack].map((tech, index) => (
                <TechPill
                  key={`${tech.name}-1-${index}`}
                  tech={tech}
                  variant="primary"
                  index={index}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Second Row */}
          {
            /* <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="relative h-12"
          >
            <motion.div
              className="flex gap-8 absolute whitespace-nowrap"
              animate={{
                x: ["-50%", "0%"],
              }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...techStack.reverse(), ...techStack].map((tech, index) => (
                <TechPill
                  key={`${tech.name}-2-${index}`}
                  tech={tech}
                  variant="secondary"
                  index={index}
                />
              ))}
            </motion.div>
          </motion.div> */
          }
        </motion.div>
      </div>
    </div>
  );
}

interface TechPillProps {
  tech: {
    name: string;
    Icon: React.ComponentType<{ className?: string }>;
    gradient: string;
  };
  variant: "primary" | "secondary";
  index: number;
}

function TechPill({ tech, variant, index }: TechPillProps) {
  const pillVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={pillVariants}
      whileHover={{
        y: -3,
        scale: 1.02,
        rotate: [-1, 1],
        transition: { duration: 0.2 },
      }}
      className="group relative"
    >
      <motion.div
        className={`
          px-4 py-2 rounded-full
          flex items-center gap-2.5
          border border-gray-700/10
          backdrop-blur-sm
          transition-all duration-300
          shadow-lg shadow-black/5
          ${
          variant === "primary"
            ? "bg-gray-900/30 hover:bg-gray-900/40"
            : "bg-gray-800/30 hover:bg-gray-800/40"
        }
        `}
      >
        {/* Icon with brand colors */}
        <div
          className={`
            p-1.5 rounded-full
            bg-gradient-to-br ${tech.gradient}
            opacity-50 group-hover:opacity-70
            transition-all duration-300
            shadow-inner shadow-black/10
          `}
        >
          <tech.Icon className="w-3.5 h-3.5 text-gray-300/70" />
        </div>

        {/* Text */}
        <span
          className={`
            text-sm font-medium
            text-gray-400/70 group-hover:text-gray-300
            transition-colors duration-300
            text-shadow
          `}
        >
          {tech.name}
        </span>

        {/* Hover glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>

      {/* Subtle particles */}
      <motion.div
        className="absolute -inset-2 opacity-0 group-hover:opacity-100"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 rounded-full bg-gray-400/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -8, 0],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 1.2,
              delay: i * 0.15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
