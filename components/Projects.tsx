"use client";
// components/Projects/Projects.tsx

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/constants";
import { use3DTilt } from "@/hooks/use3DTilt";
import { SectionHeading } from "@/components/shared/SectionHeading";
import Image from "next/image";
import {
  FiCheck,
  FiExternalLink,
  FiGithub,
  FiInfo,
  FiMaximize2,
  FiX,
} from "react-icons/fi";
import type { IconType } from "react-icons";

import {
  SiAmazon,
  SiDjango,
  SiDocker,
  SiFirebase,
  SiFlutter,
  SiGooglecloud,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] animate-pulse-slow delay-1000" />
      </div>

      <div className="container mx-auto px-4">
        <SectionHeading
          title="Featured Projects"
          subtitle="A showcase of my best work and personal projects"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onViewDetails={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

interface ProjectCardProps {
  project: any;
  index: number;
  onViewDetails: () => void;
}

function ProjectCard({ project, index, onViewDetails }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const tilt = use3DTilt(cardRef);

  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onViewDetails();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div
        ref={cardRef}
        style={{
          transform:
            `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-xl overflow-hidden bg-gray-900/50 backdrop-blur-sm
                   border border-gray-800/50 hover:border-primary/30
                   transition-all duration-300 h-full group"
      >
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

          {/* View Details Button */}
          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100
                     flex items-center justify-center transition-opacity duration-300">
            <button
              onClick={handleViewDetails}
              className="relative z-10 bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full
                       border border-white/20 text-white font-medium
                       flex items-center gap-2 hover:bg-white/20 transition-colors"
            >
              <FiMaximize2 />
              View Details
            </button>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-6 space-y-4">
          <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          <p className="text-gray-400 text-sm line-clamp-3">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag: string) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full
                         bg-gray-800/50 text-gray-300
                         border border-gray-700/50"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Project Links */}
          <div className="flex gap-4 pt-4">
            <ProjectLink
              href={project.visit}
              icon={FiExternalLink}
              text="Live Demo"
              primary
            />
            <ProjectLink
              href={project.source}
              icon={FiGithub}
              text="Source"
            />
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 blur-xl" />
        </div>
      </div>
    </motion.div>
  );
}

interface ProjectModalProps {
  project: any;
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "details">("preview");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-900/90 rounded-xl w-full max-w-6xl max-h-[90vh] overflow-hidden relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
        >
          <FiX className="w-6 h-6" />
        </button>

        {/* Tabs */}
        <div className="flex items-center gap-4 p-4 border-b border-gray-800">
          <TabButton
            active={activeTab === "preview"}
            onClick={() => setActiveTab("preview")}
            icon={FiExternalLink}
          >
            Live Preview
          </TabButton>
          <TabButton
            active={activeTab === "details"}
            onClick={() => setActiveTab("details")}
            icon={FiInfo}
          >
            Project Details
          </TabButton>
        </div>

        <div className="relative h-[calc(90vh-4rem)] overflow-y-auto">
          {activeTab === "preview"
            ? <PreviewTab project={project} />
            : <DetailsTab project={project} />}
        </div>
      </motion.div>
    </motion.div>
  );
}

interface TabButtonProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  icon: IconType;
}

function TabButton({ children, active, onClick, icon: Icon }: TabButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg
        transition-all duration-300
        ${
        active
          ? "bg-primary/20 text-primary"
          : "text-gray-400 hover:text-white hover:bg-gray-800/50"
      }
      `}
    >
      <Icon className="w-4 h-4" />
      {children}
    </motion.button>
  );
}

function PreviewTab({ project }) {
  return (
    <div className="h-full">
      <div className="relative w-full h-full min-h-[300px]">
        {/* Loading State */}
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
        </div>

        {/* Live Preview */}
        <iframe
          src={project.visit}
          title={`${project.title} preview`}
          className="w-full h-full border-0"
          onLoad={(e) => {
            // Hide loading state when iframe loads
            e.currentTarget.previousElementSibling?.classList.add("hidden");
          }}
        />

        {/* Preview Controls */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <a
            href={project.visit}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary/90 hover:bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FiExternalLink />
            Open in New Tab
          </a>
        </div>
      </div>
    </div>
  );
}

function DetailsTab({ project }) {
  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Project Header */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-white">
          {project.title}
        </h2>
        <div className="flex items-center gap-4">
          <ProjectLink
            href={project.visit}
            icon={FiExternalLink}
            text="Live Demo"
            primary
          />
          <ProjectLink
            href={project.source}
            icon={FiGithub}
            text="Source Code"
          />
        </div>
      </div>

      {/* Project Image */}
      <div className="relative h-64 rounded-xl overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Project Description */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">About the Project</h3>
        <p className="text-gray-300 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Tech Stack */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Technologies Used</h3>
        <div className="flex flex-wrap gap-3">
          {project.tags.map((tag: string) => (
            <motion.span
              key={tag}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="px-4 py-2 rounded-lg bg-gray-800/50 text-gray-300
                       border border-gray-700/50 text-sm flex items-center gap-2"
            >
              {getTagIcon(tag)}
              {tag}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Key Features */}
      {project.features && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Key Features</h3>
          <ul className="space-y-2">
            {project.features.map((feature: string, index: number) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2 text-gray-300"
              >
                <FiCheck className="w-5 h-5 text-primary mt-1" />
                {feature}
              </motion.li>
            ))}
          </ul>
        </div>
      )}

      {/* Implementation Details */}
      {project.implementation && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Implementation</h3>
          <p className="text-gray-300 leading-relaxed">
            {project.implementation}
          </p>
        </div>
      )}
    </div>
  );
}

// Helper function to get icon for tech stack tags
function getTagIcon(tag: string) {
  const iconMap = {
    React: <SiReact className="w-4 h-4" />,
    "Next.js": <SiNextdotjs className="w-4 h-4" />,
    TypeScript: <SiTypescript className="w-4 h-4" />,
    "Node.js": <SiNodedotjs className="w-4 h-4" />,
    Python: <SiPython className="w-4 h-4" />,
    Django: <SiDjango className="w-4 h-4" />,
    Docker: <SiDocker className="w-4 h-4" />,
    Firebase: <SiFirebase className="w-4 h-4" />,
    Flutter: <SiFlutter className="w-4 h-4" />,
    TailwindCSS: <SiTailwindcss className="w-4 h-4" />,
    PostgreSQL: <SiPostgresql className="w-4 h-4" />,
    MongoDB: <SiMongodb className="w-4 h-4" />,
    "Google Maps API": <SiGooglecloud className="w-4 h-4" />,
    AWS: <SiAmazon className="w-4 h-4" />,
    // Add more mappings as needed
  };

  // Handle case-insensitive matching
  const normalizedTag = Object.keys(iconMap).find(
    (key) => key.toLowerCase() === tag.toLowerCase(),
  );

  return normalizedTag ? iconMap[normalizedTag] : null;
}

interface ProjectLinkProps {
  href: string;
  icon: IconType;
  text: string;
  primary?: boolean;
}

function ProjectLink({ href, icon: Icon, text, primary }: ProjectLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        relative z-10 flex items-center gap-2 text-sm
        px-4 py-2 rounded-full
        transition-all duration-300
        ${
        primary
          ? "bg-primary/20 text-primary hover:bg-primary/30"
          : "bg-gray-800/50 text-gray-400 hover:text-white"
      }
        border border-transparent hover:border-primary/30
      `}
    >
      <Icon className="w-4 h-4" />
      {text}
    </a>
  );
}
