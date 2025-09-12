'use client'
// components/shared/SectionHeading.tsx
import { motion } from "framer-motion";
import { fadeInUp } from "@/constants/animations";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeading(
  { title, subtitle, centered = true }: SectionHeadingProps,
) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      // variants={fadeInUp}
      className={`mb-16 ${centered ? "text-center" : ""}`}
    >
      <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4" />
    </motion.div>
  );
}
