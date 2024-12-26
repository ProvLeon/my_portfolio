// components/SeasonalEffects/EasterEggs.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Egg {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
}

const COLORS = [
  "from-pink-400 to-purple-500",
  "from-yellow-400 to-orange-500",
  "from-green-400 to-emerald-500",
  "from-blue-400 to-indigo-500",
];

export function EasterEggs() {
  const [eggs, setEggs] = useState<Egg[]>([]);

  useEffect(() => {
    const newEggs = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 20 + 20, // 20-40px
    }));
    setEggs(newEggs);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {eggs.map((egg) => (
        <motion.div
          key={egg.id}
          className={`absolute bg-gradient-to-br ${egg.color} rounded-full`}
          style={{
            left: `${egg.x}%`,
            top: `${egg.y}%`,
            width: egg.size,
            height: egg.size * 1.3, // Make eggs slightly oval
          }}
          initial={{ scale: 0, rotate: egg.rotation }}
          animate={{
            scale: [0, 1, 0.9, 1],
            rotate: [egg.rotation, egg.rotation + 360],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: Math.random() * 2,
          }}
        >
          {/* Add decorative patterns */}
          <motion.div
            className="absolute inset-2 bg-white/20 rounded-full"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      ))}
    </div>
  );
}
