"use client";

import { useEffect, useState, useRef } from "react";

export default function Cursor() {
  const [cursorText, setCursorText] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorTarget = target.closest("[data-cursor-text]") as HTMLElement;
      
      if (cursorTarget) {
        setCursorText(cursorTarget.getAttribute("data-cursor-text") || "");
        setIsHovering(true);
      } else if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        setCursorText("");
        setIsHovering(true);
      } else {
        setCursorText("");
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    let animationFrameId: number;
    const animate = () => {
      // Direct 1:1 mapping with no easing/lag
      positionRef.current.x = targetRef.current.x;
      positionRef.current.y = targetRef.current.y;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%)`;
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
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
        style={{ willChange: "transform" }}
      >
        <div
          className={`flex items-center justify-center rounded-full transition-all duration-300 ease-out ${
            cursorText
              ? "w-20 h-20 bg-[#FF4500] text-white font-bold text-[10px] tracking-widest uppercase shadow-xl shadow-[#FF4500]/30"
              : isHovering
              ? "w-12 h-12 bg-[#FF4500]/10 backdrop-blur-md border border-[#FF4500]/40 shadow-lg shadow-[#FF4500]/20"
              : "w-2.5 h-2.5 bg-[#FF4500] shadow-sm shadow-[#FF4500]/40"
          }`}
        >
          {cursorText && (
            <span className="animate-pulse">{cursorText}</span>
          )}
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

