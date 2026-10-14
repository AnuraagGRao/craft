"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Sparkles, ArrowRight, Gamepad2, ShieldCheck, 
  Zap, MessageCircle, Terminal, Flame, RefreshCw
} from "lucide-react";
import { Companion, COMPANIONS } from "@/lib/data";

interface HeroProps {
  companion: Companion;
  onSelectCompanion: (c: Companion) => void;
}

export default function Hero({ companion, onSelectCompanion }: HeroProps) {
  const [speechIndex, setSpeechIndex] = useState(0);

  const cycleSpeech = () => {
    setSpeechIndex((prev) => (prev + 1) % companion.speechBubbles.length);
  };

  const currentSpeech = companion.speechBubbles[speechIndex % companion.speechBubbles.length];

  return (
    <section data-chapter="hero" className="relative w-full min-h-[92vh] pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-between overflow-hidden">
      {/* Background ambient lighting */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[350px] blur-3xl pointer-events-none -z-10 opacity-30 transition-all duration-700 rounded-full"
        style={{
          background: `radial-gradient(ellipse at center, ${companion.accentHex} 0%, transparent 70%)`
        }}
      />

      {/* Top Banner Tag */}
      <div className="flex items-center gap-2 self-center sm:self-start">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-dock text-xs font-mono text-slate-300">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>craft.anuraaggrao.com</span>
          <span className="text-slate-600">/</span>
          <span className="text-cyan-300 font-semibold">{companion.species}</span>
        </div>
      </div>

      {/* Main Split: Text & Editorial Left + 3D Mascot Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-6 flex-1">
        {/* Left Column: Big Typographic Headline (7 cols) */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div className="space-y-2">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-cyan-400 font-semibold block">
              Software Architect &amp; Creative Technologist
            </span>
            <h1 className="text-5xl sm:text-7xl xl:text-8xl font-extrabold tracking-[-0.04em] text-white leading-[0.95] uppercase select-none">
              ANURAAG <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-300 to-slate-500">
                G. RAO
              </span>
            </h1>
          </div>

          <p className="text-sm sm:text-base text-slate-400 max-w-xl font-mono leading-relaxed border-l-2 border-cyan-500/60 pl-4 py-1 mx-auto lg:mx-0">
            Full-Stack &amp; Systems Engineer based in Bangalore. Building high-throughput edge systems, zero-server privacy utilities, and tactile 60 FPS interfaces. Gamer by nature.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-2 flex items-center justify-center lg:justify-start gap-4 flex-wrap text-xs font-mono text-slate-300">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Sub-15ms Edge Latency</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero-Leak Privacy</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
              <Gamepad2 className="w-3.5 h-3.5 text-violet-400" />
              <span>60 FPS Game Loop</span>
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 flex-wrap">
            <a
              href="#case-studies"
              className="px-6 py-3 rounded-2xl bg-white text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-slate-200 transition-all shadow-xl hover:scale-105"
            >
              <span>Explore Case Studies</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="#sanctuary"
              className="px-6 py-3 rounded-2xl glass-dock text-slate-200 font-semibold text-xs uppercase tracking-wider hover:text-white flex items-center gap-2 hover:bg-white/10 transition-all"
            >
              <Gamepad2 className="w-3.5 h-3.5 text-violet-400" />
              <span>Player 1 Sanctuary</span>
            </a>
          </div>
        </div>

        {/* Right Column: Interactive 3D Mascot Stage (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          {/* Interactive Speech Bubble */}
          <div 
            onClick={cycleSpeech}
            className="cursor-pointer mb-3 px-4 py-2.5 rounded-2xl glass-dock border border-white/15 text-xs text-slate-200 shadow-xl max-w-xs text-center relative group hover:border-cyan-500/40 transition-all animate-bounce"
            title="Click to talk to companion"
          >
            <div className="flex items-center justify-center gap-1 text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-0.5">
              <MessageCircle className="w-3 h-3" />
              <span>{companion.name} says</span>
            </div>
            <p className="font-medium text-slate-100 leading-snug">
              “{currentSpeech}”
            </p>
            <span className="text-[9px] text-slate-500 font-mono block mt-1">
              (click to talk)
            </span>
          </div>

          {/* 3D Mascot Avatar Display */}
          <div 
            onClick={cycleSpeech}
            className="relative w-72 h-72 sm:w-84 sm:h-84 rounded-3xl overflow-hidden glass-card p-2 shadow-2xl cursor-pointer group animate-float"
            style={{
              borderColor: companion.accentHex + "44",
              boxShadow: `0 25px 50px -12px ${companion.accentHex}25`
            }}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-950">
              <Image
                src={companion.imageSrc}
                alt={companion.name}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Floating Companion Tag */}
            <div className="absolute bottom-4 left-4 right-4 p-2.5 rounded-xl glass-dock flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-lg">{companion.emoji}</span>
                <div>
                  <div className="font-bold text-white leading-tight">{companion.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{companion.species}</div>
                </div>
              </div>
              <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-cyan-300">
                {companion.stats.latency}
              </div>
            </div>
          </div>

          {/* Mascot Quick Roster Switcher */}
          <div className="mt-4 flex items-center gap-2">
            {Object.values(COMPANIONS).map((c) => {
              const isActive = c.id === companion.id;
              return (
                <button
                  key={c.id}
                  onClick={() => onSelectCompanion(c)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                    isActive
                      ? "bg-white/15 text-white border border-white/30 shadow-md scale-105"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  <span>{c.emoji}</span>
                  <span>{c.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Case Studies Teaser Banner */}
      <div className="mt-12 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
            CASE STUDIES · 05
          </span>
          <span>5 production systems taken apart: utilities, edge analytics, canvas physics &amp; audio DSP.</span>
        </div>
        <a 
          href="#case-studies"
          className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
        >
          <span>Scroll to inspect</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
}
