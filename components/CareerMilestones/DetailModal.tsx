"use client";

import { motion } from "framer-motion";
import { HiExternalLink, HiX } from "react-icons/hi";
import type { Milestone } from "@/types";

interface DetailModalProps {
  milestone: Milestone;
  onClose: () => void;
}

export function DetailModal({ milestone, onClose }: DetailModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-900/95 p-8 rounded-2xl max-w-2xl w-full border border-gray-700/50 shadow-xl"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <span className="text-3xl">{milestone.icon}</span>
            <div>
              <h3 className="text-2xl font-bold text-primary">
                {milestone.project}
              </h3>
              <p className="text-gray-400 mt-1">{milestone.year}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <HiX className="w-6 h-6 text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="space-y-6">
          {/* Description */}
          <div>
            <h4 className="text-lg font-semibold text-gray-200 mb-2">
              Overview
            </h4>
            <p className="text-gray-300 leading-relaxed">
              {milestone.description}
            </p>
          </div>

          {/* Technologies */}
          {milestone.techs && (
            <div>
              <h4 className="text-lg font-semibold text-gray-200 mb-2">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {milestone.techs.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Metrics */}
          {milestone.metrics && (
            <div>
              <h4 className="text-lg font-semibold text-gray-200 mb-3">
                Key Metrics
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {milestone.metrics.map((metric, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50"
                  >
                    <p className="text-primary font-semibold">{metric}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Impact */}
          {milestone.impact && (
            <div>
              <h4 className="text-lg font-semibold text-gray-200 mb-2">
                Impact
              </h4>
              <ul className="space-y-2">
                {milestone.impact.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300">
                    <span className="text-primary">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Project Link */}
          {milestone.link && (
            <div className="mt-6">
              <a
                href={milestone.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20
                         text-primary rounded-full transition-colors"
              >
                <HiExternalLink className="w-5 h-5" />
                <span>Visit Project</span>
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
