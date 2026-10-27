import React from "react";

export const Ticker: React.FC = () => {
  const items = [
    "BETTER BIOS",
    "RANKED PHOTOS",
    "MORE MATCHES",
    "AI-POWERED COACHING",
    "HINGE • BUMBLE • TINDER",
    "ZERO CLICHÉS",
    "PROVEN OPENERS",
  ];

  return (
    <div className="w-full bg-ink text-white py-3.5 overflow-hidden border-y-2 border-ink">
      <div className="ticker-track flex items-center font-black text-xs tracking-widest uppercase">
        {[...items, ...items, ...items].map((text, i) => (
          <span key={i} className="flex items-center whitespace-nowrap mx-4">
            {text}
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-lime ml-8" />
          </span>
        ))}
      </div>
    </div>
  );
};
