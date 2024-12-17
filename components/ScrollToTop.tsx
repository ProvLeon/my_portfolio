"use client";
// components/ScrollToTop/index.tsx

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiArrowUp } from "react-icons/hi";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full
                     bg-gradient-to-r from-primary to-secondary
                     text-white shadow-lg shadow-primary/20
                     hover:shadow-xl hover:shadow-primary/30
                     transition-all duration-300
                     backdrop-blur-sm"
        >
          <div className="relative">
            {/* Main Arrow */}
            <HiArrowUp className="w-6 h-6" />

            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-white/20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Ripple Effect */}
            <motion.div
              className="absolute -inset-2 rounded-full border-2 border-primary/30"
              animate={{
                scale: [1, 1.5],
                opacity: [0.3, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          </div>

          {/* Tooltip */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -top-8 -left-5 -translate-x-1/2
                       text-sm text-gray-400 bg-gray-900/80
                       px-2 py-1 rounded-md whitespace-nowrap
                       backdrop-blur-sm"
          >
            Back to top
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// Alternative version with progress indicator
export function ScrollToTopWithProgress() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const toggleVisibility = () => {
    const windowHeight = document.documentElement.scrollHeight -
      window.innerHeight;
    const currentPosition = window.pageYOffset;
    const scrollProgress = (currentPosition / windowHeight) * 100;

    setProgress(scrollProgress);
    setIsVisible(currentPosition > 300);
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50"
        >
          {/* Progress Circle */}
          <svg className="w-12 h-12 transform -rotate-90">
            <circle
              cx="24"
              cy="24"
              r="20"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              className="text-gray-700"
            />
            <motion.circle
              cx="24"
              cy="24"
              r="20"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeDasharray="126.92"
              strokeDashoffset={126.92 - (progress * 126.92) / 100}
              className="text-primary"
            />
          </svg>

          {/* Arrow Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                y: [2, -2, 2],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <HiArrowUp className="w-6 h-6 text-white" />
            </motion.div>
          </div>

          {/* Hover Effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-0 transition-opacity"
            whileHover={{ opacity: 0.2 }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
