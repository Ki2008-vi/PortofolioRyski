/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { ContactMessage, LuxuryAccent } from "../types";
import { Send, Terminal, CheckCircle2, Trash2, Download, AlertTriangle, MessageSquareCode } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ContactSectionProps {
  accent: LuxuryAccent;
}

export default function ContactSection({ accent }: ContactSectionProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showConsole, setShowConsole] = useState(false);

  // Load any previously saved records
  useEffect(() => {
    const saved = localStorage.getItem("portfolio_messages");
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to parse saved messages stream", err);
      }
    }
  }, []);

  const getAccentStyles = () => {
    switch (accent) {
      case "gold":
        return {
          text: "text-amber-400",
          border: "border-amber-400/30",
          ring: "focus:ring-amber-500/20",
          focusBorder: "focus:border-amber-500",
          bg: "bg-amber-400",
          badge: "bg-amber-500/10 text-amber-300 border-amber-500/20",
          glow: "shadow-amber-500/10",
        };
      case "emerald":
        return {
          text: "text-emerald-400",
          border: "border-emerald-400/30",
          ring: "focus:ring-emerald-500/20",
          focusBorder: "focus:border-emerald-500",
          bg: "bg-emerald-400",
          badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
          glow: "shadow-emerald-500/10",
        };
      case "bronze":
        return {
          text: "text-orange-400",
          border: "border-orange-400/30",
          ring: "focus:ring-orange-500/20",
          focusBorder: "focus:border-orange-500",
          bg: "bg-orange-400",
          badge: "bg-orange-500/10 text-orange-300 border-orange-500/20",
          glow: "shadow-orange-500/10",
        };
      case "platinum":
        return {
          text: "text-slate-300",
          border: "border-slate-400/30",
          ring: "focus:ring-slate-400/20",
          focusBorder: "focus:border-slate-400",
          bg: "bg-slate-300",
          badge: "bg-slate-400/10 text-slate-200 border-slate-400/20",
          glow: "shadow-slate-400/10",
        };
      case "crimson":
        return {
          text: "text-rose-500",
          border: "border-rose-500/30",
          ring: "focus:ring-rose-500/20",
          focusBorder: "focus:border-rose-500",
          bg: "bg-rose-500",
          badge: "bg-rose-500/10 text-rose-300 border-rose-500/20",
          glow: "shadow-rose-400/10",
        };
    }
  };

  const style = getAccentStyles();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);

    // Simulate standard millisecond network latency check
    setTimeout(() => {
      const newMessage: ContactMessage = {
        id: `msg-${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        company: company.trim() || "Independent Systems",
        message: message.trim(),
        timestamp: new Date().toISOString(),
      };

      const updated = [newMessage, ...messages];
      setMessages(updated);
      localStorage.setItem("portfolio_messages", JSON.stringify(updated));

      setName("");
      setEmail("");
      setCompany("");
      setMessage("");

      setIsSubmitting(false);
      setSuccess(true);

      // Dismiss positive response popup in 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }, 900);
  };

  const clearMessages = () => {
    setMessages([]);
    localStorage.removeItem("portfolio_messages");
  };

  const downloadLOGStream = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(messages, null, 2));
    const dlAnchorElem = document.createElement("a");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "marcus_vance_contacts.json");
    dlAnchorElem.click();
  };

  return (
    <div id="contact-section-root" className="max-w-4xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
        {/* Left Side structural message */}
        <div id="contact-info-panel" className="md:col-span-5 space-y-5">
          <div className="p-1 px-3.5 border border-neutral-900 rounded-full w-fit bg-neutral-950/40 text-[10px] font-mono uppercase tracking-widest text-neutral-500">
             Contact Inbound
          </div>

          <h3 className="text-xl md:text-2xl font-sans font-medium text-neutral-100 tracking-tight leading-tight">
            Initiate System Sync
          </h3>

          <p className="text-sm text-neutral-400 leading-relaxed font-sans">
            Ready to integrate full-stack apps, design database structures, or discuss junior engineering roles? Submit the secure handshaking form adjacent to initiate dynamic communication.
          </p>

          <p className="text-[11px] text-neutral-500 font-mono leading-relaxed">
            * Direct secure encryption. Submitted payload will instantly persist in your browser sandbox, allowing full local review.
          </p>

          {/* Symmetrical wire line */}
          <div className="h-[1px] w-12 bg-neutral-800" />

          <div className="space-y-1">
            <span className="block text-[10px] font-mono uppercase text-neutral-600">Location Server</span>
            <span className="text-xs text-neutral-400 font-sans">Pacitan, Jawa Timur (Open to Global Remote)</span>
          </div>
        </div>

        {/* Right side form */}
        <div id="contact-form-panel" className="md:col-span-7">
          <form
            id="secure-contact-form"
            onSubmit={handleSubmit}
            className="bg-neutral-950 border border-neutral-900 rounded-3xl p-6 md:p-8 relative overflow-hidden space-y-5 shadow-2xl"
          >
            {/* Upper line accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Visitor Identity*</label>
                <input
                  id="contact-name-input"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className={`px-4 py-2.5 rounded-xl border border-neutral-900/60 bg-neutral-950/40 text-neutral-200 text-xs focus:outline-none focus:ring-2 ${style.ring} ${style.focusBorder} transition-all`}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Digital Endpoint*</label>
                <input
                  id="contact-email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className={`px-4 py-2.5 rounded-xl border border-neutral-900/60 bg-neutral-950/40 text-neutral-200 text-xs focus:outline-none focus:ring-2 ${style.ring} ${style.focusBorder} transition-all`}
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Organization (Optional)</label>
              <input
                id="contact-company-input"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Systems Inc."
                className={`px-4 py-2.5 rounded-xl border border-neutral-900/60 bg-neutral-950/40 text-neutral-200 text-xs focus:outline-none focus:ring-2 ${style.ring} ${style.focusBorder} transition-all`}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Engineering Specification Payload*</label>
              <textarea
                id="contact-message-input"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Core architectural proposals, consulting, or general questions..."
                className={`px-4 py-2.5 rounded-xl border border-neutral-900/60 bg-neutral-950/40 text-neutral-200 text-xs focus:outline-none focus:ring-2 ${style.ring} ${style.focusBorder} transition-all resize-none`}
              />
            </div>

            <button
              id="submit-contact-btn"
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2.5 text-neutral-900 text-xs font-mono font-bold uppercase tracking-widest rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 cursor-pointer disabled:opacity-50 select-none ${style.glow}`}
              style={{ backgroundColor: isSubmitting ? "gray" : "white" }}
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-neutral-950 border-t-transparent rounded-full" />
                  <span>Syncing Channels...</span>
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" strokeWidth={2.5} />
                  <span>Broadcast Payload</span>
                </>
              )}
            </button>

            {/* Notification messages alerts */}
            <AnimatePresence>
              {success && (
                <motion.div
                  id="contact-success-toast"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 bg-neutral-900/80 border border-neutral-800 rounded-xl flex items-center space-x-2.5 text-xs text-neutral-200"
                >
                  <CheckCircle2 className={`h-4.5 w-4.5 ${style.text}`} />
                  <span className="font-sans leading-tight">Payload received! PERSISTED to browser local storage. Trigger console below to view.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>

      {/* Retro-aesthetic Developer Logs console panel */}
      <div id="retro-console-panel" className="mt-14 border border-neutral-900 rounded-2xl overflow-hidden bg-neutral-950">
        <button
          id="toggle-console-btn"
          onClick={() => setShowConsole(!showConsole)}
          className="w-full flex items-center justify-between px-5 py-3 border-b border-neutral-900 bg-neutral-950 hover:bg-neutral-900/40 transition-colors text-left"
        >
          <div className="flex items-center space-x-3 text-xs font-mono">
            <Terminal className={`h-4 w-4 ${style.text}`} />
            <span className="text-neutral-400">Secure Vault Message Terminal</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-900/90 text-neutral-500 font-bold uppercase select-none">
              {messages.length} persist
            </span>
          </div>
          <span className="text-xs text-neutral-500 font-mono">
            {showConsole ? "[ HIDE ENGINE ]" : "[ SHOW ENGINE ]"}
          </span>
        </button>

        <AnimatePresence>
          {showConsole && (
            <motion.div
              id="retro-console-body"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden"
            >
              <div className="p-5 bg-neutral-950/80 space-y-4 max-h-[350px] overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="py-6 text-center text-xs font-mono text-neutral-600 flex flex-col items-center gap-1">
                    <MessageSquareCode className="h-6 w-6 opacity-40 mb-1" />
                    <span>[ TRANSMISSION LOGS EMPTY ]</span>
                    <span>No active payloads saved. Submit the contact form to generate transactional logs.</span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Control Actions */}
                    <div className="flex items-center justify-between pb-3.5 border-b border-neutral-900/70 text-xs font-mono">
                      <span className="text-neutral-500">// Vault Persistence Logs</span>
                      <div className="flex items-center space-x-3.5">
                        <button
                          id="dl-logs-btn"
                          onClick={downloadLOGStream}
                          className="flex items-center gap-1 hover:text-white transition-colors"
                        >
                          <Download className="h-3 w-3" /> JSON Export
                        </button>
                        <button
                          id="clear-logs-btn"
                          onClick={clearMessages}
                          className="flex items-center gap-1 text-rose-500 hover:text-rose-400 transition-colors"
                        >
                          <Trash2 className="h-3 w-3" /> Flush Vault
                        </button>
                      </div>
                    </div>

                    {/* Messages list */}
                    {messages.map((msg, index) => (
                      <div
                        key={msg.id}
                        className="bg-neutral-900/30 border border-neutral-900 p-4 rounded-xl flex flex-col justify-between space-y-1 font-mono text-xs text-neutral-400"
                      >
                        <div className="flex flex-wrap items-center justify-between border-b border-neutral-900/40 pb-2 mb-2 text-neutral-500">
                          <div>
                            LOG_ID: <span className="text-neutral-300 font-bold">[{msg.id}]</span>
                          </div>
                          <div>
                            STAMP: <span className="text-neutral-400">{new Date(msg.timestamp).toLocaleString()}</span>
                          </div>
                        </div>

                        <div>
                          <span className="text-neutral-500">FROM_ID:</span> <span className="text-neutral-300 font-bold">{msg.name}</span>{" "}
                          <span className="text-neutral-500">({msg.email})</span>
                        </div>
                        <div>
                          <span className="text-neutral-500">ORG_ID :</span> <span className="text-neutral-400">{msg.company}</span>
                        </div>

                        <div className="pt-2 text-neutral-300 font-sans leading-relaxed text-xs">
                          <span className="text-neutral-600 font-mono text-[11px] block">// Payload body</span>
                          {msg.message}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
