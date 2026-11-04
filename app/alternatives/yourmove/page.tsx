import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Badge } from "@/components/ui/Badge";
import { Check, ArrowRight, X, Sparkles, Camera, ShieldCheck, Zap, ArrowLeft, Image as ImageIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "YourMove AI Alternative: Full Photo & Bio Makeover | ProfileGlow",
  description:
    "Looking for a YourMove AI alternative? YourMove only generates text. ProfileGlow combines Gemini 2.0 multimodal computer vision photo scoring with 3 bio rewrites.",
  alternates: {
    canonical: "https://profileglow.tech/alternatives/yourmove",
  },
  openGraph: {
    title: "Best YourMove AI Alternative: Multimodal Photos + Bio Rewrites",
    description:
      "Why use a text-only tool when 90% of dating app matches depend on photos? ProfileGlow audits your photos, picks your #1 lead picture, and rewrites bios in 60s.",
    url: "https://profileglow.tech/alternatives/yourmove",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "ProfileGlow YourMove AI Alternative",
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "All",
      "url": "https://profileglow.tech/alternatives/yourmove",
      "description":
        "Multimodal dating profile optimizer alternative to YourMove AI. Audits photo lighting and focal length alongside bio and prompt rewrites.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "name": "Free Dating Profile Audit",
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
          "item": "https://profileglow.tech/alternatives/yourmove",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "YourMove AI Alternative",
          "item": "https://profileglow.tech/alternatives/yourmove",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why is ProfileGlow better than YourMove AI?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "YourMove AI is primarily a text and conversation generator. It does not provide in-depth multimodal vision analysis to audit photo lighting, check for wide-angle camera distortion, or rank your lead photo. ProfileGlow treats photos as the foundation of your profile because photos drive 80–90% of swiping decisions.",
          },
        },
      ],
    },
  ],
};

export default function YourMoveAlternativePage() {
  const comparisonRows = [
    {
      feature: "Multimodal Photo Analysis",
      profileglow: "Full optical critique (lighting, focal distortion, eye contact)",
      yourmove: "Limited or text-first focus",
    },
    {
      feature: "Lead Photo Ranking",
      profileglow: "Algorithmic recommendation for your #1 profile picture",
      yourmove: "None",
    },
    {
      feature: "Bio Rewrites",
      profileglow: "3 distinct personas (Witty, Authentic, Bold)",
      yourmove: "Generic AI prompt generator",
    },
    {
      feature: "Hinge/Bumble Prompt Rewrites",
      profileglow: "Included with conversion-focused hooks",
      yourmove: "Separate credit consumption",
    },
    {
      feature: "Conversation Openers",
      profileglow: "Tailored to your specific photos and prompts",
      yourmove: "Screenshot-based response generator",
    },
    {
      feature: "Pricing Model",
      profileglow: "Free scan + transparent one-time ₹349 ($4 USD) unlock",
      yourmove: "Monthly subscription ($15–$30/mo) or credit packs",
    },
  ];

  const faqs = [
    {
      q: "Why do people look for YourMove AI alternatives?",
      a: "YourMove AI is helpful for generating quick text lines, but users quickly realize that having witty lines doesn't matter if matches swipe left on their photos first. ProfileGlow solves the root problem by auditing your visual presentation first, then upgrading your bios and prompts.",
    },
    {
      q: "Can ProfileGlow write conversation openers like YourMove?",
      a: "Yes. Every ProfileGlow report generates 5 custom icebreaker lines calibrated for Hinge, Bumble, and Tinder, plus an interactive AI coaching chat to help you respond to real incoming matches.",
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
                YourMove AI Alternative
              </li>
            </ol>
          </nav>
        </section>

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <Badge variant="lime">⚡ THE VISUAL + TEXT YOURMOVE ALTERNATIVE</Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-[1.05] text-ink">
              Witty bios don't matter if they swipe left on your photos.
            </h1>

            <p className="text-lg md:text-xl font-medium text-ink/80 max-w-xl leading-relaxed">
              YourMove AI only focuses on text. **ProfileGlow pairs Gemini 2.0 multimodal computer vision with conversational copywriting**—auditing your photo lighting, picking your #1 picture, and writing high-converting bios in 60s.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/dashboard"
                className="btn-brutal bg-purple hover:bg-purple-dark text-white px-7 py-3.5 text-base rounded-2xl shadow-brutal inline-flex items-center gap-2"
              >
                Scan your profile free <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </Link>
              <Link
                href="#comparison"
                className="btn-brutal bg-card hover:bg-[#f0eee8] text-ink px-7 py-3.5 text-base rounded-2xl shadow-brutal"
              >
                See comparison
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-2 text-xs font-black text-muted">
              <span className="flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-purple" /> Multimodal Photo Audits
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-lime" /> Witty, Authentic &amp; Bold Bios
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-card border-2 border-ink rounded-3xl p-6 shadow-brutal space-y-5">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <span className="text-xs font-black uppercase tracking-wider text-muted">Core Difference</span>
                <span className="bg-lime text-ink font-black text-xs px-2.5 py-1 rounded-full border border-ink">
                  Photos + Text
                </span>
              </div>

              <div className="space-y-4 text-sm font-bold">
                <div className="flex items-center justify-between p-3 bg-bg rounded-xl border border-line">
                  <span className="text-muted">Photo Diagnostics</span>
                  <span className="text-purple font-black">Multimodal Vision</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-bg rounded-xl border border-line">
                  <span className="text-muted">YourMove AI</span>
                  <span className="text-pink font-bold">Text-only focus</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-bg rounded-xl border border-line">
                  <span className="text-muted">Pricing</span>
                  <span className="text-purple font-black">One-time (No recurring fee)</span>
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
            <Badge variant="purple">FEATURE COMPARISON</Badge>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-ink">
              ProfileGlow vs. YourMove AI
            </h2>
            <p className="text-sm md:text-base font-bold text-muted max-w-xl mx-auto">
              Why full-profile optimization outperforms standalone text generators.
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
                  <th className="p-4 md:p-6 text-sm md:text-base font-black text-muted">YourMove AI</th>
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
                        {row.yourmove}
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
              Fix your photos and your bios in one scan.
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
