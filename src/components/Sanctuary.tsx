"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Gamepad2, Trophy, RotateCcw, Volume2, VolumeX, 
  Flame, Sparkles, Zap, Award
} from "lucide-react";
import { Companion } from "@/lib/data";

interface SanctuaryProps {
  companion: Companion;
}

interface FallingToken {
  id: number;
  x: number; // percentage 5% to 95%
  y: number; // percentage
  speed: number;
  symbol: string;
  points: number;
  hue: string;
}

export function Sanctuary({ companion }: SanctuaryProps) {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [tokens, setTokens] = useState<FallingToken[]>([]);
  const [mascotCheer, setMascotCheer] = useState<string>("Ready to play? Hit Start!");

  const audioCtxRef = useRef<AudioContext | null>(null);
  const animationRef = useRef<number | null>(null);
  const nextTokenId = useRef(1);

  // Companion specific token definitions
  const getTokenConfig = () => {
    switch (companion.id) {
      case "mochi":
        return {
          symbols: ["🍊", "🍵", "✨", "🌸"],
          flavor: "Zen Citrus Stream",
        };
      case "kai":
        return {
          symbols: ["🦊", "🎮", "⚡", "🔮"],
          flavor: "Neon Kitsune Rush",
        };
      case "koji":
      default:
        return {
          symbols: ["🎋", "☕", "💻", "⭐"],
          flavor: "Cyber Bamboo Harvest",
        };
    }
  };

  // Play synthesized retro Web Audio chime
  const playSound = (freq = 440, type: OscillatorType = "sine") => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } catch {
      // Audio context restricted by browser policy until interaction
    }
  };

  // Start game loop
  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setCombo(1);
    setTokens([]);
    setMascotCheer(`Let's go! Catch the ${companion.name === "Mochi" ? "citrus" : companion.name === "Kai" ? "orbs" : "bamboo"}!`);
    playSound(523.25, "triangle");
  };

  // Catch token
  const handleCatchToken = (id: number, points: number) => {
    const earned = points * combo;
    setScore((prev) => {
      const next = prev + earned;
      if (next > highScore) setHighScore(next);
      return next;
    });

    setCombo((prev) => Math.min(prev + 1, 8));
    setTokens((prev) => prev.filter((t) => t.id !== id));
    playSound(400 + combo * 80, "sine");

    // Dynamic mascot cheering
    if (score + earned > 300) {
      setMascotCheer(`🔥 INSANE! ${companion.name} is hyped! Combo: ${combo}x!`);
    } else if (score + earned > 150) {
      setMascotCheer(`⚡ Great reflexes! Keep that multiplier up!`);
    } else {
      setMascotCheer(`Nice catch! +${earned} pts`);
    }
  };

  // Falling token loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const config = getTokenConfig();
      const randomSymbol = config.symbols[Math.floor(Math.random() * config.symbols.length)];
      
      const newToken: FallingToken = {
        id: nextTokenId.current++,
        x: Math.floor(Math.random() * 85) + 5,
        y: 0,
        speed: 1.2 + Math.random() * 1.6,
        symbol: randomSymbol,
        points: 10,
        hue: companion.accentHex,
      };

      setTokens((prev) => [...prev.slice(-12), newToken]);
    }, 900);

    return () => clearInterval(interval);
  }, [isPlaying, companion]);

  // Animation frame for moving tokens downward
  useEffect(() => {
    if (!isPlaying) return;

    let lastTime = performance.now();

    const loop = (now: number) => {
      const delta = (now - lastTime) / 16.6;
      lastTime = now;

      setTokens((prev) =>
        prev
          .map((t) => ({ ...t, y: t.y + t.speed * delta }))
          .filter((t) => {
            if (t.y > 96) {
              // Token missed: reset combo
              setCombo(1);
              return false;
            }
            return true;
          })
      );

      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying]);

  const config = getTokenConfig();

  return (
    <section id="arcade" data-chapter="arcade" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-mono text-violet-400">
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>INTERACTIVE EXPERIMENTATION · TACTILE ARCADE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
            TACTILE <span className="text-violet-400">ARCADE</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-mono max-w-2xl leading-relaxed">
            Proof of 60 FPS browser responsiveness. Catch falling kinetic tokens with {companion.name} to build combos and trigger real-time Web Audio synthesis.
          </p>
        </div>

        {/* High Score Pill */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl glass-dock border border-white/10 text-xs font-mono">
            <Trophy className="w-4 h-4 text-amber-400" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase">High Score</div>
              <div className="text-base font-bold text-white">{highScore}</div>
            </div>
          </div>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-3 rounded-2xl glass-dock text-slate-400 hover:text-white transition-colors"
            title="Toggle Sound FX"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Arcade Stage Box */}
      <div className="relative w-full h-[450px] sm:h-[500px] rounded-3xl overflow-hidden glass-card border border-white/15 bg-[#090d16] flex flex-col justify-between p-6">
        {/* Top HUD */}
        <div className="flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{companion.emoji}</div>
            <div>
              <div className="text-xs font-bold text-white font-mono">{companion.name}&apos;s Stage</div>
              <div className="text-[11px] text-cyan-400 font-mono">{config.flavor}</div>
            </div>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase block">Score</span>
              <span className="text-2xl font-black text-white">{score}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase block">Multiplier</span>
              <span className={`text-xl font-bold ${combo > 1 ? "text-amber-400 animate-pulse" : "text-slate-400"}`}>
                {combo}x
              </span>
            </div>
          </div>
        </div>

        {/* Live Mascot Commentary Banner */}
        <div className="self-center z-20 px-4 py-1.5 rounded-full glass-dock text-xs font-mono text-slate-300 border border-white/10 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>{mascotCheer}</span>
        </div>

        {/* Interactive Playfield with Falling Tokens */}
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-auto">
          {isPlaying ? (
            tokens.map((token) => (
              <button
                key={token.id}
                onClick={() => handleCatchToken(token.id, token.points)}
                style={{
                  left: `${token.x}%`,
                  top: `${token.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                className="absolute text-3xl sm:text-4xl p-2 cursor-pointer hover:scale-125 active:scale-95 transition-transform duration-75 select-none filter drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]"
              >
                {token.symbol}
              </button>
            ))
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-black/40 backdrop-blur-sm z-30">
              <div className="text-5xl">{companion.emoji}</div>
              <div className="text-center space-y-1">
                <h3 className="text-xl font-bold text-white uppercase tracking-wider font-mono">
                  {config.flavor}
                </h3>
                <p className="text-xs text-slate-400 font-mono max-w-sm">
                  Click falling tokens before they hit the ground. Keep your combo alive!
                </p>
              </div>
              <button
                onClick={startGame}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-2xl hover:scale-105 transition-all"
              >
                <Gamepad2 className="w-4 h-4" />
                <span>Start Game</span>
              </button>
            </div>
          )}
        </div>

        {/* Bottom Control Bar */}
        <div className="flex items-center justify-between z-20 pt-4 border-t border-white/10 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Web Audio Synthesizer Active</span>
          </div>

          {isPlaying && (
            <button
              onClick={startGame}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Game</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
