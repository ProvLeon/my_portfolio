"use client";
import { motion } from "framer-motion";
// components/ui/Card.tsx
export function Card({
  children,
  className = "",
  hover = true,
}: CardProps) {
  return (
    <motion.div
      whileHover={hover
        ? {
          y: -5,
          boxShadow: "0 10px 30px -15px rgba(19, 173, 199, 0.2)",
        }
        : undefined}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`
        bg-background-card/80 backdrop-blur-sm
        border border-gray-800/50 hover:border-primary/30
        rounded-xl p-6 transition-all duration-300
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
