"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "How does the AI analyze my profile photos and bio?",
      a: "We use Google Gemini 2.0 Flash multimodal vision and language models. The AI evaluates photo lighting, posture, facial expressions, and composition, alongside your written bio to measure originality, vibe, and conversation potential.",
    },
    {
      q: "Is my personal data and photo upload private?",
      a: "Yes, completely. Your photos and profile details are stored securely in your private Firebase storage and Firestore documents. We never sell or share your photos with third parties, and you can delete them anytime.",
    },
    {
      q: "Which dating apps are supported?",
      a: "ProfileGlow is optimized for Tinder, Hinge, and Bumble, with support for other dating apps. The recommendations, character counts, and prompt suggestions adapt to each platform's culture.",
    },
    {
      q: "How does the ₹249 AI coaching chat work?",
      a: "Once your free makeover report is generated, you can unlock 30 interactive coaching messages for just ₹249 (~$2.99 USD) via Dodo Payments. You can pay using UPI, RuPay, Indian & International Cards, or Apple Pay.",
    },
    {
      q: "How fast is the report generated?",
      a: "It takes approximately 10 to 15 seconds. As soon as you upload your photos and click 'Analyze', our Gemini pipeline creates your complete report.",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <Badge variant="purple">GOOD QUESTIONS</Badge>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-ink mt-3">
          Before you glow up.
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="card-brutal-sm p-5 bg-card cursor-pointer"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <div className="flex justify-between items-center font-black text-base text-ink">
              <span>{faq.q}</span>
              <span className="text-xl font-black ml-4 text-purple">
                {openIndex === i ? "−" : "+"}
              </span>
            </div>
            {openIndex === i && (
              <p className="mt-3 text-sm font-medium text-muted leading-relaxed border-t border-line pt-3">
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
