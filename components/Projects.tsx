"use client";

import { projects } from "@/constants";

export default function Projects() {
  return (
    <section id="projects" className="py-48 relative text-white px-12 md:px-24">
      
      <div className="max-w-7xl mx-auto">
        <h2 className="text-sm font-medium tracking-[0.2em] uppercase text-white/50 mb-24">
          Selected Works
        </h2>

        <div className="flex flex-col">
          {projects.map((project, index) => (
            <a 
              key={project.id}
              href={project.visit}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col md:flex-row md:items-center justify-between py-12 md:py-16 border-b border-white/10 hover:border-white/30 transition-colors duration-500 cursor-none"
            >
              <div className="flex items-start md:items-center gap-8 md:gap-16">
                <span className="text-sm font-medium tracking-widest text-white/30 group-hover:text-white/60 transition-colors duration-500">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                
                <div>
                  <h3 className="text-4xl md:text-7xl font-medium tracking-tight mb-4 group-hover:-translate-y-2 transition-transform duration-500 ease-out">
                    {project.title}
                  </h3>
                  <p className="text-sm text-white/50 tracking-wide font-light max-w-xl group-hover:text-white/80 transition-colors duration-500">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="mt-8 md:mt-0 flex flex-col md:items-end gap-2 text-sm tracking-widest uppercase text-white/40 group-hover:text-white/80 transition-colors duration-500">
                <span>{project.category}</span>
                <span className="text-xs">{project.tags[0]}</span>
              </div>

              {/* Hover Image Reveal Overlay (Optional, could be tied to WebGL instead) */}
              {/* For now, we rely on the WebGL fluid background for the primary visual impact */}
            </a>
          ))}
        </div>
      </div>

    </section>
  );
}
