"use client";

/**
 * OngoingProjects.tsx
 * ------------------------------------------------------------------
 * Revamped to visually align with the Accomplishments metric rings.
 * Enhancements:
 * - Palette-consistent animated radial progress rings
 * - Subtle gradient + glass layering
 * - Improved hover / focus depth & motion
 * - Accessible semantics (roles, aria-labels)
 * - Responsive, resilient layout
 */

import { motion } from "framer-motion";
import { HiOutlineLightBulb } from "react-icons/hi";
import type { OngoingProject } from "@/types";
import { fadeInUp } from "@/constants/animations";
import { useId } from "react";

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */
interface OngoingProjectsProps {
  projects: OngoingProject[];
}

/* -------------------------------------------------------------------------- */
/* Palette Aligned Progress Ring                                              */
/* -------------------------------------------------------------------------- */
interface ProgressRingProps {
  value: number;
  variant: number;
  label?: string;
}

function ProgressRing({ value, variant, label = "Complete" }: ProgressRingProps) {
  const id = useId();
  const clamped = Math.max(0, Math.min(100, value));
  // Larger ring (same scale concept as Accomplishments)
  const r = 62;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference - (clamped / 100) * circumference;

  // Reuse palette gradient logic (primary / secondary / accent interweaves)
  const colorPairs: Array<[string, string]> = [
    ["rgb(var(--color-primary-rgb))", "rgb(var(--color-secondary-rgb))"],
    ["rgb(var(--color-secondary-rgb))", "rgb(var(--color-accent-rgb))"],
    ["rgb(var(--color-accent-rgb))", "rgb(var(--color-primary-rgb))"],
    ["rgb(var(--color-primary-rgb))", "rgb(var(--color-accent-rgb))"],
  ];
  const [start, end] = colorPairs[variant % colorPairs.length];

  return (
    <div
      className="relative w-44 h-44 mx-auto flex items-center justify-center"
      role="img"
      aria-label={`Project progress ${clamped}%`}
    >
      <svg viewBox="0 0 140 140" className="w-full h-full">
        <defs>
          <linearGradient id={`ogp-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={start} />
            <stop offset="100%" stopColor={end} />
          </linearGradient>
        </defs>

        {/* Track */}
        <circle
          cx="70"
          cy="70"
          r={r}
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="12"
          fill="none"
        />

        {/* Main animated stroke */}
        <motion.circle
          cx="70"
          cy="70"
          r={r}
          stroke={`url(#ogp-grad-${id})`}
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="drop-shadow-[0_0_10px_rgba(0,0,0,0.4)]"
        />

        {/* Ambient echo ring (glow cycle) */}
        <motion.circle
          cx="70"
          cy="70"
          r={r}
          stroke={`url(#ogp-grad-${id})`}
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ filter: "blur(6px)" }}
          className="opacity-30"
          animate={{ opacity: [0.18, 0.42, 0.18] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Inner subtle structural ring */}
        <circle
          cx="70"
          cy="70"
          r={r - 14}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-none">
          {clamped}
          <span className="text-lg align-top">%</span>
        </div>
        <span className="mt-1 text-[10px] uppercase tracking-wider text-gray-400">
          {label}
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Skeleton Placeholder (when no progress)                                    */
/* -------------------------------------------------------------------------- */
function PlaceholderRing({ variant }: { variant: number }) {
  const palette: Array<[string, string]> = [
    ["from-primary/15", "to-secondary/15"],
    ["from-secondary/15", "to-accent/15"],
    ["from-accent/15", "to-primary/15"],
    ["from-primary/15", "to-accent/15"],
  ];
  const [from, to] = palette[variant % palette.length];
  return (
    <div className="relative w-44 h-44 flex items-center justify-center">
      <div
        className={`absolute inset-0 rounded-full bg-gradient-to-br ${from} ${to} opacity-70 blur-md`}
      />
      <div
        className={`w-40 h-40 rounded-full bg-gradient-to-br ${from} ${to} border border-white/10 flex items-center justify-center`}
      >
        <span className="text-[11px] tracking-wider uppercase text-gray-400">
          In Discovery
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Project Card                                                               */
/* -------------------------------------------------------------------------- */
interface ProjectCardProps {
  project: OngoingProject;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const hasProgress = typeof project.progress === "number";

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.985 }}
      className={`
        group relative overflow-hidden rounded-2xl p-6
        bg-gradient-to-br from-gray-900/55 via-gray-900/40 to-gray-800/50
        border border-gray-700/40 backdrop-blur-xl
        transition-all duration-400
        hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10
        focus-within:ring-2 focus-within:ring-primary/50
      `}
    >
      {/* Ambient gradient sweep */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.35, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.07),transparent_65%)]" />
      </motion.div>

      <div className="flex flex-col md:flex-row md:items-start gap-8">
        <div className="shrink-0 md:pt-2">
          {hasProgress
            ? <ProgressRing value={project.progress!} variant={index} />
            : <PlaceholderRing variant={index} />}
        </div>

        <div className="flex-1 min-w-0">
          <h4
            className="text-lg md:text-xl font-semibold tracking-tight mb-3
              bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
          >
            {project.project}
          </h4>

          <p className="text-sm md:text-[15px] text-gray-300/90 leading-relaxed mb-4 group-hover:text-gray-200 transition-colors">
            {project.description}
          </p>

          {/* Tech Stack */}
          {project.techs && (
            <ul
              className="flex flex-wrap gap-2 mb-4"
              aria-label="Technology stack"
            >
              {project.techs.map((tech, i) => (
                <li key={tech + i}>
                  <span
                    className="px-2.5 py-1 rounded-md text-[11px] font-medium
                      bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10
                      border border-gray-600/40 text-gray-300 tracking-wide
                      hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    {tech}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* Status / ETA */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full
              bg-gradient-to-r from-primary/15 via-secondary/15 to-accent/15
              text-xs md:text-sm font-medium text-gray-200
              border border-gray-600/40 shadow-inner"
          >
            {project.expectedCompletion
              ? `Expected: ${project.expectedCompletion}`
              : `Status: ${project.status ?? "In Progress"}`}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Container                                                                  */
/* -------------------------------------------------------------------------- */
export function OngoingProjects({ projects }: OngoingProjectsProps) {
  return (
    <motion.div variants={fadeInUp} className="mb-24">
      <div className="flex items-center gap-3 mb-10">
        <HiOutlineLightBulb className="w-7 h-7 text-secondary drop-shadow-[0_0_6px_rgba(0,0,0,0.4)]" />
        <h3
          className="text-2xl md:text-3xl font-semibold tracking-tight
            bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
        >
          Current Endeavors
        </h3>
      </div>

      <div
        className="grid gap-8 md:grid-cols-2"
        role="list"
        aria-label="Ongoing project progress"
      >
        {projects.map((p, i) => (
          <ProjectCard project={p} index={i} key={p.project} />
        ))}
      </div>
    </motion.div>
  );
}
