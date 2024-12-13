"use client";
// components/Hero/HeroButton.tsx
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HeroButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  primary?: boolean;
  className?: string;
}

export function HeroButton({
  children,
  href,
  onClick,
  primary = false,
  className = "",
}: HeroButtonProps) {
  const baseClasses = `
    relative px-8 py-3 rounded-full font-medium
    transition-all duration-300
    flex items-center gap-2
    group overflow-hidden
  `;

  const primaryClasses = `
    bg-gradient-to-r from-primary to-secondary
    text-white shadow-lg shadow-primary/20
    hover:shadow-xl hover:shadow-primary/30
    hover:scale-105
  `;

  const secondaryClasses = `
    border border-primary/20
    text-primary hover:text-white
    hover:border-primary/50
    hover:bg-primary/10
    hover:scale-105
  `;

  const Component = motion[href ? "a" : "button"];
  const props = href ? { href } : { onClick };

  return (
    <Component
      {...props}
      className={`
        ${baseClasses}
        ${primary ? primaryClasses : secondaryClasses}
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Background shine effect */}
      <motion.div
        className="absolute inset-0 w-[200%] translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
        animate={{
          translateX: ["0%", "100%"],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatDelay: 2,
        }}
      />

      {/* Content */}
      <motion.div className="relative z-10">
        {children}
      </motion.div>
    </Component>
  );
}
