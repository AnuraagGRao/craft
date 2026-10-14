"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MessageSquare, RefreshCw, Sparkles, ChevronUp, X } from "lucide-react";
import { Companion, COMPANIONS } from "@/lib/data";

interface CompanionGuideProps {
  companion: Companion;
  onSelectCompanion: (c: Companion) => void;
}

export function CompanionGuide({ companion, onSelectCompanion }: CompanionGuideProps) {
  const [activeChapter, setActiveChapter] = useState<string>("hero");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [customCommentary, setCustomCommentary] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Chapter-specific commentary per mascot
  const getChapterDialogue = (chap: string) => {
    switch (chap) {
      case "companions":
        if (companion.id === "mochi") {
          return "Welcome to the crew roster. Pick whoever matches your rhythm today.";
        }
        if (companion.id === "kai") {
          return "Character showcase! Equip me if you want maximum FPS and neon sound waves!";
        }
        return "Welcome to the crew roster. Each of us was trained on distinct edge systems.";

      case "case-studies":
        if (companion.id === "mochi") {
          return "Take your time inspecting each system. Uptime is peaceful and steady.";
        }
        if (companion.id === "kai") {
          return "5 production monsters! Check the 60 FPS canvas loop on Tetris and Audio DSP!";
        }
        return "5 real-world production beasts below. Note the zero-server crypto tools in utils.";

      case "systems":
        if (companion.id === "mochi") {
          return "Zero-knowledge architecture. Your payloads stay in local memory, untouched.";
        }
        if (companion.id === "kai") {
          return "16.6ms render loops locked! Lag is the enemy, fluid frames are forever.";
        }
        return "Sub-15ms edge compute across 300+ global nodes. Cold starts don't exist here.";

      case "arcade":
      case "sanctuary":
        if (companion.id === "mochi") {
          return "Catch the falling citrus. Breathe in, breathe out, keep your combo smooth.";
        }
        if (companion.id === "kai") {
          return "Arcade stage! Let's see if you can break 300 points before an orb drops!";
        }
        return "Arcade time! Catch fresh bamboo and hit that 8x multiplier!";

      case "contact":
        if (companion.id === "mochi") {
          return "End of the flight. Drink some tea, check out the live subdomains.";
        }
        if (companion.id === "kai") {
          return "Thanks for rolling through! Hit me up to build high-FPS interactive tech.";
        }
        return "Bangalore edge node operational. Ping Radi if you need high-throughput systems.";

      default:
        return companion.speechBubbles[0];
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
      const progress = Math.min(100, Math.round((scrollY / maxScroll) * 100));
      setScrollProgress(progress);

      // Show floating guide only when scrolled past hero (e.g. > 450px)
      setIsVisible(scrollY > 400);

      // Detect active chapter from [data-chapter]
      const chapters = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
      const mid = scrollY + window.innerHeight * 0.45;

      for (let i = chapters.length - 1; i >= 0; i--) {
        const el = chapters[i];
        if (el.offsetTop <= mid) {
          const chap = el.dataset.chapter || "hero";
          if (chap !== activeChapter) {
            setActiveChapter(chap);
            setCustomCommentary(null); // Reset to chapter dialogue
          }
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeChapter]);

  const handleMascotClick = () => {
    // Cycle custom commentary on click
    const randomBubble =
      companion.speechBubbles[Math.floor(Math.random() * companion.speechBubbles.length)];
    setCustomCommentary(randomBubble);
  };

  if (!isVisible) return null;

  const currentSpeech = customCommentary || getChapterDialogue(activeChapter);

  return (
    <div className="fixed bottom-5 right-5 z-40 max-w-sm sm:max-w-md pointer-events-none flex flex-col items-end gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Speech Bubble */}
      <div
        onClick={handleMascotClick}
        className="pointer-events-auto cursor-pointer p-3.5 rounded-2xl glass-dock bg-[#090d16]/95 border border-white/20 text-xs shadow-2xl max-w-xs transition-all hover:scale-[1.02] hover:border-cyan-500/40 relative group"
        title="Click companion for more thoughts"
      >
        <div className="flex items-center justify-between gap-2 text-[10px] font-mono text-cyan-400 uppercase tracking-wider mb-1">
          <div className="flex items-center gap-1">
            <span>{companion.emoji}</span>
            <span>{companion.name} · {activeChapter.replace("-", " ")}</span>
          </div>
          <span className="text-slate-500 group-hover:text-cyan-300">tap</span>
        </div>
        <p className="font-sans text-slate-200 leading-snug">
          &ldquo;{currentSpeech}&rdquo;
        </p>
      </div>

      {/* Floating Avatar Pod & Switcher */}
      <div className="pointer-events-auto flex items-center gap-2">
        {/* Companion Quick Switcher Dropup */}
        {isMenuOpen && (
          <div className="flex items-center gap-1.5 p-1.5 rounded-full glass-dock bg-[#090d16]/95 border border-white/20 shadow-xl animate-in zoom-in-95 duration-150">
            {Object.values(COMPANIONS).map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  onSelectCompanion(c);
                  setIsMenuOpen(false);
                }}
                className={`p-2 rounded-full text-base transition-all ${
                  c.id === companion.id
                    ? "bg-white/20 scale-110 shadow-md"
                    : "hover:bg-white/10 opacity-70 hover:opacity-100"
                }`}
                title={`Switch to ${c.name} (${c.species})`}
              >
                {c.emoji}
              </button>
            ))}
          </div>
        )}

        {/* Circular Mascot Badge with Circular Scroll Progress */}
        <div className="relative group">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative w-14 h-14 rounded-full overflow-hidden glass-card p-1 border-2 shadow-2xl cursor-pointer hover:scale-110 transition-transform active:scale-95"
            style={{
              borderColor: companion.accentHex,
              boxShadow: `0 0 20px ${companion.accentHex}40`,
            }}
            title="Click to change companion"
          >
            <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-950">
              <Image
                src={companion.imageSrc}
                alt={companion.name}
                fill
                className="object-cover"
              />
            </div>
          </button>

          {/* Scroll progress ring overlay indicator */}
          <div
            className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-[#090d16] text-cyan-300 border border-white/20 shadow"
            title={`${scrollProgress}% page scrolled`}
          >
            {scrollProgress}%
          </div>
        </div>
      </div>
    </div>
  );
}
