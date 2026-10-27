"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import {
  User,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  ArrowRight,
  Copy,
  CheckCheck,
} from "lucide-react";

type DatingApp = "hinge" | "bumble" | "tinder";

interface ProfileScenario {
  app: DatingApp;
  appLabel: string;
  userHandle: string;
  meta: string;
  before: {
    bio: string;
    verdict: string;
    score: number;
    badgeText: string;
    stats: { originality: string; replyBait: string; matchRate: string };
  };
  after: {
    bio: string;
    verdict: string;
    score: number;
    badgeText: string;
    stats: { originality: string; replyBait: string; matchRate: string };
  };
}

const SCENARIOS: Record<DatingApp, ProfileScenario> = {
  hinge: {
    app: "hinge",
    appLabel: "Hinge",
    userHandle: "@rahul_26",
    meta: "Age 26 • Bengaluru",
    before: {
      bio: "Love to travel, coffee addict, gym. Looking for my partner in crime.",
      verdict: "4 million other profiles have this exact text. Your matches have zero specific details to start a conversation with.",
      score: 3.2,
      badgeText: "Needs Work",
      stats: { originality: "2/10", replyBait: "3/10", matchRate: "~4%" },
    },
    after: {
      bio: "Will cook you pasta from scratch on date 3, but first convince me your take on The Office isn't criminal. Training for a 10k (and losing). Golden retriever dad.",
      verdict: "Specific food bait + playful debate + self-deprecating humor. Gives matches 3 effortless openers.",
      score: 9.4,
      badgeText: "Top 5% Profile",
      stats: { originality: "9/10", replyBait: "10/10", matchRate: "3.4x higher" },
    },
  },
  bumble: {
    app: "bumble",
    appLabel: "Bumble",
    userHandle: "@arjun_25",
    meta: "Age 25 • Mumbai",
    before: {
      bio: "6'0 because apparently that matters. Fluent in sarcasm. Work hard play hard. Just ask if you wanna know.",
      verdict: "Reads defensive and puts 100% of the cognitive burden on her. 'Just ask' gets instantly swiped left.",
      score: 2.8,
      badgeText: "Low Conversion",
      stats: { originality: "1/10", replyBait: "2/10", matchRate: "~3%" },
    },
    after: {
      bio: "Make the first move by choosing: 1) Street food crawl in Bandra, 2) Rooftop live jazz, or 3) Laughing at people who fail at parallel parking.",
      verdict: "Eliminates Bumble's biggest roadblock by offering an instant, effortless first message option.",
      score: 9.6,
      badgeText: "Optimized Lead",
      stats: { originality: "10/10", replyBait: "10/10", matchRate: "4.1x higher" },
    },
  },
  tinder: {
    app: "tinder",
    appLabel: "Tinder",
    userHandle: "@vikram_27",
    meta: "Age 27 • Delhi NCR",
    before: {
      bio: "Here for good vibes only. Love dogs, traveling, EDM festivals. Don't be boring lol.",
      verdict: "'Don't be boring' makes you sound cynical before the chat even starts. Generic hobbies offer zero reply hooks.",
      score: 3.5,
      badgeText: "Generic",
      stats: { originality: "3/10", replyBait: "3/10", matchRate: "~5%" },
    },
    after: {
      bio: "Airport 3 hours early or sprinting to the boarding gate like an Olympian? Winner picks the cocktail spot this Thursday.",
      verdict: "Instantly polarising playful prompt that triggers high reply rates in under 5 minutes.",
      score: 9.2,
      badgeText: "High Reply Rate",
      stats: { originality: "9/10", replyBait: "9/10", matchRate: "3.2x higher" },
    },
  },
};

export const HeroInteractiveCard: React.FC = () => {
  const [selectedApp, setSelectedApp] = useState<DatingApp>("hinge");
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isAutoSweeping, setIsAutoSweeping] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const sweepStartTimeRef = useRef<number | null>(null);

  const scenario = SCENARIOS[selectedApp];

  // Auto-sweep animation on load until user interacts
  useEffect(() => {
    if (!isAutoSweeping) return;

    let startTime: number | null = null;
    const sweepDuration = 4000; // 4 seconds cycle

    const animateSweep = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Smooth oscillation between 22% and 78% using sine wave
      const progress = (elapsed % sweepDuration) / sweepDuration;
      const wave = Math.sin(progress * Math.PI * 2);
      const newPos = 50 + wave * 28;

      setSliderPos(newPos);
      animFrameRef.current = requestAnimationFrame(animateSweep);
    };

    animFrameRef.current = requestAnimationFrame(animateSweep);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isAutoSweeping]);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedPct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(clampedPct);
  }, []);

  const handlePointerDown = (clientX: number) => {
    setIsAutoSweeping(false);
    setIsDragging(true);
    updatePosition(clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || !e.touches[0]) return;
      updatePosition(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, updatePosition]);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(scenario.after.bio);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full max-w-md mx-auto select-none">
      {/* Floating high-converting pill */}
      <div className="absolute -top-3.5 right-4 z-30">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-lime text-ink text-xs font-black rounded-full border-2 border-ink shadow-brutal-sm">
          <TrendingUp className="w-3.5 h-3.5 stroke-[3]" />
          <span>3.4x MORE REPLIES</span>
        </span>
      </div>

      {/* Main Container */}
      <div className="card-brutal p-5 sm:p-6 bg-card border-2 border-ink shadow-brutal-xl">
        {/* App Switcher Header */}
        <div className="flex items-center justify-between pb-4 border-b border-line gap-2">
          <div className="flex items-center gap-1.5 bg-bg p-1 rounded-xl border border-line">
            {(["hinge", "bumble", "tinder"] as DatingApp[]).map((appKey) => {
              const active = selectedApp === appKey;
              return (
                <button
                  key={appKey}
                  type="button"
                  onClick={() => {
                    setSelectedApp(appKey);
                    setIsAutoSweeping(false);
                  }}
                  className={`px-3 py-1 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${
                    active
                      ? "bg-purple text-white shadow-brutal-sm scale-105"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  {appKey}
                </button>
              );
            })}
          </div>

          <span className="text-[10px] font-black uppercase text-muted tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-purple animate-pulse" />
            Drag slider
          </span>
        </div>

        {/* Instructions banner */}
        <div className="flex items-center justify-between text-[11px] font-extrabold text-muted my-3 px-1">
          <span className="text-orange flex items-center gap-1">
            <span>◂ BEFORE AUDIT</span>
          </span>
          <span className="text-[10px] uppercase font-bold tracking-tight text-ink/60">
            Slide horizontally to compare
          </span>
          <span className="text-purple flex items-center gap-1">
            <span>AFTER MAKEOVER ▸</span>
          </span>
        </div>

        {/* HORIZONTAL BEFORE / AFTER SLIDER CARD */}
        <div
          ref={containerRef}
          onMouseDown={(e) => handlePointerDown(e.clientX)}
          onTouchStart={(e) => {
            if (e.touches[0]) handlePointerDown(e.touches[0].clientX);
          }}
          className="relative w-full rounded-2xl border-2 border-ink overflow-hidden cursor-ew-resize touch-none shadow-brutal-sm bg-card"
        >
          {/* UNDERNEATH LAYER: AFTER (OPTIMIZED) */}
          <div className="w-full p-5 sm:p-6 space-y-3.5 bg-card text-ink">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-lime border-2 border-ink flex items-center justify-center shadow-brutal-sm shrink-0">
                  <User className="w-5 h-5 text-ink stroke-[2.5]" />
                </div>
                <div>
                  <div className="font-black text-sm text-ink">{scenario.userHandle}</div>
                  <div className="text-xs font-medium text-muted">
                    {scenario.appLabel} • Optimized
                  </div>
                </div>
              </div>

              <div className="text-right">
                <Badge variant="lime">9.4 / 10</Badge>
              </div>
            </div>

            {/* Bio Box */}
            <div className="p-3.5 bg-bg rounded-xl border-2 border-ink text-xs sm:text-sm font-semibold text-ink leading-relaxed min-h-[76px] flex items-center">
              &ldquo;{scenario.after.bio}&rdquo;
            </div>

            {/* Why It Converts */}
            <div className="p-3 bg-lime/20 rounded-xl border border-ink/20 min-h-[72px] flex flex-col justify-center">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-muted">
                  Why this converts
                </span>
                <span className="text-[10px] font-black text-ink uppercase">Top 5%</span>
              </div>
              <p className="text-xs font-semibold text-ink leading-snug">
                {scenario.after.verdict}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-line">
              <div className="bg-bg border border-ink rounded-lg p-2 text-center shadow-brutal-sm">
                <span className="block font-black text-sm text-ink">
                  {scenario.after.stats.originality}
                </span>
                <span className="text-[9px] font-black uppercase text-muted">Originality</span>
              </div>
              <div className="bg-bg border border-ink rounded-lg p-2 text-center shadow-brutal-sm">
                <span className="block font-black text-sm text-ink">
                  {scenario.after.stats.replyBait}
                </span>
                <span className="text-[9px] font-black uppercase text-muted">Reply Bait</span>
              </div>
              <div className="bg-bg border border-ink rounded-lg p-2 text-center shadow-brutal-sm">
                <span className="block font-black text-sm text-purple">
                  {scenario.after.stats.matchRate}
                </span>
                <span className="text-[9px] font-black uppercase text-muted">Est. Reply</span>
              </div>
            </div>
          </div>

          {/* OVERLAY LAYER: BEFORE (AUDIT) - CLIPPED HORIZONTALLY */}
          <div
            className="absolute inset-0 w-full h-full p-5 sm:p-6 space-y-3.5 bg-[#fff4f6] text-ink pointer-events-none"
            style={{
              clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-pink border-2 border-ink flex items-center justify-center shadow-brutal-sm shrink-0">
                  <User className="w-5 h-5 text-ink stroke-[2.5]" />
                </div>
                <div>
                  <div className="font-black text-sm text-ink">{scenario.userHandle}</div>
                  <div className="text-xs font-medium text-muted">
                    {scenario.appLabel} • {scenario.meta}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <Badge variant="pink">{scenario.before.score} / 10</Badge>
              </div>
            </div>

            {/* Bio Box */}
            <div className="p-3.5 bg-card rounded-xl border border-line text-xs sm:text-sm font-medium italic text-ink/80 leading-relaxed min-h-[76px] flex items-center">
              &ldquo;{scenario.before.bio}&rdquo;
            </div>

            {/* Algorithm Roast */}
            <div className="p-3 bg-pink/40 rounded-xl border border-ink/20 min-h-[72px] flex flex-col justify-center">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-muted">
                  Algorithm Audit
                </span>
                <span className="text-[10px] font-black text-orange uppercase">Needs Work</span>
              </div>
              <p className="text-xs font-semibold text-ink leading-snug">
                {scenario.before.verdict}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-line">
              <div className="bg-card border border-ink rounded-lg p-2 text-center shadow-brutal-sm">
                <span className="block font-black text-sm text-ink">
                  {scenario.before.stats.originality}
                </span>
                <span className="text-[9px] font-black uppercase text-muted">Originality</span>
              </div>
              <div className="bg-card border border-ink rounded-lg p-2 text-center shadow-brutal-sm">
                <span className="block font-black text-sm text-ink">
                  {scenario.before.stats.replyBait}
                </span>
                <span className="text-[9px] font-black uppercase text-muted">Reply Bait</span>
              </div>
              <div className="bg-card border border-ink rounded-lg p-2 text-center shadow-brutal-sm">
                <span className="block font-black text-sm text-orange">
                  {scenario.before.stats.matchRate}
                </span>
                <span className="text-[9px] font-black uppercase text-muted">Est. Reply</span>
              </div>
            </div>
          </div>

          {/* SLIDER DIVIDER LINE & DRAG HANDLE */}
          <div
            className="absolute top-0 bottom-0 pointer-events-none z-30"
            style={{ left: `${sliderPos}%` }}
          >
            {/* High-contrast divider line */}
            <div className="absolute top-0 bottom-0 -left-[1.5px] w-[3px] bg-ink shadow-sm" />

            {/* Circular Neobrutalist Handle */}
            <div
              className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border-2 border-ink shadow-brutal flex items-center justify-center text-ink pointer-events-auto cursor-ew-resize transition-transform ${
                isDragging ? "scale-110 bg-lime" : "hover:scale-105"
              }`}
            >
              <ChevronLeft className="w-4 h-4 stroke-[3] -mr-1 text-ink" />
              <ChevronRight className="w-4 h-4 stroke-[3] -ml-1 text-ink" />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-4 pt-3 flex items-center justify-between gap-3 border-t border-line">
          <button
            type="button"
            onClick={handleCopy}
            className="text-xs font-black px-3 py-1.5 rounded-lg border border-ink bg-bg hover:bg-card shadow-brutal-sm flex items-center gap-1.5 transition-all text-ink"
          >
            {copied ? (
              <>
                <CheckCheck className="w-3.5 h-3.5 text-ink" />
                <span>Copied rewrite</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-ink" />
                <span>Copy rewrite</span>
              </>
            )}
          </button>

          <Link
            href="/signup"
            className="text-xs font-black text-ink bg-lime hover:bg-lime-hover px-4 py-1.5 rounded-lg border-2 border-ink shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center gap-1.5"
          >
            <span>Audit My Profile</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </Link>
        </div>
      </div>
    </div>
  );
};