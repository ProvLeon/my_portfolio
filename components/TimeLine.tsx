"use client";

import { TimeLineData } from "@/constants";
import { motion } from "framer-motion";
import { FiClock, FiCheckCircle } from "react-icons/fi";

export default function TimeLine() {
  return (
    <section id="experience" className="py-32 relative text-foreground px-6 sm:px-12 md:px-24 overflow-hidden">
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
        <div className="mb-20 border-b border-border pb-8">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-muted mb-3 flex items-center gap-2">
            <FiClock className="w-3.5 h-3.5" /> Career Journey &amp; Milestones
          </span>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground">
            Engineering Evolution &amp; <br />
            <span className="text-muted font-light italic">
              Proven Track Record
            </span>
          </h2>
        </div>

        {/* Timeline Path */}
        <div className="relative border-l border-border ml-4 sm:ml-8 pl-6 sm:pl-12 space-y-12">
          {TimeLineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="relative group"
            >
              {/* Timeline Node Icon */}
              <div className="absolute -left-[31px] sm:-left-[55px] top-1.5 w-5 h-5 rounded-full bg-background border-2 border-border flex items-center justify-center group-hover:scale-125 group-hover:bg-foreground transition-all duration-300 shadow-md">
                <div className="w-1.5 h-1.5 rounded-full bg-foreground group-hover:bg-background" />
              </div>

              {/* Milestone Card */}
              <div className="p-6 sm:p-8 rounded-3xl glass-card border border-border glass-card-hover">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <span className="px-3.5 py-1 rounded-full bg-foreground/5 border border-border text-foreground font-mono text-xs font-semibold">
                    {item.year}
                  </span>
                  
                  {item.highlight && item.highlight.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.highlight.map((h, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-md bg-foreground/5 border border-border text-[10px] font-mono text-muted">
                          {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <p className="text-base text-muted font-light leading-relaxed">
                  {item.text}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

