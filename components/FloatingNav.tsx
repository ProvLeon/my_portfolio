"use client";
// components/FloatingNav.tsx

import { motion } from "framer-motion";
import { navigationLinks } from "@/constants";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 },
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
    >
      <nav className="flex flex-col items-center gap-6">
        {navigationLinks.map(({ name, path }) => (
          <Link
            key={name}
            href={path}
            className="group relative flex items-center gap-4"
          >
            <span className="absolute right-full mr-4 text-sm font-medium text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
              {name}
            </span>
            <motion.div
              className={`h-3 w-3 rounded-full border-2 border-primary transition-all
                ${
                activeSection === path.slice(1)
                  ? "bg-primary scale-125"
                  : "bg-transparent"
              }`}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.9 }}
            />
          </Link>
        ))}
      </nav>
    </motion.div>
  );
}
