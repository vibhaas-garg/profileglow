import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-muted border-t border-line">
      <Link href="/" className="font-black text-base text-ink">
        Profile<span className="text-purple">Glow</span>
      </Link>
      <div>Profile optimization designed for real human connection.</div>
      <div>© {new Date().getFullYear()} ProfileGlow. All rights reserved.</div>
    </footer>
  );
};
