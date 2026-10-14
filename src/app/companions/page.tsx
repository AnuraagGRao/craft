"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { 
  Sparkles, ArrowLeft, Volume2, Shield, Cpu, Zap, 
  CheckCircle2, Compass, Radio, RotateCw, Play, Pause,
  Terminal, Layers, Eye, Activity
} from "lucide-react";
import { COMPANIONS, Companion } from "@/lib/data";

// Dynamically load WebGL Stage on client
const Stage = dynamic(() => import("@/components/Stage").then((m) => m.Stage), { ssr: false });

export default function CompanionsShowcasePage() {
  const [selectedId, setSelectedId] = useState<string>("koji");
  const [isAutoSpinning, setIsAutoSpinning] = useState(true);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const turntableRef = useRef<HTMLDivElement>(null);

  // Sync with localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("active_companion_id");
    if (saved && COMPANIONS[saved]) {
      setSelectedId(saved);
    }
  }, []);

  const companion = COMPANIONS[selectedId] || COMPANIONS.koji;

  // Auto-spin animation loop
  useEffect(() => {
    if (!isAutoSpinning || isDragging) return;
    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + 0.5) % 360);
    }, 16);
    return () => clearInterval(interval);
  }, [isAutoSpinning, isDragging]);

  // Pointer drag for manual 3D turntable spin
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setIsAutoSpinning(false);
    setStartX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    setRotationAngle((prev) => (prev + deltaX * 0.75 + 360) % 360);
    setStartX(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Web Audio Synthesized Companion Voice
  const playSynthesizedChirp = (id: string) => {
    setIsSpeaking(true);
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const freqs = id === "mochi"
        ? [330, 392, 523, 659]
        : id === "kai"
        ? [587, 784, 987, 1174, 1318]
        : [261, 329, 392, 523, 659];

      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = id === "kai" ? "sawtooth" : id === "mochi" ? "triangle" : "sine";
        osc.frequency.setValueAtTime(f, ctx.currentTime + idx * 0.07);

        gain.gain.setValueAtTime(0.09, ctx.currentTime + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.14);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.07);
        osc.stop(ctx.currentTime + idx * 0.07 + 0.16);
      });
    } catch {
      // Audio policy safe
    }
    setTimeout(() => setIsSpeaking(false), 550);
  };

  // Equip companion and persist
  const equipCompanion = (c: Companion) => {
    setSelectedId(c.id);
    localStorage.setItem("active_companion_id", c.id);
    playSynthesizedChirp(c.id);
  };

  // Depth tilt based on turntable angle
  const rad = (rotationAngle * Math.PI) / 180;
  const tiltX = Math.sin(rad) * 14;
  const depthZ = Math.cos(rad) * 20;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 relative selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Three.js 3D WebGL Background Flight Stage */}
      <Stage companion={companion} />

      {/* Top Header Bar */}
      <header className="fixed top-4 inset-x-0 z-40 px-4 sm:px-8 pointer-events-none flex justify-center">
        <div className="w-full max-w-7xl flex items-center justify-between">
          <Link
            href="/"
            className="glass-dock pointer-events-auto h-12 px-4 rounded-full flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-white transition-all shadow-xl hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span>Back to Studio</span>
          </Link>

          <div className="glass-dock pointer-events-auto h-12 px-4 rounded-full flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>COMPANION LAB &amp; 3D TURNTABLE</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="relative z-10 pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        
        {/* Section 1: Hero Turntable Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive 3D Turntable (6 cols) */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            {/* Turntable Outer Ring & Stage */}
            <div 
              ref={turntableRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              className="relative w-80 h-[480px] sm:w-[420px] sm:h-[530px] rounded-[36px] p-4 glass-card border border-white/20 shadow-2xl cursor-grab active:cursor-grabbing select-none transition-shadow duration-300"
              style={{
                borderColor: companion.accentHex + "80",
                boxShadow: `0 35px 80px -20px ${companion.accentHex}40`,
              }}
              title="Drag horizontally to spin 360° in 3D"
            >
              {/* Dynamic Specular Shimmer that moves with rotation angle */}
              <div 
                className="absolute inset-0 rounded-[36px] pointer-events-none opacity-25 transition-opacity"
                style={{
                  background: `linear-gradient(${rotationAngle}deg, rgba(255,255,255,0.4) 0%, transparent 60%)`,
                }}
              />

              {/* 3D Turntable Inner Card */}
              <div 
                className="relative w-full h-full rounded-[28px] overflow-hidden bg-slate-950 transition-transform duration-75"
                style={{
                  transform: `perspective(1000px) rotateY(${tiltX}deg) translateZ(${depthZ}px)`,
                }}
              >
                <Image
                  src={companion.imageSrc}
                  alt={companion.name}
                  fill
                  priority
                  className="object-cover"
                />

                {/* Overhead Holographic Status Pill */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                  <div className="px-3 py-1 rounded-full glass-dock text-xs font-mono font-bold text-white flex items-center gap-2 border border-white/20">
                    <span className="text-base">{companion.emoji}</span>
                    <span>{companion.species}</span>
                    <span className="text-slate-400 text-[10px]">· 360° SPIN</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playSynthesizedChirp(companion.id);
                    }}
                    className={`p-2.5 rounded-full glass-dock border border-white/20 text-slate-300 hover:text-white transition-all ${
                      isSpeaking ? "scale-110 text-cyan-300 ring-2 ring-cyan-400" : ""
                    }`}
                    title="Play voice synthesis chirp"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Turntable Gaze Azimuth HUD */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl glass-dock bg-slate-950/85 border border-white/20 z-20 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <Compass className="w-4 h-4" />
                    <span>AZIMUTH: {Math.round(rotationAngle)}°</span>
                  </div>
                  <span className="text-slate-400 text-[10px]">DRAG TO ROTATE</span>
                </div>
              </div>
            </div>

            {/* Turntable Controls Bar */}
            <div className="mt-6 flex items-center gap-3 p-2 rounded-2xl glass-dock border border-white/15">
              <button
                onClick={() => setIsAutoSpinning(!isAutoSpinning)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                  isAutoSpinning ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40" : "text-slate-400 hover:text-white"
                }`}
              >
                {isAutoSpinning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isAutoSpinning ? "Pause Auto-Spin" : "Auto-Spin 360°"}</span>
              </button>

              <button
                onClick={() => setRotationAngle(0)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                title="Reset angle to 0°"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Reset View</span>
              </button>
            </div>

            {/* Roster Character Selection Pills */}
            <div className="mt-4 flex items-center gap-3">
              {Object.values(COMPANIONS).map((c) => {
                const isSelected = c.id === selectedId;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedId(c.id);
                      playSynthesizedChirp(c.id);
                    }}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-mono transition-all ${
                      isSelected
                        ? "bg-white text-slate-950 font-bold shadow-lg scale-105"
                        : "glass-dock text-slate-400 hover:text-white border border-white/10"
                    }`}
                  >
                    <span className="text-base">{c.emoji}</span>
                    <span>{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Character Technical Dossier & Systems Breakdown (6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>OPERATOR SPECIFICATION · {companion.title}</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white uppercase tracking-tight">
                {companion.name} <span className="text-cyan-400">· {companion.species}</span>
              </h1>
              <p className="text-base text-slate-300 leading-relaxed font-sans">
                {companion.bio}
              </p>
            </div>

            {/* Tactical Loadout Cards */}
            <div className="space-y-4">
              <div className="p-5 rounded-2xl glass-card border border-white/15 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                  <Shield className="w-4 h-4" />
                  <span>Systems Domain &amp; Operational Doctrine</span>
                </div>
                <p className="text-sm font-sans text-slate-200">
                  {companion.role}
                </p>
              </div>

              <div className="p-5 rounded-2xl glass-card border border-white/15 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-violet-400 uppercase tracking-wider font-semibold">
                  <Cpu className="w-4 h-4" />
                  <span>Tactical Attire &amp; Kinetic Gear</span>
                </div>
                <p className="text-sm font-sans text-slate-200">
                  {companion.gear}
                </p>
              </div>

              <div className="p-5 rounded-2xl glass-card border border-white/15 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                  <Activity className="w-4 h-4" />
                  <span>Operating Philosophy &amp; Core Mantra</span>
                </div>
                <p className="text-sm font-sans italic text-slate-200">
                  &ldquo;{companion.mantra}&rdquo;
                </p>
              </div>
            </div>

            {/* Live Telemetry Radar Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-xl glass-dock border border-white/10">
                <span className="text-[10px] text-slate-400 block uppercase">Edge Latency</span>
                <span className="text-lg font-bold text-cyan-400">{companion.stats.latency}</span>
              </div>
              <div className="p-3.5 rounded-xl glass-dock border border-white/10">
                <span className="text-[10px] text-slate-400 block uppercase">Focus State</span>
                <span className="text-lg font-bold text-white">{companion.stats.focus}</span>
              </div>
              <div className="p-3.5 rounded-xl glass-dock border border-white/10">
                <span className="text-[10px] text-slate-400 block uppercase">Vibe Rating</span>
                <span className="text-lg font-bold text-emerald-400">{companion.stats.vibeRating}</span>
              </div>
              <div className="p-3.5 rounded-xl glass-dock border border-white/10">
                <span className="text-[10px] text-slate-400 block uppercase">Render Loop</span>
                <span className="text-lg font-bold text-amber-400">{companion.stats.renderBudget}</span>
              </div>
            </div>

            {/* Equip Action */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => equipCompanion(companion)}
                className="px-8 py-4 rounded-2xl bg-white text-slate-950 font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-2xl hover:bg-slate-200 hover:scale-105 transition-all"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Equip {companion.name} Globally Across All Apps</span>
              </button>

              <button
                onClick={() => playSynthesizedChirp(companion.id)}
                className="px-6 py-4 rounded-2xl glass-dock text-slate-300 hover:text-white border border-white/15 text-xs font-mono uppercase tracking-wider flex items-center gap-2 hover:bg-white/10 transition-all"
              >
                <Volume2 className="w-4 h-4 text-cyan-400" />
                <span>Test Synthesizer Audio</span>
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Case Study 00 - Genesis & Engineering Pipeline (Inspired by Emmanuel Wilson's Story.tsx) */}
        <div className="pt-16 border-t border-white/[0.08] space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
              <Terminal className="w-4 h-4" />
              <span>CASE STUDY 00 · THE ANIMAL OPERATORS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase text-white tracking-tight">
              They aren&apos;t just 3D models.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base font-sans leading-relaxed">
              In a digital landscape filled with generic corporate human avatars, we built three high-fidelity animal companions to anchor the entire ecosystem. Here is how they were engineered from raw vision to edge runtime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
              <div className="text-xs font-mono text-cyan-400 font-bold">01 · ARCHETYPE</div>
              <h3 className="text-base font-bold text-white">Beloved Animals</h3>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Rather than human portraits, we selected iconic animal personalities: a cyber panda architect, an unhurried onsen capybara, and an overclocked gamer fox.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
              <div className="text-xs font-mono text-violet-400 font-bold">02 · VOLUMETRICS</div>
              <h3 className="text-base font-bold text-white">Overwatch Aesthetic</h3>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Generated with custom neural diffusion pipelines focusing on tactile streetwear, cinematic rim illumination, and Overwatch-tier shader volumetrics.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
              <div className="text-xs font-mono text-emerald-400 font-bold">03 · THREE.JS STAGE</div>
              <h3 className="text-base font-bold text-white">Scroll Flight Engine</h3>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Each mascot pairs with a tailored 3D WebGL flight stage that tracks scroll progression across chapters with smooth camera lerping and dynamic chromatic theme shift.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
              <div className="text-xs font-mono text-amber-400 font-bold">04 · SYNTHESIS</div>
              <h3 className="text-base font-bold text-white">Web Audio Chirps</h3>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Zero MP3 audio bloat. Every chirp and feedback cue is synthesized in real time directly on the client using Web Audio API oscillator nodes.
              </p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
