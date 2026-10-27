"use client";

import React, { useState } from "react";
import { BioRewrite } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Check, Copy } from "lucide-react";

interface BioVariationsProps {
  bios: BioRewrite[];
}

export const BioVariations: React.FC<BioVariationsProps> = ({ bios }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getStyleBadge = (style: "witty" | "genuine" | "bold") => {
    switch (style) {
      case "witty":
        return <Badge variant="lime">Witty & Banter</Badge>;
      case "genuine":
        return <Badge variant="pink">Authentic & Grounded</Badge>;
      case "bold":
        return <Badge variant="purple">Bold & Confident</Badge>;
    }
  };

  return (
    <div className="card-brutal p-6 md:p-8 bg-card space-y-6">
      <div>
        <Badge variant="purple">BIO REWRITES ×3</Badge>
        <h2 className="text-2xl font-black text-ink mt-2 tracking-tight">
          Three Tailored Bio Makeovers
        </h2>
        <p className="text-xs font-medium text-muted mt-1">
          Pick the tone that feels most natural to you. Click to copy directly into your dating app.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {bios.map((bioItem, idx) => (
          <div
            key={idx}
            className="card-brutal-sm p-5 bg-bg flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                {getStyleBadge(bioItem.style)}
              </div>
              <p className="text-sm font-semibold text-ink leading-relaxed italic bg-card p-3 rounded-xl border border-line">
                &ldquo;{bioItem.bio}&rdquo;
              </p>
            </div>

            <Button
              type="button"
              variant={copiedIndex === idx ? "lime" : "alt"}
              size="sm"
              onClick={() => handleCopy(bioItem.bio, idx)}
              className="w-full text-xs flex items-center justify-center gap-1.5"
            >
              {copiedIndex === idx ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Copied to clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Bio</span>
                </>
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
