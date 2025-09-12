"use client";
// components/Accomplishments.tsx (refined & palette-aligned metric rings)

import { motion, useInView } from "framer-motion";
import { achievements as data } from "@/constants";
import { useRef, useState, useId, useMemo } from "react";
import { SectionHeading } from "./shared/SectionHeading";
import { HiSparkles, HiTrophy } from "react-icons/hi2";
import CountUp from "react-countup";

/**
 * Accessible + animated radial metric ring with palette variants
 */
interface MetricRingProps {
  value: number;
  variant: number;
}
function MetricRing({ value, variant }: MetricRingProps) {
  const id = useId();
  const normalized = Math.max(0, value);
  // Enlarged radius for better number fit
  const r = 62;
  const circumference = 2 * Math.PI * r;
  const progress = Math.min(100, normalized);
  const offset = circumference - (progress / 100) * circumference;

  // Per-ring palette variants aligned with site theme
  // Using semantic pairs to keep consistency with primary / secondary / accent
  // Use rgb() with the defined *-rgb CSS variables from globals.css
  const colorPairs: Array<[string, string]> = [
    ["rgb(var(--color-primary-rgb))", "rgb(var(--color-secondary-rgb))"],
    ["rgb(var(--color-secondary-rgb))", "rgb(var(--color-accent-rgb))"],
    ["rgb(var(--color-accent-rgb))", "rgb(var(--color-primary-rgb))"],
    ["rgb(var(--color-primary-rgb))", "rgb(var(--color-accent-rgb))"],
  ];
  const [startColor, endColor] = colorPairs[variant % colorPairs.length];

  // Soft track coloring (slightly tinted instead of static white)
  const trackColor = "rgba(255,255,255,0.06)";

  return (
    <div
      className="relative w-48 h-48 mx-auto mb-6"
      role="img"
      aria-label={`Achievement metric ${value}+`}
    >
      <svg viewBox="0 0 140 140" className="w-full h-full">
        <defs>
          <linearGradient id={`grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={startColor} />
            <stop offset="100%" stopColor={endColor} />
          </linearGradient>
        </defs>
        {/* Background Track */}
        <circle
          cx="70"
          cy="70"
          r={r}
          stroke={trackColor}
          strokeWidth="12"
          fill="none"
        />
        {/* Filled Gradient Arc */}
        <motion.circle
          cx="70"
          cy="70"
          r={r}
          /* Use gradient reference */
          stroke={`url(#grad-${id})`}
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="drop-shadow-[0_0_10px_rgba(0,0,0,0.35)]"
        />
        {/* Ambient Glow (mirroring gradient) */}
        <motion.circle
          cx="70"
          cy="70"
          r={r}
          stroke={`url(#grad-${id})`}
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ filter: "blur(5px)" }}
          className="opacity-25"
          animate={{ opacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Inner subtle glow ring */}
        <circle
          cx="70"
          cy="70"
          r={r - 12}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      {/* Center Value */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-none">
          <CountUp
            end={value}
            duration={2}
            suffix="+"
            enableScrollSpy
            scrollSpyOnce
          />
        </div>
        <span className="mt-2 text-[11px] tracking-wider uppercase text-gray-400">
          Achieved
        </span>
      </div>
    </div>
  );
}

export default function Accomplishments() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      className="py-24 relative overflow-hidden"
      ref={ref}
      id="accomplishments"
      aria-labelledby="accomplishments-heading"
    >
      {/* Layered Background Aesthetic */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/3 w-[55rem] h-[55rem] bg-primary/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -left-40 w-[45rem] h-[45rem] bg-secondary/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 right-0 w-[60rem] h-[60rem] bg-accent/10 rounded-full blur-[180px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(255,255,255,0.04),transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="inline-flex items-center justify-center mb-8"
          >
            {/*<div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl opacity-40" />
              <HiTrophy className="relative w-14 h-14 text-primary drop-shadow-[0_0_8px_rgba(0,0,0,0.4)]" />
            </div>*/}
          </motion.div>

          <SectionHeading
            title="Milestones & Technical Impact"
            subtitle="Quantifiable outcomes reflecting sustained engineering growth and community contribution"
          />
        </div>

        {/* Metrics Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
          role="list"
          aria-label="Achievement metrics"
        >
          {data.map((card, index) => (
            <AchievementCard
              key={card.text}
              number={card.number}
              text={card.text}
              index={index}
              isInView={isInView}
            />
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
  isInView: boolean;
}

function AchievementCard({ number, text, index, isInView }: AchievementCardProps) {
  const [hovered, setHovered] = useState(false);

  const gradient = useMemo(
    () =>
      [
        "from-primary/10 via-secondary/5 to-accent/10",
        "from-secondary/10 via-primary/5 to-accent/10",
        "from-accent/10 via-secondary/5 to-primary/10",
        "from-primary/10 via-accent/5 to-secondary/10",
      ][index % 4],
    [index],
  );

  return (
    <motion.div
      role="listitem"
      aria-label={`${number}+ ${text}`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12, ease: "easeOut" }}
    >
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ y: -6 }}
        whileTap={{ scale: 0.985 }}
        className={`
          relative group overflow-hidden rounded-2xl p-6 md:p-7
          bg-gradient-to-br ${gradient}
          border border-gray-700/40 backdrop-blur-xl
          transition-all duration-400
          hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10
        `}
      >
        {/* Subtle inner highlight */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute -inset-px rounded-2xl bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.07),transparent_65%)]" />
        </div>

        {/* Decorative sweep shimmer */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={hovered ? { opacity: 1 } : { opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={false}
            animate={{ x: ["-120%", "120%"] }}
            transition={{
              duration: 1.8,
              repeat: hovered ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Metric Ring */}
        <MetricRing value={number} variant={index} />

        {/* Text */}
        <motion.p
          className="text-center text-gray-300 text-sm md:text-[15px] font-medium tracking-wide leading-relaxed px-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 + index * 0.1 }}
        >
          {text}
        </motion.p>

        {/* Sparkle on hover */}
        <motion.div
          className="absolute -top-3 -right-2"
          initial={{ opacity: 0, scale: 0 }}
          animate={
            hovered
              ? { opacity: 1, scale: 1, rotate: 15 }
              : { opacity: 0, scale: 0, rotate: 0 }
          }
          transition={{ duration: 0.25 }}
        >
          <HiSparkles className="w-8 h-8 text-primary/60 drop-shadow" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
