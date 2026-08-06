"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  separator?: string;
}

export default function AnimatedNumber({
  value,
  duration = 2,
  delay = 0,
  decimals = 0,
  separator = ",",
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        motionValue.set(value);
      }, delay * 1000);
    }
  }, [inView, motionValue, value, delay]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        const formatted = Number(latest).toFixed(decimals);
        const parts = formatted.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
        ref.current.textContent = parts.join(".");
      }
    });
  }, [springValue, decimals, separator]);

  return <span ref={ref}>0</span>;
}
