import { ComponentType } from "react";

import { IconType } from "react-icons";

export interface NavigationLink {
  name: string;
  path: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: ComponentType | IconType;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  source: string;
  visit: string;
  category: string;
  features: string[];
  implementation: string;
  challenges: string[];
}

export interface Technology {
  title: string;
  icon: ComponentType | IconType;
  description: string;
}

export interface TimeLineItem {
  year: number | string; // Allow both number and string
  text: string;
}

export interface Achievement {
  number: number;
  text: string;
}

export interface HeadingContent {
  title: string;
  description: string;
  small?: string;
}

// export interface SocialLink {
//   platform: string;
//   url: string;
//   icon: ComponentType;
// }

export interface HeroButtonProps {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}

export interface TechSkill {
  title: string;
  skills: string[];
}

export interface TechStack {
  [key: string]: TechSkill;
}

export interface Experiences {
  skill: string;
  years: number;
  color: string;
}

export interface TechCategoryProps {
  category: string;
  title: string;
  skills: string[];
  index: number;
  Icon: IconType;
}

export interface SkillItemProps {
  skill: string;
  delay: number;
  index?: number;
}

export interface ExperienceSectionProps {
  isInView: boolean;
}

export interface Milestone {
  year: string;
  project: string;
  description: string;
  link?: string;
  metrics?: string[];
  icon: string;
  techs?: string[];
  impact?: string[];
  category?: string;
  status?: "completed" | "in-progress";
}

export interface OngoingProject {
  project: string;
  description: string;
  expectedCompletion?: string;
  status?: string;
  techs?: string[];
  progress?: number;
}

export interface CareerMilestones {
  completed: Milestone[];
  ongoing: OngoingProject[];
  futureGoals: string[];
}
