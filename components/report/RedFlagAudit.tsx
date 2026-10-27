import React from "react";
import { RedFlagItem } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { AlertTriangle } from "lucide-react";

interface RedFlagAuditProps {
  redFlags: RedFlagItem[];
}

export const RedFlagAudit: React.FC<RedFlagAuditProps> = ({ redFlags }) => {
  return (
    <div className="card-brutal p-6 md:p-8 bg-card space-y-6">
      <div>
        <Badge variant="orange">RED FLAG AUDIT</Badge>
        <h2 className="text-2xl font-black text-ink mt-2 tracking-tight">
          What Was Causing Left-Swipes
        </h2>
        <p className="text-xs font-medium text-muted mt-1">
          Fixing these subtle mistakes usually produces an immediate boost in match quality.
        </p>
      </div>

      <div className="space-y-4">
        {redFlags.map((item, idx) => (
          <div
            key={idx}
            className="p-4 bg-pink/30 border-2 border-ink rounded-xl shadow-brutal-sm space-y-1.5"
          >
            <div className="flex items-center gap-2 font-black text-sm text-ink">
              <AlertTriangle className="w-4 h-4 text-orange stroke-[2.5] shrink-0" />
              <span>{item.flag}</span>
            </div>
            <p className="text-xs font-medium text-muted pl-6 leading-relaxed">
              <strong className="text-ink">Remedy:</strong> {item.advice}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
