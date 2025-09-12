"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { experiencesDetails, techStack, TimeLineData } from "@/constants";
import { use3DTilt } from "@/hooks/use3DTilt";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card } from "@/components/shared/Card";
import { iconMap } from "@/constants/icons";
import { HiChip, HiCode, HiColorSwatch, HiDatabase, HiTrendingUp, HiClock, HiCollection } from "react-icons/hi";
import { IconType } from "react-icons";
import {
  ExperienceSectionProps,
  SkillItemProps,
  TechCategoryProps,
} from "@/types";

export default function Technologies() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const sectionIcons: Record<string, IconType> = {
    frontend: HiCode,
    backend: HiDatabase,
    tools: HiChip,
    design: HiColorSwatch,
  };

  // Analytics & derived metrics
  const categoryEntries = Object.entries(techStack);
  const totalSkills = categoryEntries.reduce(
    (acc, [, { skills }]) => acc + skills.length,
    0,
  );
  const uniqueSkills = new Set(
    categoryEntries.flatMap(([, { skills }]) => skills),
  ).size;
  const averagePerCategory = Math.round(uniqueSkills / categoryEntries.length);

  // Generate lightweight category density meta for UI summaries
  const categoryDensity = categoryEntries.map(
    ([key, { skills }]) => ({
      key,
      count: skills.length,
      percentage: ((skills.length / uniqueSkills) * 100).toFixed(1),
    }),
  );

  // Enhanced animations
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section
      id="tech"
      className="py-24 relative overflow-hidden cursor-default"
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-conic from-primary/10 via-secondary/10 to-accent/10 animate-spin-slow opacity-30" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-secondary/20 to-transparent rounded-full blur-[120px] animate-pulse-slow delay-1000" />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/50 to-background" />

        {/* Moving Gradient Lines */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute inset-0 bg-grid-pattern animate-grid" />
        </div>
      </div>

      <div className="container mx-auto px-4" ref={ref}>
        <SectionHeading
          title="Technical Expertise"
          subtitle="Building innovative solutions with cutting-edge technologies"
        />

        {/* Tech Categories Grid */}
        <motion.div
          variants={containerAnimation}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
          {Object.entries(techStack).map((
            [category, { title, skills }],
            index,
          ) => (
            <TechCategory
              key={category}
              category={category}
              title={title}
              skills={skills}
              index={index}
              Icon={sectionIcons[category as keyof typeof sectionIcons]}
            />
          ))}
        </motion.div>

        {/* Experience Progress */}
        <ExperienceSection isInView={isInView} />
      </div>
    </section>
  );
}

function TechCategory(
  { category, title, skills, index, Icon }: TechCategoryProps,
) {
  const cardRef = useRef<HTMLDivElement>(null);
  const tilt = use3DTilt(cardRef);

  return (
    <motion.div
      ref={cardRef}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: "preserve-3d",
      }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Card className="h-full backdrop-blur-md hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
        <div className="space-y-6">
          {/* Category Header */}
          <div className="flex items-center gap-4 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="p-4 rounded-xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10
                        border border-primary/10 group-hover:border-primary/20 transition-all duration-300"
            >
              <Icon className="w-7 h-7 text-primary group-hover:text-primary/80 transition-colors" />
            </motion.div>
            <div>
              <h3 className="text-xl font-semibold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {title}
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                {skills.length} Technologies
              </p>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {skills.map((skill, skillIndex) => (
              <SkillItem
                key={skill}
                skill={skill}
                index={skillIndex}
                delay={index * 0.1 + skillIndex * 0.05}
              />
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// Enhanced SkillItem component with better glow effects
function SkillItem({ skill, delay }: SkillItemProps) {
  const Icon = iconMap[skill];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.2 }}
      className="group/skill relative"
    >
      <motion.div
        whileHover={{
          scale: 1.05,
          rotateZ: [0, -2, 2, 0],
        }}
        className="relative flex items-center gap-3 p-3 rounded-lg
                  bg-gray-800/30 hover:bg-gray-800/50
                  border border-gray-700/30 hover:border-primary/30
                  transition-all duration-300
                  overflow-hidden"
      >
        {/* Enhanced Icon Glow Effect */}
        {Icon && (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-secondary/50 blur-xl opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 p-1.5 rounded-lg bg-gray-800/50 group-hover/skill:bg-gray-800/70 transition-colors">
              <Icon className="w-5 h-5 text-gray-400 group-hover/skill:text-primary transition-all duration-300" />
            </div>
          </div>
        )}

        <span className="text-xs md:text-sm font-medium text-gray-300 group-hover/skill:text-white transition-colors duration-300">
          {skill}
        </span>

        {/* Enhanced Hover Glow */}
        <motion.div
          className="absolute inset-0 -z-10 opacity-0 group-hover/skill:opacity-100 transition-all duration-500"
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-lg blur-xl" />
        </motion.div>

        {/* Shine Effect */}
        <div className="absolute inset-0 opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-[-10px] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-shine" />
        </div>
      </motion.div>
    </motion.div>
  );
}

// Enhanced ExperienceSection with better animations
function ExperienceSection({ isInView }: ExperienceSectionProps) {
  const experiences = experiencesDetails;
  const maxYears = Math.max(...experiences.map(e => e.years));
  const totalYears = experiences.reduce((acc, e) => acc + e.years, 0);
  const avgYears = (totalYears / experiences.length).toFixed(1);

  // Timeline derived span
  const numericTimelineYears = TimeLineData
    .filter(item => typeof item.year === "number")
    .map(item => Number(item.year)) as number[];
  const earliestYear = numericTimelineYears.length
    ? Math.min(...numericTimelineYears)
    : new Date().getFullYear();
  const currentYear = new Date().getFullYear();
  const careerSpanYears = Math.max(1, currentYear - earliestYear);
  const overlapFactor = (totalYears / careerSpanYears).toFixed(1);

  // View mode toggle (absolute vs percent)
  const [showPercent, setShowPercent] = useState(false);

  // Info drawer state (option B)
  const [showInfo, setShowInfo] = useState(false);

  // Touch tooltip support: track which metric is active
  const [activeMetric, setActiveMetric] = useState<string | null>(null);

  // Animated counters (option C)
  const useAnimatedNumber = (target: number, deps: any[] = []) => {
    const [val, setVal] = useState(0);
    useEffect(() => {
      if (!isInView) return;
      let frame: number;
      const duration = 900;
      const start = performance.now();
      const animate = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        setVal(Number((target * (0.5 - 0.5 * Math.cos(Math.PI * p))).toFixed(2)));
        if (p < 1) frame = requestAnimationFrame(animate);
      };
      frame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(frame);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInView, ...deps]);
    return val;
  };

  const animTotal = useAnimatedNumber(totalYears);
  const animSpan = useAnimatedNumber(careerSpanYears);
  const animAvg = useAnimatedNumber(Number(avgYears));
  const animOverlap = useAnimatedNumber(Number(overlapFactor));

  // Utility for tap (mobile) tooltip toggle
  const handleMetricTap = (id: string) => {
    setActiveMetric(prev => (prev === id ? null : id));
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay: 0.4 }}
      className="max-w-5xl mx-auto"
      aria-labelledby="experience-overview-heading"
      role="region"
    >
      <Card className="backdrop-blur-md relative overflow-hidden">
        {/* Subtle background accents */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-50">
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 -right-20 w-80 h-80 bg-secondary/10 rounded-full blur-[140px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(255,255,255,0.04),transparent_65%)]" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
          <h4
            id="experience-overview-heading"
            className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent tracking-tight"
          >
            Experience Overview
          </h4>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPercent(p => !p)}
              className="px-4 py-2 rounded-lg text-xs font-medium tracking-wide bg-gray-900/60 border border-gray-700/50 text-gray-300 hover:text-white hover:border-primary/40 transition-colors"
              aria-pressed={showPercent}
            >
              View: {showPercent ? "Percentages" : "Absolute Years"}
            </button>
            <button
              onClick={() => setShowInfo(true)}
              className="px-3 py-2 rounded-lg text-xs font-medium bg-primary/15 border border-primary/30 text-primary hover:bg-primary/25 transition-colors"
              aria-label="What do these metrics mean?"
            >
              What’s this?
            </button>
          </div>
        </div>

        {/* Summary Metrics */}
        <div
          className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-10"
          role="list"
          aria-label="Experience summary metrics"
        >
          {/* Cumulative Depth */}
          {/*<div
            role="listitem"
            onClick={() => handleMetricTap("depth")}
            className="relative group p-5 rounded-xl bg-gray-900/50 border border-gray-700/50 backdrop-blur-md flex items-center gap-4 cursor-pointer"
          >
            <div className="p-3 rounded-lg bg-primary/15 border border-primary/30">
              <HiTrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-100 leading-none tabular-nums">
                {animTotal.toFixed(1)}
              </span>
              <span className="text-[11px] tracking-wider uppercase text-gray-400">
                Cumulative Depth
              </span>
            </div>
            {(activeMetric === "depth") && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-10">
                <div className="px-3 py-2 rounded-md bg-gray-950/95 border border-gray-700/60 text-[11px] text-gray-200 shadow-xl whitespace-nowrap">
                  Years of Development from all fields added together
                </div>
              </div>
            )}
          </div>*/}

          {/* Career Span */}
          <div
            role="listitem"
            onClick={() => handleMetricTap("span")}
            className="relative group p-5 rounded-xl bg-gray-900/50 border border-gray-700/50 backdrop-blur-md flex items-center gap-4 cursor-pointer"
          >
            <div className="p-3 rounded-lg bg-secondary/15 border border-secondary/30">
              <HiClock className="w-6 h-6 text-secondary" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-100 leading-none tabular-nums">
                {animSpan.toFixed(0)}
              </span>
              <span className="text-[11px] tracking-wider uppercase text-gray-400">
                Career Span (yrs)
              </span>
            </div>
            {(activeMetric === "span") && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-10">
                <div className="px-3 py-2 rounded-md bg-gray-950/95 border border-gray-700/60 text-[11px] text-gray-200 shadow-xl whitespace-nowrap">
                  Number of years as a Developer
                </div>
              </div>
            )}
          </div>

          {/* Avg / Domain */}
          <div
            role="listitem"
            onClick={() => handleMetricTap("avg")}
            className="relative group p-5 rounded-xl bg-gray-900/50 border border-gray-700/50 backdrop-blur-md flex items-center gap-4 cursor-pointer"
          >
            <div className="p-3 rounded-lg bg-accent/15 border border-accent/30">
              <HiCollection className="w-6 h-6 text-accent" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-100 leading-none tabular-nums">
                {animAvg.toFixed(1)}
              </span>
              <span className="text-[11px] tracking-wider uppercase text-gray-400">
                Avg / Domain
              </span>
            </div>
            {(activeMetric === "avg") && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-10">
                <div className="px-3 py-2 rounded-md bg-gray-950/95 border border-gray-700/60 text-[11px] text-gray-200 shadow-xl whitespace-nowrap">
                  Number of Years in each field so far.
                </div>
              </div>
            )}
          </div>

          {/* Overlap Factor */}
          <div
            role="listitem"
            onClick={() => handleMetricTap("overlap")}
            className="relative group p-5 rounded-xl bg-gray-900/50 border border-gray-700/50 backdrop-blur-md flex items-center gap-4 cursor-pointer"
          >
            <div className="p-3 rounded-lg bg-primary/15 border border-primary/30">
              <HiTrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-100 leading-none tabular-nums">
                {animOverlap.toFixed(1)}×
              </span>
              <span className="text-[11px] tracking-wider uppercase text-gray-400">
                Overlap Factor
              </span>
            </div>
            {(activeMetric === "overlap") && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-10">
                <div className="px-3 py-2 rounded-md bg-gray-950/95 border border-gray-700/60 text-[11px] text-gray-200 shadow-xl whitespace-nowrap">
                  How much parallel learning increased total depth
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Detailed Bars */}
        <div className="space-y-9" role="list" aria-label="Domain experience distribution">
          {experiences.map((item, index) => {
            const percent = (item.years / maxYears) * 100;
            const displayValue = showPercent ? `${percent.toFixed(0)}%` : `${item.years}y`;
            return (
              <div
                key={item.skill}
                role="listitem"
                className="relative group"
                aria-label={`${item.skill} ${item.years} years (${percent.toFixed(0)}% of max)`}
              >
                <div className="flex justify-between items-end mb-2.5">
                  <h5 className="sm:text-md md:text-lg font-medium text-gray-200 tracking-wide">
                    {item.skill}
                  </h5>
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
                    transition={{ delay: 0.55 + index * 0.15 }}
                    className="text-xs md:text-sm text-gray-400 font-medium tabular-nums"
                  >
                    {displayValue}
                  </motion.span>
                </div>

                <div className="h-4 rounded-full bg-gray-800/60 border border-gray-700/40 overflow-hidden relative backdrop-blur-sm">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${percent}%` } : { width: 0 }}
                    transition={{
                      duration: 1.4,
                      delay: 0.4 + index * 0.18,
                      ease: [0.33, 1, 0.68, 1],
                    }}
                    className={`absolute left-0 top-0 h-full rounded-full ${item.color} shadow-[0_0_0_1px_rgba(255,255,255,0.05)]`}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "linear",
                        delay: index * 0.25,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-transparent" />
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ delay: 0.9 + index * 0.18, type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute top-1/2 -translate-y-1/2 translate-x-[-50%] w-5 h-5 rounded-full border-2 border-gray-900
                               bg-gradient-to-br from-gray-200 via-white to-gray-300 shadow-lg
                               flex items-center justify-center text-[9px] font-semibold text-gray-800"
                    style={{ left: `${percent}%` }}
                    title={`${item.years} years`}
                  >
                    {showPercent ? `${Math.round(percent)}` : item.years}
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={isInView ? { opacity: 0.9, y: 0 } : { opacity: 0, y: 4 }}
                  transition={{ delay: 0.9 + index * 0.18 }}
                  className="mt-2 text-[11px] tracking-wider uppercase text-gray-400 flex justify-between"
                >
                  {showPercent ? (
                    <>
                      <span>{percent.toFixed(0)}%</span>
                      <span className="text-gray-500">
                        Of strongest area ({maxYears}y)
                      </span>
                    </>
                  ) : (
                    <>
                      <span>{item.years} yrs</span>
                      <span className="text-gray-500">
                        Max domain {maxYears}y
                      </span>
                    </>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Info Drawer (bottom slide) */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              className="fixed inset-x-0 bottom-0 z-50 p-6 md:p-8 bg-gray-950/95 backdrop-blur-xl border-t border-gray-700/50 shadow-2xl"
              role="dialog"
              aria-label="Experience metrics explanation"
            >
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="flex items-start justify-between gap-6">
                  <h5 className="text-lg md:text-xl font-semibold text-gray-100">
                    Understanding These Metrics
                  </h5>
                  <button
                    onClick={() => setShowInfo(false)}
                    className="px-3 py-1.5 rounded-md text-xs font-medium bg-gray-800/60 border border-gray-700/60 text-gray-300 hover:text-white hover:border-primary/40 transition-colors"
                  >
                    Close
                  </button>
                </div>
                <ul className="space-y-3 text-sm text-gray-300 leading-relaxed">
                  <li>
                    <span className="font-semibold text-primary">Cumulative Depth:</span> Adds up all time across focus areas (parallel learning is counted in each area).
                  </li>
                  <li>
                    <span className="font-semibold text-secondary">Career Span:</span> Plain calendar time since I started building software.
                  </li>
                  <li>
                    <span className="font-semibold text-accent">Avg / Domain:</span> Typical time invested per area (helpful for distribution).
                  </li>
                  <li>
                    <span className="font-semibold text-primary">Overlap Factor:</span> How much parallel work increased total learning time (Cumulative ÷ Span).
                  </li>
                  <li>
                    Use the toggle to switch between actual years or relative percentages for each bar.
                  </li>
                  <li>
                    Tap a metric (mobile) or hover (desktop) to see a concise explanation.
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
