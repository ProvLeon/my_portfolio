"use client";

/**
 * FutureGoals.tsx (Professional Edition)
 * ------------------------------------------------------------------
 * Enhancements:
 * - Palette‑aligned gradient & ring system (consistent with Accomplishments / OngoingProjects)
 * - Animated index medallions with concentric pulse rings
 * - Heuristic tagging of goals (AI, Open Source, DevOps, Education, Performance, UX, Security, Growth)
 * - Accessible semantics: region, list roles, keyboard focus affordances
 * - Reduced-motion safe fallbacks
 * - Subtle depth layering (glow, radial textures, gradient sheens)
 */

import { motion, useReducedMotion } from "framer-motion";
import { FiTarget } from "react-icons/fi";
import { fadeInUp } from "@/constants/animations";
import { useId, useMemo } from "react";

interface FutureGoalsProps {
  goals: string[];
}

interface GoalMeta {
  base: string;
  tags: string[];
  id: string;
}

/* -------------------------------------------------------------------------- */
/* Heuristic Tag Extraction                                                   */
/* -------------------------------------------------------------------------- */
const TAG_RULES: Array<{ test: RegExp; tag: string }> = [
  { test: /\b(ai|ml|machine learning|model|llm|langchain|openai)\b/i, tag: "AI" },
  { test: /\b(open\s?source|oss|contribute|community)\b/i, tag: "Open Source" },
  { test: /\b(devops|ci\/?cd|pipeline|infrastructure|iac|kubernetes|docker)\b/i, tag: "DevOps" },
  { test: /\b(educat|teach|mentor|learning|academy|curriculum|workshop|training)\b/i, tag: "Education" },
  { test: /\b(perf|latency|scal|optimi[sz]|throughput|benchmark|profil|load)\b/i, tag: "Performance" },
  { test: /\b(user|ux|ui|experience|accessib|a11y|usabil|onboarding)\b/i, tag: "UX" },
  { test: /\b(secur|privacy|auth|rbac|encrypt|threat|zero[- ]trust)\b/i, tag: "Security" },
  { test: /\b(growth|scale|expan|global|market|impact)\b/i, tag: "Growth" },
];

function extractMeta(goals: string[]): GoalMeta[] {
  return goals.map((g, i) => {
    const tags = Array.from(
      new Set(
        TAG_RULES.filter(r => r.test.test(g)).map(r => r.tag).slice(0, 3),
      ),
    );
    return {
      base: g,
      tags: tags.length ? tags : ["Strategic", "Long‑Term"],
      id: `goal-${i}`,
    };
  });
}

/* -------------------------------------------------------------------------- */
/* Motion Variants                                                            */
/* -------------------------------------------------------------------------- */
const itemVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.98 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: 0.08 + i * 0.06,
      ease: [0.25, 0.85, 0.4, 1],
    },
  }),
};

const tagVariants = {
  hidden: { opacity: 0, y: 4 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.4 + i * 0.05, duration: 0.3, ease: "easeOut" },
  }),
};

/* -------------------------------------------------------------------------- */
/* Index Medallion                                                            */
/* -------------------------------------------------------------------------- */
interface IndexMedallionProps {
  index: number;
  reduced?: boolean;
}
function IndexMedallion({ index, reduced }: IndexMedallionProps) {
  const display = String(index + 1).padStart(2, "0");

  return (
    <div
      className="relative w-14 h-14 flex items-center justify-center"
      aria-hidden="true"
    >
      {/* Base gradient disc */}
      <div
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/25 via-secondary/20 to-accent/25
          shadow-inner border border-white/10"
      />
      {/* Animated ring pulses */}
      {!reduced && (
        <>
          <motion.span
            className="absolute inset-0 rounded-xl border border-primary/30"
            animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.45, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            className="absolute inset-0 rounded-xl border border-secondary/30"
            animate={{ opacity: [0.4, 0, 0.4], scale: [1, 1.7, 1] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          />
        </>
      )}
      {/* Foreground glass / highlight */}
      <div className="absolute inset-0 rounded-xl bg-[linear-gradient(140deg,rgba(255,255,255,0.18),rgba(255,255,255,0.02)_55%)] mix-blend-screen opacity-70" />
      <span
        className="relative font-semibold text-sm tracking-wider
          bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-sm"
      >
        {display}
      </span>
      {/* Status node (decorative) */}
      <span
        className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-accent/70 ring-2 ring-gray-900 flex items-center justify-center"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-white/85" />
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Goal Card                                                                  */
/* -------------------------------------------------------------------------- */
interface GoalCardProps {
  goal: GoalMeta;
  index: number;
  reducedMotion: boolean;
}
function GoalCard({ goal, index, reducedMotion }: GoalCardProps) {
  return (
    <motion.li
      role="listitem"
      aria-labelledby={`${goal.id}-title`}
      variants={itemVariants}
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      whileHover={!reducedMotion ? { y: -6 } : undefined}
      whileTap={!reducedMotion ? { scale: 0.985 } : undefined}
      className="group relative overflow-hidden rounded-2xl p-6
        bg-gradient-to-br from-gray-900/55 via-gray-900/40 to-gray-800/50
        border border-gray-700/40 backdrop-blur-xl
        transition-all duration-400 hover:border-primary/45
        hover:shadow-lg hover:shadow-primary/10 focus-within:ring-2
        focus-within:ring-primary/50 outline-none"
    >
      {/* Background aesthetic layers */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50 mix-blend-plus-lighter"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.07),transparent_65%)]" />
      </div>
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={!reducedMotion ? { opacity: [0, 0.25, 0] } : { opacity: 0.15 }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.3,
        }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.1),transparent_55%)]" />
      </motion.div>

      <div className="flex items-start gap-5">
        <IndexMedallion index={index} reduced={reducedMotion} />
        <div className="flex-1 min-w-0">
          <p
            id={`${goal.id}-title`}
            className="text-sm md:text-[15px] leading-relaxed font-medium text-gray-300/90
              group-hover:text-gray-200 transition-colors"
          >
            {goal.base}
          </p>

          {/* Tags */}
          <motion.ul
            role="list"
            aria-label="Goal qualifiers"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-4 flex flex-wrap gap-2"
          >
            {goal.tags.map((t, i) => (
              <motion.li
                key={t + i}
                variants={tagVariants}
                custom={i}
                className="px-2.5 py-1 rounded-md text-[10px] font-semibold tracking-wide uppercase
                    bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10
                    border border-primary/20 text-primary/80
                    shadow-[0_0_0_1px_rgba(255,255,255,0.04)]
                    group-hover:border-primary/40 group-hover:text-primary
                    transition-colors"
              >
                {t}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>

      {/* Edge overlay + gradient frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5"
      />
    </motion.li>
  );
}

/* -------------------------------------------------------------------------- */
/* Main Component                                                             */
/* -------------------------------------------------------------------------- */
export function FutureGoals({ goals }: FutureGoalsProps) {
  const reducedMotion = useReducedMotion();
  const regionId = useId();

  const metas = useMemo(() => extractMeta(goals), [goals]);

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      role="region"
      aria-labelledby={`future-goals-heading-${regionId}`}
      className="relative"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-12">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-accent/25 blur-xl opacity-50" />
          <FiTarget className="relative w-10 h-10 text-accent drop-shadow-[0_0_10px_rgba(0,0,0,0.45)]" />
        </div>
        <div>
          <h3
            id={`future-goals-heading-${regionId}`}
            className="text-2xl md:text-3xl font-semibold tracking-tight
              bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
          >
            Future Vision
          </h3>
          <p className="text-sm md:text-[13px] text-gray-400 mt-2">
            Strategic focus areas guiding long‑term technical and product leverage
          </p>
        </div>
      </div>

      {/* Goals List */}
      <ol
        role="list"
        aria-label="List of future goals"
        className="grid md:grid-cols-2 gap-7"
      >
        {metas.map((meta, i) => (
          <GoalCard
            key={meta.id}
            goal={meta}
            index={i}
            reducedMotion={!!reducedMotion}
          />
        ))}
      </ol>
    </motion.div>
  );
}

export default FutureGoals;
