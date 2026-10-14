"use client";

import { useEffect, useState } from "react";
import { 
  Terminal, Globe, Clock, ArrowUp, Heart, 
  Sparkles, ExternalLink, ShieldCheck
} from "lucide-react";
import { Companion } from "@/lib/data";

interface FooterProps {
  companion: Companion;
}

export function Footer({ companion }: FooterProps) {
  const [blrTime, setBlrTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setBlrTime(formatter.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const platforms = [
    { name: "Developer Utilities", domain: "utils.anuraaggrao.com", url: "https://utils.anuraaggrao.com" },
    { name: "Edge Telemetry", domain: "analytics.anuraaggrao.com", url: "https://analytics.anuraaggrao.com" },
    { name: "Reactive Audio DSP", domain: "music.anuraaggrao.com", url: "https://music.anuraaggrao.com" },
    { name: "Neon Arcade Engine", domain: "tetris.anuraaggrao.com", url: "https://tetris.anuraaggrao.com" },
    { name: "SLA Health Sentinel", domain: "status.anuraaggrao.com", url: "https://status.anuraaggrao.com" },
  ];

  return (
    <footer id="contact" data-chapter="contact" className="relative border-t border-white/10 bg-[#05070a] pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid: Info & Platforms */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Col 1: Bio & Bangalore Time (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-white tracking-tight">
                ANURAAG G RAO
              </span>
              <span className="text-cyan-400 font-mono text-sm">/ craft</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-mono leading-relaxed max-w-sm">
              Software Architect &amp; Creative Technologist. Specializing in sub-15ms edge runtimes, zero-leak browser cryptosystems, and interactive graphics engines.
            </p>

            {/* Bangalore Clock Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-dock text-xs font-mono text-slate-300">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Bangalore (IST):</span>
              <span className="text-cyan-300 font-bold">{blrTime || "Loading…"}</span>
            </div>
          </div>

          {/* Col 2: Production Subdomains (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-300 font-semibold">
              Production Subdomains
            </div>
            <ul className="space-y-1.5 text-xs font-mono">
              {platforms.map((p) => (
                <li key={p.domain}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-300 transition-colors flex items-center justify-between group py-0.5"
                  >
                    <span className="text-slate-300">{p.name}</span>
                    <span className="text-slate-500 group-hover:text-cyan-400 text-[11px]">
                      {p.domain} ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Terminal & Connect (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-300 font-semibold">
              Connect
            </div>
            <div className="space-y-2 text-xs font-mono">
              <a
                href="https://github.com/AnuraagGRao"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-slate-300 hover:text-cyan-300 transition-colors"
              >
                &gt; github.com/AnuraagGRao
              </a>
              <a
                href="mailto:contact@anuraaggrao.com"
                className="block text-slate-300 hover:text-cyan-300 transition-colors"
              >
                &gt; contact@anuraaggrao.com
              </a>
              <div className="text-slate-500 pt-2 text-[11px]">
                Available for high-throughput edge systems consulting and creative technology projects.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Companion Signature & Scroll to Top */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span>{companion.emoji}</span>
            <span>Accompanied by <strong className="text-slate-300">{companion.name}</strong> ({companion.species})</span>
            <span>·</span>
            <span>© 2026 Anuraag G Rao</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors p-2 rounded-xl hover:bg-white/5"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
