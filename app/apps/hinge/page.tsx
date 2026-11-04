import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Badge } from "@/components/ui/Badge";
import { Check, ArrowRight, X, Sparkles, MessageSquare, Camera, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Hinge Profile Review & Optimization: 3.4x More Matches",
  description:
    "Get an evidence-based Hinge profile review with multimodal AI. Fix cliché prompt answers, rank your 6 photos, and generate effortless conversation starters.",
  alternates: {
    canonical: "https://profileglow.tech/apps/hinge",
  },
  openGraph: {
    title: "Hinge Profile Review & Optimization | ProfileGlow",
    description:
      "Transform your Hinge profile with multimodal vision AI. Better photos, high-converting prompt answers, and openers that lead to dates.",
    url: "https://profileglow.tech/apps/hinge",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "ProfileGlow Hinge Profile Optimizer",
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "All",
      "url": "https://profileglow.tech/apps/hinge",
      "description":
        "AI-powered Hinge profile review, photo order rankings, and prompt answer generator.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "name": "Free Hinge Profile Score",
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
          "name": "Hinge Profile Optimization",
          "item": "https://profileglow.tech/apps/hinge",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What are the best Hinge prompts for guys to get replies?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The highest-reply Hinge prompts provide specific conversation bait rather than generic preferences. Great examples include 'Together we could' (naming an interactive date idea), 'A boundary of mine is' (playful non-serious debate), and 'I'm convinced that' (lighthearted contrarian take).",
          },
        },
        {
          "@type": "Question",
          "name": "How does ProfileGlow rank my 6 Hinge photos?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ProfileGlow uses multimodal vision AI to analyze lighting, composition, facial expressions, and photo variety. It identifies your highest-converting lead portrait and warns you against repetitive selfies, low-light club photos, or confusing group shots.",
          },
        },
        {
          "@type": "Question",
          "name": "Why am I getting matches on Hinge but no replies to my opening comment?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Hinge users frequently receive low-effort comments like 'nice smile' or bare likes with no text. Comments that ask open-ended questions about a specific detail in photo 3 or play on an obscure prompt answer get 3.4x higher response rates.",
          },
        },
        {
          "@type": "Question",
          "name": "Is my Hinge profile audit private?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Photos and prompt inputs are processed in real-time solely to generate your confidential score and report. Your images are never stored permanently or shared with third parties.",
          },
        },
      ],
    },
  ],
};

export default function HingeLandingPage() {
  const faqs = [
    {
      q: "What are the best Hinge prompts for guys to get replies?",
      a: "The highest-reply Hinge prompts provide specific conversation bait rather than generic preferences. Great examples include 'Together we could' (naming an interactive date idea), 'A boundary of mine is' (playful non-serious debate), and 'I'm convinced that' (lighthearted contrarian take).",
    },
    {
      q: "How does ProfileGlow rank my 6 Hinge photos?",
      a: "ProfileGlow uses multimodal vision AI to analyze lighting, composition, facial expressions, and photo variety. It identifies your highest-converting lead portrait and warns you against repetitive selfies, low-light club photos, or confusing group shots.",
    },
    {
      q: "Why am I getting matches on Hinge but no replies to my opening comment?",
      a: "Hinge users frequently receive low-effort comments like 'nice smile' or bare likes with no text. Comments that ask open-ended questions about a specific detail in photo 3 or play on an obscure prompt answer get 3.4x higher response rates.",
    },
    {
      q: "Is my Hinge profile audit private?",
      a: "Yes. Photos and prompt inputs are processed in real-time solely to generate your confidential score and report. Your images are never stored permanently or shared with third parties.",
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
                Hinge
              </li>
            </ol>
          </nav>
        </section>

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <Badge variant="pink">⚡ HINGE PROFILE REVIEW &amp; PROMPT GENERATOR</Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-[1.0] text-ink">
              Turn Hinge likes into
              <br />
              <span className="bg-gradient-to-r from-lime to-lime bg-[length:100%_40%] bg-no-repeat bg-bottom">
                effortless first dates.
              </span>
            </h1>

            <p className="text-lg md:text-xl font-medium text-ink/80 max-w-xl leading-relaxed">
              Hinge is designed to be deleted — but only if matches reply. ProfileGlow’s vision AI audits your 6 photos, rewrites generic prompt answers with high-reply conversation bait, and eliminates red flags.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/signup?app=hinge"
                className="btn-brutal bg-purple hover:bg-purple-dark text-white px-7 py-3.5 text-base rounded-2xl shadow-brutal inline-flex items-center gap-2"
              >
                Analyze my Hinge profile <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </Link>
              <Link
                href="#mistakes"
                className="btn-brutal bg-card hover:bg-[#f0eee8] text-ink px-7 py-3.5 text-base rounded-2xl shadow-brutal"
              >
                Common Hinge Mistakes
              </Link>
            </div>

            <p className="text-xs font-bold text-muted flex items-center gap-1.5">
              <Check className="w-4 h-4 text-ink stroke-[3]" />
              <span>Instant free score &amp; photo ranking report. No credit card required.</span>
            </p>
          </div>

          {/* Interactive Card Mockup */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <div className="card-brutal p-7 bg-card w-full max-w-md space-y-5">
              <div className="flex justify-between items-center border-b border-line pb-4">
                <span className="font-black text-sm text-ink uppercase tracking-wide">
                  Hinge Prompt Optimization
                </span>
                <Badge variant="lime">TOP 5% REPLY RATE</Badge>
              </div>

              {/* Before Prompt */}
              <div className="p-4 rounded-xl bg-bg border border-line space-y-2">
                <div className="text-xs font-extrabold text-orange flex items-center gap-1">
                  <X className="w-3.5 h-3.5 stroke-[3]" /> Generic Hinge Cliché
                </div>
                <div className="text-xs font-bold text-muted uppercase">My simple pleasures...</div>
                <p className="text-sm font-semibold text-ink/80 italic">
                  &ldquo;A good cup of coffee and Sunday football.&rdquo;
                </p>
                <div className="text-xs text-muted font-medium pt-1">
                  ❌ 0 specific hooks. Over 2M profiles have this exact line.
                </div>
              </div>

              {/* After Prompt */}
              <div className="p-4 rounded-xl bg-lime/20 border-2 border-ink space-y-2 shadow-brutal-sm">
                <div className="text-xs font-extrabold text-purple flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 stroke-[3]" /> ProfileGlow Rewrite
                </div>
                <div className="text-xs font-bold text-ink uppercase">My simple pleasures...</div>
                <p className="text-sm font-black text-ink">
                  &ldquo;Making espresso that ruins cafe coffee forever, debating if die hard is a christmas movie, and finding the best taco truck in the city.&rdquo;
                </p>
                <div className="text-xs text-ink font-bold pt-1">
                  ✅ 3 instant conversation angles that make matches message first.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Hinge Mistakes Section */}
        <section id="mistakes" className="w-full bg-[#f0eee8] border-y border-line py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <Badge variant="purple">THE ALGORITHM AUDIT</Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-ink mt-3">
                The 3 Hinge mistakes killing your match rate.
              </h2>
              <p className="text-muted text-base font-medium mt-3">
                Hinge shows your profile to fewer people when users skip your prompts without leaving a comment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card-brutal p-8 bg-card flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-pink border-2 border-ink flex items-center justify-center font-black text-lg text-white shadow-brutal-sm mb-6">
                    01
                  </div>
                  <h3 className="font-black text-xl text-ink mb-3">
                    One-Word Prompt Answers
                  </h3>
                  <p className="text-sm text-muted font-medium leading-relaxed">
                    Answers like &ldquo;pasta&rdquo;, &ldquo;travel&rdquo;, or &ldquo;someone who makes me laugh&rdquo; leave zero room for witty banter. If someone can&apos;t reply in 3 seconds, they swipe away.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-line/60 text-xs font-black text-purple">
                  FIX: Multi-angle reply bait →
                </div>
              </div>

              <div className="card-brutal p-8 bg-card flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-lime border-2 border-ink flex items-center justify-center font-black text-lg text-ink shadow-brutal-sm mb-6">
                    02
                  </div>
                  <h3 className="font-black text-xl text-ink mb-3">
                    Confusing Group Lead Photo
                  </h3>
                  <p className="text-sm text-muted font-medium leading-relaxed">
                    If your first photo features 4 friends, matches won&apos;t play detective to guess who you are. Your lead photo must be a clear, high-contrast, solo portrait with natural lighting.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-line/60 text-xs font-black text-purple">
                  FIX: Multimodal photo ranking →
                </div>
              </div>

              <div className="card-brutal p-8 bg-card flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-purple border-2 border-ink flex items-center justify-center font-black text-lg text-white shadow-brutal-sm mb-6">
                    03
                  </div>
                  <h3 className="font-black text-xl text-ink mb-3">
                    Unbalanced Photo Variety
                  </h3>
                  <p className="text-sm text-muted font-medium leading-relaxed">
                    Six car selfies or six gym photos indicate a one-dimensional life. High-performing Hinge profiles showcase 1 lead portrait, 1 full-body candid, 1 hobby/activity shot, and 1 social photo.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-line/60 text-xs font-black text-purple">
                  FIX: Photo order &amp; vibe balance →
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <Badge variant="purple">HINGE FAQS</Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-ink mt-3">
              Frequently asked questions about Hinge optimization.
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
              Ready to fix your Hinge profile?
            </h2>
            <p className="text-base sm:text-lg font-bold text-ink/80 max-w-xl mx-auto">
              Get an instant photo ranking, 3 tailored prompt rewrites, and 5 conversation openers in under 15 seconds.
            </p>
            <Link
              href="/signup?app=hinge"
              className="btn-brutal bg-ink text-white hover:bg-black px-8 py-4 text-lg rounded-2xl shadow-brutal inline-block"
            >
              Get your free Hinge score ↗
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
