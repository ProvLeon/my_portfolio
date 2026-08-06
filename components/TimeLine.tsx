"use client";

import { TimeLineData } from "@/constants";
import { motion } from "framer-motion";
import { FiClock, FiCheckCircle } from "react-icons/fi";

export default function TimeLine() {
  return (
    <section id="experience" className="py-32 relative text-white px-6 sm:px-12 md:px-24">
      
      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* Section Header */}
        <div className="mb-20 border-b border-white/10 pb-8">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#a3a3a3] mb-3 flex items-center gap-2">
            <FiClock className="w-3.5 h-3.5" /> Career Journey &amp; Milestones
          </span>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
            Engineering Evolution &amp; <br />
            <span className="text-[#a3a3a3] font-light italic">
              Proven Track Record
            </span>
          </h2>
        </div>

        {/* Timeline Path */}
        <div className="relative border-l border-white/15 ml-4 sm:ml-8 pl-6 sm:pl-12 space-y-12">
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
              <div className="absolute -left-[31px] sm:-left-[55px] top-1.5 w-5 h-5 rounded-full bg-[#050505] border-2 border-white/30 flex items-center justify-center group-hover:scale-125 group-hover:bg-white transition-all duration-300 shadow-md shadow-white/20">
                <div className="w-1.5 h-1.5 rounded-full bg-white group-hover:bg-[#050505]" />
              </div>

              {/* Milestone Card */}
              <div className="p-6 sm:p-8 rounded-3xl glass-card border border-white/10 glass-card-hover">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <span className="px-3.5 py-1 rounded-full bg-white/5 border border-white/30 text-white font-mono text-xs font-semibold">
                    {item.year}
                  </span>
                  
                  {item.highlight && item.highlight.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.highlight.map((h, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] font-mono text-[#a3a3a3]">
                          {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <p className="text-base text-[#a3a3a3] font-light leading-relaxed">
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

