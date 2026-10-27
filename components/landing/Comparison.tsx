import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Check, X } from "lucide-react";

export const Comparison: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <Badge variant="purple">SEE THE DIFFERENCE</Badge>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-ink mt-3">
            Before & after
            <br />
            ProfileGlow
          </h2>
        </div>
        <p className="max-w-md font-medium text-muted text-base">
          Same person. Better profile presentation. More quality matches.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Before */}
        <div className="card-brutal p-8 bg-card border-2 border-ink">
          <Badge variant="pink" className="mb-4">BEFORE</Badge>
          <div className="p-4 bg-bg border border-line rounded-xl text-sm font-medium italic text-ink/80 mb-6">
            &ldquo;Hey, I&apos;m Jake. I like traveling, food, and Netflix. Looking for someone chill. Don&apos;t be boring lol. 6&apos;1 if that matters.&rdquo;
          </div>
          <ul className="space-y-2.5 text-xs md:text-sm font-bold text-ink">
            <li className="flex items-center gap-2 text-orange">
              <X className="w-4 h-4 text-orange stroke-[3] shrink-0" />
              <span>Generic: describes 90% of profiles</span>
            </li>
            <li className="flex items-center gap-2 text-orange">
              <X className="w-4 h-4 text-orange stroke-[3] shrink-0" />
              <span>&ldquo;Don&apos;t be boring&rdquo; reads defensive/negative</span>
            </li>
            <li className="flex items-center gap-2 text-orange">
              <X className="w-4 h-4 text-orange stroke-[3] shrink-0" />
              <span>Zero specific conversation hooks</span>
            </li>
            <li className="flex items-center gap-2 text-orange">
              <X className="w-4 h-4 text-orange stroke-[3] shrink-0" />
              <span>Nothing memorable that prompts a reply</span>
            </li>
          </ul>
        </div>

        {/* After */}
        <div className="card-brutal p-8 bg-lime border-2 border-ink shadow-brutal-xl md:rotate-1">
          <Badge variant="white" className="mb-4">AFTER OPTIMIZATION</Badge>
          <div className="p-4 bg-white/70 border border-ink/20 rounded-xl text-sm font-semibold italic text-ink mb-6">
            &ldquo;I will cook you pasta from scratch on date 3, but first, convince me your take on The Office is not wrong. Currently training for a half marathon and losing. Dog dad to a golden who gets more Hinge likes than I do.&rdquo;
          </div>
          <ul className="space-y-2.5 text-xs md:text-sm font-black text-ink">
            <li className="flex items-center gap-2 text-ink">
              <Check className="w-4 h-4 text-ink stroke-[3] shrink-0" />
              <span>Specific: pasta, The Office, golden retriever</span>
            </li>
            <li className="flex items-center gap-2 text-ink">
              <Check className="w-4 h-4 text-ink stroke-[3] shrink-0" />
              <span>Playful, self-deprecating humor</span>
            </li>
            <li className="flex items-center gap-2 text-ink">
              <Check className="w-4 h-4 text-ink stroke-[3] shrink-0" />
              <span>High-converting conversation hooks</span>
            </li>
            <li className="flex items-center gap-2 text-ink">
              <Check className="w-4 h-4 text-ink stroke-[3] shrink-0" />
              <span>Shows authentic personality effortlessly</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
