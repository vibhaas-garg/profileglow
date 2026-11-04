import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Badge } from "@/components/ui/Badge";
import { Check, ArrowRight, X, Sparkles, MessageCircle, Clock, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Bumble Bio Ideas & Profile Makeover: Make Her Message First",
  description:
    "Optimize your Bumble profile with AI. Craft bios and prompt answers designed to make women send the first message before the 24-hour match timer expires.",
  alternates: {
    canonical: "https://profileglow.tech/apps/bumble",
  },
  openGraph: {
    title: "Bumble Bio Ideas & Profile Makeover | ProfileGlow",
    description:
      "Stop letting Bumble matches expire. AI photo ranking, Opening Move prompts, and bios engineered to make her text first.",
    url: "https://profileglow.tech/apps/bumble",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "ProfileGlow Bumble Profile Optimizer",
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "All",
      "url": "https://profileglow.tech/apps/bumble",
      "description":
        "AI-powered Bumble profile makeover, Opening Move prompt rewrites, and photo order optimization.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "name": "Free Bumble Profile Score",
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
          "name": "Dating Apps",
          "item": "https://profileglow.tech",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Bumble Profile Optimization",
          "item": "https://profileglow.tech/apps/bumble",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why do matches expire on Bumble without messaging?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "On Bumble, women have 24 hours to send the first message. When your bio is generic or lacks specific questions, matches hesitate because they don't know what to say. Profiles with clear conversation hooks see an 85% drop in expired matches.",
          },
        },
        {
          "@type": "Question",
          "name": "What is the best Opening Move question for Bumble?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The best Bumble Opening Move questions are low-pressure, opinion-based debates. For example: 'What is your most irrational pet peeve?' or 'You can only eat one cuisine for the rest of your life: Mexican or Italian?'",
          },
        },
        {
          "@type": "Question",
          "name": "How many photos should I have on Bumble?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Bumble allows up to 6 photos. Having all 6 filled increases match rates by 42%. ProfileGlow analyzes all 6 photos to ensure an optimal balance of portrait, full-body, social, and hobby shots.",
          },
        },
        {
          "@type": "Question",
          "name": "Does ProfileGlow support Bumble prompt answers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! ProfileGlow rewrites popular Bumble prompts like 'Two truths and a lie', 'We'll get along if', and 'After work you can find me' with funny, authentic responses tailored to your real interests.",
          },
        },
      ],
    },
  ],
};

export default function BumbleLandingPage() {
  const faqs = [
    {
      q: "Why do matches expire on Bumble without messaging?",
      a: "On Bumble, women have 24 hours to send the first message. When your bio is generic or lacks specific questions, matches hesitate because they don't know what to say. Profiles with clear conversation hooks see an 85% drop in expired matches.",
    },
    {
      q: "What is the best Opening Move question for Bumble?",
      a: "The best Bumble Opening Move questions are low-pressure, opinion-based debates. For example: 'What is your most irrational pet peeve?' or 'You can only eat one cuisine for the rest of your life: Mexican or Italian?'",
    },
    {
      q: "How many photos should I have on Bumble?",
      a: "Bumble allows up to 6 photos. Having all 6 filled increases match rates by 42%. ProfileGlow analyzes all 6 photos to ensure an optimal balance of portrait, full-body, social, and hobby shots.",
    },
    {
      q: "Does ProfileGlow support Bumble prompt answers?",
      a: "Yes! ProfileGlow rewrites popular Bumble prompts like 'Two truths and a lie', 'We'll get along if', and 'After work you can find me' with funny, authentic responses tailored to your real interests.",
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
              <li>Dating Apps</li>
              <li>/</li>
              <li className="text-ink" aria-current="page">
                Bumble
              </li>
            </ol>
          </nav>
        </section>

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <Badge variant="pink">🐝 BUMBLE PROFILE MAKEOVER &amp; OPENING MOVES</Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-[1.0] text-ink">
              Make opening messages effortless
              <br />
              <span className="bg-gradient-to-r from-lime to-lime bg-[length:100%_40%] bg-no-repeat bg-bottom">
                before the 24-hour timer expires.
              </span>
            </h1>

            <p className="text-lg md:text-xl font-medium text-ink/80 max-w-xl leading-relaxed">
              On Bumble, women message first. If your bio is blank or cliché, matches expire in 24 hours without a word. ProfileGlow’s vision AI crafts high-converting conversation hooks and Opening Moves that make messaging you irresistible.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/signup?app=bumble"
                className="btn-brutal bg-purple hover:bg-purple-dark text-white px-7 py-3.5 text-base rounded-2xl shadow-brutal inline-flex items-center gap-2"
              >
                Review my Bumble profile <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </Link>
              <Link
                href="#timer"
                className="btn-brutal bg-card hover:bg-[#f0eee8] text-ink px-7 py-3.5 text-base rounded-2xl shadow-brutal"
              >
                The 24-Hour Rule
              </Link>
            </div>

            <p className="text-xs font-bold text-muted flex items-center gap-1.5">
              <Check className="w-4 h-4 text-ink stroke-[3]" />
              <span>Instant free Bumble makeover score &amp; Opening Moves. No card needed.</span>
            </p>
          </div>

          {/* Interactive Card Mockup */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <div className="card-brutal p-7 bg-card w-full max-w-md space-y-5">
              <div className="flex justify-between items-center border-b border-line pb-4">
                <span className="font-black text-sm text-ink uppercase tracking-wide">
                  Bumble Opening Move Hook
                </span>
                <Badge variant="lime">ZERO EXPIRED MATCHES</Badge>
              </div>

              {/* Before Hook */}
              <div className="p-4 rounded-xl bg-bg border border-line space-y-2">
                <div className="text-xs font-extrabold text-orange flex items-center gap-1">
                  <X className="w-3.5 h-3.5 stroke-[3]" /> Conversation Staller
                </div>
                <div className="text-xs font-bold text-muted uppercase">Opening Question:</div>
                <p className="text-sm font-semibold text-ink/80 italic">
                  &ldquo;Ask me anything!&rdquo;
                </p>
                <div className="text-xs text-muted font-medium pt-1">
                  ❌ Puts all pressure on her. Leads to matches expiring or &ldquo;hey&rdquo;.
                </div>
              </div>

              {/* After Hook */}
              <div className="p-4 rounded-xl bg-lime/20 border-2 border-ink space-y-2 shadow-brutal-sm">
                <div className="text-xs font-extrabold text-purple flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 stroke-[3]" /> ProfileGlow High-Reply Bait
                </div>
                <div className="text-xs font-bold text-ink uppercase">Opening Move:</div>
                <p className="text-sm font-black text-ink">
                  &ldquo;What is your most irrational, completely petty hill you will die on? (Mine is people who clap when airplanes land).&rdquo;
                </p>
                <div className="text-xs text-ink font-bold pt-1">
                  ✅ 94% response rate. Easy, funny, and establishes instant rapport.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 24-Hour Timer Strategy */}
        <section id="timer" className="w-full bg-[#f0eee8] border-y border-line py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <Badge variant="purple">BEAT THE CLOCK</Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-ink mt-3">
                How to eliminate expired Bumble matches.
              </h2>
              <p className="text-muted text-base font-medium mt-3">
                Why women match with you but never send a message — and how to fix it.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card-brutal p-8 bg-card flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-pink border-2 border-ink flex items-center justify-center font-black text-lg text-white shadow-brutal-sm mb-6">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="font-black text-xl text-ink mb-3">
                    Remove the Decision Friction
                  </h3>
                  <p className="text-sm text-muted font-medium leading-relaxed">
                    Women receive hundreds of likes. When opening a match, if thinking of a message takes more than 5 seconds, she closes the app and the match expires.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-line/60 text-xs font-black text-purple">
                  FIX: Clear question bait →
                </div>
              </div>

              <div className="card-brutal p-8 bg-card flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-lime border-2 border-ink flex items-center justify-center font-black text-lg text-ink shadow-brutal-sm mb-6">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <h3 className="font-black text-xl text-ink mb-3">
                    Opening Moves that Spark Banter
                  </h3>
                  <p className="text-sm text-muted font-medium leading-relaxed">
                    Bumble&apos;s Opening Move feature lets you set a prompt question matches answer to start the chat. ProfileGlow generates playful, debate-starting questions.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-line/60 text-xs font-black text-purple">
                  FIX: Opening Move Generator →
                </div>
              </div>

              <div className="card-brutal p-8 bg-card flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-purple border-2 border-ink flex items-center justify-center font-black text-lg text-white shadow-brutal-sm mb-6">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="font-black text-xl text-ink mb-3">
                    Showcase Approachable Warmth
                  </h3>
                  <p className="text-sm text-muted font-medium leading-relaxed">
                    Stiff, serious scowls scare away Bumble matches. ProfileGlow’s vision AI checks your photos for genuine smile markers, relaxed body language, and pet/social context.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-line/60 text-xs font-black text-purple">
                  FIX: Warmth &amp; vibe audit →
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <Badge variant="purple">BUMBLE FAQS</Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-ink mt-3">
              Frequently asked questions about Bumble optimization.
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="card-brutal-sm p-6 bg-card space-y-2">
                <h3 className="font-black text-base md:text-lg text-ink">{faq.q}</h3>
                <p className="text-sm font-medium text-muted leading-relaxed border-t border-line pt-2">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="w-full bg-lime border-t-2 border-ink py-16">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-ink">
              Ready to upgrade your Bumble profile?
            </h2>
            <p className="text-base sm:text-lg font-bold text-ink/80 max-w-xl mx-auto">
              Get an instant photo ranking, 3 tailored Bumble bio variations, and proven Opening Moves in 15 seconds.
            </p>
            <Link
              href="/signup?app=bumble"
              className="btn-brutal bg-ink text-white hover:bg-black px-8 py-4 text-lg rounded-2xl shadow-brutal inline-block"
            >
              Get your free Bumble score ↗
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
