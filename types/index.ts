import { ComponentType } from "react";

interface Project {
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
  icon: ComponentType;
  description: string;
}

export interface TimeLineItem {
  year: number;
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

export interface SocialLink {
  platform: string;
  url: string;
  icon: ComponentType;
}

export interface HeroButtonProps {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}
