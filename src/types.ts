/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ImpactMetric {
  id: string;
  value: string;
  label: string;
  subtext?: string;
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  role: string;
  company: string;
  category: "Backend Platform" | "Distributed Systems" | "Full-Stack AI" | "Web Experience";
  summary: string;
  details: {
    challenge: string;
    action: string;
    outcome: string;
  };
  impactMetrics: ImpactMetric[];
  technologies: string[];
  imagePrompt: string; // The prompt describing the imagery or we can generate dynamic neon/luxurious canvas representations
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  percentage: number;
  category: "Core Systems" | "AI & Cloud Integrations" | "Distributed Frontend" | "Architecture & Culture";
  description: string;
  yearsOfExperience: number;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  customMetrics?: string[];
  skillsUsed: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  timestamp: string;
}

export type LuxuryAccent = "gold" | "emerald" | "bronze" | "platinum" | "crimson";

export interface PortfolioTheme {
  accent: LuxuryAccent;
  activeAccentColor: string; // Tailwind color hex/class
  activeGlowColor: string; // Tailwind glow classes
}
