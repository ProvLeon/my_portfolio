"use client";

import { useRef } from "react";
import CountUp from "react-countup";
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
    <section ref={sectionRef} id="accomplishments" className="py-24 md:py-32 bg-background w-full px-6 sm:px-12 md:px-24">
      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* Section Header */}
        <div ref={headerRef} className="mb-16 border-b border-border/50 pb-8 opacity-0">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-muted mb-3 flex items-center gap-2">
            <FiAward className="w-3.5 h-3.5 text-[#FF4500]" /> Quantitative Metrics &amp; Impact
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
              className="group p-8 rounded-3xl bg-white shadow-sm border border-border hover:border-[#FF4500]/30 transition-all duration-300 flex flex-col justify-between opacity-0"
            >
              <div className="flex items-center justify-between mb-6">
                <FiTrendingUp className="w-5 h-5 text-foreground group-hover:text-[#FF4500] transition-colors" />
                <span className="text-[10px] font-mono text-muted group-hover:text-[#FF4500] transition-colors uppercase tracking-widest">
                  Metric 0{index + 1}
                </span>
              </div>

              <div>
                <div className="text-4xl sm:text-6xl font-bold font-mono tracking-tight text-foreground mb-2 flex items-baseline">
                  <CountUp start={0} end={item.number} duration={2.5} separator="," enableScrollSpy scrollSpyOnce />
                  <span className="text-foreground group-hover:text-[#FF4500] transition-colors">+</span>
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

