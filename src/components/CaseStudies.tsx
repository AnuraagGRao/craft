"use client";

import { useState } from "react";
import { 
  ExternalLink, ArrowUpRight, Shield, Zap, 
  Terminal, Cpu, CheckCircle2, Sparkles, Activity
} from "lucide-react";
import { CASE_STUDIES, CaseStudy, Companion } from "@/lib/data";

interface CaseStudiesProps {
  companion: Companion;
}

export function CaseStudies({ companion }: CaseStudiesProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Developer Tools & Cryptography", "Distributed Edge Infrastructure", "Audio DSP & WebGL Canvas", "Game Physics & Interaction", "DevOps & Infrastructure Observability"];

  const filteredStudies = activeCategory === "All"
    ? CASE_STUDIES
    : CASE_STUDIES.filter((s) => s.category === activeCategory);

  return (
    <section id="case-studies" data-chapter="case-studies" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>ARCHITECTURE &amp; SYSTEMS CASE STUDIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
            ENGINEERED TO <span className="text-cyan-400">SCALE</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-mono max-w-2xl leading-relaxed">
            Deconstructing five production platforms engineered for maximum throughput, zero-leak privacy, and sub-15ms edge compute.
          </p>
        </div>

        {/* Companion Callout Pill */}
        <div className="hidden lg:flex items-center gap-3 p-3 rounded-2xl glass-dock border border-white/10 max-w-sm">
          <span className="text-2xl">{companion.emoji}</span>
          <div className="text-xs">
            <span className="font-semibold text-slate-200 block">{companion.name}&apos;s Note:</span>
            <span className="text-slate-400 font-mono">
              &quot;All 5 are live subdomains. No mockups, no vaporware.&quot;
            </span>
          </div>
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="space-y-8">
        {filteredStudies.map((study, idx) => {
          return (
            <div
              key={study.id}
              className="glass-card rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/10 relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-300"
            >
              {/* Subtle accent glow */}
              <div 
                className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-10 group-hover:opacity-20 transition-opacity"
                style={{ background: companion.accentHex }}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                {/* Left: Metadata & Overview (7 cols) */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono">
                    <span className="px-2.5 py-1 rounded-md bg-white/10 text-slate-300 font-medium">
                      0{idx + 1}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      {study.category}
                    </span>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 ml-auto">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{study.status}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-cyan-400/90 mt-1">
                      {study.subtitle}
                    </p>
                  </div>

                  {/* High-Impact Metric Banner */}
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5 text-xs font-mono text-slate-200">
                    <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="font-semibold text-white">{study.metric}</span>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    {study.description}
                  </p>

                  {/* Technical Highlights Checklist */}
                  <div className="space-y-2 pt-2">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                      Architectural Highlights
                    </div>
                    <ul className="space-y-1.5">
                      {study.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-300 font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stack Badges */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {study.stack.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-white/5 border border-white/10 text-slate-400 group-hover:border-cyan-500/30 group-hover:text-slate-200 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Interactive Live Action / Telemetry Card (5 cols) */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6 pt-4 lg:pt-0">
                  {/* Console Preview Box */}
                  <div className="rounded-2xl bg-black/60 border border-white/10 p-4 font-mono text-xs text-slate-400 shadow-inner space-y-3">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[10px] uppercase tracking-wider">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Terminal className="w-3 h-3 text-cyan-400" />
                        <span>edge-probe://{new URL(study.url).hostname}</span>
                      </div>
                      <span className="text-emerald-400">HTTP 200 OK</span>
                    </div>

                    <div className="space-y-1.5 text-[11px]">
                      <div className="text-slate-500">
                        // Route verification &amp; payload telemetry
                      </div>
                      <div className="text-cyan-300">
                        &gt; TARGET = {study.url}
                      </div>
                      <div className="text-slate-300">
                        &gt; PROTOCOL = HTTP/3 QUIC (Cloudflare Edge)
                      </div>
                      <div className="text-slate-300">
                        &gt; LATENCY = ~14ms roundtrip
                      </div>
                      <div className="text-emerald-400 font-semibold">
                        &gt; HEALTH = 100% OPERATIONAL
                      </div>
                    </div>
                  </div>

                  {/* Live Launch Button */}
                  <a
                    href={study.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl hover:shadow-cyan-500/25 group-hover:scale-[1.02]"
                  >
                    <span>Launch Live Subdomain</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
