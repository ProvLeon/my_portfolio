"use client";

import { techStack } from "@/constants";

export default function Technologies() {
  return (
    <section id="technologies" className="py-32 relative text-white px-12 md:px-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-sm font-medium tracking-[0.2em] uppercase text-white/50 mb-24">
          Core Capabilities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-8">
          {Object.values(techStack).map((category) => (
            <div key={category.title} className="group">
              <h3 className="text-sm uppercase tracking-widest text-white/60 mb-8 border-b border-white/10 pb-4">
                {category.title}
              </h3>
              <ul className="flex flex-col gap-4">
                {category.skills.map((tech) => (
                  <li 
                    key={tech} 
                    className="text-2xl md:text-3xl font-light tracking-tight hover:translate-x-4 transition-transform duration-500 ease-out cursor-none hover:text-white/80 text-white/40"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
