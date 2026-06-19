"use client";

import { useState } from "react";
import { projects } from "@/constants";
import Image from "next/image";
import { Project } from "@/types";

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-32 relative border-t border-white/10 bg-black text-white px-12 md:px-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase">Projects</h2>
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/50 mt-4">
            // Selected Works [2022-2026]
          </p>
        </div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-white/50">
          Total Entries: {projects.length}
        </div>
      </div>

      <div className="flex flex-col border-t border-white/10">
        {projects.map((project, index) => (
          <div
            key={project.id}
            onMouseEnter={() => setHoveredProject(project)}
            onMouseLeave={() => setHoveredProject(null)}
            className="group relative grid grid-cols-1 md:grid-cols-12 gap-8 py-8 border-b border-white/10 hover:bg-white/5 transition-colors duration-300"
          >
            {/* Project Index */}
            <div className="col-span-1 md:col-span-1 font-mono text-[10px] text-white/40 pt-2">
              {(index + 1).toString().padStart(2, "0")}
            </div>

            {/* Project Info */}
            <div className="col-span-1 md:col-span-4 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-2">
                {project.title}
              </h3>
              <p className="font-mono text-[9px] uppercase tracking-widest text-white/50">
                {project.category}
              </p>
            </div>

            {/* Project Description & Tags */}
            <div className="col-span-1 md:col-span-5 flex flex-col justify-center gap-4">
              <p className="text-sm text-white/70 leading-relaxed font-mono">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="font-mono text-[8px] uppercase tracking-widest border border-white/20 px-2 py-1 text-white/60">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="col-span-1 md:col-span-2 flex items-center md:justify-end gap-6 font-mono text-[10px] uppercase tracking-widest">
              <a href={project.visit} target="_blank" rel="noopener noreferrer" className="hover:text-white text-white/50 transition-colors">
                [ Live ]
              </a>
              <a href={project.source} target="_blank" rel="noopener noreferrer" className="hover:text-white text-white/50 transition-colors">
                [ Code ]
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Image Reveal (Desktop Only) */}
      <div 
        className={`hidden lg:block fixed pointer-events-none z-50 w-96 h-64 right-12 bottom-12 border border-white/20 p-2 bg-black overflow-hidden transition-all duration-300 ${
          hoveredProject ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="relative w-full h-full">
          {hoveredProject && (
            <Image 
              src={hoveredProject.image} 
              alt={hoveredProject.title}
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          )}
        </div>
      </div>

    </section>
  );
}
