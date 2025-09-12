// Updated content for my_portfolio/components/CareerMilestones/DetailModal.tsx
"use client";

import { motion } from "framer-motion";
import { HiExternalLink, HiX } from "react-icons/hi";
import type { Milestone } from "@/types";
import { IconType } from "react-icons";

interface DetailModalProps {
  milestone: Milestone;
  onClose: () => void;
}

export function DetailModal({ milestone, onClose }: DetailModalProps) {
  const IconComp = milestone.icon as IconType | undefined;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-label={`${milestone.project} milestone details`}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-gray-800/90 p-8 rounded-2xl max-w-3xl w-full border border-gray-700/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] overflow-hidden"
      >
        {/* Decorative radial / grid accent */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-[130px]" />
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 relative">
          <div className="flex items-start gap-5">
            <div
              className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15
              flex items-center justify-center border border-white/10 shadow-inner"
            >
              {IconComp && (
                <IconComp className="w-8 h-8 text-primary drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]" />
              )}
              {milestone.status && (
                <span
                  className={`absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide
                  ${milestone.status === "completed"
                      ? "bg-emerald-500/90 text-white"
                      : "bg-amber-500/90 text-gray-900"
                    } shadow-lg`}
                >
                  {milestone.status === "completed" ? "Completed" : "In Progress"}
                </span>
              )}
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-gray-200 to-white/80 bg-clip-text text-transparent">
                {milestone.project}
              </h3>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <span className="text-sm text-gray-400">{milestone.year}</span>
                {milestone.category && (
                  <span
                    className="px-2.5 py-1 rounded-md text-[11px] uppercase tracking-wide font-medium
                    bg-gray-700/40 border border-gray-600/40 text-gray-200 shadow-sm"
                  >
                    {milestone.category}
                  </span>
                )}
                {milestone.link && (
                  <a
                    href={milestone.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium
                    bg-primary/10 text-primary hover:bg-primary/20 transition-colors border border-primary/30"
                  >
                    <HiExternalLink className="w-4 h-4" />
                    Visit
                  </a>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="self-start p-2 rounded-full bg-gray-800/60 hover:bg-gray-700/70 border border-gray-600/40 transition-colors"
            aria-label="Close milestone details"
          >
            <HiX className="w-5 h-5 text-gray-300 hover:text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="relative space-y-10">
          {/* Overview */}
          <section>
            <h4 className="text-sm font-semibold tracking-wide text-primary/80 mb-2 uppercase">
              Overview
            </h4>
            <p className="text-gray-300 leading-relaxed text-sm md:text-[15px]">
              {milestone.description}
            </p>
          </section>

          {/* Impact */}
          {milestone.impact && (
            <section>
              <h4 className="text-sm font-semibold tracking-wide text-primary/80 mb-3 uppercase">
                Impact Highlights
              </h4>
              <ul className="space-y-2.5">
                {milestone.impact.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-gray-300 text-sm leading-snug"
                  >
                    <span className="mt-1 w-2 h-2 rounded-full bg-primary/70 shadow-[0_0_0_4px_rgba(255,255,255,0.04)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Metrics */}
          {milestone.metrics && (
            <section>
              <h4 className="text-sm font-semibold tracking-wide text-primary/80 mb-4 uppercase">
                Key Metrics
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {milestone.metrics.map((metric, i) => (
                  <motion.div
                    key={metric + i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="relative overflow-hidden rounded-xl border border-gray-700/50
                    bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-4 shadow-inner"
                  >
                    <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.06),transparent_70%)]" />
                    <p className="text-[13px] font-semibold text-primary tracking-wide">
                      {metric}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Technologies */}
          {milestone.techs && (
            <section>
              <h4 className="text-sm font-semibold tracking-wide text-primary/80 mb-3 uppercase">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {milestone.techs.map((tech, i) => (
                  <span
                    key={tech + i}
                    className="px-3 py-1.5 rounded-md bg-gray-800/60 border border-gray-700/50
                    text-[12px] font-medium tracking-wide text-gray-200 hover:border-primary/40 hover:text-primary/90
                    transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Link (redundant if already shown in header; keep for context if long scroll) */}
          {milestone.link && (
            <section className="pt-2">
              <a
                href={milestone.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
                bg-primary/15 hover:bg-primary/25 border border-primary/30
                text-primary font-medium text-sm tracking-wide transition-colors shadow-sm"
              >
                <HiExternalLink className="w-4 h-4" />
                Open Project
              </a>
            </section>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
