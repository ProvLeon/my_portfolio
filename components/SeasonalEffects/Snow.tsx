// components/SeasonalEffects/Snow.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Snowflake {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  rotation: number;
  pattern: number;
  variation: string;
}

// Base SVG patterns for different snowflake designs
const SNOWFLAKE_PATTERNS = [
  // Basic patterns
  `M0 0 L10 0 M0 0 L-10 0 M0 0 L0 10 M0 0 L0 -10 M0 0 L7 7 M0 0 L-7 -7 M0 0 L7 -7 M0 0 L-7 7`,
  `M0 0 L12 0 M0 0 L-12 0 M0 0 L0 12 M0 0 L0 -12 M0 0 L8 8 M0 0 L-8 -8 M0 0 L8 -8 M0 0 L-8 8`,
  `M0 0 L15 0 M0 0 L-15 0 M0 0 L0 15 M0 0 L0 -15 M0 0 L10 10 M0 0 L-10 -10 M0 0 L10 -10 M0 0 L-10 10`,

  // Complex crystalline pattern
  `M0 0 L15 0 M0 0 L-15 0 M0 0 L0 15 M0 0 L0 -15
   M0 0 L10 10 M0 0 L-10 -10 M0 0 L10 -10 M0 0 L-10 10
   M7 0 L10 3 M-7 0 L-10 3 M0 7 L3 10 M0 -7 L3 -10`,

  // Delicate branching pattern
  `M0 0 L12 0 M8 0 L10 2 M8 0 L10 -2
   M0 0 L-12 0 M-8 0 L-10 2 M-8 0 L-10 -2
   M0 0 L0 12 M0 8 L2 10 M0 8 L-2 10
   M0 0 L0 -12 M0 -8 L2 -10 M0 -8 L-2 -10`,

  // Star-like pattern
  `M0 0 L15 0 M0 0 L-15 0 M0 0 L0 15 M0 0 L0 -15
   M0 0 L7.5 13 M0 0 L-7.5 13 M0 0 L7.5 -13 M0 0 L-7.5 -13
   M0 0 L13 7.5 M0 0 L-13 7.5 M0 0 L13 -7.5 M0 0 L-13 -7.5`,
];

function generateSnowflakeVariation(basePattern: string): string {
  // Add random small details to the base pattern
  const details = Array.from({ length: Math.random() * 4 + 2 }, () => {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 5 + 5;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    return `M${x} ${y} L${x + 2} ${y + 2}`;
  }).join(" ");

  // Add fractal-like details
  const fractalDetails = Array.from({ length: 3 }, () => {
    const scale = Math.random() * 0.3 + 0.2;
    return basePattern
      .split(" ")
      .map((cmd) => {
        if (cmd.includes(",")) {
          const [x, y] = cmd.split(",").map(Number);
          return `${x * scale},${y * scale}`;
        }
        return cmd;
      })
      .join(" ");
  }).join(" ");

  return `${basePattern} ${details} ${fractalDetails}`;
}

export function Snow() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    // Create snowflakes with enhanced random properties
    const flakes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 10 + 5, // Larger size range for better visibility
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 7,
      rotation: Math.random() * 360,
      pattern: Math.floor(Math.random() * SNOWFLAKE_PATTERNS.length),
      variation: generateSnowflakeVariation(
        SNOWFLAKE_PATTERNS[
          Math.floor(Math.random() * SNOWFLAKE_PATTERNS.length)
        ],
      ),
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Snowflakes */}
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute"
          style={{
            left: `${flake.x}%`,
            width: flake.size,
            height: flake.size,
          }}
          animate={{
            y: ["-5vh", "105vh"],
            x: [0, Math.sin(flake.id) * 30], // Swaying motion
            rotate: [0, 360], // Continuous rotation
          }}
          transition={{
            duration: flake.duration,
            delay: flake.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Crystalline Snowflake */}
          <motion.div
            className="relative w-full h-full snowflake-crystal"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Main snowflake structure */}
            <svg
              viewBox="-20 -20 40 40"
              className="absolute inset-0 w-full h-full"
              style={{ transform: `rotate(${flake.rotation}deg)` }}
            >
              {/* Glassy background */}
              <circle
                r="15"
                fill="url(#snowflakeGradient)"
                className="opacity-40"
              />

              {/* Base crystalline pattern */}
              <path
                d={SNOWFLAKE_PATTERNS[flake.pattern]}
                stroke="white"
                strokeWidth="0.8"
                className="opacity-80"
              />

              {/* Variation pattern */}
              <path
                d={flake.variation}
                stroke="white"
                strokeWidth="0.4"
                className="opacity-60"
              />

              {/* Additional decorative elements */}
              {Array.from({ length: 6 }).map((_, i) => (
                <g
                  key={i}
                  transform={`rotate(${i * 60})`}
                  className="opacity-60"
                >
                  <circle r="1" cx="8" fill="white" />
                  <path
                    d="M4 0 L12 0"
                    stroke="white"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                  />
                </g>
              ))}

              {/* Enhanced gradients */}
              <defs>
                <radialGradient id="snowflakeGradient">
                  <stop offset="0%" stopColor="white" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="white" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="white" stopOpacity="0.2" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </svg>

            {/* Glowing effects */}
            <div className="absolute inset-0">
              {/* <div className="absolute inset-0 rounded-full bg-white/30 blur-sm snowflake-sparkle" /> */}
              {/* <div className="absolute inset-0 rounded-full bg-blue-100/20 blur-md" /> */}
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Enhanced atmosphere effects */}
      {/* <div className="absolute inset-0"> */}
        {/* Depth fog effect */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent winter-atmosphere" /> */}
        {/* Subtle blue tint for winter atmosphere */}
        {/* <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay" /> */}
      {/* </div> */}

      <style jsx>
        {`
        @keyframes sparkle {
          0%,
          100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(0.95);
          }
        }

        .snowflake-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }
      `}
      </style>
    </div>
  );
}
