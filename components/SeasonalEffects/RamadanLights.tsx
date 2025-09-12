// components/SeasonalEffects/RamadanLights.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Light {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

export function RamadanLights() {
  const [lights, setLights] = useState<Light[]>([]);

  useEffect(() => {
    const newLights = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 5, // 5-15px
      delay: Math.random() * 2,
    }));
    setLights(newLights);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Crescent Moon */}
      <motion.div
        className="absolute top-10 right-10 w-20 h-20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full" />
          <div className="absolute -right-2 -top-2 w-16 h-16 bg-background rounded-full" />
        </div>
      </motion.div>

      {/* Lantern Lights */}
      {lights.map((light) => (
        <motion.div
          key={light.id}
          className="absolute"
          style={{
            left: `${light.x}%`,
            top: `${light.y}%`,
          }}
        >
          <motion.div
            className="relative"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2,
              delay: light.delay,
              repeat: Infinity,
            }}
          >
            {/* Lantern body */}
            <div
              className="w-4 h-6 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-lg"
              style={{ width: light.size, height: light.size * 1.5 }}
            />
            {/* Light glow */}
            <div
              className="absolute inset-0 bg-yellow-400/30 rounded-lg blur-xl"
              style={{ transform: "scale(1.5)" }}
            />
          </motion.div>
        </motion.div>
      ))}

      {/* Arabic Calligraphy Pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-20">
        <div className="h-full bg-[url('/patterns/arabic-pattern.png')] bg-repeat-x" />
      </div>
    </div>
  );
}
