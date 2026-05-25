/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Project, LuxuryAccent } from "../types";
import { HIGH_IMPACT_PROJECTS } from "../data";
import ThreeDProjectCard from "./ThreeDProjectCard";
import { X, Server, Code2, Network, Cpu, Info, ExternalLink, Github, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProjectShowcaseProps {
  accent: LuxuryAccent;
}

type ProjectCategory = "All" | "Distributed Systems" | "Full-Stack AI" | "Web Experience" | "Backend Platform";

export default function ProjectShowcase({ accent }: ProjectShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories: ProjectCategory[] = ["All", "Distributed Systems", "Full-Stack AI", "Web Experience", "Backend Platform"];

  const filteredProjects = HIGH_IMPACT_PROJECTS.filter(
    (proj) => activeCategory === "All" || proj.category === activeCategory
  );

  const getAccentStyles = () => {
    switch (accent) {
      case "gold":
        return {
          text: "text-amber-400",
          border: "border-amber-400/30",
          bg: "bg-amber-400/10",
          glow: "shadow-amber-500/20",
          borderActive: "border-amber-400",
        };
      case "emerald":
        return {
          text: "text-emerald-400",
          border: "border-emerald-400/30",
          bg: "bg-emerald-400/10",
          glow: "shadow-emerald-500/20",
          borderActive: "border-emerald-400",
        };
      case "bronze":
        return {
          text: "text-orange-400",
          border: "border-orange-400/30",
          bg: "bg-orange-400/10",
          glow: "shadow-orange-500/20",
          borderActive: "border-orange-400",
        };
      case "platinum":
        return {
          text: "text-slate-300",
          border: "border-slate-400/30",
          bg: "bg-slate-400/10",
          glow: "shadow-slate-400/20",
          borderActive: "border-slate-300",
        };
      case "crimson":
        return {
          text: "text-rose-500",
          border: "border-rose-500/30",
          bg: "bg-rose-500/10",
          glow: "shadow-rose-400/20",
          borderActive: "border-rose-500",
        };
    }
  };

  const style = getAccentStyles();

  // Helper to render responsive bespoke ASCII engineering schema for each project
  const renderArchitectureSchema = (id: string) => {
    const boxColor = accent === "gold" ? "text-amber-400" : accent === "emerald" ? "text-emerald-400" : accent === "bronze" ? "text-orange-400" : accent === "platinum" ? "text-slate-300" : "text-rose-400";
    if (id === "hpc-cache-mesh") {
      return (
        <pre className={`text-[10px] md:text-xs font-mono opacity-85 leading-relaxed overflow-x-auto p-4 md:p-6 bg-neutral-950 rounded-xl border border-neutral-900/80`}>
<span className="text-neutral-500">// AuraCache Replication Architecture Map</span>
{`
 ┌────────────────────── Peer Mesh [GRPC Pipelines] ─────────────────────┐
 │                                                                       │
 v                                                                       v
┌──────────────┐         ┌──────────────┐                        ┌──────────────┐
│  Edge Node   │◀───────▶│  Edge Node   │◀──────────────────────▶│  Edge Node   │
│  AWS-USW2    │         │  AWS-USE1    │                        │  AWS-EUC1    │
├──────────────┤         ├──────────────┤                        ├──────────────┤
│  Rust Proxy  │         │  Rust Proxy  │                        │  Rust Proxy  │
│  Consistent  │         │  Consistent  │                        │  Consistent  │
│  Hash Ring   │         │  Hash Ring   │                        │  Hash Ring   │
└──────┬───────┘         └──────┬───────┘                        └──────┬───────┘
       │                        │                                       │
       │ (Cache Hit 85ms)       │ (Cache Miss - Dynamic TTL Decay)       │
       ▼                        ▼                                       ▼
 ┌───────────┐            ┌───────────┐                           ┌───────────┐
 │ Redis-Repl│            │ DB Buffer │                           │ DB Buffer │
 └───────────┘            └─────┬─────┘                           └─────┬─────┘
                                │                                       │
                                └───────► [Postgres Master Cluster] ◀───┘
                                          (Stampede Herd Blocked)
`}
        </pre>
      );
    } else if (id === "ai-telemetry-engine") {
      return (
        <pre className={`text-[10px] md:text-xs font-mono opacity-85 leading-relaxed overflow-x-auto p-4 md:p-6 bg-neutral-950 rounded-xl border border-neutral-900/80`}>
<span className="text-neutral-500">// Anomaly Predictive Telemetry Sentry Pipeline</span>
{`
┌────────────────────────────────────────────────────────────────────────┐
│ 100K+ Logs/sec ──────► Sliding-Window Log Ringbuffer (C++ Daemon)       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Memory Buffers
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│  Gemini AI Core Parser & Embedding Vectorizer (Server-Side Proxy)      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Classification
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│  Precursor Signal Trigger Match (Self-Healing Anomaly Tracker)        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Threshold Confidence >94%
                                    ▼
                 ┌─── Outage Warning Broadcast ───┐
                 │                                │
                 ▼                                ▼
       ┌──────────────────┐             ┌──────────────────┐
       │ Auto Rolling     │             │ Dev Notification │
       │ Container Update │             │ Metric Logs Hub  │
       └──────────────────┘             └──────────────────┘
`}
        </pre>
      );
    } else if (id === "reactive-analytics-canvas") {
      return (
        <pre className={`text-[10px] md:text-xs font-mono opacity-85 leading-relaxed overflow-x-auto p-4 md:p-6 bg-neutral-950 rounded-xl border border-neutral-900/80`}>
<span className="text-neutral-500">// Canvas Dual-Buffer Hardware-Accelerated Rendering</span>
{`
┌─────────────────────────────────────────────────────────────────────────┐
│ User Mouse/Zoom Input Event ───────► Spatial Indexing Partition (R-Tree)│
└────────────────────────────────────────────────┬────────────────────────┘
                                                 │ Visible Bounds Target
                                                 ▼
               ┌──────────────────────────────────────────────────┐
               │         Dual-Core Event-Orchestration            │
               ├────────────────────────┬─────────────────────────┤
               │ Main Window Process    │ Web Worker Background   │
               │ (Visual State Updates) │ (Topological Sorter)    │
               └──────────┬─────────────┴──────────┬──────────────┘
                          │                        │ Buffer Matrix
                          ▼                        ▼
               ┌──────────────────────────────────────────────────┐
               │   Double-Buffered HTML5 2D Vector Context Loop   │
               ├──────────────────────────────────────────────────┤
               │   Hardware Accelerations Enabled (GPU Canvas)    │
               └──────────────────────────────────────────────────┘
`}
        </pre>
      );
    } else {
      return (
        <pre className={`text-[10px] md:text-xs font-mono opacity-85 leading-relaxed overflow-x-auto p-4 md:p-6 bg-neutral-950 rounded-xl border border-neutral-900/80`}>
<span className="text-neutral-500">// Edge API Proxying and Memory Mapping Architecture</span>
{`
┌───────────────────────┐          ┌───────────────────────┐
│ Client Request Inbound│ ────────►│ Sub-Millisecond Proxy │
└───────────────────────┘          └───────────┬───────────┘
                                               │ Ring Buffer Read
                                               ▼
┌───────────────────────┐          ┌───────────────────────┐
│ lock-free dynamic TTL │◄─────────│ libuv single-threaded │
│ Token Bucket Cache    │          │ C++ Async Core Loop   │
└───────────────────────┘          └───────────┬───────────┘
                                               │ Zero-Copy Buffers
                                               ▼
                                   ┌───────────────────────┐
                                   │ Downstream Backends   │
                                   └───────────────────────┘
`}
        </pre>
      );
    }
  };

  return (
    <div id="project-showcase-root">
      {/* Category filters */}
      <div id="project-filters" className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
        {categories.map((cat) => (
          <button
            id={`filter-btn-${cat.replace(/\s+/g, "-")}`}
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-widest transition-all duration-300 border select-none ${
              activeCategory === cat
                ? `${style.borderActive} ${style.bg} ${style.text} font-bold ${style.glow} shadow-lg shadow-black`
                : "border-neutral-900/80 bg-neutral-950/40 text-neutral-400 hover:text-neutral-100 hover:border-neutral-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid displaying the high impact cards with stagger state entrance */}
      <div id="project-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto px-4">
        {filteredProjects.map((project) => (
          <motion.div
            id={`anim-wrapper-${project.id}`}
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <ThreeDProjectCard
              project={project}
              accent={accent}
              onSelect={() => setSelectedProject(project)}
            />
          </motion.div>
        ))}
      </div>

      {/* Deep Detail Case Study Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div
            id="modal-backdrop"
            className="fixed inset-0 z-50 flex items-center justify-end bg-black/85 backdrop-blur-md p-0 md:p-4 transition-all"
            onClick={() => setSelectedProject(null)}
          >
            {/* Slide out context drawer style */}
            <motion.div
              id="modal-drawer-body"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl h-full md:h-[calc(100vh-2rem)] bg-neutral-950 border-l border-neutral-900 md:border md:border-neutral-900/80 md:rounded-3xl p-6 md:p-10 overflow-y-auto relative flex flex-col justify-between"
            >
              {/* Symmetrical luxury wire bars */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />

              <div>
                {/* Header info */}
                <div className="flex items-center justify-between pb-6 border-b border-neutral-900 mb-8">
                  <div className="flex items-center space-x-3 text-xs uppercase tracking-widest text-neutral-500 font-mono">
                    <span>{selectedProject.company}</span>
                    <span>•</span>
                    <span className={style.text}>{selectedProject.role}</span>
                  </div>

                  <button
                    id="close-modal-btn"
                    onClick={() => setSelectedProject(null)}
                    className="p-2 rounded-xl bg-neutral-900/40 border border-neutral-800 text-neutral-400 hover:text-white transition-all hover:scale-105"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Main Content */}
                <span className={`inline-block text-[10px] font-mono px-3 py-1 rounded-full border ${style.border} ${style.bg} ${style.text} tracking-widest uppercase mb-4`}>
                  {selectedProject.category}
                </span>

                <h2 className="text-2xl md:text-3xl font-sans font-medium text-white tracking-tight mb-4">
                  {selectedProject.title}
                </h2>

                <p className="text-neutral-300 text-base leading-relaxed mb-8">
                  {selectedProject.summary}
                </p>

                {/* Big Metric Grid */}
                <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4 flex items-center gap-1.5 font-semibold">
                  <Zap className={`h-4 w-4 ${style.text}`} /> Key Quantifiable Impact Metrics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                  {selectedProject.impactMetrics.map((met) => (
                    <div
                      key={met.id}
                      className="bg-neutral-900/40 border border-neutral-900 p-5 rounded-2xl relative group overflow-hidden"
                    >
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-neutral-800 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className={`text-2xl md:text-3xl font-mono font-bold ${style.text} mb-1 tracking-tight`}>
                        {met.value}
                      </div>
                      <div className="text-xs text-neutral-200 font-medium font-sans mb-1">
                        {met.label}
                      </div>
                      {met.subtext && (
                        <div className="text-[10px] text-neutral-500 font-mono leading-tight">
                          {met.subtext}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Deep-dive analysis details */}
                <div className="space-y-6 mb-10">
                  <div>
                    <h4 className="text-sm font-mono uppercase tracking-widest text-neutral-400 mb-2 font-semibold flex items-center gap-2">
                       The Engineering Challenge
                    </h4>
                    <p className="text-sm text-neutral-400 leading-relaxed font-sans pl-4 border-l-2 border-neutral-900">
                      {selectedProject.details.challenge}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-mono uppercase tracking-widest text-neutral-400 mb-2 font-semibold flex items-center gap-2">
                       Architectural Action & Patterns
                    </h4>
                    <p className="text-sm text-neutral-400 leading-relaxed font-sans pl-4 border-l-2 border-neutral-900">
                      {selectedProject.details.action}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-mono uppercase tracking-widest text-neutral-400 mb-2 font-semibold flex items-center gap-2">
                       Systems Outcome & SLA Stability
                    </h4>
                    <p className="text-sm text-neutral-400 leading-relaxed font-sans pl-4 border-l-2 border-neutral-900">
                      {selectedProject.details.outcome}
                    </p>
                  </div>
                </div>

                {/* Technology Specs */}
                <div className="mb-10">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3.5 font-semibold">
                    Technical Specifications Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`text-xs font-mono px-3 py-1.5 rounded-xl border bg-neutral-900/60 text-neutral-300 border-neutral-800`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Architecture Visual Grid Block */}
                <div className="mb-12">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4 font-semibold flex items-center gap-1.5">
                    <Info className="h-4 w-4" /> System Topology Plan
                  </h4>
                  {renderArchitectureSchema(selectedProject.id)}
                </div>
              </div>

              {/* Action buttons footer */}
              <div className="pt-6 border-t border-neutral-900 flex flex-wrap items-center justify-between gap-4">
                <span className="text-[11px] text-neutral-500 font-mono">
                  SLA Compliant Project Specification
                </span>

                <div className="flex items-center gap-3">
                  {selectedProject.githubUrl && (
                    <a
                      id="modal-btn-source"
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-neutral-800 hover:border-neutral-700 bg-neutral-950 text-neutral-300 hover:text-white transition-all text-xs font-mono rounded-xl flex items-center gap-1.5"
                    >
                      <Github className="h-3.5 w-3.5" /> Source Spec
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a
                      id="modal-btn-demo"
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-4 py-2 text-neutral-950 font-bold transition-all text-xs font-mono rounded-xl flex items-center gap-1.5`}
                      style={{ backgroundColor: style.text }}
                    >
                      <ExternalLink className="h-3.5 w-3.5" strokeWidth={2.5} /> Deploy Specs
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
