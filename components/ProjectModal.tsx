"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types";
import { FiExternalLink, FiGithub, FiX, FiCpu, FiLayers, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { useLenis } from "lenis/react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const lenis = useLenis();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll and stop Lenis when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    }
    return () => {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    };
  }, [project, lenis]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
          
          {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/80 backdrop-blur-md"
        />

        {/* Modal Card Wrapper */}
        <motion.div
          layoutId={`project-card-${project.id}`}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] rounded-3xl bg-background border border-border shadow-2xl z-10 overflow-hidden flex flex-col"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 rounded-full bg-background hover:bg-muted/10 text-foreground transition-colors border border-border z-20 shadow-sm"
            aria-label="Close modal"
          >
            <FiX className="w-5 h-5" />
          </button>

          {/* Scrollable Content */}
          <div
            data-lenis-prevent="true"
            className="w-full h-full overflow-y-auto p-6 sm:p-10 text-foreground scrollbar-thin scrollbar-thumb-muted/30 hover:scrollbar-thumb-muted/50 relative"
          >

          {/* Header Tag & Title */}
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-background border border-border text-foreground text-xs font-mono uppercase tracking-wider">
              {project.category}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-foreground mb-4">
            {project.title}
          </h2>

          <p className="text-base sm:text-lg text-muted font-light leading-relaxed mb-8">
            {project.description}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap gap-4 mb-10 pb-8 border-b border-border/50">
            {project.visit && (
              <a
                href={project.visit}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-semibold text-xs uppercase tracking-wider hover:scale-[1.02] transition-all shadow-md"
              >
                <span>Live Demonstration</span>
                <FiExternalLink className="w-4 h-4" />
              </a>
            )}

            {project.source && (
              <a
                href={project.source}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-background hover:bg-foreground hover:text-background text-foreground font-semibold text-xs uppercase tracking-wider border border-border transition-all"
              >
                <FiGithub className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}
          </div>

          {/* Tech Stack Pills */}
          <div className="mb-10">
            <h3 className="text-xs uppercase tracking-widest text-muted font-mono mb-4 flex items-center gap-2">
              <FiLayers className="w-4 h-4" /> Architecture Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 rounded-full bg-background border border-border text-muted text-xs font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Key Features & System Capabilities */}
          {project.features && project.features.length > 0 && (
            <div className="mb-10">
              <h3 className="text-xs uppercase tracking-widest text-muted font-mono mb-4 flex items-center gap-2">
                <FiCheckCircle className="w-4 h-4" /> Core Capabilities & System Features
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.features.map((feature, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-background border border-border text-sm text-muted flex items-start gap-3"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Implementation Details */}
          {project.implementation && (
            <div className="mb-10 p-6 rounded-2xl bg-background border border-border">
              <h3 className="text-xs uppercase tracking-widest text-muted font-mono mb-3 flex items-center gap-2">
                <FiCpu className="w-4 h-4" /> Implementation Blueprint
              </h3>
              <p className="text-sm text-muted font-mono leading-relaxed whitespace-pre-line">
                {project.implementation}
              </p>
            </div>
          )}

          {/* Technical Challenges */}
          {project.challenges && project.challenges.length > 0 && (
            <div>
              <h3 className="text-xs uppercase tracking-widest text-muted font-mono mb-4 flex items-center gap-2">
                <FiAlertCircle className="w-4 h-4" /> Engineering Challenges Overcome
              </h3>
              <ul className="space-y-2">
                {project.challenges.map((challenge, i) => (
                  <li
                    key={i}
                    className="p-3 rounded-lg bg-background border border-border text-xs text-muted font-mono flex items-center gap-2"
                  >
                    <span className="text-foreground font-bold">&bull;</span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          </div>

        </motion.div>

      </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
