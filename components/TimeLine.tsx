// Updated content for my_portfolio/components/TimeLine.tsx
"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TimeLineData } from "@/constants";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card } from "@/components/shared/Card";
import { HiOutlineCalendar } from "react-icons/hi";
import { TimelineItemProps } from "@/types"; // Assuming this type import is correct

export default function Timeline() {
  const [activeItem, setActiveItem] = useState(0); // Default to first item or -1 for none
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.7, 1, 1, 0.7]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9]);

  return (
    <section
      id="about" // Changed from "timeline" to "about" as per original file, ensure this is intended
      className="py-20 relative overflow-hidden cursor-default" // Increased py
    >
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] animate-pulse-slow delay-700" />
      </div>

      <div className="container mx-auto px-4" ref={containerRef}>
        <motion.div style={{ opacity, scale }}>
          <SectionHeading
            title="My Journey"
            subtitle="The path that led me to where I am today"
          />

          {/* Timeline Container */}
          <div className="relative mt-16">
            {/* Animated Vertical Line - Desktop */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 2, ease: "circOut", delay: 0.5 }}
              className="hidden ml-2 md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary/30 via-secondary/30 to-accent/30 rounded-full"
              style={{
                boxShadow: "0 0 15px rgba(var(--color-primary-rgb), 0.2)",
              }}
            />

            {/* Timeline Items */}
            <div className="space-y-10 md:space-y-16 relative">
              {TimeLineData.map((item, index) => (
                <TimelineItem
                  key={index}
                  data={item}
                  isActive={activeItem === index}
                  onActivate={() => setActiveItem(index)}
                  isLeft={index % 2 === 0}
                  index={index}
                  totalItems={TimeLineData.length}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TimelineItem({
  data,
  isActive,
  onActivate,
  isLeft,
  index,
  totalItems,
}: TimelineItemProps) {
  const isLast = index === totalItems - 1;

  const cardVariants = {
    initial: { opacity: 0, y: 60, x: isLeft ? -30 : 30 },
    inView: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.7, delay: index * 0.2, ease: [0.25, 1, 0.5, 1] }, // Smoother ease
    },
    active: {
      scale: 1.03,
      borderColor: "rgba(var(--color-primary-rgb), 0.8)", // More visible active border
      // boxShadow: "0px 0px 30px 5px rgba(var(--color-primary-rgb), 0.25)", // Enhanced glow
      transition: { duration: 0.3, type: "spring", stiffness: 300, damping: 15 },
    },
    inactive: {
      scale: 1,
      borderColor: "rgba(var(--color-secondary-rgb),0.15)",
      boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
    },
  };

  const contentVariants = {
    initial: { opacity: 0, y: 15 },
    inView: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.25 + index * 0.2 } },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileInView="inView"
      animate={isActive ? "active" : "inactive"}
      viewport={{ once: true, amount: 0.4 }} // Trigger a bit earlier
      className={`flex flex-col md:flex-row items-center ${isLeft ? "md:flex-row" : "md:flex-row-reverse"
        } relative group`} // Added group for card hover
      onMouseEnter={onActivate}
    >
      {/* Mobile Timeline Connector */}
      <div className="md:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700/40 rounded-full">
        {index !== 0 && (
          <div className="absolute top-0 h-1/2 w-full bg-gradient-to-b from-transparent via-gray-700/20 to-gray-700/40" />
        )}
        {!isLast && (
          <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-gray-700/40 via-gray-700/20 to-transparent" />
        )}
      </div>

      {/* Mobile Timeline Dot */}
      <div className="md:hidden absolute left-4 top-12 transform -translate-x-1/2 z-10">
        <motion.div
          className={`w-3 h-3 rounded-full border-2 transition-all duration-300
            ${isActive ? "bg-primary border-primary/70 shadow-md shadow-primary/20" : "bg-gray-500 border-gray-400"}
          `}
        >
          {isActive && (
            <motion.div
              className="absolute -inset-1 rounded-full border-2 border-primary/40 opacity-60"
              animate={{ scale: [1, 1.7, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </motion.div>
      </div>

      {/* Content Card */}
      <div
        className={`w-full md:w-1/2 pl-10 md:pl-0 ${ // Adjusted mobile padding
          isLeft ? "md:pr-8" : "md:pl-8" // Adjusted desktop padding
          } mb-8 md:mb-0`}
      >
        <motion.div
          whileHover={{ y: -6, transition: { duration: 0.25 } }}
          className="h-full"
        >
          <Card
            className={`
              h-full transform transition-all duration-400
              ${isActive ? "border-primary/60 shadow-glow-primary bg-background-card/80" : "border-gray-700/40 hover:border-primary/40 bg-background-card/50"}
              backdrop-blur-xl hover:bg-background-card/70 rounded-lg
            `} // Enhanced backdrop, background and rounded-lg
          >
            <motion.div
              className="p-5" // Standardized padding
            >
              <motion.div
                variants={contentVariants}
                className="flex items-center gap-3 mb-3"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: -7 }}
                  className={`
                    p-2.5 rounded-lg
                    bg-gradient-to-br from-primary/10 to-secondary/10
                    group-hover:from-primary/15 group-hover:to-secondary/15
                    transition-all duration-300
                    border border-primary/20 group-hover:border-primary/30
                  `}
                >
                  <HiOutlineCalendar className="w-5 h-5 text-primary/80 group-hover:text-primary" />
                </motion.div>
                <motion.h3
                  className="text-lg md:text-xl font-semibold bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent" // Adjusted gradient
                >
                  {data.year}
                </motion.h3>
              </motion.div>

              <motion.p
                variants={contentVariants}
                className="text-gray-300/80 leading-relaxed text-sm group-hover:text-gray-200/90 transition-colors" // Slightly adjusted text color
              >
                {data.text}
              </motion.p>
            </motion.div>
          </Card>
        </motion.div>
      </div>

      {/* Desktop Center Point */}
      <motion.div
        className="hidden md:block relative"
        whileHover={{ scale: 1.35, transition: { type: "spring", stiffness: 350, damping: 12 } }}
      >
        <motion.div
          animate={{
            scale: isActive ? 1.7 : 1,
            backgroundColor: isActive ? "var(--color-primary)" : "rgba(var(--color-secondary-rgb), 0.7)",
          }}
          style={{
            boxShadow: isActive ? `0 0 25px 7px rgba(var(--color-primary-rgb), 0.35)` : '0 0 12px 3px rgba(var(--color-secondary-rgb), 0.2)',
          }}
          className={`
            w-3.5 h-3.5 rounded-full
            border-2 border-background
            absolute top-1/2 left-1/2
            transform -translate-x-1/2 -translate-y-1/2
            transition-all duration-300
            flex items-center justify-center cursor-pointer
          `}
          onClick={onActivate} // Allow click to activate as well
        >
          <motion.div
            animate={{ scale: isActive ? 0.65 : 0.45, opacity: isActive ? 1 : 0.6 }}
            className="w-1.5 h-1.5 bg-white/90 rounded-full"
          />
          {isActive && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/70"
                animate={{
                  scale: [1, 1.7, 2.3],
                  opacity: [0.7, 0.35, 0],
                }}
                transition={{
                  duration: 2.0, // Slower, more graceful pulse
                  repeat: Infinity,
                  ease: "circOut",
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border border-primary/50"
                animate={{
                  scale: [1, 2.0, 2.8],
                  opacity: [0.5, 0.2, 0],
                }}
                transition={{
                  duration: 2.5, // Slightly different duration for variation
                  repeat: Infinity,
                  ease: "circOut",
                  delay: 0.4,
                }}
              />
            </>
          )}
        </motion.div>
      </motion.div>
      <div className="hidden md:block md:w-1/2" />
    </motion.div>
  );
}
