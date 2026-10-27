import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Check, Lock } from "lucide-react";

export const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="w-full bg-[#ebe8e0] py-20 border-t border-line">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <Badge variant="purple">THE OFFER</Badge>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-ink mt-3">
              Less than a coffee.
              <br />
              More matches.
            </h2>
          </div>
          <p className="max-w-md font-medium text-muted text-base">
            Get your complete makeover report 100% free. Unlock interactive chat coaching when you want deeper refinement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {/* Free Tier */}
          <div className="card-brutal p-8 bg-card flex flex-col justify-between">
            <div>
              <h3 className="font-black text-2xl text-ink">Free Makeover</h3>
              <div className="my-4 flex items-baseline gap-2">
                <span className="text-5xl font-black tracking-tight text-ink">$0</span>
                <span className="text-base font-bold text-muted tracking-normal">free forever</span>
              </div>
              <p className="text-sm font-medium text-muted mb-6">
                Everything you need to see what&apos;s broken and fix it today.
              </p>
              <ul className="space-y-3 text-sm font-bold text-ink mb-8 border-t border-line pt-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-ink stroke-[3] shrink-0" />
                  <span>Overall profile score (1–10)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-ink stroke-[3] shrink-0" />
                  <span>3 tailored bio rewrites</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-ink stroke-[3] shrink-0" />
                  <span>Photo rankings & lead photo picker</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-ink stroke-[3] shrink-0" />
                  <span>Hinge and Bumble prompt rewrites</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-ink stroke-[3] shrink-0" />
                  <span>5 high-converting openers</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-ink stroke-[3] shrink-0" />
                  <span>Complete red-flag audit</span>
                </li>
                <li className="flex items-center gap-2 text-muted">
                  <Lock className="w-4 h-4 text-muted stroke-[2.5] shrink-0" />
                  <span>Interactive coaching chat</span>
                </li>
              </ul>
            </div>
            <Link
              href="/signup"
              className="btn-brutal bg-card hover:bg-[#f0eee8] text-ink w-full py-3.5 text-center text-sm"
            >
              Get free makeover
            </Link>
          </div>

          {/* Paid Chat Unlock Tier */}
          <div className="card-brutal p-8 bg-pink flex flex-col justify-between shadow-brutal-xl relative">
            <div className="absolute -top-3.5 right-6">
              <Badge variant="lime">Full Coaching Access</Badge>
            </div>
            <div>
              <h3 className="font-black text-2xl text-ink">Coaching Chat Unlock</h3>
              <div className="my-4 flex items-baseline gap-2">
                <span className="text-5xl font-black tracking-tight text-ink">$4</span>
                <span className="text-base font-bold text-ink tracking-normal">
                  / one-time (₹349)
                </span>
              </div>
              <p className="text-sm font-medium text-ink/80 mb-6">
                Full-access dating coach grounded in your photos and bio.
              </p>
              <ul className="space-y-3 text-sm font-black text-ink mb-8 border-t border-ink/20 pt-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-ink stroke-[3] shrink-0" />
                  <span>Everything in the Free Makeover</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-ink stroke-[3] shrink-0" />
                  <span>30 multi-turn coaching questions</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-ink stroke-[3] shrink-0" />
                  <span>Help crafting replies to specific matches</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-ink stroke-[3] shrink-0" />
                  <span>Niche bio style customization</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-ink stroke-[3] shrink-0" />
                  <span>Photo replacement recommendations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-ink stroke-[3] shrink-0" />
                  <span>Report and chat history saved permanently</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-ink stroke-[3] shrink-0" />
                  <span>Instant activation via Razorpay UPI and Cards</span>
                </li>
              </ul>
            </div>
            <Link
              href="/signup"
              className="btn-brutal bg-ink hover:bg-[#2b2b2b] text-white w-full py-3.5 text-center text-sm"
            >
              Get started free →
            </Link>
          </div>
        </div>

        <p className="text-center text-xs font-bold text-muted mt-8">
          No hidden subscriptions. Free report always available. Upgrade chat only if you love it.
        </p>
      </div>
    </section>
  );
};
