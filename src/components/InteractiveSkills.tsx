/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Skill, LuxuryAccent } from "../types";
import { TECHNICAL_SKILLS } from "../data";
import { BookOpen, Cpu, ShieldAlert, Award, Layers, Workflow, Terminal } from "lucide-react";
import { motion } from "motion/react";

interface InteractiveSkillsProps {
  accent: LuxuryAccent;
}

type SkillCategory = "All" | "Core Systems" | "AI & Cloud Integrations" | "Distributed Frontend" | "Architecture & Culture";

export default function InteractiveSkills({ accent }: InteractiveSkillsProps) {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>("All");
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  const categories: SkillCategory[] = ["All", "Core Systems", "AI & Cloud Integrations", "Distributed Frontend", "Architecture & Culture"];

  const filteredSkills = TECHNICAL_SKILLS.filter(
    (sk) => selectedCategory === "All" || sk.category === selectedCategory
  );

  const getAccentColor = () => {
    switch (accent) {
      case "gold":
        return {
          text: "text-amber-400",
          border: "border-amber-400/30",
          bg: "bg-amber-400/10",
          accentLine: "bg-amber-400",
          glow: "shadow-amber-500/10",
        };
      case "emerald":
        return {
          text: "text-emerald-400",
          border: "border-emerald-400/30",
          bg: "bg-emerald-400/10",
          accentLine: "bg-emerald-400",
          glow: "shadow-emerald-500/10",
        };
      case "bronze":
        return {
          text: "text-orange-400",
          border: "border-orange-400/30",
          bg: "bg-orange-400/10",
          accentLine: "bg-orange-400",
          glow: "shadow-orange-500/10",
        };
      case "platinum":
        return {
          text: "text-slate-300",
          border: "border-slate-400/30",
          bg: "bg-slate-400/10",
          accentLine: "bg-slate-300",
          glow: "shadow-slate-400/10",
        };
      case "crimson":
        return {
          text: "text-rose-500",
          border: "border-rose-500/30",
          bg: "bg-rose-500/10",
          accentLine: "bg-rose-500",
          glow: "shadow-rose-500/10",
        };
    }
  };

  const style = getAccentColor();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Core Systems":
        return <Cpu className="h-4 w-4" />;
      case "AI & Cloud Integrations":
        return <Workflow className="h-4 w-4" />;
      case "Distributed Frontend":
        return <Layers className="h-4 w-4" />;
      case "Architecture & Culture":
        return <Terminal className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div id="interactive-skills-root" className="max-w-6xl mx-auto px-4">
      {/* Tab bar select */}
      <div id="skills-cat-navigation" className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            id={`skills-tab-${cat.replace(/\s+/g, "-")}`}
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono tracking-wider uppercase transition-all duration-200 border flex items-center gap-1.5 select-none ${
              selectedCategory === cat
                ? `${style.accentLine} text-neutral-950 font-bold border-transparent shadow-lg`
                : "border-neutral-900 bg-neutral-950/20 text-neutral-400 hover:text-white"
            }`}
          >
            {getCategoryIcon(cat)}
            <span>{cat}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Dynamic skills visual grid */}
        <div id="skills-grid-wrapper" className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredSkills.map((skill) => {
            const isHovered = hoveredSkill?.name === skill.name;
            return (
              <div
                id={`skill-bubble-${skill.name.replace(/\s+/g, "-")}`}
                key={skill.name}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                className={`p-5 rounded-2xl bg-neutral-950/80 backdrop-blur border ${isHovered ? `${style.border} ${style.glow}` : "border-neutral-900"} transition-all duration-300 cursor-pointer relative group overflow-hidden`}
              >
                {/* Horizontal progress accent line */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] transition-all duration-500"
                  style={{
                    width: isHovered ? `${skill.percentage}%` : "12px",
                    backgroundColor: isHovered ? "currentColor" : "rgba(80,80,80,0.4)",
                  }}
                />

                <div className="flex justify-between items-start mb-2 z-10 relative">
                  <div className="max-w-[70%]">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">
                      {skill.category}
                    </span>
                    <h4 className="text-sm font-sans font-medium text-neutral-200 group-hover:text-white transition-colors duration-200">
                      {skill.name}
                    </h4>
                  </div>
                  <div className="text-right font-mono">
                    <div className={`text-sm font-bold ${style.text}`}>
                      {skill.percentage}%
                    </div>
                    <div className="text-[9px] text-neutral-500">
                      {skill.yearsOfExperience} Yrs Exp
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-neutral-400 font-sans leading-relaxed mt-1 line-clamp-2 group-hover:text-neutral-300 transition-colors duration-200">
                  {skill.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Dynamic Contextual Focus Panel */}
        <div id="skills-focus-panel" className="lg:col-span-5 h-full">
          <div className="bg-neutral-950 border border-neutral-900 rounded-3xl p-6 md:p-8 relative overflow-hidden min-h-[350px] flex flex-col justify-between shadow-2xl">
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-neutral-900 filter blur-3xl opacity-40" />

            {hoveredSkill ? (
              <motion.div
                id="skill-focused-content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4">
                    {getCategoryIcon(hoveredSkill.category)}
                    <span>{hoveredSkill.category} Focus</span>
                  </div>

                  <h3 className="text-xl font-sans font-medium text-white tracking-tight mb-3">
                    {hoveredSkill.name}
                  </h3>

                  <div className="flex items-center space-x-4 mb-6">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl px-3 py-2 text-center">
                      <div className={`text-lg font-mono font-bold ${style.text}`}>
                        {hoveredSkill.percentage}%
                      </div>
                      <div className="text-[9.5px] font-mono text-neutral-500 uppercase tracking-widest">
                        Competency
                      </div>
                    </div>

                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl px-3 py-2 text-center">
                      <div className="text-lg font-mono font-bold text-neutral-200">
                        {hoveredSkill.yearsOfExperience}
                      </div>
                      <div className="text-[9.5px] font-mono text-neutral-500 uppercase tracking-widest">
                        Years Active
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-neutral-400 leading-relaxed font-sans mb-6">
                    {hoveredSkill.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-900/60 flex items-center space-x-2.5 text-xs text-neutral-500 font-mono">
                  <Award className={`h-4 w-4 ${style.text}`} />
                  <span>SLA Confirmed System Competency</span>
                </div>
              </motion.div>
            ) : (
              <div id="skill-idle-content" className="flex flex-col justify-between h-full min-h-[280px]">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4">
                    <ShieldAlert className="h-4 w-4" />
                    <span>Real-Time Sensor Idle</span>
                  </div>

                  <h3 className="text-lg font-sans font-medium text-neutral-300 tracking-tight mb-3">
                    Bespoke Performance Diagnostics
                  </h3>

                  <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                    Hover your cursor or focus over any architecture nodes in the adjacent grid to load comprehensive telemetry data, specialization duration values, and targeted SLA diagnostics reports.
                  </p>
                </div>

                <div className="mt-8 border-t border-neutral-900/60 pt-4 text-[10px] text-neutral-600 font-mono uppercase tracking-widest">
                  System telemetry awaiting pointer trigger...
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
