import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText, CheckCircle2, AlertTriangle, CreditCard, Scale, Mail } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export const metadata = {
  title: "Terms of Service | ProfileGlow",
  description: "Terms and conditions governing the use of ProfileGlow AI dating optimization services.",
};

export default function TermsPage() {
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
          <Badge variant="lime">LEGAL TERMS</Badge>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-ink">
            Terms of Service
          </h1>
          <p className="text-sm font-bold text-muted">
            Last Updated: October 2026 • Effective Date: October 2026
          </p>
        </div>

        <div className="card-brutal p-8 md:p-10 bg-card space-y-8 text-sm md:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-black text-ink flex items-center gap-2">
              <FileText className="w-6 h-6 text-purple stroke-[2.5]" />
              1. Acceptance of Terms
            </h2>
            <p className="text-ink/80">
              By accessing or using ProfileGlow (accessible at{" "}
              <a href="https://profileglow.tech" className="text-purple font-bold underline">
                https://profileglow.tech
              </a>
              ), you agree to be bound by these Terms of Service and our Privacy Policy. If you
              do not agree to these terms, please do not use the service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-black text-ink flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-purple stroke-[2.5]" />
              2. Description of Service & Eligibility
            </h2>
            <p className="text-ink/80">
              ProfileGlow is an AI-powered web platform designed to assist users in optimizing
              their dating profiles (such as Hinge, Bumble, and Tinder) through multimodal image
              evaluation, bio rewrites, conversation suggestions, and automated coaching.
            </p>
            <p className="text-ink/80">
              You must be at least 18 years of age to access or use ProfileGlow. By using the
              service, you represent and warrant that you meet this age requirement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-black text-ink flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-purple stroke-[2.5]" />
              3. User Content & Acceptable Use
            </h2>
            <p className="text-ink/80">
              When uploading photographs and biographical text to ProfileGlow:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-ink/80">
              <li>
                You represent that you own or possess all necessary rights and permissions for all
                uploaded materials.
              </li>
              <li>
                You agree not to upload images depicting other individuals without their consent.
              </li>
              <li>
                You agree strictly not to upload sexually explicit, pornographic, harassing,
                hateful, or illegal content.
              </li>
              <li>
                We reserve the right to immediately terminate access for any user violating these
                acceptable use standards.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-black text-ink flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-purple stroke-[2.5]" />
              4. Fees, Payments & Digital Delivery
            </h2>
            <p className="text-ink/80">
              ProfileGlow offers free initial audits alongside optional paid digital upgrades ($4.00
              USD or ₹349 INR one-time fee) to unlock complete photo breakdowns, rewritten bios,
              and interactive AI coaching chat.
            </p>
            <p className="text-ink/80">
              Payments are processed securely via our Merchant of Record partners (Dodo Payments /
              Razorpay). Access to paid digital features is granted automatically and immediately
              upon confirmation of payment. For refund terms, please consult our{" "}
              <Link href="/refund" className="text-purple font-bold underline">
                Refund Policy
              </Link>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-black text-ink flex items-center gap-2">
              <Scale className="w-6 h-6 text-purple stroke-[2.5]" />
              5. AI Disclaimer & Limitation of Liability
            </h2>
            <p className="text-ink/80">
              ProfileGlow leverages artificial intelligence models (Google Gemini) to generate
              suggestions, estimates, and conversational tips. These recommendations are provided
              solely for educational, entertainment, and optimization purposes.
            </p>
            <p className="text-ink/80">
              We do not guarantee specific real-world dating outcomes, match numbers, or romantic
              success. In no event shall ProfileGlow or its creators be liable for indirect,
              incidental, or consequential damages resulting from the use or inability to use the
              service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-black text-ink flex items-center gap-2">
              <Mail className="w-6 h-6 text-purple stroke-[2.5]" />
              6. Contact & Questions
            </h2>
            <p className="text-ink/80">
              For questions regarding these Terms of Service, please reach out to:
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
