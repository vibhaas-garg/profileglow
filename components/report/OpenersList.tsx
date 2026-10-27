import React from "react";
import { Badge } from "@/components/ui/Badge";

interface OpenersListProps {
  openers: string[];
}

export const OpenersList: React.FC<OpenersListProps> = ({ openers }) => {
  return (
    <div className="card-brutal p-6 md:p-8 bg-card space-y-6">
      <div>
        <Badge variant="lime">CONVERSATION STARTERS</Badge>
        <h2 className="text-2xl font-black text-ink mt-2 tracking-tight">
          5 High-Converting Openers
        </h2>
        <p className="text-xs font-medium text-muted mt-1">
          Never start with "hey" again. Use these opening lines tailored to your dating app style.
        </p>
      </div>

      <div className="space-y-3">
        {openers.map((opener, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-3.5 bg-bg border border-ink rounded-xl shadow-brutal-sm"
          >
            <div className="w-6 h-6 rounded-md bg-purple text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
              {idx + 1}
            </div>
            <p className="text-xs sm:text-sm font-bold text-ink leading-relaxed">
              "{opener}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
