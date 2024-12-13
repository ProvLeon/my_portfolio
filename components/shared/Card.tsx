"use client";
// components/shared/Card.tsx
import { motion } from "framer-motion";
import { scaleIn } from "@/constants/animations";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <motion.div
      variants={scaleIn}
      className={`bg-gray-900/50 rounded-xl p-6 backdrop-blur-sm border border-gray-800/50
      hover:border-primary/50 transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}
