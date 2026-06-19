"use client";

import { TimeLineData } from "@/constants";

export default function TimeLine() {
  return (
    <section id="experience" className="py-32 relative text-white px-12 md:px-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-sm font-medium tracking-[0.2em] uppercase text-white/50 mb-24">
          Experience
        </h2>

        <div className="flex flex-col">
          {TimeLineData.map((item, index) => (
            <div 
              key={index} 
              className="group relative flex flex-col md:flex-row md:items-start justify-between py-12 border-b border-white/10 hover:border-white/30 transition-colors duration-500 cursor-none"
            >
              <div className="w-full md:w-1/4 mb-4 md:mb-0">
                <span className="text-sm tracking-widest uppercase text-white/40 group-hover:text-white/80 transition-colors duration-500">
                  {item.year}
                </span>
              </div>
              
              <div className="w-full md:w-3/4 flex flex-col md:flex-row md:items-start justify-between gap-8">
                <div className="md:w-2/3">
                  <h3 className="text-2xl md:text-4xl font-light tracking-tight mb-4 group-hover:-translate-y-1 transition-transform duration-500 ease-out">
                    {item.highlight && item.highlight.length > 0 ? item.highlight[0] : "Milestone"}
                  </h3>
                  <div className="text-sm text-white/50 tracking-wide font-light max-w-xl group-hover:text-white/80 transition-colors duration-500 leading-relaxed">
                    {item.text}
                  </div>
                </div>
                
                <div className="md:w-1/3 md:text-right">
                  {item.highlight && item.highlight.slice(1).map((h, i) => (
                    <h4 key={i} className="text-sm tracking-widest uppercase text-white/40 group-hover:text-white/80 transition-colors duration-500">
                      {h}
                    </h4>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
