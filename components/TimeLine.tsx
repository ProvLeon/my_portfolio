"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TimeLineData } from "@/constants";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card } from "@/components/shared/Card";
import { HiOutlineCalendar } from "react-icons/hi";
import { TimelineItemProps } from "@/types";

export default function Timeline() {
  const [activeItem, setActiveItem] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  return (
    <section
      id="about"
      className="py-10 relative overflow-hidden cursor-default"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] animate-pulse-slow delay-1000" />
      </div>

      <div className="container mx-auto px-4" ref={containerRef}>
        <motion.div style={{ opacity, scale }}>
          <SectionHeading
            title="My Journey"
            subtitle="The path that led me to where I am today"
          />

          {/* Timeline Container */}
          <div className="relative mt-12">
            {/* Animated Vertical Line */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="hidden md:block absolute left-1/2 transform -translate-x-1/3 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent ml-2"
              style={{
                backgroundSize: "200% 200%",
                animation: "gradient 6s linear infinite",
              }}
            />

            {/* Timeline Items */}
            <div className="space-y-8 md:space-y-16 relative">
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
  const progress = index / (totalItems - 1);
  const isLast = index === totalItems - 1;
  const _gradientColor = `hsl(${progress * 200}, 70%, 50%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={`flex flex-col md:flex-row items-center ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Mobile Timeline Connector */}
      <div className="md:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-secondary/50 to-accent/50">
        {/* Top connector - hide for first item */}
        {index !== 0 && (
          <div className="absolute top-0 h-1/2 w-full bg-gradient-to-b from-transparent to-primary/50" />
        )}
        {/* Bottom connector - hide for last item */}
        {!isLast && (
          <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-b from-primary/50 to-transparent" />
        )}
      </div>

      {/* Mobile Timeline Dot */}
      <div className="md:hidden absolute left-8 top-12 transform -translate-x-1/2">
        <motion.div
          whileHover={{ scale: 1.2 }}
          className={`w-4 h-4 rounded-full ${
            isActive ? "bg-primary shadow-lg shadow-primary/30" : "bg-gray-700"
          } border-2 border-primary/50 transition-all duration-300`}
        >
          {isActive && (
            <motion.div
              className="absolute -inset-1 rounded-full border border-primary/30"
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </motion.div>
      </div>

      {/* Content */}
      <div
        className={`w-full md:w-1/2 pl-16 md:pl-0 ${
          isLeft ? "md:pr-12" : "md:pl-12"
        } mb-6 md:mb-0`}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card
            className={`
              transform transition-all duration-500
              hover:shadow-xl hover:shadow-primary/5
              ${isActive ? "scale-105" : "scale-100"}
              backdrop-blur-sm
            `}
          >
            <motion.div
              onClick={onActivate}
              className="cursor-pointer group"
            >
              {/* Year Section with improved styling */}
              <motion.div
                className="flex items-center gap-4 mb-6"
                whileHover={{ x: isLeft ? 10 : -10 }}
              >
                <div className="flex items-center gap-3">
                  {/* Calendar Icon Container */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`
                      p-3 rounded-xl
                      bg-gradient-to-r from-primary/10 to-secondary/10
                      group-hover:from-primary/20 group-hover:to-secondary/20
                      transition-all duration-300
                      border border-primary/20 group-hover:border-primary/40
                    `}
                  >
                    <HiOutlineCalendar className="w-6 h-6 text-primary group-hover:text-primary/80" />
                  </motion.div>

                  {/* Year Display */}
                  <motion.span
                    className="text-xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                    whileHover={{ scale: 1.05 }}
                  >
                    {data.year}
                  </motion.span>
                </div>

                {/* Gradient Line - Desktop only */}
                <motion.div
                  className="hidden md:block flex-1 h-0.5 rounded-full bg-gradient-to-r from-primary/20 via-secondary/20 to-transparent"
                  whileHover={{ scaleX: 1.05 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>

              {/* Content Section with improved text styling */}
              <motion.p
                className="text-gray-300 leading-relaxed text-sm md:text-base lg:text-lg"
                whileHover={{ x: isLeft ? 5 : -5 }}
              >
                {data.text}
              </motion.p>
            </motion.div>
          </Card>
        </motion.div>
      </div>

      {/* Desktop Center Point with improved styling */}
      <motion.div
        className="hidden md:block relative"
        whileHover={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div
          animate={{
            scale: isActive ? 1.2 : 1,
            backgroundColor: isActive ? "#13ADC7" : "#1E293B",
          }}
          className={`
            w-5 h-5 rounded-full
            border-2 border-primary
            absolute top-1/2 left-1/3
            transform -translate-x-1/3 -translate-y-1/2
            transition-all duration-300
            ${isActive ? "shadow-lg shadow-primary/30" : ""}
            hover:border-secondary
          `}
        >
          {/* Enhanced Ripple Effect */}
          {isActive && (
            <>
              <motion.div
                className="absolute -inset-2 rounded-full border-2 border-primary/30"
                animate={{
                  scale: [1, 1.5],
                  opacity: [0.5, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <motion.div
                className="absolute -inset-1 rounded-full border-2 border-primary/50"
                animate={{
                  scale: [1, 1.3],
                  opacity: [0.7, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.2,
                }}
              />
            </>
          )}
        </motion.div>
      </motion.div>
      {/* Desktop Spacer */}
      <div className="hidden md:block md:w-1/2" />
    </motion.div>
  );
}
