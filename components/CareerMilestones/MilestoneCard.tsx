"use client";

import { motion } from "framer-motion";
import { HiChevronRight } from "react-icons/hi";
import type { Milestone } from "@/types";

interface MilestoneCardProps {
  milestone: Milestone;
  onClick: () => void;
}

export function MilestoneCard({ milestone, onClick }: MilestoneCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="group p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50
                 hover:from-gray-800/70 hover:to-gray-900/70 transition-all duration-300
                 border border-gray-700/30 hover:border-primary/30 shadow-lg hover:shadow-primary/5
                 cursor-pointer relative overflow-hidden"
    >
      {/* Project Icon */}
      <div className="absolute top-4 right-4 text-2xl">
        {milestone.icon}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4">
        <div>
          <h4 className="text-xl font-semibold text-primary group-hover:text-primary-light
                       transition-colors flex items-center gap-2">
            {milestone.project}
            {milestone.link && (
              <motion.a
                href={milestone.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary/60 hover:text-primary"
                whileHover={{ scale: 1.1 }}
                onClick={(e) => e.stopPropagation()}
              >
                <HiChevronRight className="w-5 h-5" />
              </motion.a>
            )}
          </h4>
          <span className="text-sm text-gray-400 font-medium">
            {milestone.year}
          </span>
        </div>

        <p className="text-gray-300 leading-relaxed">
          {milestone.description}
        </p>

        {/* Metrics */}
        {milestone.metrics && (
          <div className="flex flex-wrap gap-2 mt-2">
            {milestone.metrics.map((metric, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm
                         group-hover:bg-primary/20 transition-colors"
              >
                {metric}
              </motion.span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
