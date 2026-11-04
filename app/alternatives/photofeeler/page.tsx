import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Badge } from "@/components/ui/Badge";
import { Check, ArrowRight, X, Sparkles, Clock, ShieldCheck, Zap, ArrowLeft, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "PhotoFeeler Alternative: Instant AI Dating Profile Makeover | ProfileGlow",
  description:
    "Looking for a PhotoFeeler alternative? Get instant 60-second multimodal AI photo rankings, lighting diagnostics, and full bio rewrites without waiting days for human votes.",
  alternates: {
    canonical: "https://profileglow.tech/alternatives/photofeeler",
  },
  openGraph: {
    title: "Best PhotoFeeler Alternative: Instant Multimodal AI vs 48hr Human Votes",
    description:
      "Why wait 3 days for anonymous stranger votes? ProfileGlow delivers instant Gemini 2.0 vision photo analysis, lead photo ranking, and complete bio rewrites in 60s.",
    url: "https://profileglow.tech/alternatives/photofeeler",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "ProfileGlow PhotoFeeler Alternative",
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "All",
      "url": "https://profileglow.tech/alternatives/photofeeler",
      "description":
        "Instant multimodal computer vision alternative to PhotoFeeler for dating photo scores, lead photo selection, and bio rewrites.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "name": "Free Dating Photo & Profile Scan",
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
          "item": "https://profileglow.tech/alternatives/photofeeler",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "PhotoFeeler Alternative",
          "item": "https://profileglow.tech/alternatives/photofeeler",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why is ProfileGlow a better alternative to PhotoFeeler?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "PhotoFeeler requires waiting 24 to 72 hours for crowdsourced human voting or voting on hundreds of strangers' photos to earn credits. ProfileGlow uses Google Gemini 2.0 multimodal vision to analyze photo lighting, focal distortion, and eye contact in 60 seconds. Plus, PhotoFeeler only gives a raw score, while ProfileGlow rewrites your bios and prompt answers.",
          },
        },
        {
          "@type": "Question",
          "name": "Does PhotoFeeler review bios or prompts?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. PhotoFeeler is strictly an image voting platform. It does not review your bio, evaluate conversation starters, or optimize Hinge and Bumble prompt answers. ProfileGlow audits both your photos and your entire profile text.",
          },
        },
        {
          "@type": "Question",
          "name": "Is ProfileGlow private compared to PhotoFeeler?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. On PhotoFeeler, your photos are displayed to hundreds of random online strangers who vote on your attractiveness. On ProfileGlow, your photos are evaluated privately by AI in real-time and never made public.",
          },
        },
      ],
    },
  ],
};

export default function PhotoFeelerAlternativePage() {
  const comparisonRows = [
    {
      feature: "Turnaround Time",
      profileglow: "Instant (under 60 seconds)",
      photofeeler: "24–72 hours (or pay $19+ to expedite)",
    },
    {
      feature: "Privacy & Discretion",
      profileglow: "100% Private (AI-analyzed, never shown publicly)",
      photofeeler: "Public crowdsourcing (shown to hundreds of strangers)",
    },
    {
      feature: "Lighting & Optical Analysis",
      profileglow: "Detects 24mm focal distortion, glare & bad angles",
      photofeeler: "Subjective stranger opinions only",
    },
    {
      feature: "Lead Photo Recommendation",
      profileglow: "Algorithmic ranking for #1 lead photo",
      photofeeler: "Must manually upload and test photos one by one",
    },
    {
      feature: "Bio & Prompt Rewrites",
      profileglow: "3 tailored bio personas (Witty, Authentic, Bold)",
      photofeeler: "None (Photos only)",
    },
    {
      feature: "Conversation Openers",
      profileglow: "5 customized icebreakers based on your profile",
      photofeeler: "None",
    },
    {
      feature: "Pricing Model",
      profileglow: "Free instant scan + ₹349 ($4 USD) full coaching unlock",
      photofeeler: "Karma voting grind or $9–$49 credit bundles",
    },
  ];

  const faqs = [
    {
      q: "Why do people look for PhotoFeeler alternatives?",
      a: "The biggest complaints about PhotoFeeler are the multi-day wait times, the tedious requirement to rate hundreds of other people's photos to earn 'karma credits', and the lack of actionable advice. Knowing your photo scored a 6.2/10 doesn't tell you how to fix the lighting, what lens angle to use, or what to write in your bio.",
    },
    {
      q: "How does ProfileGlow's AI compare to human voters?",
      a: "Human voters on PhotoFeeler are often hurried, distracted, or biased by personal preferences. ProfileGlow’s Google Gemini 2.0 vision model evaluates empirical dating conversion factors: eye contact percentage, facial illumination, background clutter, and focal length distortion.",
    },
    {
      q: "When should someone still use PhotoFeeler over ProfileGlow?",
      a: "If you specifically want raw crowdsourced sentiment from real human strangers over several days and don't mind having your photos displayed publicly on a forum, PhotoFeeler is a legacy option. If you want an instant, private, full-profile transformation including bios and prompts, ProfileGlow is built for you.",
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
                PhotoFeeler Alternative
              </li>
            </ol>
          </nav>
        </section>

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <Badge variant="lime">⚡ THE INSTANT AI PHOTOFEELER ALTERNATIVE</Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-[1.05] text-ink">
              Stop waiting 3 days for strangers to vote on your photos.
            </h1>

            <p className="text-lg md:text-xl font-medium text-ink/80 max-w-xl leading-relaxed">
              PhotoFeeler makes you rate strangers for hours or wait days for a basic number. **ProfileGlow uses Gemini 2.0 multimodal vision** to diagnose lighting, pick your #1 photo, and rewrite your bios in 60 seconds.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/dashboard"
                className="btn-brutal bg-purple hover:bg-purple-dark text-white px-7 py-3.5 text-base rounded-2xl shadow-brutal inline-flex items-center gap-2"
              >
                Get your instant free score <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </Link>
              <Link
                href="#comparison"
                className="btn-brutal bg-card hover:bg-[#f0eee8] text-ink px-7 py-3.5 text-base rounded-2xl shadow-brutal"
              >
                See full comparison
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-2 text-xs font-black text-muted">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-purple" /> Results in 60 seconds
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-lime" /> 100% Private (No Public Voting)
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-card border-2 border-ink rounded-3xl p-6 shadow-brutal space-y-5">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <span className="text-xs font-black uppercase tracking-wider text-muted">Direct Comparison</span>
                <span className="bg-lime text-ink font-black text-xs px-2.5 py-1 rounded-full border border-ink">
                  Winner: ProfileGlow
                </span>
              </div>

              <div className="space-y-4 text-sm font-bold">
                <div className="flex items-center justify-between p-3 bg-bg rounded-xl border border-line">
                  <span className="text-muted">Turnaround Speed</span>
                  <span className="text-purple font-black">60s (vs 72 hours)</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-bg rounded-xl border border-line">
                  <span className="text-muted">Bio &amp; Prompts</span>
                  <span className="text-purple font-black">Full Rewrites (vs 0)</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-bg rounded-xl border border-line">
                  <span className="text-muted">Privacy</span>
                  <span className="text-purple font-black">Confidential AI</span>
                </div>
              </div>

              <div className="pt-2 text-center">
                <Link
                  href="/dashboard"
                  className="btn-brutal w-full bg-lime hover:bg-lime/90 text-ink py-3 text-sm rounded-xl shadow-brutal font-black inline-block text-center"
                >
                  Try Free Instant Scan
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section id="comparison" className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center space-y-3 mb-12">
            <Badge variant="purple">FEATURE MATRIX</Badge>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-ink">
              ProfileGlow vs. PhotoFeeler: Head-to-Head
            </h2>
            <p className="text-sm md:text-base font-bold text-muted max-w-xl mx-auto">
              Why modern dating app users are switching from crowdsourced voting to multimodal vision AI.
            </p>
          </div>

          <div className="overflow-x-auto border-2 border-ink rounded-3xl shadow-brutal bg-card">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-ink bg-bg">
                  <th className="p-4 md:p-6 text-sm md:text-base font-black text-ink">Feature</th>
                  <th className="p-4 md:p-6 text-sm md:text-base font-black text-purple bg-purple/10 border-x-2 border-ink">
                    ⚡ ProfileGlow
                  </th>
                  <th className="p-4 md:p-6 text-sm md:text-base font-black text-muted">PhotoFeeler</th>
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
                        {row.photofeeler}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* When to Choose Section */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card border-2 border-ink rounded-3xl p-8 shadow-brutal space-y-4">
              <Badge variant="purple">CHOOSE PROFILEGLOW IF</Badge>
              <h3 className="text-2xl font-black text-ink">You want an instant, private full makeover</h3>
              <ul className="space-y-3 text-sm font-bold text-ink/80">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-purple mt-0.5 shrink-0 stroke-[3]" />
                  You need results right now instead of waiting 3 days.
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-purple mt-0.5 shrink-0 stroke-[3]" />
                  You want your bio rewritten and prompt answers optimized.
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-purple mt-0.5 shrink-0 stroke-[3]" />
                  You don't want strangers on the internet voting on your face.
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-purple mt-0.5 shrink-0 stroke-[3]" />
                  You want actionable optical feedback (lighting, angles, eye contact).
                </li>
              </ul>
            </div>

            <div className="bg-bg border-2 border-line rounded-3xl p-8 space-y-4">
              <Badge variant="pink">CHOOSE PHOTOFEELER IF</Badge>
              <h3 className="text-2xl font-black text-muted">You specifically want human voting</h3>
              <ul className="space-y-3 text-sm font-bold text-muted">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-muted mt-0.5 shrink-0 stroke-[3]" />
                  You enjoy voting on strangers’ photos to earn free karma credits.
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-muted mt-0.5 shrink-0 stroke-[3]" />
                  You only care about a LinkedIn headshot score and don’t need dating bios.
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-muted mt-0.5 shrink-0 stroke-[3]" />
                  You have several days to wait for results to trickle in.
                </li>
              </ul>
            </div>
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
              Ready to fix your profile in 60 seconds?
            </h2>
            <p className="text-base md:text-lg font-extrabold text-ink/80 max-w-xl mx-auto">
              Get an instant multimodal AI audit of your photo lighting, lead photo recommendation, and custom bio rewrites right now.
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
