"use client";

import { useRef } from "react";
import { techStack } from "@/constants";
import { FiCode, FiServer, FiCpu, FiFigma, FiTerminal } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const categoryIcons = {
  "Frontend Development": FiCode,
  "Backend Development": FiServer,
  "Tools & Platforms": FiCpu,
  "Design & Collaboration": FiFigma,
};

export default function Technologies() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const clipRectRef = useRef<SVGRectElement>(null);

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

    // SVG Animation
    if (clipRectRef.current) {
      gsap.to(clipRectRef.current, {
        height: 1000,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
        },
      });
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="technologies" className="py-24 md:py-32 bg-background w-full px-6 sm:px-12 md:px-24 border-t border-border/50 relative overflow-hidden">
      {/* Background SVG Thread */}
      <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1440 1000" preserveAspectRatio="none">
          <defs>
            <clipPath id="tech-clip">
              <rect x="0" y="0" width="1440" height="0" ref={clipRectRef} />
            </clipPath>
          </defs>
          <path
            d="M 720 0 C 720 333, 480 333, 480 500 C 480 666, 720 666, 720 1000"
            stroke="#FF4500"
            strokeWidth="2.5"
            fill="none"
            clipPath="url(#tech-clip)"
            className="drop-shadow-[0_0_8px_rgba(255,69,0,0.5)]"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* Section Header */}
        <div ref={headerRef} className="mb-16 border-b border-border/50 pb-8 opacity-0">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-muted mb-3 flex items-center gap-2">
            <FiTerminal className="w-3.5 h-3.5 text-[#FF4500]" /> Technical Mastery &amp; Stack
          </span>
          <h2 className="text-4xl sm:text-6xl font-medium tracking-tight text-foreground leading-[1.1]">
            Core Engineering <br />
            <span className="text-muted font-light italic">
              Capabilities &amp; Tech Stack
            </span>
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.values(techStack).map((category, idx) => {
            const Icon = categoryIcons[category.title as keyof typeof categoryIcons] || FiCode;

            return (
              <div
                key={category.title}
                className="group p-8 rounded-3xl bg-white shadow-sm border border-border hover:border-[#FF4500]/30 transition-all duration-300 flex flex-col justify-between opacity-0"
              >
                <div>
                  {/* Category Icon & Title */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center text-foreground group-hover:border-[#FF4500]/40 group-hover:bg-[#FF4500]/10 transition-colors">
                      <Icon className="w-5 h-5 group-hover:text-[#FF4500] transition-colors" />
                    </div>
                    <h3 className="text-base font-medium text-foreground tracking-wide">
                      {category.title}
                    </h3>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-mono text-muted hover:text-foreground hover:bg-[#FF4500]/10 hover:border-[#FF4500]/40 transition-all duration-300 cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-border/50 flex items-center justify-between text-[10px] font-mono text-muted uppercase tracking-wider group-hover:border-[#FF4500]/20 transition-colors">
                  <span>Category 0{idx + 1}</span>
                  <span className="group-hover:text-[#FF4500] transition-colors">{category.skills.length} Skills</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

