"use client";
// components/Projects/Projects.tsx (refined with filters & richer modal)

import { useRef, useState, useMemo } from "react";
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
  FiLayers,
  FiList,
  FiTerminal,
  FiX,
  FiFilter,
  FiAlertTriangle,
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
import { Project } from "@/types";

type ModalTab = "overview" | "features" | "architecture" | "challenges" | "preview";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<ModalTab>("overview");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [search, setSearch] = useState("");

  // Derive categories
  const categories = useMemo(
    () =>
      ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    []
  );

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const catOk = categoryFilter === "All" || p.category === categoryFilter;
      const searchOk =
        !search.trim() ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) =>
          t.toLowerCase().includes(search.toLowerCase())
        );
      return catOk && searchOk;
    });
  }, [categoryFilter, search]);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-32 left-1/3 w-[55rem] h-[55rem] bg-primary/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -left-40 w-[45rem] h-[45rem] bg-secondary/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 right-0 w-[60rem] h-[60rem] bg-accent/10 rounded-full blur-[180px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(255,255,255,0.04),transparent_70%)]" />
      </div>

      <div className="container mx-auto px-4">
        <SectionHeading
          title="Featured Projects"
          subtitle="Selective highlights demonstrating architectural rigor, performance consciousness, and product impact"
        />

        {/* Filters */}
        <div className="mt-10 mb-12 flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => {
              const active = cat === categoryFilter;
              return (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`
                    px-4 py-2 rounded-full text-xs font-medium tracking-wide
                    border transition-all duration-300 flex items-center gap-2
                    ${active
                      ? "bg-primary/20 border-primary/40 text-primary shadow-sm"
                      : "bg-gray-800/40 border-gray-700/40 text-gray-400 hover:text-gray-200 hover:border-primary/30"
                    }
                  `}
                >
                  {active && <FiFilter className="w-3.5 h-3.5" />}
                  {cat}
                </button>
              );
            })}
          </div>
          <div className="relative w-full max-w-sm">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or tech..."
              className="w-full bg-gray-900/60 border border-gray-700/50 rounded-lg px-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 backdrop-blur-md"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary"
              >
                <FiX className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onViewDetails={() => {
                setSelectedProject(project);
                setActiveTab("overview");
              }}
            />
          ))}
          {filteredProjects.length === 0 && (
            <div className="col-span-full text-center text-gray-400 text-sm py-10">
              No projects match your query.
            </div>
          )}
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
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
      transition={{ duration: 0.55, delay: index * 0.08 }}
    >
      <div
        ref={cardRef}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-xl overflow-hidden bg-gray-900/50 backdrop-blur-xl
                   border border-gray-800/50 hover:border-primary/40
                   transition-all duration-300 h-full group"
      >
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/60 to-transparent" />
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-primary/15 border border-primary/30 text-primary">
            {project.category}
          </div>

          {/* View Details Layer */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center pointer-events-none group-hover:pointer-events-auto">
            <button
              onClick={handleViewDetails}
              className="relative z-10 bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full
                       border border-white/20 text-white font-medium
                       flex items-center gap-2 hover:bg-white/20 transition-colors text-sm"
            >
              <FiMaximize2 className="w-4 h-4" />
              View Details
            </button>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors line-clamp-1">
            {project.title}
          </h3>

          <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 6).map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2.5 py-1 rounded-full
                         bg-gray-800/50 text-gray-300 border border-gray-700/50
                         tracking-wide"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 6 && (
              <span className="text-[11px] px-2 py-1 rounded-full bg-gray-800/50 text-gray-400 border border-gray-700/50">
                +{project.tags.length - 6}
              </span>
            )}
          </div>

          {/* Project Links */}
          <div className="flex gap-3 pt-2">
            <ProjectLink
              href={project.visit}
              icon={FiExternalLink}
              text="Demo"
              primary
            />
            <ProjectLink
              href={project.source}
              icon={FiGithub}
              text="Code"
            />
            <button
              onClick={handleViewDetails}
              className="ml-auto text-xs text-primary flex items-center gap-1 hover:underline"
            >
              <FiInfo className="w-3.5 h-3.5" />
              Details
            </button>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/25 via-transparent to-secondary/25 blur-xl" />
        </div>
      </div>
    </motion.div>
  );
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  activeTab: ModalTab;
  setActiveTab: (t: ModalTab) => void;
}

function ProjectModal({ project, onClose, activeTab, setActiveTab }: ProjectModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-label={`Project details for ${project.title}`}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.93, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-gray-800/90 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden border border-gray-700/40 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-800/60 hover:bg-gray-700/70 border border-gray-600/40 transition-colors"
          aria-label="Close project modal"
        >
          <FiX className="w-5 h-5 text-gray-300" />
        </button>

        {/* Header / Hero */}
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 flex flex-col gap-3">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-gray-200 to-white/70 bg-clip-text text-transparent">
              {project.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary font-medium tracking-wide">
                {project.category}
              </span>
              <ProjectLink
                href={project.visit}
                icon={FiExternalLink}
                text="Live"
                primary
              />
              <ProjectLink
                href={project.source}
                icon={FiGithub}
                text="Code"
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-800/70 bg-gray-900/40 backdrop-blur">
          <ModalTabButton
            label="Overview"
            tab="overview"
            icon={FiInfo}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <ModalTabButton
            label="Features"
            tab="features"
            icon={FiList}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <ModalTabButton
            label="Architecture"
            tab="architecture"
            icon={FiLayers}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <ModalTabButton
            label="Challenges"
            tab="challenges"
            icon={FiAlertTriangle}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <ModalTabButton
            label="Preview"
            tab="preview"
            icon={FiExternalLink}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        {/* Body */}
        <div className="relative h-[calc(90vh-56px-224px)] overflow-y-auto custom-scrollbar">
          {activeTab === "preview" ? (
            <PreviewTab project={project} />
          ) : (
            <div className="p-6 md:p-8 space-y-10">
              {activeTab === "overview" && <OverviewTab project={project} />}
              {activeTab === "features" && <FeaturesTab project={project} />}
              {activeTab === "architecture" && <ArchitectureTab project={project} />}
              {activeTab === "challenges" && <ChallengesTab project={project} />}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

interface ModalTabButtonProps {
  label: string;
  tab: ModalTab;
  icon: IconType;
  activeTab: ModalTab;
  setActiveTab: (t: ModalTab) => void;
}

function ModalTabButton({ label, tab, icon: Icon, activeTab, setActiveTab }: ModalTabButtonProps) {
  const active = tab === activeTab;
  return (
    <button
      onClick={() => setActiveTab(tab)}
      className={`
        relative px-4 py-2 rounded-lg text-xs font-medium tracking-wide flex items-center gap-2
        transition-all duration-300 border
        ${active
          ? "bg-primary/20 border-primary/40 text-primary shadow-inner"
          : "bg-gray-800/40 border-gray-700/40 text-gray-400 hover:text-gray-200 hover:border-primary/30"
        }
      `}
    >
      <Icon className="w-4 h-4" />
      {label}
      {active && (
        <motion.span
          layoutId="tab-indicator"
          className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 opacity-30"
        />
      )}
    </button>
  );
}

function OverviewTab({ project }: { project: Project }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">Summary</h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          {project.description}
        </p>
      </div>
      <div>
        <h4 className="text-sm font-semibold tracking-wide text-primary/80 mb-3 uppercase">
          Tech Stack
        </h4>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="px-3 py-1.5 rounded-md bg-gray-800/50 border border-gray-700/50 text-[11px] font-medium tracking-wide text-gray-300"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeaturesTab({ project }: { project: Project }) {
  if (!project.features?.length) {
    return (
      <p className="text-gray-400 text-sm">
        No feature list available for this project.
      </p>
    );
  }
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Key Features</h3>
      <ul className="space-y-2">
        {project.features.map((f, i) => (
          <motion.li
            key={f + i}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-start gap-2 text-gray-300 text-sm"
          >
            <FiCheck className="w-4 h-4 text-primary mt-0.5" />
            {f}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function ArchitectureTab({ project }: { project: Project }) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
        <FiTerminal className="w-5 h-5 text-primary" />
        Implementation & Architecture
      </h3>
      <div className="prose prose-invert max-w-none text-gray-300 text-sm leading-relaxed">
        {project.implementation
          ? project.implementation
          : "Architecture details not provided for this project."}
      </div>
    </div>
  );
}

function ChallengesTab({ project }: { project: Project }) {
  if (!project.challenges?.length) {
    return (
      <p className="text-gray-400 text-sm">
        No challenges documented for this project.
      </p>
    );
  }
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
        <FiAlertTriangle className="w-5 h-5 text-primary" />
        Technical Challenges
      </h3>
      <ul className="space-y-2">
        {project.challenges.map((c, i) => (
          <motion.li
            key={c + i}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex items-start gap-2 text-gray-300 text-sm"
          >
            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary/70" />
            {c}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function PreviewTab({ project }: { project: Project }) {
  return (
    <div className="h-full">
      <div className="relative w-full h-full min-h-[300px]">
        {/* Loading State */}
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
        </div>

        {/* Live Preview */}
        <iframe
          src={project.visit}
          title={`${project.title} preview`}
          className="w-full h-full border-0"
          onLoad={(e) => {
            e.currentTarget.previousElementSibling?.classList.add("hidden");
          }}
        />

        {/* Preview Controls */}
        <div className="absolute bottom-4 right-4 flex gap-2 z-20">
          <a
            href={project.visit}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary/90 hover:bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 text-xs"
          >
            <FiExternalLink className="w-4 h-4" />
            Open in New Tab
          </a>
        </div>
      </div>
    </div>
  );
}

// Tag icon mapping
function getTagIcon(tag: string) {
  const iconMap: Record<string, JSX.Element> = {
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
  };

  const tagMappings = Object.entries(iconMap).map(([key, value]) => ({
    key,
    value,
    normalized: key.toLowerCase(),
  }));

  const match = tagMappings.find(
    (mapping) => mapping.normalized === tag.toLowerCase()
  );

  return match ? match.value : null;
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
        relative z-10 flex items-center gap-2 text-xs font-medium
        px-4 py-2 rounded-full
        transition-all duration-300 tracking-wide
        ${primary
          ? "bg-primary/20 text-primary hover:bg-primary/30"
          : "bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/40"
        }
        border border-transparent hover:border-primary/30
      `}
    >
      <Icon className="w-4 h-4" />
      {text}
    </a>
  );
}
