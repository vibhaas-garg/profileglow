import React from "react";
import { PhotoCritique } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";

interface PhotoRankingsProps {
  photos: string[];
  critiques: PhotoCritique[];
}

export const PhotoRankings: React.FC<PhotoRankingsProps> = ({ photos, critiques }) => {
  const getRecommendationBadge = (rec: "lead" | "keep" | "replace") => {
    switch (rec) {
      case "lead":
        return <Badge variant="lime">Lead photo</Badge>;
      case "keep":
        return <Badge variant="white">Keep</Badge>;
      case "replace":
        return <Badge variant="orange">Replace</Badge>;
    }
  };

  return (
    <div className="card-brutal p-6 md:p-8 bg-card space-y-6">
      <div>
        <Badge variant="purple">PHOTO RANKINGS & STRATEGY</Badge>
        <h2 className="text-2xl font-black text-ink mt-2 tracking-tight">
          Photo Breakdown & Order
        </h2>
        <p className="text-xs font-medium text-muted mt-1">
          Your photos determine 85% of matches. Here is how your shots rank for lighting, clarity, and impact.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((url, idx) => {
          const critique = critiques.find((c) => c.photoIndex === idx) || {
            photoIndex: idx,
            score: 7,
            recommendation: (idx === 0 ? "lead" : "keep") as "lead" | "keep" | "replace",
            critique: "Clear shot showing natural personality.",
          };

          return (
            <div
              key={idx}
              className="card-brutal-sm overflow-hidden bg-bg flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] w-full border-b-2 border-ink">
                <img
                  src={url}
                  alt={`Photo ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-ink text-white font-black text-[10px] rounded-md shadow-sm">
                  #{idx + 1}
                </div>
                <div className="absolute top-2 right-2">
                  {getRecommendationBadge(critique.recommendation)}
                </div>
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-xs font-black text-ink mb-1">
                    <span>Photo Score</span>
                    <span className="text-purple font-black">{critique.score}/10</span>
                  </div>
                  <p className="text-xs font-medium text-muted leading-relaxed">
                    {critique.critique}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
