"use client";

import { techStack } from "@/constants";

export default function Technologies() {
  return (
    <section id="technologies" className="py-32 relative border-t border-white/10 bg-black text-white px-12 md:px-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase">Systems & Tech</h2>
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/50 mt-4">
            // Core Competencies & Tooling
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10 border border-white/10">
        {Object.entries(techStack).map(([category, { title, skills }]) => (
          <div key={category} className="bg-black p-8 md:p-12 hover:bg-white/5 transition-colors duration-500">
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-8 border-b border-white/10 pb-4">
              [ {title} ]
            </h3>
            <div className="flex flex-wrap gap-x-6 gap-y-4">
              {skills.map((skill) => (
                <span 
                  key={skill} 
                  className="text-lg md:text-xl font-bold uppercase tracking-tight text-white/80 hover:text-white transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
