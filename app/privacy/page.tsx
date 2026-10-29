import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, Database, Globe, Mail } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export const metadata = {
  title: "Privacy Policy | ProfileGlow",
  description: "Learn how ProfileGlow handles and protects your dating photos, bios, and personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg text-ink">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 md:py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-black text-sm text-purple hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4 stroke-[3]" /> Back to Home
        </Link>

        <div className="space-y-4 mb-10">
          <Badge variant="lime">LEGAL COMPLIANCE</Badge>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-ink">
            Privacy Policy
          </h1>
          <p className="text-sm font-bold text-muted">
            Last Updated: October 2026 • Effective Date: October 2026
          </p>
        </div>

        <div className="card-brutal p-8 md:p-10 bg-card space-y-8 text-sm md:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-black text-ink flex items-center gap-2">
              <Shield className="w-6 h-6 text-purple stroke-[2.5]" />
              1. Overview & Commitment
            </h2>
            <p className="text-ink/80">
              At ProfileGlow (accessible from{" "}
              <a href="https://profileglow.tech" className="text-purple font-bold underline">
                https://profileglow.tech
              </a>
              ), we take your privacy and the confidentiality of your personal photos seriously.
              This Privacy Policy explains what information we collect, how it is processed using
              AI technologies, and your rights regarding your data under GDPR, CCPA, and international
              privacy laws.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-black text-ink flex items-center gap-2">
              <Eye className="w-6 h-6 text-purple stroke-[2.5]" />
              2. Information We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-ink/80">
              <li>
                <strong>Account Credentials:</strong> Email address and hashed passwords provided
                during sign up (managed securely via Google Firebase Authentication).
              </li>
              <li>
                <strong>Profile Images & Bios:</strong> The photos and bio text snippets you upload
                voluntarily for profile optimization and AI dating coach evaluation.
              </li>
              <li>
                <strong>Payment Information:</strong> Transaction identifiers and payment status
                processed securely via our Merchant of Record partner (Dodo Payments / Razorpay).
                We never store complete credit card or banking numbers on our servers.
              </li>
              <li>
                <strong>Usage & Analytics:</strong> Aggregate browser, device, and interaction
                analytics via Google Analytics to improve service performance.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-black text-ink flex items-center gap-2">
              <Lock className="w-6 h-6 text-purple stroke-[2.5]" />
              3. How We Process Photos & AI Usage
            </h2>
            <p className="text-ink/80">
              Your uploaded dating profile photos are used strictly to generate your individualized
              score report and coach insights:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-ink/80">
              <li>
                Photos are compressed client-side and analyzed using secure, enterprise-grade Vision AI
                models through private, zero-retention APIs. We do not save, store permanently, or use your photos for AI model training or any other purpose.
              </li>
              <li>
                <strong>No Public Sharing:</strong> Your photos are never shared publicly, never
                sold to third parties, and never used to train public machine learning models.
              </li>
              <li>
                <strong>Private Reports:</strong> Your report is accessible only via your unique
                report ID.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-black text-ink flex items-center gap-2">
              <Database className="w-6 h-6 text-purple stroke-[2.5]" />
              4. Data Retention & Deletion
            </h2>
            <p className="text-ink/80">
              We retain your report data only as long as necessary to provide you with access to
              your dashboard and coach. You may request immediate and permanent deletion of your
              account, uploaded photos, and analysis reports at any time by emailing us at{" "}
              <a
                href="mailto:support@profileglow.tech"
                className="text-purple font-bold underline"
              >
                support@profileglow.tech
              </a>
              . Deletion requests are processed within 48 hours.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-black text-ink flex items-center gap-2">
              <Globe className="w-6 h-6 text-purple stroke-[2.5]" />
              5. GDPR & CCPA Rights
            </h2>
            <p className="text-ink/80">
              Under applicable privacy frameworks, including the EU General Data Protection
              Regulation (GDPR) and California Consumer Privacy Act (CCPA), you have the right to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-ink/80">
              <li>Request a copy of the personal data we hold about you.</li>
              <li>Request correction or deletion of your personal data.</li>
              <li>Opt-out of analytics cookies.</li>
              <li>Withdraw consent for AI processing at any time.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-black text-ink flex items-center gap-2">
              <Mail className="w-6 h-6 text-purple stroke-[2.5]" />
              6. Contact Us
            </h2>
            <p className="text-ink/80">
              If you have any questions, concerns, or data requests regarding this Privacy Policy,
              contact our team at:
            </p>
            <div className="bg-bg p-4 rounded-xl border border-line font-bold">
              Email:{" "}
              <a
                href="mailto:support@profileglow.tech"
                className="text-purple underline"
              >
                support@profileglow.tech
              </a>
              <br />
              Website: https://profileglow.tech
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
