import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Check } from "lucide-react";
import { HeroInteractiveCard } from "./HeroInteractiveCard";

export const Hero: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
      <div className="lg:col-span-7 space-y-6">
        <Badge variant="pink">DATING PROFILE AUDIT & MAKEOVER</Badge>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[0.95] text-ink">
          Stop swiping.
          <br />
          <span className="bg-gradient-to-r from-lime to-lime bg-[length:100%_40%] bg-no-repeat bg-bottom">
            Start matching.
          </span>
        </h1>

        <p className="text-lg md:text-xl font-medium text-ink/80 max-w-xl leading-relaxed">
          Upload your dating profile photos and bio. Get an instant profile makeover report: rewritten bios, photo order rankings, and openers that actually get replies.
        </p>

        <div className="flex flex-wrap gap-4 pt-2">
          <Link
            href="/signup"
            className="btn-brutal bg-purple hover:bg-purple-dark text-white px-7 py-3.5 text-base rounded-2xl shadow-brutal"
          >
            Get your free score
          </Link>
          <Link
            href="#pricing"
            className="btn-brutal bg-card hover:bg-[#f0eee8] text-ink px-7 py-3.5 text-base rounded-2xl shadow-brutal"
          >
            See pricing
          </Link>
        </div>

        <p className="text-xs font-bold text-muted flex items-center gap-1.5">
          <Check className="w-4 h-4 text-ink stroke-[3]" />
          <span>Free profile makeover score & report. No credit card required.</span>
        </p>
      </div>

      <div className="lg:col-span-5 w-full flex justify-center">
        <HeroInteractiveCard />
      </div>
    </section>
  );
};
