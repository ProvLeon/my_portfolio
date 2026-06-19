"use client";

import { useEffect, useState, useRef } from "react";

export default function Cursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Check if device has a fine pointer (mouse)
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Animation loop for smooth spring-like follow
    let animationFrameId: number;
    const animate = () => {
      // Ease factor (higher = faster follow)
      const ease = 0.25;
      
      positionRef.current.x += (targetRef.current.x - positionRef.current.x) * ease;
      positionRef.current.y += (targetRef.current.y - positionRef.current.y) * ease;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${positionRef.current.x - 20}px, ${positionRef.current.y - 20}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9999] mix-blend-difference"
        style={{ willChange: "transform" }}
      >
        <div
          className="w-full h-full transition-transform duration-300 ease-out"
          style={{ transform: isHovering ? "scale(1.5)" : "scale(1)" }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            className={`w-full h-full transition-colors duration-300 ${
              isHovering ? "text-cyan-400" : "text-white"
            }`}
          >
            {/* Core Dot */}
            <circle cx="20" cy="20" r="1" fill="currentColor" />

            {/* Reticle Lines */}
            <line x1="20" y1="12" x2="20" y2="18" stroke="currentColor" strokeWidth="0.5" />
            <line x1="20" y1="22" x2="20" y2="28" stroke="currentColor" strokeWidth="0.5" />
            <line x1="12" y1="20" x2="18" y2="20" stroke="currentColor" strokeWidth="0.5" />
            <line x1="22" y1="20" x2="28" y2="20" stroke="currentColor" strokeWidth="0.5" />

            {/* Rotating Ring */}
            <g className="origin-center animate-[spin_4s_linear_infinite]">
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.2"
                strokeDasharray="2 4"
              />
            </g>

            {/* Inner Ring when hovering */}
            <circle
              cx="20"
              cy="20"
              r="8"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className={`transition-all duration-300 origin-center ${
                isHovering ? "opacity-100 scale-100" : "opacity-0 scale-50"
              }`}
            />
          </svg>
        </div>
      </div>

      <style jsx global>{`
        body * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}
