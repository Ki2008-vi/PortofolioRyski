/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { LuxuryAccent } from "../types";
import { Sliders, Sun, ShieldCheck } from "lucide-react";

interface ThemeCustomizerProps {
  activeAccent: LuxuryAccent;
  onChangeAccent: (accent: LuxuryAccent) => void;
}

export default function ThemeCustomizer({ activeAccent, onChangeAccent }: ThemeCustomizerProps) {
  const options: Array<{ id: LuxuryAccent; label: string; color: string; border: string; glow: string }> = [
    {
      id: "gold",
      label: "Amber Gold",
      color: "bg-amber-400",
      border: "border-amber-400/30",
      glow: "shadow-amber-500/20",
    },
    {
      id: "emerald",
      label: "Royal Emerald",
      color: "bg-emerald-400",
      border: "border-emerald-400/30",
      glow: "shadow-emerald-500/20",
    },
    {
      id: "bronze",
      label: "Bronze Copper",
      color: "bg-orange-400",
      border: "border-orange-400/30",
      glow: "shadow-orange-500/20",
    },
    {
      id: "platinum",
      label: "Platinum Silver",
      color: "bg-slate-300",
      border: "border-slate-300/30",
      glow: "shadow-slate-400/20",
    },
    {
      id: "crimson",
      label: "Obsidian Rose",
      color: "bg-rose-500",
      border: "border-rose-500/30",
      glow: "shadow-rose-500/20",
    },
  ];

  const getAccentColorText = () => {
    switch (activeAccent) {
      case "gold": return "text-amber-400";
      case "emerald": return "text-emerald-400";
      case "bronze": return "text-orange-400";
      case "platinum": return "text-slate-300";
      case "crimson": return "text-rose-400";
    }
  };

  return (
    <div
      id="theme-customizer-root"
      className="bg-neutral-950/80 backdrop-blur-xl border border-neutral-900 rounded-2xl p-4 md:p-5 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />

      <div className="flex items-center space-x-2.5 mb-3.5">
        <Sliders className={`h-4 w-4 ${getAccentColorText()}`} />
        <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-semibold">
          Luxury Accent Canvas
        </h4>
      </div>

      <p className="text-[11px] text-neutral-500 mb-4 leading-relaxed font-sans">
        Select a custom metallic accent palette to adapt the page gradients, 3D physics loops, and ambient shadows.
      </p>

      <div className="flex flex-col gap-2">
        {options.map((opt) => {
          const isActive = activeAccent === opt.id;
          return (
            <button
              id={`theme-btn-${opt.id}`}
              key={opt.id}
              onClick={() => onChangeAccent(opt.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border text-left transition-all duration-200 select-none ${
                isActive
                  ? `bg-neutral-900 border-neutral-800 ${opt.glow} shadow-md`
                  : "bg-transparent border-transparent hover:bg-neutral-900/40"
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <span className={`block w-2.5 h-2.5 rounded-full ${opt.color} ring-4 ${isActive ? "ring-neutral-900" : "ring-transparent"}`} />
                <span className={`text-xs font-medium font-sans ${isActive ? "text-neutral-100 font-semibold" : "text-neutral-400 transition-colors duration-150"}`}>
                  {opt.label}
                </span>
              </div>

              {isActive && (
                <ShieldCheck className={`h-4 w-4 ${getAccentColorText()}`} />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 pt-3.5 border-t border-neutral-900/60 flex items-center justify-between text-[10px] font-mono text-neutral-500">
        <span className="flex items-center gap-1">
          <Sun className="h-3 w-3" /> System Engine Ready
        </span>
        <span>v3.5.0</span>
      </div>
    </div>
  );
}
