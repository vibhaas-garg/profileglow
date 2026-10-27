import React from "react";
import { PromptRewrite } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";

interface PromptRewritesProps {
  prompts: PromptRewrite[];
}

export const PromptRewrites: React.FC<PromptRewritesProps> = ({ prompts }) => {
  return (
    <div className="card-brutal p-6 md:p-8 bg-card space-y-6">
      <div>
        <Badge variant="purple">CONVERSATION MAGNETS</Badge>
        <h2 className="text-2xl font-black text-ink mt-2 tracking-tight">
          Prompt Rewrites
        </h2>
        <p className="text-xs font-medium text-muted mt-1">
          Hinge and Bumble prompt answers tailored to trigger effortless replies.
        </p>
      </div>

      <div className="space-y-4">
        {prompts.map((item, idx) => (
          <div
            key={idx}
            className="p-4 bg-bg border-2 border-ink rounded-xl shadow-brutal-sm space-y-1.5"
          >
            <div className="text-xs font-black text-purple uppercase tracking-wider">
              {item.prompt}
            </div>
            <div className="text-sm font-bold text-ink leading-relaxed">
              "{item.answer}"
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
