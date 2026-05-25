/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { LuxuryAccent } from "./types";
import { PORTFOLIO_OWNER, DETAILED_EXPERIENCE } from "./data";
import ThreeDHeroCanvas from "./components/ThreeDHeroCanvas";
import ThemeCustomizer from "./components/ThemeCustomizer";
import ProjectShowcase from "./components/ProjectShowcase";
import InteractiveSkills from "./components/InteractiveSkills";
import ContactSection from "./components/ContactSection";
import {
  Sparkles,
  Cpu,
  Clock,
  MapPin,
  Database,
  Award,
  ArrowUpRight,
  Github,
  ExternalLink,
  Menu,
  X,
  Code,
  Terminal,
  Server,
  Sliders,
  ShieldCheck,
  ChevronRight,
  Box,
  Layers,
  HardDrive
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [accent, setAccent] = useState<LuxuryAccent>("gold");
  const [currentTime, setCurrentTime] = useState("");
  const [currentDateString, setCurrentDateString] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [timeZone, setTimeZone] = useState<"WIB" | "WITA" | "WIT">("WIB");

  // Set real-time dynamic clock and date based on selected timezone
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let tzString = "Asia/Jakarta"; // Default to WIB
      if (timeZone === "WITA") tzString = "Asia/Makassar";
      if (timeZone === "WIT") tzString = "Asia/Jayapura";
      
      setCurrentTime(now.toLocaleTimeString("en-US", { hour12: false, timeZone: tzString }));
      setCurrentDateString(now.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: tzString }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  const cycleTimeZone = () => {
    if (timeZone === "WIB") setTimeZone("WITA");
    else if (timeZone === "WITA") setTimeZone("WIT");
    else setTimeZone("WIB");
  };

  // Track header scroll states to trigger compact styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler targeting specific section IDs
  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  // Get active luxury theme aesthetics based on chosen state
  const getThemeAesthetics = () => {
    switch (accent) {
      case "gold":
        return {
          text: "text-amber-400",
          border: "border-amber-400/20",
          borderActive: "border-amber-400",
          bg: "bg-amber-400",
          glow: "shadow-amber-500/20",
          navActive: "text-amber-400 border-b border-amber-400",
          gradient: "from-amber-400/20 via-neutral-950 to-neutral-950",
          aurora: "from-amber-500/25 via-amber-600/5 to-transparent",
          buttonHover: "hover:bg-amber-400/10 hover:text-amber-300",
        };
      case "emerald":
        return {
          text: "text-emerald-400",
          border: "border-emerald-400/20",
          borderActive: "border-emerald-400",
          bg: "bg-emerald-400",
          glow: "shadow-emerald-500/20",
          navActive: "text-emerald-400 border-b border-emerald-400",
          gradient: "from-emerald-400/20 via-neutral-950 to-neutral-950",
          aurora: "from-emerald-500/25 via-emerald-600/5 to-transparent",
          buttonHover: "hover:bg-emerald-400/10 hover:text-emerald-300",
        };
      case "bronze":
        return {
          text: "text-orange-400",
          border: "border-orange-400/20",
          borderActive: "border-orange-400",
          bg: "bg-orange-400",
          glow: "shadow-orange-500/20",
          navActive: "text-orange-400 border-b border-orange-400",
          gradient: "from-orange-400/20 via-neutral-950 to-neutral-950",
          aurora: "from-orange-500/25 via-orange-600/5 to-transparent",
          buttonHover: "hover:bg-orange-400/10 hover:text-orange-300",
        };
      case "platinum":
        return {
          text: "text-slate-300",
          border: "border-slate-300/20",
          borderActive: "border-slate-300",
          bg: "bg-slate-300",
          glow: "shadow-slate-400/20",
          navActive: "text-slate-300 border-b border-slate-300",
          gradient: "from-slate-400/25 via-neutral-950 to-neutral-950",
          aurora: "from-slate-400/25 via-slate-500/5 to-transparent",
          buttonHover: "hover:bg-slate-400/10 hover:text-slate-200",
        };
      case "crimson":
        return {
          text: "text-rose-500",
          border: "border-rose-500/20",
          borderActive: "border-rose-500",
          bg: "bg-rose-500",
          glow: "shadow-rose-500/20",
          navActive: "text-rose-500 border-b border-rose-500",
          gradient: "from-rose-500/20 via-neutral-950 to-neutral-950",
          aurora: "from-rose-500/25 via-rose-600/5 to-transparent",
          buttonHover: "hover:bg-rose-500/10 hover:text-rose-300",
        };
    }
  };

  const style = getThemeAesthetics();

  return (
    <div id="application-root" className="min-h-screen relative bg-[#060606] overflow-x-hidden selection:bg-neutral-800 selection:text-white transition-colors duration-1000">
      
      {/* Immersive UI Atmospheric Background Glow Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Dynamic slow breathing aurora 1 */}
        <div id="immersive-bg-aurora-1" className={`absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full blur-[140px] opacity-[0.09] md:opacity-[0.14] animate-aurora mix-blend-screen bg-gradient-to-br ${style.aurora} transition-all duration-1000`} />
        {/* Dynamic slow breathing aurora 2 */}
        <div id="immersive-bg-aurora-2" className={`absolute top-1/2 -left-48 w-[550px] h-[550px] rounded-full blur-[140px] opacity-[0.07] md:opacity-[0.11] animate-aurora-reverse mix-blend-screen bg-gradient-to-br ${style.aurora} transition-all duration-1000`} />
        {/* Fine engineering dotted layout texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#1c1c1c_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.18]" />
      </div>

      {/* 1. Header (Dynamic Floating Navbar) */}
      <header
        id="app-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-neutral-950/85 backdrop-blur-md border-b border-neutral-900 shadow-md"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <div
            id="brand-signature"
            onClick={() => scrollToSection("hero-anchor")}
            className="flex items-center space-x-2 cursor-pointer select-none"
          >
            <div className={`p-1.5 rounded-lg border bg-neutral-900 ${style.border}`}>
              <HardDrive className={`h-4.5 w-4.5 ${style.text}`} />
            </div>
            <div>
              <span className="text-sm font-display font-bold text-white uppercase tracking-wider block">
                G. Riski Pratama
              </span>
              <span className="text-[9.5px] font-mono text-neutral-500 uppercase tracking-widest block -mt-1.5">
                {PORTFOLIO_OWNER.title}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Link Cluster */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-7 text-xs font-mono uppercase tracking-widest text-neutral-400">
            <button
              id="nav-link-projects"
              onClick={() => scrollToSection("projects-anchor")}
              className="hover:text-white hover:scale-103 transition-all cursor-pointer font-medium"
            >
              // Case Studies
            </button>
            <button
              id="nav-link-skills"
              onClick={() => scrollToSection("skills-anchor")}
              className="hover:text-white hover:scale-103 transition-all cursor-pointer font-medium"
            >
              // Diagnostics
            </button>
            <button
              id="nav-link-experience"
              onClick={() => scrollToSection("experience-anchor")}
              className="hover:text-white hover:scale-103 transition-all cursor-pointer font-medium"
            >
              // Timeline
            </button>
            <button
              id="nav-link-contact"
              onClick={() => scrollToSection("contact-anchor")}
              className="hover:text-white hover:scale-103 transition-all cursor-pointer font-medium"
            >
              // Connection
            </button>
          </nav>

          {/* Luxury Settings Panel Trigger + UTC Live Tracker */}
          <div className="flex items-center space-x-3">
            {/* Timezone Live Widget (Interactive) */}
            <button
              id="timezone-cycle-btn"
              onClick={cycleTimeZone}
              title="Change Timezone"
              className="hidden sm:flex items-center space-x-2 bg-neutral-900/60 border border-neutral-900 px-3.5 py-1.5 rounded-full select-none font-mono text-[10px] text-neutral-400 hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <Clock className={`h-3 w-3 ${style.text}`} />
              <span className="font-semibold text-neutral-200">{currentTime || "00:00:00"}</span>
              <span className="text-neutral-600">|</span>
              <span className="text-[9.5px] text-neutral-500 uppercase hover:text-white transition-colors">{timeZone}</span>
            </button>

            <button
              id="header-config-trigger"
              onClick={() => setShowConfig(!showConfig)}
              className={`p-2 rounded-xl bg-neutral-900 border ${style.border} text-neutral-400 hover:text-white select-none transition-all hover:scale-105 cursor-pointer max-md:hidden`}
              title="Tailor Luxury Accents"
            >
              <Sliders className="h-4 w-4" />
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              id="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white rounded-xl cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-nav-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-neutral-900 bg-neutral-950/95 backdrop-blur-lg px-6 py-6 space-y-4"
            >
              <div className="flex flex-col space-y-4 text-sm font-mono uppercase tracking-widest text-neutral-400">
                <button
                  id="mobile-link-projects"
                  onClick={() => scrollToSection("projects-anchor")}
                  className="text-left py-2 hover:text-white"
                >
                  // Project Spec Sheets
                </button>
                <button
                  id="mobile-link-skills"
                  onClick={() => scrollToSection("skills-anchor")}
                  className="text-left py-2 hover:text-white"
                >
                  // Diagnostic Telemetry
                </button>
                <button
                  id="mobile-link-experience"
                  onClick={() => scrollToSection("experience-anchor")}
                  className="text-left py-2 hover:text-white"
                >
                  // Career Timeline
                </button>
                <button
                  id="mobile-link-contact"
                  onClick={() => scrollToSection("contact-anchor")}
                  className="text-left py-2 hover:text-white"
                >
                  // Synchronize Inbound
                </button>
              </div>

              {/* Theme customizer for mobile right in menu drawer */}
              <div className="border-t border-neutral-900 pt-4 mt-2">
                <span className="block text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-3.5">
                  Choose Accents
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {(["gold", "emerald", "bronze", "platinum", "crimson"] as LuxuryAccent[]).map((col) => (
                    <button
                      id={`mobile-theme-btn-${col}`}
                      key={col}
                      onClick={() => setAccent(col)}
                      className={`text-[10px] font-mono px-3 py-1.5 rounded-lg border uppercase tracking-wider ${
                        accent === col
                          ? `${style.borderActive} ${style.bg} text-neutral-950 font-bold`
                          : "border-neutral-800 text-neutral-400 bg-neutral-900/50"
                      }`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Floating Panel Theme customizer (Right Hand Desktop Widget) */}
      <AnimatePresence>
        {showConfig && (
          <motion.div
            id="desktop-customizer-drawer"
            initial={{ opacity: 0, scale: 0.94, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.94, x: 20 }}
            className="fixed right-6 top-24 z-40 w-80 max-md:hidden"
          >
            <ThemeCustomizer activeAccent={accent} onChangeAccent={setAccent} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 1: HERO CONTAINER BACKGROUND */}
      <section
        id="hero-anchor"
        className="relative min-h-[96vh] md:min-h-screen flex items-center justify-center pt-24 pb-14 overflow-hidden"
      >
        {/* Interactive vector physics loop rendering canvas */}
        <ThreeDHeroCanvas accent={accent} />

        {/* Ambient Overlay Layer to guarantee clean textual contrast */}
        <div id="hero-vignette" className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/40 to-neutral-950 z-5 pointer-events-none" />

        {/* Hero Interactive Main Cards & Column Grid */}
        <div id="hero-foreground" className="w-full max-w-7xl mx-auto px-4 md:px-8 relative z-10 flex flex-col justify-center h-full pt-12 md:pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Primary Title Cluster */}
            <div id="hero-title-group" className="lg:col-span-8 text-left space-y-6">
              <motion.div
                id="hero-badge-container"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center space-x-2 border border-neutral-900 bg-neutral-950/80 backdrop-blur px-4 py-2 rounded-2xl relative overflow-hidden"
              >
                {/* Horizontal dynamic gold pulse line */}
                <div className={`absolute bottom-0 left-0 w-12 h-[1px] bg-gradient-to-r ${style.bg} to-transparent`} />
                <Sparkles className={`h-4 w-4 ${style.text}`} />
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-semibold select-none">
                  Full-Stack Web Development
                </span>
              </motion.div>

              <div className="space-y-3.5">
                <motion.h1
                  id="hero-title"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="text-4xl sm:text-5xl md:text-7xl font-display font-medium tracking-tight text-white leading-[1.05]"
                >
                  ENGINEERING FOR <br />
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 via-neutral-200 to-neutral-400 font-semibold block`}>
                    HIGH-IMPACT SCALE.
                  </span>
                </motion.h1>

                <motion.p
                  id="hero-owner-title"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-lg md:text-xl font-mono text-neutral-400 capitalize"
                >
                  {PORTFOLIO_OWNER.title}
                </motion.p>
              </div>

              <motion.p
                id="hero-owner-description"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="text-neutral-400 max-w-xl text-sm md:text-base leading-relaxed font-sans"
              >
                {PORTFOLIO_OWNER.description}
              </motion.p>

              {/* Action Trigger Buttons */}
              <motion.div
                id="hero-actions"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap items-center gap-3.5 pt-4"
              >
                <button
                  id="hero-btn-primary"
                  onClick={() => scrollToSection("projects-anchor")}
                  className={`px-5 py-3 text-xs font-mono uppercase tracking-widest font-bold text-neutral-950 transition-all rounded-xl cursor-pointer hover:shadow-2xl hover:scale-103 flex items-center gap-1.5 select-none`}
                  style={{ backgroundColor: "white" }}
                >
                  <span>Inspect Projects Catalog</span>
                  <ChevronRight className="h-4 w-4" />
                </button>

                <button
                  id="hero-btn-secondary"
                  onClick={() => scrollToSection("contact-anchor")}
                  className={`px-5 py-3 text-xs font-mono uppercase tracking-widest font-bold text-neutral-300 bg-neutral-950/80 backdrop-blur border border-neutral-900 rounded-xl cursor-pointer transition-all ${style.buttonHover} hover:scale-103 select-none`}
                >
                  Synchronize Channels
                </button>
              </motion.div>
            </div>

            {/* Right Ambient Performance Metrics Box Widget */}
            <motion.div
              id="hero-telemetry-panel"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-4 hidden lg:block"
            >
              <div className="bg-neutral-950/85 backdrop-blur-xl border border-neutral-900 p-6 rounded-2xl relative overflow-hidden select-none shadow-2xl">
                {/* Visual grid overlay */}
                <div className="absolute top-0 right-0 h-24 w-24 bg-neutral-900/40 rounded-full filter blur-2xl opacity-50" />

                <div className="flex items-center space-x-2 text-xs font-mono uppercase text-neutral-500 tracking-widest border-b border-neutral-900 pb-3 mb-4">
                  <Terminal className={`h-4 w-4 ${style.text}`} />
                  <span>Developer Environment</span>
                </div>

                <div className="space-y-4 font-mono text-[11px] text-neutral-400">
                  <div className="flex justify-between items-center bg-neutral-900/30 p-2.5 rounded-lg border border-neutral-900/40">
                    <span className="text-neutral-500">PRIMARY STACK :</span>
                    <span className="text-neutral-200">LARAVEL + REACT + MYSQL</span>
                  </div>

                  <div className="flex justify-between items-center bg-neutral-900/30 p-2.5 rounded-lg border border-neutral-900/40">
                    <span className="text-neutral-500">DEV TOOLING :</span>
                    <span className="text-neutral-200">AntiGravity - VSCODE</span>
                  </div>

                  <div className="flex justify-between items-center bg-neutral-900/30 p-2.5 rounded-lg border border-neutral-900/40">
                    <span className="text-neutral-500">PAGE SPEED :</span>
                    <span className={style.text}>&lt; 1.2s LOAD TIME</span>
                  </div>

                  <div className="flex justify-between items-center bg-neutral-900/30 p-2.5 rounded-lg border border-neutral-900/40">
                    <span className="text-neutral-500">STAMP DATE :</span>
                    <span className="text-neutral-300 font-bold">{currentDateString || "May 25, 2026"}</span>
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t border-neutral-900/60 flex items-center justify-between text-[10px] font-mono text-neutral-600">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className={`h-3.5 w-3.5 ${style.text}`} /> SECURE PIPELINE ESTABLISHED
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Dynamic down indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 cursor-pointer" onClick={() => scrollToSection("impact-stats-anchor")}>
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-600">Scroll System</span>
          <div className="w-[1.2px] h-6 bg-neutral-800 relative overflow-hidden">
            <div className={`absolute top-0 inset-x-0 h-2 bg-white animate-bounce`} style={{ animationDuration: "2.5s" }} />
          </div>
        </div>
      </section>

      {/* SECTION 2: QUANTITATIVE IMPACT STATS BANNER */}
      <section
        id="impact-stats-anchor"
        className="py-12 border-t border-b border-neutral-900/30 bg-neutral-950/20 backdrop-blur-sm relative overflow-hidden transition-all duration-1000"
      >
        <div className="absolute inset-0 bg-[#060606]/35 pointer-events-none" />
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center md:text-left space-y-1">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-neutral-500">// Responsive Design</span>
              <div className="text-3xl md:text-4xl font-mono font-bold tracking-tight text-white flex items-center justify-center md:justify-start gap-1">
                100% <span className={`text-xs ${style.text}`}><Award className="h-4 w-4" /></span>
              </div>
              <span className="block text-xs text-neutral-400 font-sans">Mobile & Desktop Friendly</span>
            </div>

            <div className="text-center md:text-left space-y-1">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-neutral-500">// Projects & Apps</span>
              <div className="text-3xl md:text-4xl font-mono font-bold tracking-tight text-white">
                15+ <span className="text-xs text-neutral-500">Completed</span>
              </div>
              <span className="block text-xs text-neutral-400 font-sans">Including Web & Mobile Apps</span>
            </div>

            <div className="text-center md:text-left space-y-1">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-neutral-500">// Technologies</span>
              <div className="text-3xl md:text-4xl font-mono font-bold tracking-tight text-white">
                7+ <span className="text-xs text-neutral-500">Frameworks</span>
              </div>
              <span className="block text-xs text-neutral-400 font-sans">React, Laravel, MySQL, etc.</span>
            </div>

            <div className="text-center md:text-left space-y-1">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-neutral-500">// Performance</span>
              <div className="text-3xl md:text-4xl font-mono font-bold tracking-tight text-white">
                &lt; 1.2s <span className="text-xs text-neutral-500">Load Time</span>
              </div>
              <span className="block text-xs text-neutral-400 font-sans">SEO Optimized & Fast Load</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: HIGH-IMPACT PROJECTS GRID */}
      <section
        id="projects-anchor"
        className="py-24 bg-transparent relative scroll-mt-14"
      >
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
          {/* Header Section */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="p-1 px-3.5 border border-neutral-900 rounded-full w-fit bg-neutral-950/40 text-[10px] font-mono uppercase tracking-widest text-neutral-500 mx-auto">
               Technical Directory List
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight">
              High-Impact Case Studies
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed font-sans">
              Dive into full-stack smart stores, automated payment integration pathways, and highly interactive portfolio applications designed for performance.
            </p>
          </div>

          {/* Aggregated Project Grid with interactive modal slider */}
          <ProjectShowcase accent={accent} />
        </div>
      </section>

      {/* SECTION 4: INTERACTIVE COMP_DIAGNOSTICS SKILLS HUB */}
      <section
        id="skills-anchor"
        className="py-24 bg-transparent border-t border-b border-neutral-900/30 relative scroll-mt-14"
      >
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
          {/* Title Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="p-1 px-3.5 border border-neutral-900 rounded-full w-fit bg-neutral-950/40 text-[10px] font-mono uppercase tracking-widest text-neutral-500 mx-auto">
               System Capabilities
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight">
              Axiomatic Competency Diagnostics
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed font-sans">
              Probing web application structure, database architecture, frontend reactivity, and modern full-stack developer specialties.
            </p>
          </div>

          {/* Interactive competency graph layout */}
          <InteractiveSkills accent={accent} />
        </div>
      </section>

      {/* SECTION 5: TIMELINE / WORK HISTORY */}
      <section
        id="experience-anchor"
        className="py-24 bg-transparent relative scroll-mt-14"
      >
        <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
          {/* Title Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="p-1 px-3.5 border border-neutral-900 rounded-full w-fit bg-neutral-950/40 text-[10px] font-mono uppercase tracking-widest text-neutral-500 mx-auto">
               Career Chronology
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight">
              Systems Experience Log
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed font-sans">
              A comprehensive history of building modern full-stack web solutions, database systems, and dynamic user interfaces.
            </p>
          </div>

          {/* Styled vector server timeline */}
          <div className="relative border-l border-neutral-950/20 md:border-l-2 md:border-neutral-900 ml-4 md:ml-32 space-y-14">
            {DETAILED_EXPERIENCE.map((exp) => (
              <div id={`experience-block-${exp.id}`} key={exp.id} className="relative group pl-6 md:pl-10">
                
                {/* Horizontal reference indicator node projecting company period */}
                <span className="hidden md:block absolute right-full top-1 mr-10 font-mono text-[11px] text-neutral-500 uppercase font-medium">
                  {exp.period}
                </span>

                {/* Timeline solid indicator node representing a micro server rack */}
                <div className="absolute -left-[9px] md:-left-[12px] top-1 w-[18px] h-[18px] md:w-6 md:h-6 rounded bg-neutral-950 border border-neutral-950 hover:border-neutral-800 text-[10px] flex items-center justify-center transition-all duration-300">
                  <div className={`w-2 h-2 rounded ${style.bg} group-hover:scale-130 transition-transform`} />
                </div>

                <div className="space-y-4">
                  {/* Title cluster info */}
                  <div>
                    <span className="md:hidden block font-mono text-[10px] text-neutral-500 mb-1">
                      {exp.period} • {exp.location}
                    </span>
                    <h3 className="text-xl font-display font-medium text-white tracking-tight leading-none group-hover:text-neutral-100">
                      {exp.role}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1.5 text-xs font-mono">
                      <span className={style.text}>{exp.company}</span>
                      <span className="text-neutral-700">|</span>
                      <span className="text-neutral-500">{exp.location}</span>
                    </div>
                  </div>

                  {/* Descriptions bullet points */}
                  <ul className="space-y-2.5 text-sm text-neutral-400 max-w-3xl leading-relaxed list-outside pl-4 list-none">
                    {exp.description.map((bullet, index) => (
                      <li key={index} className="relative">
                        <span className={`absolute right-full mr-2.5 top-2.5 w-1 h-1 rounded-full ${style.bg} opacity-60`} />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {/* Quantitative impact tags inside timeline */}
                  {exp.customMetrics && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {exp.customMetrics.map((met, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-xl bg-neutral-900 border border-neutral-900 text-neutral-300"
                        >
                          <Award className={`h-3 w-3 ${style.text}`} /> {met}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Tech stack items tags used */}
                  <div className="flex flex-wrap gap-1.5 pt-1.5">
                    {exp.skillsUsed.map((sk) => (
                      <span
                        key={sk}
                        className="text-[10px] font-mono text-neutral-500 border border-neutral-900 px-2 py-0.5 rounded"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: CONTACT & HANDSHAKING FORM */}
      <section
        id="contact-anchor"
        className="py-24 bg-transparent border-t border-neutral-900/30 relative scroll-mt-14"
      >
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
          {/* Header Section */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="p-1 px-3.5 border border-neutral-900 rounded-full w-fit bg-neutral-950/40 text-[10px] font-mono uppercase tracking-widest text-neutral-500 mx-auto">
               Inbound Link Gateway
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight">
              Synchronize Connection
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed font-sans">
              Initialize a digital handshake protocol. Messages will instantly persist to your local browser storage, allowing thorough review.
            </p>
          </div>

          <ContactSection accent={accent} />
        </div>
      </section>

      {/* FOOTER */}
      <footer id="app-footer" className="bg-[#030303]/70 backdrop-blur-md border-t border-neutral-900/30 py-12 md:py-16 text-xs text-neutral-500 font-mono relative">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <span className="text-neutral-400 block font-bold font-display uppercase tracking-wider text-sm">Ganes Riski P.</span>
            <span className="block text-[10px] text-neutral-500 capitalize">{PORTFOLIO_OWNER.title} • All Rights Persisted</span>
          </div>

          <div id="footer-actions" className="flex items-center space-x-6">
            <a
              id="footer-github-link"
              href="https://github.com/Ki2008-vi"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Github className="h-4 w-4" /> Github
            </a>
            <a
              id="footer-linkedin-link"
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <ExternalLink className="h-4 w-4" /> LinkedIn
            </a>
            <a
              id="footer-mail-link"
              href={`mailto:${PORTFOLIO_OWNER.email}`}
              className="hover:text-white transition-colors"
            >
              ganesriskipratama@gmail.com
            </a>
          </div>

          <div className="text-center md:text-right space-y-1">
            <span className="block text-[10px] text-neutral-600">CLIENT PROTOCOL: ENCRYPTED PORT-3000</span>
            <button
              id="reset-state-btn"
              onClick={() => {
                setAccent("gold");
                localStorage.removeItem("portfolio_messages");
                window.location.reload();
              }}
              className="text-[10px] text-rose-500 hover:text-rose-400 uppercase tracking-widest block transition-colors mt-1"
              title="Restores original settings and flushes stored localStorage"
            >
              [ RESET CORE SYSTEMS ]
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
