"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { 
  Sparkles, Shield, Cpu, Zap, Volume2, 
  ArrowRight, CheckCircle2, Award, Terminal, Eye, RotateCw, Layers
} from "lucide-react";
import { Companion, COMPANIONS } from "@/lib/data";

const Companion3DViewer = dynamic(
  () => import("@/components/Companion3DViewer").then((m) => m.Companion3DViewer),
  { ssr: false }
);

interface MascotShowcaseProps {
  activeCompanion: Companion;
  onSelectCompanion: (c: Companion) => void;
}

export function MascotShowcase({
  activeCompanion,
  onSelectCompanion,
}: MascotShowcaseProps) {
  const [inspectingId, setInspectingId] = useState<string>(activeCompanion.id);
  const [viewMode, setViewMode] = useState<"3d" | "2d">("3d");
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0, shineX: 50, shineY: 50 });
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const inspectedCompanion = COMPANIONS[inspectingId] || activeCompanion;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMouseTilt({
      x: (y - 0.5) * -16, // rotateX
      y: (x - 0.5) * 16,  // rotateY
      shineX: x * 100,
      shineY: y * 100,
    });
  };

  const handlePointerLeave = () => {
    setMouseTilt({ x: 0, y: 0, shineX: 50, shineY: 50 });
  };

  // Play cute retro Web Audio chirp for the companion
  const playVoiceChirp = () => {
    setIsSpeaking(true);
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const freqs = inspectedCompanion.id === "mochi"
        ? [330, 392, 523]
        : inspectedCompanion.id === "kai"
        ? [587, 784, 987, 1174]
        : [261, 329, 392, 523];

      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = inspectedCompanion.id === "kai" ? "sawtooth" : "sine";
        osc.frequency.setValueAtTime(f, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.12);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.14);
      });
    } catch {
      // Audio policy safe
    }

    setTimeout(() => setIsSpeaking(false), 600);
  };

  return (
    <section
      id="companions"
      data-chapter="companions"
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
    >
      {/* Section Header */}
      <div className="space-y-4 mb-16 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CHARACTER ARCHITECTURE &amp; ORIGIN DOSSIER</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
          THE <span className="text-cyan-400">COMPANIONS</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-400 font-mono leading-relaxed">
          Three living AI-generated operators, each engineered with a distinct systems discipline, tactical gear loadout, and philosophical doctrine.
        </p>
      </div>

      {/* Main Showcase Stage: Split 3D Tilt Card & Technical Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Interactive 3D Holographic Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          {/* View Mode Switcher Pill */}
          <div className="mb-4 p-1 rounded-2xl glass-dock border border-white/15 flex items-center gap-1 text-xs font-mono">
            <button
              onClick={() => setViewMode("3d")}
              className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                viewMode === "3d"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm font-semibold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>3D WebGL</span>
            </button>

            <button
              onClick={() => setViewMode("2d")}
              className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                viewMode === "2d"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm font-semibold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>2D Dossier</span>
            </button>
          </div>

          {/* Card Container with Perspective Tilt */}
          <div
            onPointerMove={viewMode === "2d" ? handlePointerMove : undefined}
            onPointerLeave={viewMode === "2d" ? handlePointerLeave : undefined}
            className="relative w-80 h-[430px] sm:w-96 sm:h-[480px] rounded-3xl p-3 glass-card border border-white/20 shadow-2xl overflow-hidden select-none"
            style={{
              transform: viewMode === "2d" ? `perspective(1000px) rotateX(${mouseTilt.x}deg) rotateY(${mouseTilt.y}deg)` : undefined,
              borderColor: inspectedCompanion.accentHex + "60",
              boxShadow: `0 25px 60px -15px ${inspectedCompanion.accentHex}35`,
            }}
            title={viewMode === "3d" ? "Click & Drag in 3D · Click to hop" : "Click to hear companion voice line"}
          >
            {viewMode === "3d" ? (
              <Companion3DViewer
                companion={inspectedCompanion}
                onChirp={playVoiceChirp}
                isSpeaking={isSpeaking}
                className="w-full h-full"
              />
            ) : (
              <>
                {/* Holographic foil shimmer */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity z-20"
                  style={{
                    background: `radial-gradient(circle at ${mouseTilt.shineX}% ${mouseTilt.shineY}%, rgba(255,255,255,0.8) 0%, transparent 60%)`,
                  }}
                />

                {/* Mascot Image */}
                <div 
                  className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-950 cursor-pointer"
                  onClick={playVoiceChirp}
                >
                  <Image
                    src={inspectedCompanion.imageSrc}
                    alt={inspectedCompanion.name}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Top Status Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <div className="px-3 py-1 rounded-full glass-dock text-[11px] font-mono font-bold text-white flex items-center gap-1.5 border border-white/15">
                      <span className="text-base">{inspectedCompanion.emoji}</span>
                      <span>{inspectedCompanion.species}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playVoiceChirp();
                      }}
                      className={`p-2 rounded-full glass-dock border border-white/15 text-slate-300 hover:text-white transition-all ${
                        isSpeaking ? "scale-110 text-cyan-300" : ""
                      }`}
                      title="Voice line"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Bottom Quote Strip */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl glass-dock bg-slate-950/85 border border-white/15 z-10 space-y-1">
                    <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                      Mantra
                    </div>
                    <p className="text-xs font-sans text-slate-100 italic leading-snug">
                      &ldquo;{inspectedCompanion.mantra}&rdquo;
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Quick Roster Selector Tabs */}
          <div className="mt-6 flex items-center gap-2 p-1.5 rounded-2xl glass-dock border border-white/15">
            {Object.values(COMPANIONS).map((c) => {
              const isSelected = c.id === inspectingId;
              return (
                <button
                  key={c.id}
                  onClick={() => setInspectingId(c.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono transition-all ${
                    isSelected
                      ? "bg-white/15 text-white border border-white/30 shadow-lg scale-105 font-bold"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  <span className="text-base">{c.emoji}</span>
                  <span>{c.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Character Dossier & Engineering Role (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
              <span>{inspectedCompanion.title}</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {inspectedCompanion.name} · {inspectedCompanion.species}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {inspectedCompanion.bio}
            </p>
          </div>

          {/* Tactical Role & Attire Breakdown */}
          <div className="space-y-3 p-5 rounded-2xl bg-white/[0.03] border border-white/10 font-mono text-xs">
            <div className="flex items-start gap-3">
              <Shield className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block uppercase text-[10px] tracking-wider">
                  Systems Domain &amp; Responsibility
                </span>
                <span className="text-white font-semibold">
                  {inspectedCompanion.role}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2 border-t border-white/[0.06]">
              <Cpu className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block uppercase text-[10px] tracking-wider">
                  Tactical Attire &amp; Gear
                </span>
                <span className="text-slate-300">
                  {inspectedCompanion.gear}
                </span>
              </div>
            </div>
          </div>

          {/* Performance Telemetry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-xl glass-dock border border-white/10">
              <span className="text-[10px] text-slate-400 block uppercase">Edge Latency</span>
              <span className="text-base font-bold text-cyan-400">
                {inspectedCompanion.stats.latency}
              </span>
            </div>
            <div className="p-3.5 rounded-xl glass-dock border border-white/10">
              <span className="text-[10px] text-slate-400 block uppercase">Focus State</span>
              <span className="text-base font-bold text-white">
                {inspectedCompanion.stats.focus}
              </span>
            </div>
            <div className="p-3.5 rounded-xl glass-dock border border-white/10">
              <span className="text-[10px] text-slate-400 block uppercase">Vibe Rating</span>
              <span className="text-base font-bold text-emerald-400">
                {inspectedCompanion.stats.vibeRating}
              </span>
            </div>
            <div className="p-3.5 rounded-xl glass-dock border border-white/10">
              <span className="text-[10px] text-slate-400 block uppercase">Render Loop</span>
              <span className="text-base font-bold text-amber-400">
                {inspectedCompanion.stats.renderBudget}
              </span>
            </div>
          </div>

          {/* Equip & Turntable Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectCompanion(inspectedCompanion)}
              className={`px-6 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-xl hover:scale-105 ${
                activeCompanion.id === inspectedCompanion.id
                  ? "bg-emerald-500 text-slate-950 shadow-emerald-500/25"
                  : "bg-white text-slate-950 hover:bg-slate-200"
              }`}
            >
              {activeCompanion.id === inspectedCompanion.id ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Currently Equipped Companion</span>
                </>
              ) : (
                <>
                  <span>Equip {inspectedCompanion.name} Across Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <Link
              href="/companions"
              className="px-5 py-3.5 rounded-2xl glass-dock text-slate-200 hover:text-white border border-white/20 text-xs font-mono uppercase tracking-wider flex items-center gap-2 hover:bg-white/10 transition-all shadow-lg hover:scale-105"
            >
              <RotateCw className="w-3.5 h-3.5 text-cyan-400" />
              <span>Open 3D Turntable Lab</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Architecture & Identity Atelier Strip */}
      <div className="mt-20 pt-10 border-t border-white/[0.08] space-y-6">
        <div className="text-center space-y-1">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-cyan-400 font-semibold">
            ARCHITECTURE &amp; IDENTITY ATELIER
          </span>
          <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Why Animal Companions Over Corporate Headshots
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
            <div className="text-xs font-mono text-cyan-400 font-bold">01 · OPERATIONAL ROLES</div>
            <h5 className="text-base font-bold text-white">Distinct Engineering Doctrines</h5>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Rather than generic corporate portraits, three iconic animal operators anchor the ecosystem: a systems architect cyber panda, an unbothered SRE capybara, and a high-FPS arcade kitsune.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
            <div className="text-xs font-mono text-violet-400 font-bold">02 · TACTILE FOIL &amp; LIGHTING</div>
            <h5 className="text-base font-bold text-white">Interactive Pointer Specular</h5>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Engineered with cinematic rim illumination and pointer-reactive holographic sheen that catches scene lighting on tilt without heavy video streaming overhead.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
            <div className="text-xs font-mono text-emerald-400 font-bold">03 · RUNTIME HOOKS</div>
            <h5 className="text-base font-bold text-white">Wired Into Edge Subsystems</h5>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Every mascot directly interfaces with edge runtimes: steering the 3D WebGL flight stage, driving synthesized Web Audio chimes, and anchoring resident subdomain beacons.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
