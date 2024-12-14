"use client";
// components/ui/LoadingSpinner.tsx

import { motion } from "framer-motion";

function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative w-64 h-64">
        {/* Laptop Base */}
        <motion.div
          className="absolute bottom-0 w-full h-2 bg-gray-700 rounded-full"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* Laptop Screen */}
        <motion.div
          className="absolute bottom-2 w-full h-40 bg-gray-800 rounded-lg overflow-hidden
                     border-2 border-gray-700 shadow-lg"
          initial={{ rotateX: 90 }}
          animate={{ rotateX: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Code Lines */}
          <div className="p-4 space-y-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.2 }}
              >
                {/* Line Number */}
                <span className="text-xs text-gray-500">{i + 1}</span>

                {/* Code Line */}
                <motion.div
                  className="h-2 rounded-full"
                  style={{
                    width: `${Math.random() * 50 + 50}%`,
                    background:
                      "linear-gradient(90deg, var(--color-primary) 0%, var(--color-secondary) 100%)",
                  }}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Cursor */}
          <motion.div
            className="absolute w-2 h-4 bg-primary"
            animate={{
              opacity: [1, 0],
              x: [0, 200],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>

        {/* Loading Text */}
        <motion.div
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <p className="text-primary font-medium mb-2">Loading</p>
          <div className="flex gap-1 justify-center">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-primary"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Floating Elements */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            {["</", "{}", "/>", "=>", "()"][i]}
          </motion.div>
        ))}

        {/* Glowing Effect */}
        <div className="absolute inset-0 bg-gradient-radial from-primary/20 to-transparent animate-pulse-slow" />
      </div>
    </div>
  );
}

// Alternative Version with Different Animation
function LoadingSpinnerAlt() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative">
        {/* Monitor Frame */}
        <motion.div
          className="w-72 h-48 bg-gray-800 rounded-lg p-4 shadow-2xl
                     border-2 border-gray-700"
          animate={{
            scale: [1, 1.02, 1],
            rotateY: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Code Window */}
          <div className="h-full bg-gray-900 rounded overflow-hidden">
            {/* Window Header */}
            <div className="flex items-center gap-2 p-2 border-b border-gray-800">
              <div className="flex gap-1">
                {["bg-red-500", "bg-yellow-500", "bg-green-500"].map((
                  color,
                  i,
                ) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${color}`}
                  />
                ))}
              </div>
              <div className="flex-1 h-2 bg-gray-800 rounded-full" />
            </div>

            {/* Animated Code */}
            <div className="p-4 space-y-3">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.2 }}
                >
                  <motion.div
                    className="w-full h-2 rounded-full bg-gradient-to-r from-primary/50 to-secondary/50"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      width: ["60%", "100%", "60%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Monitor Stand */}
        <motion.div
          className="w-8 h-8 bg-gray-700 mx-auto -mt-1 rounded"
          animate={{ rotateZ: [0, 5, -5, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="w-16 h-2 bg-gray-600 mx-auto rounded-full"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Loading Text */}
        <motion.p
          className="text-center mt-6 text-primary font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
}

export { LoadingSpinner, LoadingSpinnerAlt };
