"use client";

import { motion } from "framer-motion";
import { HiOutlineLightBulb } from "react-icons/hi";
import type { OngoingProject } from "@/types";
import { fadeInUp } from "@/constants/animations";

interface OngoingProjectsProps {
  projects: OngoingProject[];
}

export function OngoingProjects({ projects }: OngoingProjectsProps) {
  return (
    <motion.div variants={fadeInUp} className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <HiOutlineLightBulb className="w-6 h-6 text-secondary" />
        <h3 className="text-2xl font-semibold text-gray-200">
          Current Endeavors
        </h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project.project}
            variants={fadeInUp}
            whileHover={{ y: -5 }}
            className="p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50
                     border border-gray-700/30 shadow-lg relative overflow-hidden"
          >
            <h4 className="text-xl font-semibold text-secondary mb-3">
              {project.project}
            </h4>

            <p className="text-gray-300 mb-4">{project.description}</p>

            {/* Progress Bar */}
            {project.progress && (
              <div className="mb-4">
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-secondary rounded-full"
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  {project.progress}% Complete
                </p>
              </div>
            )}

            {/* Technologies */}
            {project.techs && (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techs.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-secondary/10 rounded-full text-sm text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            <div className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-sm text-secondary">
              {project.expectedCompletion
                ? `Expected: ${project.expectedCompletion}`
                : `Status: ${project.status}`}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
