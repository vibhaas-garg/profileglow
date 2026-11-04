import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Ticker } from "@/components/landing/Ticker";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { Comparison } from "@/components/landing/Comparison";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { WaitlistCTA } from "@/components/landing/WaitlistCTA";
import { Footer } from "@/components/landing/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "ProfileGlow",
      "operatingSystem": "All",
      "applicationCategory": "LifestyleApplication",
      "url": "https://www.profileglow.tech",
      "description":
        "AI dating profile optimizer for Tinder, Hinge, and Bumble. Get instant multimodal vision audits, photo order rankings, bio rewrites, and conversation openers.",
      "offers": [
        {
          "@type": "Offer",
          "name": "Free Dating Profile Audit",
          "price": "0",
          "priceCurrency": "USD",
          "description": "Complete profile makeover report with score, bio rewrites, and photo order ranking."
        },
        {
          "@type": "Offer",
          "name": "AI Dating Coach Unlock",
          "price": "249",
          "priceCurrency": "INR",
          "description": "30 interactive messages with multimodal AI dating coach."
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does the AI analyze my profile photos and bio?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We use state-of-the-art multimodal vision and dating intelligence AI models. The AI evaluates photo lighting, posture, facial expressions, and composition, alongside your written bio to measure originality, vibe, and conversation potential."
          }
        },
        {
          "@type": "Question",
          "name": "Is my personal data and photo upload private?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, 100%. We will never save, store permanently, or use your photos for AI training or any other purpose. Your uploads are processed securely in real-time solely to create your confidential audit and remain completely private."
          }
        },
        {
          "@type": "Question",
          "name": "Which dating apps are supported?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ProfileGlow is optimized for Tinder, Hinge, and Bumble, with support for other dating apps. The recommendations, character counts, and prompt suggestions adapt to each platform's culture."
          }
        },
        {
          "@type": "Question",
          "name": "How does the ₹249 AI coaching chat work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Once your free makeover report is generated, you can unlock 30 interactive coaching messages for just ₹249 (~$2.99 USD) via Dodo Payments. You can pay using UPI, RuPay, Indian & International Cards, or Apple Pay."
          }
        },
        {
          "@type": "Question",
          "name": "How fast is the report generated?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It takes approximately 10 to 15 seconds. As soon as you upload your photos and click 'Analyze', our AI analysis engine creates your complete report."
          }
        }
      ]
    }
  ]
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Ticker />
        <HowItWorks />
        <FeaturesGrid />
        <Comparison />
        <Pricing />
        <FAQ />
        <WaitlistCTA />
      </main>
      <Footer />
    </div>
  );
}
