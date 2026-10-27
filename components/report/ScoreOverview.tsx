import React from "react";
import { Badge } from "@/components/ui/Badge";

interface ScoreOverviewProps {
  overallScore: number;
  subScores: {
    originality: number;
    visualImpact: number;
    vibe: number;
    conversationHooks: number;
  };
  headlineVerdict: string;
  verdictSummary: string;
  app: string;
}

export const ScoreOverview: React.FC<ScoreOverviewProps> = ({
  overallScore,
  subScores,
  headlineVerdict,
  verdictSummary,
  app,
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-lime bg-ink";
    if (score >= 5) return "text-purple bg-card";
    return "text-orange bg-card";
  };

  return (
    <div className="card-brutal p-6 md:p-8 bg-card space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-line pb-4">
        <div>
          <Badge variant="purple">{app.toUpperCase()} MAKEOVER REPORT</Badge>
          <h1 className="text-2xl md:text-3xl font-black text-ink mt-2 tracking-tight">
            {headlineVerdict}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] font-black uppercase text-muted tracking-wider block">
              Overall Score
            </span>
            <span className="text-xs font-bold text-muted">out of 10</span>
          </div>
          <div
            className={`w-16 h-16 rounded-2xl border-2 border-ink flex items-center justify-center font-black text-2xl shadow-brutal ${getScoreColor(
              overallScore
            )}`}
          >
            {overallScore}
          </div>
        </div>
      </div>

      <p className="text-sm md:text-base font-medium text-ink/90 leading-relaxed bg-bg p-4 rounded-xl border border-line">
        <span className="font-black text-ink">Diagnosis:</span> {verdictSummary}
      </p>

      {/* Subscores Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div className="bg-bg border border-ink rounded-xl p-3 text-center shadow-brutal-sm">
          <span className="block font-black text-xl text-ink">
            {subScores.originality}/10
          </span>
          <span className="text-[10px] font-black uppercase tracking-wider text-muted">
            Originality
          </span>
        </div>

        <div className="bg-bg border border-ink rounded-xl p-3 text-center shadow-brutal-sm">
          <span className="block font-black text-xl text-ink">
            {subScores.visualImpact}/10
          </span>
          <span className="text-[10px] font-black uppercase tracking-wider text-muted">
            Visual Impact
          </span>
        </div>

        <div className="bg-bg border border-ink rounded-xl p-3 text-center shadow-brutal-sm">
          <span className="block font-black text-xl text-ink">
            {subScores.vibe}/10
          </span>
          <span className="text-[10px] font-black uppercase tracking-wider text-muted">
            Vibe Appeal
          </span>
        </div>

        <div className="bg-bg border border-ink rounded-xl p-3 text-center shadow-brutal-sm">
          <span className="block font-black text-xl text-ink">
            {subScores.conversationHooks}/10
          </span>
          <span className="text-[10px] font-black uppercase tracking-wider text-muted">
            Hook Game
          </span>
        </div>
      </div>
    </div>
  );
};
