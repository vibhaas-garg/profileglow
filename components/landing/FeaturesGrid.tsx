import React from "react";
import { Badge } from "@/components/ui/Badge";
import {
  BarChart3,
  PenTool,
  Camera,
  MessageSquareQuote,
  Target,
  MessagesSquare,
} from "lucide-react";

export const FeaturesGrid: React.FC = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Profile Score (1–10)",
      desc: "Instant numerical score with breakdown across visual impact, originality, vibe, and conversation hooks.",
      tag: "Free",
      tagVariant: "lime" as const,
    },
    {
      icon: PenTool,
      title: "Bio Rewrite ×3",
      desc: "Three distinct bio variations (witty, genuine, and bold) optimized for your specific dating app.",
      tag: "Free",
      tagVariant: "lime" as const,
    },
    {
      icon: Camera,
      title: "Photo Ranking & Order",
      desc: "Every photo rated on lighting, attractiveness, and context. Know exactly which photo to lead with.",
      tag: "Free",
      tagVariant: "lime" as const,
    },
    {
      icon: MessageSquareQuote,
      title: "Prompt Rewrites",
      desc: "App-specific prompt answers (Hinge and Bumble) engineered to invite effortless replies.",
      tag: "Free",
      tagVariant: "lime" as const,
    },
    {
      icon: Target,
      title: "Conversation Openers",
      desc: "5 tailored opening lines that go beyond generic hellos, designed to start engaging banter that leads to dates.",
      tag: "Free",
      tagVariant: "lime" as const,
    },
    {
      icon: MessagesSquare,
      title: "Interactive Coaching Chat",
      desc: "Ask follow-ups, test custom reply drafts, and get continuous coaching grounded in your profile.",
      tag: "$4 Unlock",
      tagVariant: "pink" as const,
    },
  ];

  return (
    <section id="features" className="w-full bg-[#f0eee8] border-y border-line py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <Badge variant="purple">WHAT YOU GET</Badge>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-ink mt-3">
              Everything to
              <br />
              stand out.
            </h2>
          </div>
          <p className="max-w-md font-medium text-muted text-base">
            A complete profile transformation backed by vision analysis of high-performing dating profiles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="card-brutal p-7 bg-card hover:-translate-y-1 hover:shadow-brutal-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-lime border-2 border-ink flex items-center justify-center shadow-brutal-sm">
                    <Icon className="w-6 h-6 text-ink stroke-[2.25]" />
                  </div>
                  <h3 className="font-black text-xl text-ink mt-5 mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="font-medium text-muted text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-line/60">
                  <Badge variant={item.tagVariant}>{item.tag}</Badge>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
