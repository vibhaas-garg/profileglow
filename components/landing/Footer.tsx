import React from "react";
import Link from "next/link";
import { Mail } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-line bg-card/50 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <Link href="/" className="font-black text-xl text-ink tracking-tight inline-block">
              Profile<span className="text-purple">Glow</span>
            </Link>
            <p className="text-xs font-bold text-muted">
              AI dating profile audits, photo rankings, and conversation coaching.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-ink bg-bg px-3.5 py-1.5 rounded-full border border-line shadow-brutal-sm">
            <Mail className="w-3.5 h-3.5 text-purple" />
            <span>Support:</span>
            <a
              href="mailto:support@profileglow.tech"
              className="text-purple hover:underline"
            >
              support@profileglow.tech
            </a>
          </div>
        </div>

        <div className="border-t border-line pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-extrabold text-muted">
          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-5 md:gap-6">
            <Link href="/privacy" className="hover:text-purple transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-purple transition-colors">
              Terms of Service
            </Link>
            <Link href="/refund" className="hover:text-purple transition-colors">
              Refund Policy
            </Link>
            <a
              href="mailto:support@profileglow.tech"
              className="hover:text-purple transition-colors"
            >
              Contact Us
            </a>
          </div>

          <div className="text-center sm:text-right">
            © {new Date().getFullYear()} ProfileGlow. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
