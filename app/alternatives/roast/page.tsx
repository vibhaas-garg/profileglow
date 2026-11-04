import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Badge } from "@/components/ui/Badge";
import { Check, ArrowRight, X, Sparkles, CreditCard, ShieldCheck, Zap, ArrowLeft, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "ROAST Dating Alternative: No Subscriptions, Instant AI Makeover | ProfileGlow",
  description:
    "Looking for a ROAST dating app alternative? ProfileGlow delivers multimodal computer vision photo scores, lead photo rankings, and 3 bio rewrites with zero recurring subscriptions.",
  alternates: {
    canonical: "https://profileglow.tech/alternatives/roast",
  },
  openGraph: {
    title: "Best ROAST Dating Alternative: One-Time Unlock vs $30/mo Recurring Trap",
    description:
      "Tired of $29.99/month dating review subscriptions? ProfileGlow gives you instant Gemini 2.0 multimodal photo audits and complete bio rewrites for a transparent one-time price.",
    url: "https://profileglow.tech/alternatives/roast",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "ProfileGlow ROAST Dating Alternative",
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "All",
      "url": "https://profileglow.tech/alternatives/roast",
      "description":
        "Transparent, no-subscription alternative to ROAST dating profile reviews. Multimodal vision photo analysis and custom bio rewrites in 60 seconds.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "name": "Free Profile Audit",
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
          "item": "https://profileglow.tech/alternatives/roast",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "ROAST Alternative",
          "item": "https://profileglow.tech/alternatives/roast",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does ProfileGlow compare to ROAST?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ROAST charges high recurring monthly subscriptions (often $29.99/month or expensive upsells) with aggressive email funnels. ProfileGlow provides an instant free scan and a transparent, one-time unlock (₹349 / ~$4 USD) with zero recurring subscriptions.",
          },
        },
        {
          "@type": "Question",
          "name": "Does ProfileGlow use real computer vision AI?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. ProfileGlow is built directly on Google Gemini 2.0 Flash multimodal vision models, analyzing raw image pixels for focal distortion, eye contact, and lighting quality alongside full bio text rewrites.",
          },
        },
      ],
    },
  ],
};

export default function RoastAlternativePage() {
  const comparisonRows = [
    {
      feature: "Pricing Model",
      profileglow: "Free scan + one-time ₹349 ($4 USD) unlock",
      roast: "$29.99/mo recurring subscription or $49 packages",
    },
    {
      feature: "Subscription Lock-in",
      profileglow: "Zero recurring charges (pay once, keep forever)",
      roast: "Auto-renewing monthly membership",
    },
    {
      feature: "AI Vision Engine",
      profileglow: "Google Gemini 2.0 Flash Multimodal Vision",
      roast: "Proprietary hybrid / template-based scoring",
    },
    {
      feature: "Turnaround Time",
      profileglow: "Instant (under 60 seconds)",
      roast: "Minutes to hours depending on human review tier",
    },
    {
      feature: "Bio Personas",
      profileglow: "3 tailored styles (Witty, Authentic, Bold)",
      roast: "Generic boilerplate suggestions",
    },
    {
      feature: "Hinge/Bumble Prompt Rewrites",
      profileglow: "Included with high-converting conversation hooks",
      roast: "Often locked behind higher-tier upgrades",
    },
    {
      feature: "Interactive AI Coaching Chat",
      profileglow: "Interactive chat grounded in your exact photos",
      roast: "Locked or human up-charge",
    },
  ];

  const faqs = [
    {
      q: "Why do users switch from ROAST to ProfileGlow?",
      a: "The #1 reason is billing transparency. Many users sign up for a single review on ROAST and find themselves enrolled in an ongoing $29.99/month subscription. ProfileGlow was built specifically to eliminate recurring subscriptions: you get an instant free audit and an optional, flat one-time unlock.",
    },
    {
      q: "Is the analysis quality comparable to ROAST?",
      a: "ProfileGlow utilizes Google Gemini 2.0 Flash multimodal vision models trained on millions of multimodal tokens. It detects the exact same optical issues (24mm focal distortion, bad lighting, sunglasses) and generates personalized bio rewrites tailored to your specific photos.",
    },
    {
      q: "Can I use ProfileGlow for Tinder, Bumble, and Hinge?",
      a: "Yes. ProfileGlow supports all three major apps. It customizes the photo hierarchy and prompt answers specifically for the algorithm and user behavior of each platform.",
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
                ROAST Alternative
              </li>
            </ol>
          </nav>
        </section>

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <Badge variant="purple">⚡ THE NO-SUBSCRIPTION ROAST ALTERNATIVE</Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-[1.05] text-ink">
              Dating profile feedback without the $30/month subscription trap.
            </h1>

            <p className="text-lg md:text-xl font-medium text-ink/80 max-w-xl leading-relaxed">
              Why pay recurring monthly subscriptions just to fix your dating profile once? **ProfileGlow delivers instant Gemini 2.0 vision photo audits and 3 custom bio rewrites** with zero recurring billing.
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
                View comparison table
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-2 text-xs font-black text-muted">
              <span className="flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-purple" /> One-Time Price (No Subscriptions)
              </span>
              <span className="flex items-center gap-1.5">
                <RefreshCw className="w-4 h-4 text-lime" /> Instant 60s Analysis
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-card border-2 border-ink rounded-3xl p-6 shadow-brutal space-y-5">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <span className="text-xs font-black uppercase tracking-wider text-muted">Pricing Comparison</span>
                <span className="bg-lime text-ink font-black text-xs px-2.5 py-1 rounded-full border border-ink">
                  Save 85%+
                </span>
              </div>

              <div className="space-y-4 text-sm font-bold">
                <div className="flex items-center justify-between p-3 bg-bg rounded-xl border border-line">
                  <span className="text-muted">ProfileGlow</span>
                  <span className="text-purple font-black">Free Scan / ₹349 ($4) once</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-bg rounded-xl border border-line">
                  <span className="text-muted">ROAST</span>
                  <span className="text-pink line-through font-bold">$29.99 / month</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-bg rounded-xl border border-line">
                  <span className="text-muted">Recurring Billing</span>
                  <span className="text-purple font-black">Zero (No surprises)</span>
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

        {/* Feature Comparison Table */}
        <section id="comparison" className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center space-y-3 mb-12">
            <Badge variant="lime">SIDE-BY-SIDE MATRIX</Badge>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-ink">
              ProfileGlow vs. ROAST: Feature Breakdown
            </h2>
            <p className="text-sm md:text-base font-bold text-muted max-w-xl mx-auto">
              Compare turnaround times, visual AI models, and pricing transparency.
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
                  <th className="p-4 md:p-6 text-sm md:text-base font-black text-muted">ROAST</th>
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
                        {row.roast}
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
            <Badge variant="purple">FAQ</Badge>
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
          <div className="bg-purple border-2 border-ink rounded-3xl p-8 md:p-12 shadow-brutal text-center space-y-6 text-white">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
              Stop paying monthly subscriptions for dating advice.
            </h2>
            <p className="text-base md:text-lg font-bold text-white/80 max-w-xl mx-auto">
              Get an instant multimodal AI audit of your photos, lead photo recommendation, and custom bio rewrites in 60 seconds.
            </p>
            <div className="pt-2">
              <Link
                href="/dashboard"
                className="btn-brutal bg-lime hover:bg-lime/90 text-ink px-8 py-4 text-lg rounded-2xl shadow-brutal font-black inline-flex items-center gap-2"
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
