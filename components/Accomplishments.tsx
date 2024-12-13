"use client";
// components/Accomplishments.tsx

import { motion, useInView } from "framer-motion";
import { achievements as data } from "@/constants";
import { useRef, useState } from "react";
import { SectionHeading } from "./shared/SectionHeading";
import { HiSparkles, HiTrophy } from "react-icons/hi2";
import CountUp from "react-countup";

export default function Accomplishments() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] animate-pulse-slow delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <HiTrophy className="w-12 h-12 mx-auto text-primary mb-6" />
          </motion.div>
          <SectionHeading
            title="Milestones Achieved"
            subtitle="Celebrating the journey of continuous growth and impact"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {data.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <AchievementCard {...card} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface AchievementCardProps {
  number: number;
  text: string;
  index: number;
}

function AchievementCard({ number, text, index }: AchievementCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Generate a unique gradient for each card
  const gradients = [
    "from-primary/10 to-secondary/10",
    "from-secondary/10 to-accent/10",
    "from-accent/10 to-primary/10",
    "from-primary/10 to-accent/10",
  ];

  return (
    <motion.div
      className={`
        relative group
        rounded-2xl p-6 md:p-8
        bg-gray-900/50 backdrop-blur-sm
        border border-gray-800/50
        hover:border-primary/20
        transition-all duration-300
        overflow-hidden
      `}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
    >
      {/* Background Gradient */}
      <div
        className={`
        absolute inset-0 -z-10
        bg-gradient-to-br ${gradients[index]}
        opacity-50 transition-opacity duration-300
        group-hover:opacity-100
      `}
      />

      {/* Sparkle Effect */}
      <motion.div
        className="absolute -top-2 -right-2"
        initial={{ opacity: 0, scale: 0 }}
        animate={isHovered
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: 0 }}
        transition={{ duration: 0.2 }}
      >
        <HiSparkles className="w-6 h-6 text-primary/60" />
      </motion.div>

      {/* Counter Animation */}
      <motion.div
        className="text-4xl md:text-5xl font-bold mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          <CountUp
            end={number}
            duration={2}
            suffix="+"
            enableScrollSpy
            scrollSpyOnce
          />
        </div>
      </motion.div>

      {/* Achievement Text */}
      <motion.p
        className="text-gray-300 text-sm md:text-base font-medium"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {text}
      </motion.p>

      {/* Hover Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"
        initial={{ opacity: 0, x: "-100%" }}
        animate={isHovered
          ? { opacity: 1, x: "100%" }
          : { opacity: 0, x: "-100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
