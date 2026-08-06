"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/constants";
import { Project } from "@/types";
import ProjectModal from "./ProjectModal";
import { FiGrid, FiList, FiArrowUpRight } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const categories = ["All", "Professional Services", "Research & Development", "Agriculture & Investment", "Industrial Services", "Media & Education", "Developer Tools", "Productivity", "Security", "AI & Automation"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const clipRectRef = useRef<SVGRectElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !clipRectRef.current) return;

    gsap.fromTo(clipRectRef.current,
      { attr: { height: 0 } },
      {
        attr: { height: 1000 },
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 70%",
          scrub: 1,
        },
      }
    );

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

    gsap.fromTo(
      filtersRef.current,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, { scope: sectionRef });

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section ref={sectionRef} id="projects" className="py-24 md:py-32 bg-background w-full px-6 sm:px-12 md:px-24 relative overflow-hidden">
      
      {/* Narrative Thread Segment 4 */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden hidden lg:block z-0">
        <svg width="100%" height="100%" viewBox="0 0 1440 1000" preserveAspectRatio="none">
          <clipPath id="projects-clip">
            <rect x="0" y="0" width="1440" height="0" ref={clipRectRef} />
          </clipPath>
          <path
            d="M 720 0 C 720 333, 960 333, 960 500 C 960 666, 720 666, 720 1000"
            stroke="#FF4500"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            clipPath="url(#projects-clip)"
            style={{ filter: "drop-shadow(0px 0px 8px rgba(255,69,0,0.5))" }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 pb-8 border-b border-border/50 opacity-0">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-foreground font-medium text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground"></span>
              Portfolio
            </div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.1]">
              Latest Works
            </h2>
          </div>

          {/* View Switcher Controls */}
          <div className="flex items-center gap-2 p-1.5 rounded-full border border-border shrink-0 bg-white shadow-sm">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                viewMode === "grid" ? "bg-foreground text-background" : "text-muted hover:text-foreground"
              }`}
            >
              <FiGrid className="w-4 h-4" /> Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                viewMode === "list" ? "bg-foreground text-background" : "text-muted hover:text-foreground"
              }`}
            >
              <FiList className="w-4 h-4" /> List
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div ref={filtersRef} className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none opacity-0">
          {categories.slice(0, 6).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center px-4 py-2 rounded-full text-xs font-mono tracking-wider whitespace-nowrap transition-all border ${
                activeCategory === cat
                  ? "bg-foreground border-foreground text-background"
                  : "border-border text-muted hover:border-foreground/30 hover:text-foreground bg-white"
              }`}
            >
              {activeCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500] shadow-[0_0_8px_rgba(255,69,0,0.5)] mr-2"></span>}
              {cat}
            </button>
          ))}
        </div>

        {/* --- GRID VIEW --- */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project, idx) => (
                <motion.div
                  layoutId={`project-card-${project.id}`}
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  onClick={() => setSelectedProject(project)}
                  data-cursor-text="INSPECT"
                  className="group flex flex-col cursor-pointer"
                >
                  {/* Large Editorial Image */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-[#e5e5e5] group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_-15px_rgba(255,69,0,0.15)] transition-all duration-700">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0"
                    />
                    
                    {/* Hover Overlay Arrow */}
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-[#FF4500] shadow-xl shadow-[#FF4500]/30 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500">
                        <FiArrowUpRight className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Clean Text Below Image */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-foreground mb-1">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted">
                        {project.category}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* --- LIST VIEW --- */}
        {viewMode === "list" && (
          <div className="flex flex-col">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  data-cursor-text="VIEW"
                  className="group relative flex flex-col md:flex-row md:items-center justify-between py-8 md:py-10 border-b border-border/50 hover:border-[#FF4500]/30 transition-colors duration-500 cursor-pointer"
                >
                  <div className="flex items-start md:items-center gap-6 md:gap-12">
                    <span className="text-sm font-mono tracking-widest text-muted/50 group-hover:text-[#FF4500] transition-colors">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    
                    <div>
                      <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground group-hover:translate-x-2 transition-all duration-500">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted font-light max-w-xl mt-3 line-clamp-1">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0 flex items-center gap-6">
                    <span className="text-xs font-mono uppercase tracking-widest text-muted px-4 py-1.5 rounded-full border border-border bg-white group-hover:border-[#FF4500]/30 transition-colors">
                      {project.category}
                    </span>
                    <FiArrowUpRight className="w-6 h-6 text-muted group-hover:text-[#FF4500] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

    </section>
  );
}

