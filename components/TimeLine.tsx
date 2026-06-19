"use client";

import { motion } from "framer-motion";
import { TimeLineData } from "@/constants";

export default function Timeline() {
  return (
    <section id="experience" className="py-32 relative border-t border-white/10 bg-black text-white px-12 md:px-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase">Experience</h2>
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/50 mt-4">
            // Professional Timeline
          </p>
        </div>
      </div>

      <div className="relative border-l border-white/10 ml-2 md:ml-0">
        {TimeLineData.map((item, index) => (
          <div key={index} className="relative pl-8 md:pl-12 pb-16 last:pb-0 group">
            {/* Timeline Node */}
            <div className="absolute left-[-4px] top-1.5 w-2 h-2 bg-black border border-white/40 group-hover:bg-white transition-colors duration-300" />
            
            {/* Content */}
            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 mb-4">
              <h3 className="font-mono text-[12px] md:text-[14px] uppercase tracking-widest text-white/60 min-w-[100px]">
                {item.year}
              </h3>
              <div className="w-full h-px bg-white/10 hidden md:block" />
            </div>

            <div className="max-w-3xl">
              <p className="text-sm md:text-base text-white/80 leading-relaxed font-mono">
                {item.text}
              </p>
              
              {item.highlight && item.highlight.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {item.highlight.map((h, i) => (
                    <span 
                      key={i} 
                      className="font-mono text-[9px] uppercase tracking-widest text-white/40 bg-white/5 px-2 py-1 border border-white/10"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
