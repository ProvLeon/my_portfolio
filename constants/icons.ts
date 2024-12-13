import {
  SiAmazon,
  SiDjango,
  SiDocker,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGraphql,
  SiKubernetes,
  SiLinux,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

import type { IconType } from "react-icons";

// Define the icon mapping with proper typing
const iconMap: Record<string, IconType> = {
  "React": SiReact,
  "Next.js": SiNextdotjs,
  "TypeScript": SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  "Python": SiPython,
  "Django": SiDjango,
  "Docker": SiDocker,
  "AWS": SiAmazon,
  "Node.js": SiNodedotjs,
  "MongoDB": SiMongodb,
  "PostgreSQL": SiPostgresql,
  "GraphQL": SiGraphql,
  "Git": SiGit,
  "Linux": SiLinux,
  "Figma": SiFigma,
  "Firebase": SiFirebase,
  "Kubernetes": SiKubernetes,
  "Vercel": SiVercel,
};

export { iconMap };
