"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);
  const isVisibleRef = useRef(false);

  const show = useCallback(() => {
    if (isVisibleRef.current) return;
    isVisibleRef.current = true;
    if (dotRef.current) dotRef.current.style.opacity = "1";
    if (ringRef.current) ringRef.current.style.opacity = "1";
  }, []);

  const hide = useCallback(() => {
    if (!isVisibleRef.current) return;
    isVisibleRef.current = false;
    if (dotRef.current) dotRef.current.style.opacity = "0";
    if (ringRef.current) ringRef.current.style.opacity = "0";
  }, []);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // --- GSAP Performance Optimizers ---
    const dotSetX = gsap.quickSetter(dot, "x", "px");
    const dotSetY = gsap.quickSetter(dot, "y", "px");

    const ringXTo = gsap.quickTo(ring, "x", {
      duration: 0.55,
      ease: "power3.out",
    });
    const ringYTo = gsap.quickTo(ring, "y", {
      duration: 0.55,
      ease: "power3.out",
    });

    // --- Mouse Move ---
    const handleMouseMove = (e: MouseEvent) => {
      show();
      dotSetX(e.clientX);
      dotSetY(e.clientY);
      ringXTo(e.clientX);
      ringYTo(e.clientY);
    };

    // --- Hover Detection ---
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        target.closest("[data-cursor-hover]") !== null ||
        window.getComputedStyle(target).cursor === "pointer";

      if (isInteractive && !isHoveringRef.current) {
        isHoveringRef.current = true;
        ring.classList.add("cursor-ring--glass");
        gsap.to(ring, {
          width: 60,
          height: 60,
          duration: 0.5,
          ease: "back.out(1.2)",
        });
        gsap.to(dot, {
          scale: 0.5,
          duration: 0.35,
          ease: "power3.out",
        });
      } else if (!isInteractive && isHoveringRef.current) {
        isHoveringRef.current = false;
        ring.classList.remove("cursor-ring--glass");
        gsap.to(ring, {
          width: 36,
          height: 36,
          duration: 0.45,
          ease: "power3.out",
        });
        gsap.to(dot, {
          scale: 1,
          duration: 0.35,
          ease: "power3.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
    };
  }, [show, hide]);

  return (
    <>
      {/* Outer Ring / Glass Lens - rendered first so it's behind the dot */}
      <div ref={ringRef} className="cursor-ring" style={{ opacity: 0 }} />

      {/* Inner Dot - rendered second so it stays on top and crisp */}
      <div ref={dotRef} className="cursor-dot" style={{ opacity: 0 }} />

      <style jsx global>{`
        @media (pointer: fine) {
          body *,
          body a,
          body button {
            cursor: none !important;
          }
        }

        .cursor-dot,
        .cursor-ring {
          position: fixed;
          top: 0;
          left: 0;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          will-change: transform;
          transform: translate(-50%, -50%);
        }

        /* --- Default: Clean dot + ring (mix-blend-mode inversion) --- */
        .cursor-dot {
          width: 8px;
          height: 8px;
          background-color: white;
          mix-blend-mode: difference;
          transition: opacity 0.3s ease;
        }

        .cursor-ring {
          width: 36px;
          height: 36px;
          border: 1px solid white;
          background: transparent;
          mix-blend-mode: difference;
          transition:
            opacity 0.3s ease,
            background 0.4s ease,
            border-color 0.4s ease,
            box-shadow 0.4s ease,
            backdrop-filter 0.4s ease,
            mix-blend-mode 0s linear 0s;
        }

        /* --- Hover: True Apple Glass --- */
        /* Smooth, frosted, no messy distortion, with precise specular highlights */
        .cursor-ring--glass {
          mix-blend-mode: normal;
          border-color: transparent;
          
          /* Gentle diagonal gradient for the glass body */
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.25) 0%,
            rgba(255, 255, 255, 0.05) 100%
          );

          /* Clean, heavy frost (no SVG displacement map) */
          backdrop-filter: blur(16px) saturate(160%);
          -webkit-backdrop-filter: blur(16px) saturate(160%);

          /* Layered shadows for physical volume and edge lighting */
          box-shadow:
            inset 0 0 0 1px rgba(255, 255, 255, 0.15), /* Fine inner rim */
            inset 0 2px 6px rgba(255, 255, 255, 0.6),   /* Top specular highlight */
            inset 0 -2px 6px rgba(0, 0, 0, 0.15),       /* Bottom inner shadow */
            0 8px 24px rgba(0, 0, 0, 0.2);              /* Elegant drop shadow */
        }
      `}</style>
    </>
  );
}
