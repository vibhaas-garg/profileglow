"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export const Navbar: React.FC = () => {
  const { user, userName, signOut } = useAuth();

  return (
    <header className="w-full border-b border-line bg-bg/90 backdrop-blur sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-black text-xl tracking-tighter text-ink">
          Profile<span className="text-purple">Glow</span>
        </Link>

        <div className="flex items-center gap-6 font-extrabold text-sm">
          <Link href="#how" className="hidden md:inline hover:text-purple transition-colors">
            How it works
          </Link>
          <Link href="#features" className="hidden md:inline hover:text-purple transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="hidden md:inline hover:text-purple transition-colors">
            Pricing
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-muted hidden sm:inline">
                Hi, <span className="text-ink font-black">{userName ? userName.split(" ")[0] : "there"}</span>
              </span>
              <Link
                href="/dashboard"
                className="pill-brutal bg-lime hover:bg-lime-hover text-ink"
              >
                Dashboard ↗
              </Link>
              <button
                onClick={() => signOut()}
                className="text-xs font-bold text-muted hover:text-ink cursor-pointer"
              >
                Log out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="hover:text-purple transition-colors">
                Log in
              </Link>
              <Link
                href="/signup"
                className="pill-brutal bg-lime hover:bg-lime-hover text-ink"
              >
                Get started ↗
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
