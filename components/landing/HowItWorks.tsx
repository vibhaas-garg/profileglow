import React from "react";
import { Badge } from "@/components/ui/Badge";

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "Upload photos & enter profile",
      desc: "Upload 1–6 of your dating profile photos and enter your current bio, age, location, and preferred dating app.",
    },
    {
      num: "02",
      title: "Multimodal AI analyzes everything",
      desc: "Gemini 2.0 Flash evaluates your photo lighting, expressions, and order, then audits your bio for originality and red flags.",
    },
    {
      num: "03",
      title: "Get your report & live coaching",
      desc: "Receive your free makeover report instantly. Unlock the paid AI dating coach to ask questions, refine answers, and draft messages.",
    },
  ];

  return (
    <section id="how" className="max-w-6xl mx-auto px-4 py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <Badge variant="purple">THE PROCESS</Badge>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-ink mt-3">
            Three steps.
            <br />
            One glow-up.
          </h2>
        </div>
        <p className="max-w-md font-medium text-muted text-base">
          Works with Tinder, Hinge, Bumble, and more. Optimized for your target audience and dating app algorithms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step) => (
          <div
            key={step.num}
            className="card-brutal p-8 bg-card hover:-translate-y-1 hover:shadow-brutal-xl transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-lime border-2 border-ink font-black flex items-center justify-center text-sm shadow-brutal-sm">
              {step.num}
            </div>
            <h3 className="font-black text-xl text-ink mt-6 mb-2 tracking-tight">
              {step.title}
            </h3>
            <p className="font-medium text-muted text-sm leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
