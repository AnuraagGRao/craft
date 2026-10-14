"use client";

import { 
  Server, Shield, Radio, Cpu, Network, Layers, 
  Terminal, Sparkles, Zap, Lock, Code2, Globe
} from "lucide-react";
import { Companion } from "@/lib/data";

interface SystemsProps {
  companion: Companion;
}

export function Systems({ companion }: SystemsProps) {
  const capabilities = [
    {
      icon: Network,
      title: "Edge Compute & Serverless",
      subtitle: "Cloudflare Workers & V8 Isolates",
      badge: "Sub-15ms TTFB",
      description: "Running lightweight TypeScript workers across 300+ global edge nodes. Zero cold starts, instantaneous TLS 1.3 termination, and automatic geo-steering to the closest POP.",
      points: [
        "Cloudflare D1 serverless SQLite for low-overhead relational state",
        "OpenNext edge adapter for zero-overhead Next.js 16 execution",
        "Subdomain multiplexing with custom SSL certificates",
      ],
    },
    {
      icon: Shield,
      title: "Zero-Knowledge Cryptography",
      subtitle: "In-Browser Web Crypto Subsystem",
      badge: "Zero Server Leaks",
      description: "Executing HMAC signatures, SHA-256 digests, Base64/Hex encoders, and AST parsing purely inside client browser memory. Developer secrets and payloads never leave the local machine.",
      points: [
        "Native WebCrypto API hardware-accelerated execution",
        "Zero tracking cookies, zero marketing beacons",
        "Client-side AST evaluation for Regex and JSONPath queries",
      ],
    },
    {
      icon: Radio,
      title: "Audio DSP & Canvas Engines",
      subtitle: "60 FPS Touch & Sound Architecture",
      badge: "16.6ms Render Loop",
      description: "Direct control of Web Audio API oscillator nodes and AnalyserNode FFT bins mapped directly to hardware-accelerated 2D canvas shaders and tactile mobile touch event loops.",
      points: [
        "Spatial frequency bin dissection with low-latency FFT",
        "Procedural sound effects generated without external audio assets",
        "60 FPS locked canvas physics loops with frame-time throttling",
      ],
    },
    {
      icon: Cpu,
      title: "Observability & SLA Sentinel",
      subtitle: "Automated Distributed Probes",
      badge: "99.99% Uptime",
      description: "Autonomous cron workers dispatching multi-region synthetic probes every 60 seconds against every live subdomain, calculating latency percentiles and surfacing real-time status dashboards.",
      points: [
        "Global health check runners across multiple continents",
        "Cloudflare KV persistent state logging for latency tracking",
        "Automatic incident detection and alerting workflows",
      ],
    },
  ];

  return (
    <section id="systems" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Header */}
      <div className="space-y-3 mb-16 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400">
          <Layers className="w-3.5 h-3.5" />
          <span>CORE CAPABILITIES &amp; ARCHITECTURAL PATTERNS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
          SYSTEMS <span className="text-cyan-400">PHILOSOPHY</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-400 font-mono leading-relaxed">
          Zero bloat, deterministic performance, and uncompromising privacy. Every system is built to run fast and stand on its own feet.
        </p>
      </div>

      {/* Grid of Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {capabilities.map((cap, i) => {
          const Icon = cap.icon;
          return (
            <div
              key={i}
              className="glass-card rounded-3xl p-8 border border-white/10 hover:border-cyan-500/30 transition-all space-y-5 group relative overflow-hidden"
            >
              {/* Accent glow on hover */}
              <div 
                className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity"
                style={{ background: companion.accentHex }}
              />

              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-300">
                  {cap.badge}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {cap.title}
                </h3>
                <div className="text-xs font-mono text-slate-400 mt-0.5">
                  {cap.subtitle}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                {cap.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-white/[0.08]">
                {cap.points.map((pt, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2 text-xs font-mono text-slate-400">
                    <span className="text-cyan-400 font-bold">&gt;</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tech Stack Matrix Banner */}
      <div className="mt-12 glass-dock rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center lg:text-left">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
            Primary Stack &amp; Runtime Primitives
          </div>
          <div className="text-sm text-slate-300 font-mono">
            Next.js 16 · Cloudflare Workers (workerd) · Web Crypto · Web Audio API · SQLite D1 · Canvas 2D/WebGL
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-emerald-400 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Bangalore Edge Node Operational</span>
          </span>
        </div>
      </div>
    </section>
  );
}
