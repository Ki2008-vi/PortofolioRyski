/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from "react";
import { Project, LuxuryAccent } from "../types";
import { ExternalLink, Github, Sparkles, Server, Cpu, Database, Award } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ThreeDProjectCardProps {
  project: Project;
  accent: LuxuryAccent;
  onSelect: () => void;
}

export default function ThreeDProjectCard({ project, accent, onSelect }: ThreeDProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate percentage coordinates of hover within card
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    // Rotations bounded between negative/positive limits for safe 3D tilt
    const maxRotation = 12; // degrees
    const rY = ((x / rect.width) * 2 - 1) * maxRotation;
    const rX = (((y / rect.height) * 2 - 1) * -1) * maxRotation;

    setRotateY(rY);
    setRotateX(rX);
    setGlarePosition({ x: xPercent, y: yPercent });
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
  };

  // Get luxury-specific accent styles
  const getAccentColorClass = () => {
    switch (accent) {
      case "gold":
        return {
          text: "text-amber-400",
          border: "border-amber-400/30",
          bg: "bg-amber-400/10",
          shadow: "shadow-amber-500/10",
          badge: "bg-amber-500/10 text-amber-300 border-amber-500/20",
          light: "text-amber-100",
          glow: "from-amber-500/20 to-transparent",
        };
      case "emerald":
        return {
          text: "text-emerald-400",
          border: "border-emerald-400/30",
          bg: "bg-emerald-400/10",
          shadow: "shadow-emerald-500/10",
          badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
          light: "text-emerald-100",
          glow: "from-emerald-500/20 to-transparent",
        };
      case "bronze":
        return {
          text: "text-orange-400",
          border: "border-orange-400/30",
          bg: "bg-orange-400/10",
          shadow: "shadow-orange-500/10",
          badge: "bg-orange-500/10 text-orange-300 border-orange-500/20",
          light: "text-orange-100",
          glow: "from-orange-500/20 to-transparent",
        };
      case "platinum":
        return {
          text: "text-slate-300",
          border: "border-slate-400/30",
          bg: "bg-slate-400/10",
          shadow: "shadow-slate-400/10",
          badge: "bg-slate-400/10 text-slate-200 border-slate-400/20",
          light: "text-slate-100",
          glow: "from-slate-400/25 to-transparent",
        };
      case "crimson":
        return {
          text: "text-rose-500",
          border: "border-rose-500/30",
          bg: "bg-rose-500/10",
          shadow: "shadow-rose-500/10",
          badge: "bg-rose-500/10 text-rose-300 border-rose-500/20",
          light: "text-rose-100",
          glow: "from-rose-500/20 to-transparent",
        };
    }
  };

  const style = getAccentColorClass();

  // Pick category icon
  const getCategoryIcon = () => {
    switch (project.category) {
      case "Backend Platform":
        return <Server className={`h-5 w-5 ${style.text}`} />;
      case "Distributed Systems":
        return <Cpu className={`h-5 w-5 ${style.text}`} />;
      case "Full-Stack AI":
        return <Database className={`h-5 w-5 ${style.text}`} />;
      case "Web Experience":
        return <Sparkles className={`h-5 w-5 ${style.text}`} />;
    }
  };

  return (
    <div
      id={`project-card-container-${project.id}`}
      style={{ perspective: "1000px" }}
      className="w-full h-full relative"
    >
      <div
        id={`project-card-${project.id}`}
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={onSelect}
        className={`w-full h-full min-h-[380px] bg-neutral-950/80 backdrop-blur-xl border ${style.border} rounded-2xl p-6 md:p-8 cursor-pointer flex flex-col justify-between transition-all duration-200 relative overflow-hidden group select-none ${style.shadow} hover:shadow-2xl`}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Holographic interactive Glare Overlay */}
        <div
          id={`project-card-glare-${project.id}`}
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 mix-blend-color-dodge"
          style={{
            background: `radial-gradient(circle 180px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.12), transparent 80%)`,
          }}
        />

        {/* Ambient background glow matching chosen theme */}
        <div
          id={`project-card-glow-${project.id}`}
          className={`absolute -right-24 -top-24 w-48 h-48 rounded-full filter blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-br ${style.glow}`}
        />

        {/* Upper structural content */}
        <div className="z-10" style={{ transform: "translateZ(30px)" }}>
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-2.5">
              <div className={`p-2 rounded-lg bg-neutral-900 border ${style.border}`}>
                {getCategoryIcon()}
              </div>
              <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono">
                {project.category}
              </span>
            </div>

            {project.featured && (
              <span className={`flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full border ${style.border} ${style.bg} ${style.text}`}>
                <Award className="h-3 w-3" /> High Impact
              </span>
            )}
          </div>

          <h3 className="text-xl font-sans font-medium text-neutral-100 tracking-tight mb-2 group-hover:text-white transition-colors duration-200">
            {project.title}
          </h3>

          <p className="text-sm text-neutral-400 line-clamp-3 leading-relaxed mb-6">
            {project.summary}
          </p>
        </div>

        {/* Impact Metric display inside the card with high visual fidelity */}
        <div 
          className="grid grid-cols-3 gap-3 py-3 my-4 border-t border-b border-neutral-900/60 z-10"
          style={{ transform: "translateZ(45px)" }}
        >
          {project.impactMetrics.slice(0, 3).map((metric) => (
            <div key={metric.id} className="text-center">
              <div className={`text-base md:text-lg font-mono font-bold ${style.text} tracking-tight`}>
                {metric.value}
              </div>
              <div className="text-[9px] text-neutral-500 uppercase tracking-widest leading-tight mt-1 line-clamp-1">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Lower tech badges and interactive trigger */}
        <div className="z-10 flex flex-col gap-4 mt-auto" style={{ transform: "translateZ(20px)" }}>
          <div className="flex flex-wrap gap-1.5 max-h-16 overflow-hidden">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className={`text-[10px] font-mono px-2 py-0.5 rounded border ${style.badge}`}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-[10px] font-mono text-neutral-500 px-1.5 py-0.5">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-neutral-900/40 text-xs font-mono text-neutral-400 group-hover:text-white transition-colors duration-200">
            <span className="flex items-center gap-1">
              Case Study Spec <span className={`inline-block translate-x-0 group-hover:translate-x-1 transition-transform duration-200 ${style.text}`}>→</span>
            </span>
            <div className="flex items-center space-x-2">
              {project.githubUrl && (
                <button
                  id={`card-github-${project.id}`}
                  title="View Source"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.githubUrl, "_blank", "noopener,noreferrer");
                  }}
                  className="p-1 hover:text-white transition-colors duration-150"
                >
                  <Github className="h-4 w-4" />
                </button>
              )}
              {project.liveUrl && (
                <button
                  id={`card-live-${project.id}`}
                  title="Visit Project"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.liveUrl, "_blank", "noopener,noreferrer");
                  }}
                  className="p-1 hover:text-white transition-colors duration-150"
                >
                  <ExternalLink className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
