"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, Terminal, Moon, Sun, ExternalLink, 
  ChevronDown, Gamepad2, Layers, Send, Code2
} from "lucide-react";
import { COMPANIONS, Companion } from "@/lib/data";

interface NavbarProps {
  currentCompanion: Companion;
  onSelectCompanion: (c: Companion) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export function Navbar({
  currentCompanion,
  onSelectCompanion,
  isDark,
  onToggleTheme,
}: NavbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="fixed top-4 inset-x-0 z-40 px-3 sm:px-6 pointer-events-none flex justify-center">
      <div className="w-full max-w-6xl flex items-center justify-between gap-3">
        {/* Left: Brand Pill with Bangalore Live Beacon */}
        <Link
          href="/"
          className="glass-dock pointer-events-auto h-12 px-4 rounded-full flex items-center gap-3 transition-all hover:scale-[1.02] shadow-xl"
        >
          <div className="flex items-center gap-1.5 font-bold tracking-tight text-sm">
            <span className="text-white">Craft</span>
            <span className="text-cyan-400">.</span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              by Anuraag
            </span>
          </div>
          <div className="h-4 w-px bg-white/10 hidden sm:block" />
          {/* Bangalore Beacon */}
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="hidden xs:inline">BLR</span>
          </div>
        </Link>

        {/* Center: Primary Navigation Links */}
        <nav className="glass-dock pointer-events-auto h-12 px-2 rounded-full hidden md:flex items-center gap-1">
          <a
            href="#case-studies"
            className="px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            Case Studies
          </a>
          <a
            href="#systems"
            className="px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            Systems
          </a>
          <a
            href="#sanctuary"
            className="px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-violet-400 hover:text-violet-300 hover:bg-violet-500/10 flex items-center gap-1.5 transition-all"
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Player 1</span>
          </a>
          <a
            href="#contact"
            className="px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            Contact
          </a>
        </nav>

        {/* Right: Companion Switcher + Theme Toggle + GitHub */}
        <div className="glass-dock pointer-events-auto h-12 px-2 rounded-full flex items-center gap-1.5 relative">
          {/* Companion Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
              title="Switch Animal Companion"
            >
              <span className="text-sm">{currentCompanion.emoji}</span>
              <span className="font-mono text-slate-200 hidden sm:inline">
                {currentCompanion.name}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div
                className="absolute right-0 mt-3 w-52 p-2 rounded-2xl glass-dock bg-slate-950/95 border border-white/15 shadow-2xl space-y-1 animate-in fade-in zoom-in-95 duration-150"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-[10px] font-mono uppercase text-slate-400 px-2 py-1">
                  Select Companion
                </div>
                {Object.values(COMPANIONS).map((c) => {
                  const isSelected = c.id === currentCompanion.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => {
                        onSelectCompanion(c);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-left text-xs transition-all ${
                        isSelected
                          ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                          : "text-slate-300 hover:bg-white/5"
                      }`}
                    >
                      <span className="text-lg">{c.emoji}</span>
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-100">{c.name}</div>
                        <div className="text-[10px] text-slate-400 truncate">{c.species}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-cyan-300" />}
          </button>

          {/* GitHub */}
          <a
            href="https://github.com/AnuraagGRao"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
