"use client";

import { useRef } from "react";
import AnimatedNumber from "./AnimatedNumber";
import { achievements } from "@/constants";
import { FiAward, FiTrendingUp } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Accomplishments() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Header reveal
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    // Staggered Cards
    gsap.fromTo(
      cardsRef.current?.children ? Array.from(cardsRef.current.children) : [],
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="accomplishments" className="py-24 md:py-32 bg-background w-full px-6 sm:px-12 md:px-24 relative overflow-hidden">
      {/* Background SVG Thread */}
      <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1440 1000" preserveAspectRatio="none">
          <path
            d="M 720 0 L 720 1000"
            stroke="var(--color-primary)"
            strokeWidth="2.5"
            fill="none"
            className="drop-shadow-[0_0_8px_rgba(255,69,0,0.5)]"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* Section Header */}
        <div ref={headerRef} className="mb-16 border-b border-border/50 pb-8 opacity-0">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-muted mb-3 flex items-center gap-2">
            <FiAward className="w-3.5 h-3.5 text-primary" /> Quantitative Metrics &amp; Impact
          </span>
          <h2 className="text-4xl sm:text-6xl font-medium tracking-tight text-foreground leading-[1.1]">
            Engineering Reach &amp; <br />
            <span className="text-muted font-light italic">
              Commercial Impact
            </span>
          </h2>
        </div>

        {/* Bento Grid Callouts */}
        <div ref={cardsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="group p-8 rounded-3xl bg-background shadow-sm border border-border hover:border-primary/30 transition-all duration-300 flex flex-col justify-between opacity-0"
            >
              <div className="flex items-center justify-between mb-6">
                <FiTrendingUp className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
                <span className="text-[10px] font-mono text-muted group-hover:text-primary transition-colors uppercase tracking-widest">
                  Metric 0{index + 1}
                </span>
              </div>

              <div>
                <div className="text-4xl sm:text-6xl font-bold font-mono tracking-tight text-foreground mb-2 flex items-baseline">
                  <AnimatedNumber value={item.number} duration={2.5} separator="," />
                  <span className="text-foreground group-hover:text-primary transition-colors">+</span>
                </div>

                <span className="text-xs font-mono uppercase tracking-wider text-muted">
                  {item.text}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

