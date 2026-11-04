import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Badge } from "@/components/ui/Badge";
import { Check, ArrowRight, X, Sparkles, TrendingUp, ShieldCheck, Zap, ArrowLeft, DollarSign } from "lucide-react";

export const metadata: Metadata = {
  title: "Tinder Boost Alternative: Fix Your Profile Instead of Buying Upgrades | ProfileGlow",
  description:
    "Is Tinder Boost or Platinum worth it? Don't pay $30/mo to amplify a weak profile. ProfileGlow uses Gemini 2.0 multimodal vision to fix your photos and bios for organic matches.",
  alternates: {
    canonical: "https://profileglow.tech/alternatives/tinder-boost",
  },
  openGraph: {
    title: "Tinder Boost & Platinum Alternative: Why In-App Upgrades Fail",
    description:
      "Buying Tinder Boost just shows a low-converting profile to more people faster. Fix the underlying photo and bio conversion funnel first with ProfileGlow.",
    url: "https://profileglow.tech/alternatives/tinder-boost",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "ProfileGlow Tinder Boost Alternative",
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "All",
      "url": "https://profileglow.tech/alternatives/tinder-boost",
      "description":
        "Organic conversion optimization alternative to paid dating app boosts (Tinder Platinum, Bumble Boost). Audits photo presentation and bio hooks to increase organic match rates.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "name": "Free Profile Funnel Audit",
      },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://profileglow.tech",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Alternatives",
          "item": "https://profileglow.tech/alternatives/tinder-boost",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Tinder Boost Alternative",
          "item": "https://profileglow.tech/alternatives/tinder-boost",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is Tinder Platinum or Tinder Boost worth the money?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For most men getting zero matches, no. Tinder Boost only increases your profile's impressions. If your lead photo has poor lighting or your bio is cliché, showing your card to 500 more people just generates 490 more left-swipes, which can actually lower your profile's internal algorithm score. Fixing your photo selection and conversation hooks with ProfileGlow increases organic conversion without recurring fees.",
          },
        },
      ],
    },
  ],
};

export default function TinderBoostAlternativePage() {
  const comparisonRows = [
    {
      feature: "How it Works",
      profileglow: "Fixes the conversion rate (photos, lighting, bios, hooks)",
      tinderboost: "Only increases impressions (shows flawed profile faster)",
    },
    {
      feature: "Long-term Result",
      profileglow: "Permanent organic match increase on all apps",
      tinderboost: "Traffic drops to zero the second the 30-min boost ends",
    },
    {
      feature: "Cost",
      profileglow: "Free scan + one-time ₹349 ($4 USD) unlock",
      tinderboost: "$20–$40/month ongoing or $8.99 per 30-minute boost",
    },
    {
      feature: "Works Across Platforms",
      profileglow: "Applies to Tinder, Bumble, and Hinge simultaneously",
      tinderboost: "Tinder only (must pay separately for Bumble/Hinge)",
    },
    {
      feature: "Bio & Prompt Optimization",
      profileglow: "3 custom bio styles + 5 personalized openers",
      tinderboost: "None",
    },
  ];

  const faqs = [
    {
      q: "Why do in-app boosts fail for average profiles?",
      a: "Dating app algorithms calculate your profile's internal attractiveness score based on the percentage of people who swipe right on your card. If your profile converts poorly, buying a Boost accelerates left-swipes, causing the algorithm to deprioritize your profile once the paid timer expires.",
    },
    {
      q: "How does fixing photo order outperform paying for Boosts?",
      a: "Data shows that lead photo optimization accounts for over 80% of right-swipe decisions. Changing your lead photo from a car selfie to a crisp, outdoor portrait with direct eye contact can multiply right-swipe conversion by 3x organically, making paid boosts unnecessary.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-bg text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <section className="max-w-6xl mx-auto px-4 pt-6">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-xs md:text-sm font-bold text-muted">
              <li>
                <Link href="/" className="hover:text-purple transition-colors inline-flex items-center gap-1">
                  <ArrowLeft className="w-3.5 h-3.5 stroke-[3]" /> Home
                </Link>
              </li>
              <li>/</li>
              <li>Alternatives</li>
              <li>/</li>
              <li className="text-ink" aria-current="page">
                Tinder Boost Alternative
              </li>
            </ol>
          </nav>
        </section>

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <Badge variant="pink">⚡ THE ORGANIC TINDER BOOST ALTERNATIVE</Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-[1.05] text-ink">
              Stop paying Tinder $30/month to amplify a broken profile.
            </h1>

            <p className="text-lg md:text-xl font-medium text-ink/80 max-w-xl leading-relaxed">
              Buying Tinder Boost or Platinum just shows a low-converting profile to more people faster. **ProfileGlow fixes your photo lighting, lead photo ranking, and conversation hooks** so you get matches organically.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/dashboard"
                className="btn-brutal bg-purple hover:bg-purple-dark text-white px-7 py-3.5 text-base rounded-2xl shadow-brutal inline-flex items-center gap-2"
              >
                Audit your profile free <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </Link>
              <Link
                href="#comparison"
                className="btn-brutal bg-card hover:bg-[#f0eee8] text-ink px-7 py-3.5 text-base rounded-2xl shadow-brutal"
              >
                Why Boosts fail
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-2 text-xs font-black text-muted">
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-purple" /> Permanent Organic Match Lift
              </span>
              <span className="flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-lime" /> Save $300+/year in In-App Upgrades
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-card border-2 border-ink rounded-3xl p-6 shadow-brutal space-y-5">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <span className="text-xs font-black uppercase tracking-wider text-muted">The Funnel Math</span>
                <span className="bg-lime text-ink font-black text-xs px-2.5 py-1 rounded-full border border-ink">
                  Conversion &gt; Volume
                </span>
              </div>

              <div className="space-y-4 text-sm font-bold">
                <div className="p-3 bg-bg rounded-xl border border-line space-y-1">
                  <span className="text-muted block text-xs">Paying for Boosts:</span>
                  <p className="text-ink font-extrabold text-xs">
                    500 impressions × 0.5% conversion = <span className="text-pink">2 matches</span> ($30/mo forever)
                  </p>
                </div>
                <div className="p-3 bg-purple/10 rounded-xl border border-purple space-y-1">
                  <span className="text-purple block text-xs">Fixing Your Funnel with ProfileGlow:</span>
                  <p className="text-ink font-extrabold text-xs">
                    500 impressions × 3.5% conversion = <span className="text-purple font-black">17 matches</span> (Organically)
                  </p>
                </div>
              </div>

              <div className="pt-2 text-center">
                <Link
                  href="/dashboard"
                  className="btn-brutal w-full bg-lime hover:bg-lime/90 text-ink py-3 text-sm rounded-xl shadow-brutal font-black inline-block text-center"
                >
                  Start Free Audit
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section id="comparison" className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center space-y-3 mb-12">
            <Badge variant="purple">STRATEGY COMPARISON</Badge>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-ink">
              Fixing the Profile vs. Buying the Boost
            </h2>
            <p className="text-sm md:text-base font-bold text-muted max-w-xl mx-auto">
              Why smart singles optimize conversion rate instead of buying temporary impressions.
            </p>
          </div>

          <div className="overflow-x-auto border-2 border-ink rounded-3xl shadow-brutal bg-card">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-ink bg-bg">
                  <th className="p-4 md:p-6 text-sm md:text-base font-black text-ink">Strategy</th>
                  <th className="p-4 md:p-6 text-sm md:text-base font-black text-purple bg-purple/10 border-x-2 border-ink">
                    ⚡ ProfileGlow Optimization
                  </th>
                  <th className="p-4 md:p-6 text-sm md:text-base font-black text-muted">Paid Boost / Platinum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line text-xs md:text-sm font-bold">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-card" : "bg-bg/40"}>
                    <td className="p-4 md:p-6 text-ink font-extrabold">{row.feature}</td>
                    <td className="p-4 md:p-6 text-ink bg-purple/5 border-x-2 border-ink font-black">
                      <span className="flex items-center gap-1.5 text-purple">
                        <Check className="w-4 h-4 stroke-[3] text-purple shrink-0" />
                        {row.profileglow}
                      </span>
                    </td>
                    <td className="p-4 md:p-6 text-muted">
                      <span className="flex items-center gap-1.5 text-muted">
                        <X className="w-4 h-4 stroke-[3] text-pink shrink-0" />
                        {row.tinderboost}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-4 py-16 space-y-8">
          <div className="text-center space-y-3">
            <Badge variant="lime">FAQ</Badge>
            <h2 className="text-3xl font-black text-ink">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-card border-2 border-ink rounded-2xl p-6 shadow-brutal space-y-2">
                <h3 className="text-base md:text-lg font-black text-ink">{faq.q}</h3>
                <p className="text-sm font-medium text-ink/80 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="bg-lime border-2 border-ink rounded-3xl p-8 md:p-12 shadow-brutal text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-ink">
              Stop burning money on temporary boosts.
            </h2>
            <p className="text-base md:text-lg font-extrabold text-ink/80 max-w-xl mx-auto">
              Fix your photo lighting, lead photo ranking, and conversation hooks once, and get matches across all your dating apps permanently.
            </p>
            <div className="pt-2">
              <Link
                href="/dashboard"
                className="btn-brutal bg-purple hover:bg-purple-dark text-white px-8 py-4 text-lg rounded-2xl shadow-brutal font-black inline-flex items-center gap-2"
              >
                Scan my profile free <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
