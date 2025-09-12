"use client";

import { Suspense } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

function ScrollIndicatorContent() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-100"
      style={{ scaleX }}
    />
  );
}

export default function ScrollIndicator() {
  return (
    <Suspense fallback={null}>
      <ScrollIndicatorContent />
    </Suspense>
  );
}
