"use client";

// components/CareerMilestones/FutureGoals.tsx
import { motion } from "framer-motion";
import { FiTarget } from "react-icons/fi";
import { fadeInUp } from "@/constants/animations";

interface FutureGoalsProps {
  goals: string[];
}

export function FutureGoals({ goals }: FutureGoalsProps) {
  return (
    <motion.div variants={fadeInUp}>
      <div className="flex items-center gap-3 mb-8">
        <FiTarget className="w-6 h-6 text-accent" />
        <h3 className="text-2xl font-semibold text-gray-200">
          Future Vision
        </h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {goals.map((goal, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50
                     border border-gray-700/30 shadow-lg group"
          >
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center
                         group-hover:bg-accent/20 transition-colors"
              >
                <span className="text-accent">→</span>
              </motion.div>
              <p className="text-gray-300 group-hover:text-white transition-colors">
                {goal}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
