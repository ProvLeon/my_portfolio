// components/SeasonalEffects/SnowfallEffect.tsx
"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

interface Snowflake {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
}

export default function SnowfallEffect() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  const controls = useAnimation();

  useEffect(() => {
    // Create initial snowflakes
    const initialSnowflakes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      size: Math.random() * 8 + 4,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
    }));

    setSnowflakes(initialSnowflakes);

    // Animate snowflakes
    controls.start((i) => ({
      y: ["0vh", "100vh"],
      x: [
        snowflakes[i]?.x,
        snowflakes[i]?.x + Math.sin(i) * 100,
        snowflakes[i]?.x,
      ],
      transition: {
        duration: snowflakes[i]?.duration,
        delay: snowflakes[i]?.delay,
        repeat: Infinity,
        ease: "linear",
      },
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          custom={flake.id}
          animate={controls}
          className="absolute top-0"
          style={{
            left: flake.x,
            width: flake.size,
            height: flake.size,
          }}
        >
          <div
            className="w-full h-full rounded-full bg-white opacity-80
                     backdrop-blur-sm shadow-lg"
            style={{
              animation: `twinkle ${Math.random() * 3 + 2}s infinite`,
            }}
          />
        </motion.div>
      ))}

      {/* Add seasonal gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />

      <style jsx>
        {`
        @keyframes twinkle {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.4; }
        }
      `}
      </style>
    </div>
  );
}
