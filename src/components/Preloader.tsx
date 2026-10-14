"use client";

import { useEffect, useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";

interface PreloaderProps {
  onComplete: () => void;
  companionName: string;
  companionEmoji: string;
}

export function Preloader({ onComplete, companionName, companionEmoji }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(onComplete, 600);
          }, 300);
          return 100;
        }
        // Smooth logarithmic speed
        const remaining = 100 - prev;
        const jump = Math.max(1, Math.min(12, Math.floor(remaining * 0.25)));
        return prev + jump;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-8 bg-[#07090e] text-white transition-opacity duration-500 ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Top Brand Tag */}
      <div className="w-full max-w-6xl flex items-center justify-between text-xs font-mono text-slate-500">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-slate-300 font-bold uppercase tracking-widest">
            Craft Studio
          </span>
        </div>
        <span>BLR · ASIA/KOLKATA</span>
      </div>

      {/* Center Awakening Symbol */}
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <div className="text-6xl sm:text-7xl animate-bounce">
          {companionEmoji}
        </div>
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-200">
            Awakening {companionName}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Initializing edge systems and interactive arcade lab…
          </p>
        </div>
      </div>

      {/* Bottom Percentage & Fluid Wave Indicator */}
      <div className="w-full max-w-md flex flex-col items-center space-y-3">
        <div className="flex items-baseline justify-between w-full font-mono">
          <span className="text-xs uppercase tracking-widest text-slate-500">
            Boot Sequence
          </span>
          <span className="text-3xl font-extrabold text-cyan-400">
            {progress.toString().padStart(2, "0")}
            <span className="text-sm font-normal text-slate-500 ml-1">%</span>
          </span>
        </div>

        {/* Wave Bar Container */}
        <div className="relative w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-violet-500 rounded-full transition-all duration-75 shadow-lg shadow-cyan-500/30"
            style={{ width: `${progress}%` }}
          />
        </div>

        <button
          onClick={() => {
            setIsFading(true);
            setTimeout(onComplete, 300);
          }}
          className="text-[11px] font-mono text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1 pt-1"
        >
          <span>Skip boot intro</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
