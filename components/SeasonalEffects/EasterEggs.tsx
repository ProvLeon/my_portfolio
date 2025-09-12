// components/SeasonalEffects/EasterEggs.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaEgg } from "react-icons/fa";
import { GiEasterEgg } from "react-icons/gi";
import { IoMdFlash } from "react-icons/io"; // We'll use this for the crack effect

interface Egg {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  pattern: number;
  crackState: "none" | "cracking" | "cracked";
  delay: number;
}

const TEXTCOLORS = [
  "text-pink-500",
  "text-sky-500",
  "text-yellow-500",
  "text-purple-500",
  "text-emerald-500",
];

const EASTER_MESSAGE = {
  main: "Happy Easter!",
  sub: "Click eggs to reveal surprises",
  hint: "Find all the hidden chicks",
};

const generateTransitionConfig = (index: number) => ({
  duration: 3,
  delay: index * 0.2,
  ease: "easeInOut",
});

const generateEggPosition = () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
});

// At the top of your file, add these color utilities
const generateRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 30) + 70; // 70-100%
  const lightness = Math.floor(Math.random() * 20) + 60; // 60-80%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

// Enhanced color palette with dynamic generation
const DYNAMIC_COLORS = Array.from({ length: 10 }, () => ({
  base:
    `from-${generateRandomColor()} via-${generateRandomColor()} to-${generateRandomColor()}`,
  shadow: `shadow-${generateRandomColor()}/30`,
  highlight: `bg-${generateRandomColor()}`,
  pattern: `stroke-${generateRandomColor()}`,
  texture:
    `from-${generateRandomColor()}/20 via-transparent to-${generateRandomColor()}/20`,
}));

// Update the renderFloatingElement function
const RenderFloatingElement = (index: number) => {
  const [position, setPosition] = useState(() => generateEggPosition());
  const [currentColor, setCurrentColor] = useState(generateRandomColor());
  const [nextColor, setNextColor] = useState(generateRandomColor());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentColor(nextColor);
      setNextColor(generateRandomColor());
      setPosition(generateEggPosition());
    }, 5000);

    return () => clearInterval(intervalId);
  }, [nextColor]);

  return (
    <motion.div
      key={index}
      className="absolute transform-gpu"
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      animate={{
        x: [position.x, position.x + Math.random() * 50 - 25],
        y: [position.y, position.y + Math.random() * 50 - 25],
        opacity: [0.7, 1, 0.7],
        // scale: [0.9, 1.1, 0.9],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    >
      <motion.div
        className="relative"
        style={{
          width: `${Math.random() * 10 + 20}px`, // Varying sizes
          height: `${Math.random() * 10 + 20}px`,
        }}
        // animate={{
        //   rotate: [0, 360],
        // }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {index % 2 === 0
          ? (
            <GiEasterEgg
              className="transition-all duration-1000 ease-in-out transform-gpu w-full h-full"
              style={{
                color: currentColor,
                filter: "drop-shadow(0 0 10px rgba(255,255,255,0.3))",
              }}
            />
          )
          : (
            <FaEgg
              className="transition-all duration-1000 ease-in-out transform-gpu w-full h-full"
              style={{
                color: currentColor,
                filter: "drop-shadow(0 0 10px rgba(255,255,255,0.3))",
              }}
            />
          )}

        {/* Enhanced glow effect */}
        {
          /* <motion.div
          className="absolute inset-0 rounded-full blur-xl"
          animate={{
            backgroundColor: [currentColor, nextColor],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        /> */
        }
      </motion.div>
    </motion.div>
  );
};

// Update your component to include color cycling
export function EasterEggs() {
  const [eggs, setEggs] = useState<Egg[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [colorPalette, setColorPalette] = useState(DYNAMIC_COLORS);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [currentBackground, setCurrentBackground] = useState(
    generateRandomColor(),
  );
  const [nextBackground, setNextBackground] = useState(generateRandomColor());

  // Add window size tracking
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  // useEffect(() => {
  //   const handleResize = () => {
  //     setWindowSize({
  //       width: window.innerWidth,
  //       height: window.innerHeight,
  //     });
  //   };

  //   window.addEventListener("resize", handleResize);
  //   handleResize(); // Initial size

  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  useEffect(() => {
    const backgroundInterval = setInterval(() => {
      setCurrentBackground(nextBackground);
      setNextBackground(generateRandomColor());
    }, 5000);

    return () => clearInterval(backgroundInterval);
  }, [nextBackground]);

  useEffect(() => {
    // Color cycling interval
    const colorInterval = setInterval(() => {
      setColorPalette((prevPalette) => {
        const newColor = {
          base:
            `from-${generateRandomColor()} via-${generateRandomColor()} to-${generateRandomColor()}`,
          shadow: `shadow-${generateRandomColor()}/30`,
          highlight: `bg-${generateRandomColor()}`,
          pattern: `stroke-${generateRandomColor()}`,
          texture:
            `from-${generateRandomColor()}/20 via-transparent to-${generateRandomColor()}/20`,
        };
        return [...prevPalette.slice(1), newColor];
      });
      setCurrentColorIndex((prev) => (prev + 1) % colorPalette.length);
    }, 1000);

    return () => clearInterval(colorInterval);
  }, []);

  return (
    <>
      {/* Enhanced Easter Message with better hierarchy */}
      {/* <RenderMessage /> */}
      {/* Add a subtle game progress indicator */}
      {
        /* <motion.div
        className="fixed top-4 right-4 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
          <p className="text-sm text-white/60">
            Found: {eggs.filter((egg) => egg.crackState === "cracked").length} /
            {" "}
            {eggs.length - 1}
          </p>
        </div>
      </motion.div> */
      }

      {/* Eggs Container */}
      <div className="fixed inset-0 z-40">
        {/* Background Effects */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: [
              "radial-gradient(circle at 30% 30%, rgba(255,182,193,0.1) 0%, transparent 60%)",
              "radial-gradient(circle at 70% 70%, rgba(255,218,185,0.1) 0%, transparent 60%)",
            ],
          }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
        />

        {/* Eggs */}
        {
          /* <div className="relative w-full h-full">
          {eggs.map((egg) => (
            <motion.div
              key={egg.id}
              className="absolute"
              style={{
                left: `${egg.x}%`,
                top: `${egg.y}%`,
                delay: egg.delay,
              }}
              initial={{ scale: 0, y: -50 }}
              animate={{
                scale: 1,
                y: 0,
                rotate: egg.rotation,
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
            >
              <motion.div
                className="cursor-pointer transform-gpu"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleEggClick(egg.id)} // Add onClick here as well
              >
                {renderEgg(egg)}
              </motion.div>
            </motion.div>
          ))}
        </div> */
        }

        {/* Updated Floating Elements Container */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="relative w-full h-full">
            <motion.div
              className="fixed inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: i * 0.1,
                    duration: 1,
                  }}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {RenderFloatingElement(i)}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Ambient Light */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-pink-500/5 via-purple-500/5 to-transparent" />
        <div className="absolute inset-0 bg-gradient-radial from-yellow-500/5 via-orange-500/5 to-transparent" />
      </div>

      {/* Interactive Hint */}
      {
        /* <motion.div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-white/80 text-sm">
            Click the eggs to discover surprises! 🎉
          </p>
        </motion.div>
      </motion.div> */
      }

      {/* Add distribution helper (optional, for development) */}
      <style jsx global>
        {`
              .distribution-grid {
                position: fixed;
                inset: 0;
                display: grid;
                grid-template-columns: repeat(8, 1fr);
                grid-template-rows: repeat(8, 1fr);
                pointer-events: none;
                opacity: 0.1;
                z-index: 100;
              }
              .distribution-grid > div {
                border: 1px solid white;
              }
            `}
      </style>
    </>
  );
}
