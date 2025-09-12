"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { HiChevronRight } from "react-icons/hi";
import type { Milestone } from "@/types";
import { IconType } from "react-icons";

interface MilestoneCardProps {
  milestone: Milestone;
  onClick: () => void;
}

/**
 * Map milestone categories to distinct aesthetic + semantic styles.
 * Uses the same color palette as Accomplishments component for consistency.
 */
const CATEGORY_STYLES: Record<
  string,
  {
    bg: string;
    text: string;
    ring: string;
    ringGradient: [string, string];
    dot: string;
    glow: string;
    accent: string;
  }
> = {
  Platform: {
    bg: "from-primary/10 via-secondary/5 to-accent/10",
    text: "rgb(var(--color-primary-rgb))",
    ring: "ring-primary/40",
    ringGradient: ["rgb(var(--color-primary-rgb))", "rgb(var(--color-secondary-rgb))"],
    dot: "bg-primary",
    glow: "shadow-[0_0_20px_-4px_rgba(var(--color-primary-rgb),0.4)]",
    accent: "from-primary/20 to-primary/5",
  },
  Client: {
    bg: "from-secondary/10 via-primary/5 to-accent/10",
    text: "rgb(var(--color-secondary-rgb))",
    ring: "ring-secondary/40",
    ringGradient: ["rgb(var(--color-secondary-rgb))", "rgb(var(--color-accent-rgb))"],
    dot: "bg-secondary",
    glow: "shadow-[0_0_20px_-4px_rgba(var(--color-secondary-rgb),0.4)]",
    accent: "from-secondary/20 to-secondary/5",
  },
  Productivity: {
    bg: "from-accent/10 via-secondary/5 to-primary/10",
    text: "rgb(var(--color-accent-rgb))",
    ring: "ring-accent/40",
    ringGradient: ["rgb(var(--color-accent-rgb))", "rgb(var(--color-primary-rgb))"],
    dot: "bg-accent",
    glow: "shadow-[0_0_20px_-4px_rgba(var(--color-accent-rgb),0.4)]",
    accent: "from-accent/20 to-accent/5",
  },
  AI: {
    bg: "from-primary/10 via-accent/5 to-secondary/10",
    text: "rgb(var(--color-primary-rgb))",
    ring: "ring-primary/40",
    ringGradient: ["rgb(var(--color-primary-rgb))", "rgb(var(--color-accent-rgb))"],
    dot: "bg-primary",
    glow: "shadow-[0_0_20px_-4px_rgba(var(--color-primary-rgb),0.4)]",
    accent: "from-primary/15 to-secondary/10",
  },
  Security: {
    bg: "from-secondary/10 via-accent/5 to-primary/10",
    text: "rgb(var(--color-secondary-rgb))",
    ring: "ring-secondary/40",
    ringGradient: ["rgb(var(--color-secondary-rgb))", "rgb(var(--color-primary-rgb))"],
    dot: "bg-secondary",
    glow: "shadow-[0_0_20px_-4px_rgba(var(--color-secondary-rgb),0.4)]",
    accent: "from-secondary/15 to-primary/10",
  },
  default: {
    bg: "from-primary/10 via-secondary/5 to-accent/10",
    text: "rgb(var(--color-primary-rgb))",
    ring: "ring-primary/40",
    ringGradient: ["rgb(var(--color-primary-rgb))", "rgb(var(--color-secondary-rgb))"],
    dot: "bg-primary",
    glow: "shadow-[0_0_20px_-4px_rgba(var(--color-primary-rgb),0.4)]",
    accent: "from-primary/20 to-primary/5",
  },
};

const metricsContainerVariants = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } },
};

const metricItemVariants = {
  initial: { opacity: 0, scale: 0.85 },
  animate: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 260, damping: 20 } },
};

function BaseMilestoneCard({ milestone, onClick }: MilestoneCardProps) {
  // Safely resolve category style; fall back to 'default' if undefined or unmapped (e.g. 'Pre-Launch')
  const categoryKey =
    milestone.category && CATEGORY_STYLES[milestone.category]
      ? milestone.category
      : "default";
  const categoryStyle = CATEGORY_STYLES[categoryKey];

  // Prepare impact preview (first two)
  const impactPreview = useMemo(
    () => (milestone.impact ? milestone.impact.slice(0, 2) : []),
    [milestone.impact],
  );

  const IconComponent = milestone.icon as IconType | undefined;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.985 }}
      onClick={onClick}
      className={`
        group relative cursor-pointer overflow-hidden
        rounded-xl border border-gray-700/40
        bg-gradient-to-br ${categoryStyle.bg}
        backdrop-blur-xl
        transition-all duration-400
        hover:border-primary/40
        ${categoryStyle.glow}
        hover:shadow-lg hover:shadow-primary/10
      `}
    >
      {/* Decorative subtle radial highlight */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -inset-px rounded-xl bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.08),transparent_65%)]" />
      </div>

      {/* Enhanced Category Accent Ring with Gradient */}
      <div className="absolute inset-0 rounded-xl">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`ring-gradient-${milestone.project}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={categoryStyle.ringGradient[0]} stopOpacity="0.4" />
              <stop offset="100%" stopColor={categoryStyle.ringGradient[1]} stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <rect
            x="0.5" y="0.5" width="99" height="99"
            fill="none"
            stroke={`url(#ring-gradient-${milestone.project})`}
            strokeWidth="1"
            rx="12"
            className="opacity-60 group-hover:opacity-100 transition-opacity duration-300"
          />
        </svg>
      </div>

      {/* Inner accent border for depth */}
      <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/5 group-hover:ring-white/10 transition-colors duration-300" />

      {/* Content Wrapper */}
      <div className="relative p-6 flex flex-col gap-5">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Enhanced Icon Container with Ring Effect */}
            <div
              className={`
                relative flex items-center justify-center
                w-12 h-12 rounded-lg
                bg-gradient-to-br ${categoryStyle.accent}
                border border-white/5 shadow-inner
                ${categoryStyle.glow} transition-all duration-300
                group-hover:scale-105
                before:absolute before:inset-0 before:rounded-lg
                before:bg-gradient-to-br before:from-white/5 before:to-transparent
                before:opacity-0 group-hover:before:opacity-100
                before:transition-opacity before:duration-300
              `}
            >
              {IconComponent && (
                <IconComponent
                  className="w-6 h-6 drop-shadow-[0_0_8px_rgba(0,0,0,0.3)]"
                  style={{ color: categoryStyle.text }}
                />
              )}
              {/* Enhanced Status pulse with glow */}
              <motion.span
                className={`
                  absolute -bottom-1 -right-1 w-4 h-4 rounded-full
                  flex items-center justify-center
                  ${milestone.status === "completed" ? "bg-emerald-500" : "bg-amber-500"}
                  ring-2 ring-gray-900
                  shadow-[0_0_8px_rgba(0,0,0,0.3)]
                `}
                animate={{
                  boxShadow: milestone.status === "completed"
                    ? ["0 0 8px rgba(16,185,129,0.3)", "0 0 16px rgba(16,185,129,0.6)", "0 0 8px rgba(16,185,129,0.3)"]
                    : ["0 0 8px rgba(245,158,11,0.3)", "0 0 16px rgba(245,158,11,0.6)", "0 0 8px rgba(245,158,11,0.3)"]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="w-2 h-2 rounded-full bg-white/80" />
              </motion.span>
            </div>

            <div className="flex flex-col">
              <h4
                className={`
                  text-base md:text-lg font-semibold tracking-tight
                  bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent
                  group-hover:from-primary/90 group-hover:via-primary/80 group-hover:to-secondary/80
                  transition-colors
                `}
              >
                {milestone.project}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-medium text-gray-400">{milestone.year}</span>
                {milestone.category && (
                  <span
                    className={`
                      text-[10px] uppercase tracking-wide font-semibold
                      px-2 py-0.5 rounded-md
                      bg-gray-700/40 border border-gray-600/40
                      text-gray-300
                      group-hover:border-gray-500/60
                      transition-colors
                    `}
                  >
                    {milestone.category}
                  </span>
                )}
                {milestone.link && (
                  <motion.a
                    href={milestone.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full p-1.5 bg-primary/10 hover:bg-primary/20 transition-colors"
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <HiChevronRight className="w-4 h-4 text-primary" />
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm md:text-[15px] leading-relaxed text-gray-300/90 group-hover:text-gray-200 transition-colors">
          {milestone.description}
        </p>

        {/* Impact Preview */}
        {impactPreview.length > 0 && (
          <ul className="flex flex-col gap-1.5">
            {impactPreview.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                <span
                  className={`mt-1 w-1.5 h-1.5 rounded-full ${categoryStyle.dot} shadow-[0_0_4px_rgba(0,0,0,0.4)] ring-1 ring-white/10`}
                />
                <span className="leading-snug">{item}</span>
              </li>
            ))}
            {milestone.impact && milestone.impact.length > impactPreview.length && (
              <li className="text-[11px] text-primary/70 italic">
                + {milestone.impact.length - impactPreview.length} more impact points
              </li>
            )}
          </ul>
        )}

        {/* Metrics */}
        {milestone.metrics && (
          <motion.div
            variants={metricsContainerVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.5 }}
            className="flex flex-wrap gap-2 pt-1"
          >
            {milestone.metrics.map((metric, i) => (
              <motion.span
                key={metric + i}
                variants={metricItemVariants}
                className={`
                  px-2.5 py-1 rounded-full text-[11px] font-medium
                  bg-gradient-to-br ${categoryStyle.accent}
                  border border-gray-600/40 text-gray-200
                  group-hover:border-primary/40 group-hover:text-primary/90
                  transition-all duration-300
                  shadow-[0_0_0_1px_rgba(255,255,255,0.03)]
                `}
              >
                {metric}
              </motion.span>
            ))}
          </motion.div>
        )}

        {/* Tech Stack */}
        {milestone.techs && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {milestone.techs.slice(0, 6).map((t, i) => (
              <span
                key={t + i}
                className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-gray-700/40 text-gray-300 tracking-wide"
              >
                {t}
              </span>
            ))}
            {milestone.techs.length > 6 && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-gray-700/40 text-gray-300">
                +{milestone.techs.length - 6}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Enhanced gradient edge overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-xl">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/[0.02] via-transparent to-black/[0.02]" />
      </div>
    </motion.div>
  );
}

export const MilestoneCard = memo(BaseMilestoneCard);
