"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import { COMPANIONS, Companion } from "@/lib/data";
import { Preloader } from "@/components/Preloader";
import { Navbar } from "@/components/Navbar";
import Hero from "@/components/Hero";
import { CaseStudies } from "@/components/CaseStudies";
import { Systems } from "@/components/Systems";
import { Sanctuary } from "@/components/Sanctuary";
import { Footer } from "@/components/Footer";
import { Stage } from "@/components/Stage";
import { CompanionGuide } from "@/components/CompanionGuide";
import { MascotShowcase } from "@/components/MascotShowcase";

export default function Home() {
  const [selectedCompanion, setSelectedCompanion] = useState<Companion>(COMPANIONS.koji);
  const [isPreloading, setIsPreloading] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(1, document.body.scrollHeight - window.innerHeight);
      setScrollProgress(Math.min(100, Math.round((window.scrollY / max) * 100)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Synchronize companion changes with local storage if desired
  const handleSelectCompanion = (c: Companion) => {
    setSelectedCompanion(c);
  };

  const handleToggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (typeof document !== "undefined") {
        if (next) {
          document.documentElement.classList.remove("light");
        } else {
          document.documentElement.classList.add("light");
        }
      }
      return next;
    });
  };

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div className="scroll-progress-line" style={{ width: `${scrollProgress}%` }} />

      {/* Telemetry Tracking Script */}
      <Script
        src="https://analytics.anuraaggrao.com/tracker.js"
        data-project="craft"
        strategy="afterInteractive"
      />

      {/* Preloader sequence */}
      {isPreloading && (
        <Preloader
          companionName={selectedCompanion.name}
          companionEmoji={selectedCompanion.emoji}
          onComplete={() => setIsPreloading(false)}
        />
      )}

      {/* Navigation Dock */}
      <Navbar
        currentCompanion={selectedCompanion}
        onSelectCompanion={handleSelectCompanion}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Studio Content with WebGL 3D Flight Backdrop */}
      <Stage companion={selectedCompanion} />

      <main className="min-h-screen bg-transparent flex flex-col justify-between selection:bg-cyan-500/30 selection:text-cyan-200 relative z-10">
        <Hero
          companion={selectedCompanion}
          onSelectCompanion={handleSelectCompanion}
        />

        <MascotShowcase
          activeCompanion={selectedCompanion}
          onSelectCompanion={handleSelectCompanion}
        />

        <CaseStudies companion={selectedCompanion} />

        <Systems companion={selectedCompanion} />

        <Sanctuary companion={selectedCompanion} />

        <Footer companion={selectedCompanion} />
      </main>

      {/* Floating Scroll Companion HUD */}
      <CompanionGuide
        companion={selectedCompanion}
        onSelectCompanion={handleSelectCompanion}
      />
    </>
  );
}
