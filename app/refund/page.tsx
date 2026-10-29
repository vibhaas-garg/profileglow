import React from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw, CheckCircle, Clock, CreditCard, Mail } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export const metadata = {
  title: "Refund & Cancellation Policy | ProfileGlow",
  description: "7-day money-back satisfaction guarantee and refund terms for ProfileGlow.",
};

export default function RefundPage() {
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
          <Badge variant="lime">SATISFACTION GUARANTEE</Badge>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-ink">
            Refund & Cancellation Policy
          </h1>
          <p className="text-sm font-bold text-muted">
            Last Updated: October 2026 • 7-Day Money-Back Guarantee
          </p>
        </div>

        <div className="card-brutal p-8 md:p-10 bg-card space-y-8 text-sm md:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-black text-ink flex items-center gap-2">
              <RefreshCw className="w-6 h-6 text-purple stroke-[2.5]" />
              1. 7-Day Satisfaction Guarantee
            </h2>
            <p className="text-ink/80">
              We want you to love your ProfileGlow makeover. If you purchase our Pro Dating Coach
              upgrade (₹249 INR / ~$2.99 USD equivalent) and are not satisfied with your report, photo critiques,
              or coach advice, we offer a <strong>100% money-back guarantee within 7 days</strong> of
              purchase.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-black text-ink flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-purple stroke-[2.5]" />
              2. Eligibility for a Refund
            </h2>
            <p className="text-ink/80">You are eligible for a full refund if:</p>
            <ul className="list-disc pl-5 space-y-2 text-ink/80">
              <li>Your refund request is submitted within 7 days of the transaction date.</li>
              <li>
                You encountered a technical issue (e.g., photo analysis failed to generate, report
                did not unlock after payment).
              </li>
              <li>
                The generated advice did not meet your expectations or satisfaction standards.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-black text-ink flex items-center gap-2">
              <Mail className="w-6 h-6 text-purple stroke-[2.5]" />
              3. How to Request a Refund
            </h2>
            <p className="text-ink/80">
              To request a refund, simply send an email to our support team:
            </p>
            <div className="bg-bg p-4 rounded-xl border border-line font-bold space-y-2">
              <div>
                Email:{" "}
                <a
                  href="mailto:support@profileglow.tech"
                  className="text-purple underline"
                >
                  support@profileglow.tech
                </a>
              </div>
              <div className="text-xs text-muted">
                Please include your registered email address and the Report ID or Payment Receipt ID
                from your checkout confirmation.
              </div>
            </div>
            <p className="text-ink/80 text-xs text-muted">
              You do not need to fill out complex forms — we typically approve refund requests within
              24 hours.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-black text-ink flex items-center gap-2">
              <Clock className="w-6 h-6 text-purple stroke-[2.5]" />
              4. Processing Time & Payouts
            </h2>
            <p className="text-ink/80">
              Once approved, your refund is issued immediately through our payment partner (Dodo
              Payments / Razorpay). Funds typically reflect back into your original payment method
              (UPI, credit/debit card, or Apple Pay) within <strong>3 to 5 business days</strong>,
              depending on your bank.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-black text-ink flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-purple stroke-[2.5]" />
              5. Cancellation Policy
            </h2>
            <p className="text-ink/80">
              ProfileGlow operates on a <strong>single one-time payment model</strong>. There are no
              recurring monthly subscriptions, automatic renewals, or hidden charges. Since no
              recurring fees are charged, there is no subscription to cancel.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
