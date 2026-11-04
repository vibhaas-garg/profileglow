import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Badge } from "@/components/ui/Badge";
import { Check, ArrowRight, X, Sparkles, Flame, Camera, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Tinder Profile Optimizer & Bio Generator: Stand Out on Tinder",
  description:
    "AI-powered Tinder profile review. Rank your photos to find your highest-converting lead picture, rewrite short punchy bios, and eliminate swipe-left clichés.",
  alternates: {
    canonical: "https://profileglow.tech/apps/tinder",
  },
  openGraph: {
    title: "Tinder Profile Optimizer & Bio Generator | ProfileGlow",
    description:
      "Pass the 2-second swipe test on Tinder. AI photo order ranking, witty bio variations, and conversation starters.",
    url: "https://profileglow.tech/apps/tinder",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "ProfileGlow Tinder Profile Optimizer",
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "All",
      "url": "https://profileglow.tech/apps/tinder",
      "description":
        "AI-powered Tinder profile audit, photo order rankings, and short bio generator.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "name": "Free Tinder Profile Audit",
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
          "name": "Tinder Profile Optimization",
          "item": "https://profileglow.tech/apps/tinder",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the ideal Tinder bio length for more matches?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tinder users spend an average of 1.5 to 3 seconds reviewing a profile. The most effective Tinder bios are between 15 and 45 words — punchy, witty, and containing one playful question or debate that invites a quick message.",
          },
        },
        {
          "@type": "Question",
          "name": "How does photo order affect Tinder algorithm and match rate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Your first photo determines over 80% of right-swipes. A strong lead photo (solo portrait, smiling or confident eye contact, clear lighting, no sunglasses) dramatically improves your swipe ratio, which signals the Tinder algorithm to show your profile to more active users.",
          },
        },
        {
          "@type": "Question",
          "name": "What photos should I avoid on Tinder?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Avoid shirtless gym mirror selfies, car selfies with poor lighting, photos with sunglasses covering your eyes in the first two slots, and group photos where you are not clearly identifiable.",
          },
        },
        {
          "@type": "Question",
          "name": "How does ProfileGlow evaluate my Tinder photos?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Using multimodal vision AI, ProfileGlow rates each photo across lighting, framing, expression, and background context, then arranges your uploads into an optimal sequence proven to maximize swipe-through rates.",
          },
        },
      ],
    },
  ],
};

export default function TinderLandingPage() {
  const faqs = [
    {
      q: "What is the ideal Tinder bio length for more matches?",
      a: "Tinder users spend an average of 1.5 to 3 seconds reviewing a profile. The most effective Tinder bios are between 15 and 45 words — punchy, witty, and containing one playful question or debate that invites a quick message.",
    },
    {
      q: "How does photo order affect Tinder algorithm and match rate?",
      a: "Your first photo determines over 80% of right-swipes. A strong lead photo (solo portrait, smiling or confident eye contact, clear lighting, no sunglasses) dramatically improves your swipe ratio, which signals the Tinder algorithm to show your profile to more active users.",
    },
    {
      q: "What photos should I avoid on Tinder?",
      a: "Avoid shirtless gym mirror selfies, car selfies with poor lighting, photos with sunglasses covering your eyes in the first two slots, and group photos where you are not clearly identifiable.",
    },
    {
      q: "How does ProfileGlow evaluate my Tinder photos?",
      a: "Using multimodal vision AI, ProfileGlow rates each photo across lighting, framing, expression, and background context, then arranges your uploads into an optimal sequence proven to maximize swipe-through rates.",
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
                Tinder
              </li>
            </ol>
          </nav>
        </section>

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <Badge variant="pink">🔥 TINDER PROFILE AUDIT &amp; PHOTO RANKING</Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-[1.0] text-ink">
              Win the 2-second swipe test
              <br />
              <span className="bg-gradient-to-r from-lime to-lime bg-[length:100%_40%] bg-no-repeat bg-bottom">
                and double your right-swipes.
              </span>
            </h1>

            <p className="text-lg md:text-xl font-medium text-ink/80 max-w-xl leading-relaxed">
              Tinder moves at lightning speed. You have 2 seconds to make an impression. ProfileGlow’s vision AI ranks your photo order to lead with your highest-converting photo and writes short, charismatic bios that trigger instant replies.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/signup?app=tinder"
                className="btn-brutal bg-purple hover:bg-purple-dark text-white px-7 py-3.5 text-base rounded-2xl shadow-brutal inline-flex items-center gap-2"
              >
                Optimize my Tinder profile <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </Link>
              <Link
                href="#rules"
                className="btn-brutal bg-card hover:bg-[#f0eee8] text-ink px-7 py-3.5 text-base rounded-2xl shadow-brutal"
              >
                Tinder Photo Rules
              </Link>
            </div>

            <p className="text-xs font-bold text-muted flex items-center gap-1.5">
              <Check className="w-4 h-4 text-ink stroke-[3]" />
              <span>Free photo ranking &amp; bio audit report. No credit card needed.</span>
            </p>
          </div>

          {/* Interactive Card Mockup */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <div className="card-brutal p-7 bg-card w-full max-w-md space-y-5">
              <div className="flex justify-between items-center border-b border-line pb-4">
                <span className="font-black text-sm text-ink uppercase tracking-wide">
                  Tinder Bio Optimization
                </span>
                <Badge variant="lime">3.4X HIGHER REPLIES</Badge>
              </div>

              {/* Before Bio */}
              <div className="p-4 rounded-xl bg-bg border border-line space-y-2">
                <div className="text-xs font-extrabold text-orange flex items-center gap-1">
                  <X className="w-3.5 h-3.5 stroke-[3]" /> Left-Swipe Trigger
                </div>
                <p className="text-sm font-semibold text-ink/80 italic">
                  &ldquo;Gym, crypto, food, Netflix. 6&apos;0 if that matters. Looking for my partner in crime. Don&apos;t waste my time.&rdquo;
                </p>
                <div className="text-xs text-muted font-medium pt-1">
                  ❌ Aggressive tone, cliché laundry list of generic hobbies.
                </div>
              </div>

              {/* After Bio */}
              <div className="p-4 rounded-xl bg-lime/20 border-2 border-ink space-y-2 shadow-brutal-sm">
                <div className="text-xs font-extrabold text-purple flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 stroke-[3]" /> ProfileGlow Witty Bio
                </div>
                <p className="text-sm font-black text-ink">
                  &ldquo;Can make reservations anywhere, will let you pick the playlist on road trips, but will ruthlessly critique your mario kart skills. Tell me your most controversial food opinion.&rdquo;
                </p>
                <div className="text-xs text-ink font-bold pt-1">
                  ✅ Confident, warm humor with an instant conversation trigger.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tinder Photo Rules */}
        <section id="rules" className="w-full bg-[#f0eee8] border-y border-line py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <Badge variant="purple">VISION AI AUDIT</Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-ink mt-3">
                The 3 Tinder photo rules that boost your swipe ratio.
              </h2>
              <p className="text-muted text-base font-medium mt-3">
                Tinder’s algorithm calculates your profile quality score within your first 100 swipes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card-brutal p-8 bg-card flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-pink border-2 border-ink flex items-center justify-center font-black text-lg text-white shadow-brutal-sm mb-6">
                    01
                  </div>
                  <h3 className="font-black text-xl text-ink mb-3">
                    Solo Portrait First
                  </h3>
                  <p className="text-sm text-muted font-medium leading-relaxed">
                    Zero group photos in slot 1 or 2. High-converting profiles lead with a solo waist-up or chest-up portrait with natural sunlight and unobstructed eye contact.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-line/60 text-xs font-black text-purple">
                  ProfileGlow ranks lead photos →
                </div>
              </div>

              <div className="card-brutal p-8 bg-card flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-lime border-2 border-ink flex items-center justify-center font-black text-lg text-ink shadow-brutal-sm mb-6">
                    02
                  </div>
                  <h3 className="font-black text-xl text-ink mb-3">
                    Kill the Sunglasses &amp; Hats
                  </h3>
                  <p className="text-sm text-muted font-medium leading-relaxed">
                    Eye contact triggers subconscious trust and emotional connection. Photos with sunglasses reduce right-swipe rates by over 40% on Tinder.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-line/60 text-xs font-black text-purple">
                  Red-flag detection audit →
                </div>
              </div>

              <div className="card-brutal p-8 bg-card flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-purple border-2 border-ink flex items-center justify-center font-black text-lg text-white shadow-brutal-sm mb-6">
                    03
                  </div>
                  <h3 className="font-black text-xl text-ink mb-3">
                    Activity &amp; Lifestyle Context
                  </h3>
                  <p className="text-sm text-muted font-medium leading-relaxed">
                    Car selfies say nothing about your life. Include at least one candid shot showing you outdoors, cooking, playing an instrument, or traveling with friends.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-line/60 text-xs font-black text-purple">
                  Vibe &amp; context scoring →
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <Badge variant="purple">TINDER FAQS</Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-ink mt-3">
              Frequently asked questions about Tinder optimization.
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
              Ready to upgrade your Tinder profile?
            </h2>
            <p className="text-base sm:text-lg font-bold text-ink/80 max-w-xl mx-auto">
              Get an instant photo ranking, 3 punchy bio variations, and conversation openers in 15 seconds.
            </p>
            <Link
              href="/signup?app=tinder"
              className="btn-brutal bg-ink text-white hover:bg-black px-8 py-4 text-lg rounded-2xl shadow-brutal inline-block"
            >
              Get your free Tinder score ↗
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
