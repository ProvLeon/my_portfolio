"use client";
// components/GradientCursor.tsx

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function GradientCursor() {
  const [cursorElements, setCursorElements] = useState<
    { x: number; y: number }[]
  >(
    [],
  );
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setCursorElements((prev) => [
        { x: e.clientX, y: e.clientY },
        ...prev.slice(0, 5),
      ]);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <>
      {cursorElements.map((pos, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none z-100 mix-blend-difference"
          style={{
            left: pos.x - 4,
            top: pos.y - 4,
          }}
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{
            opacity: 0,
            scale: 2,
          }}
          transition={{ duration: 0.5 }}
        >
          <div
            className={`w-2 h-2 rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-${
              50 - i * 10
            }`}
          />
        </motion.div>
      ))}
      <motion.div
        className="fixed w-4 h-4 rounded-full border-2 border-primary pointer-events-none z-50 mix-blend-difference"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          x: "-50%",
          y: "-50%",
        }}
      />
    </>
  );
}
