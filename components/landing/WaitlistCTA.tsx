"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";

export const WaitlistCTA: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-purple py-20 px-4 border-y-2 border-ink text-white text-center">
      <div className="max-w-2xl mx-auto space-y-4">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
          Your profile thinks it's doing fine.
          <br />
          Let's verify that.
        </h2>
        <p className="text-base font-medium text-white/90 max-w-lg mx-auto">
          Get your free profile makeover score in 60 seconds. Early members get access to new AI prompt packs.
        </p>

        {submitted ? (
          <div className="p-4 bg-lime text-ink font-black rounded-xl border-2 border-ink shadow-brutal max-w-md mx-auto">
            You are on the list. We will send your profile perks to {email}.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 rounded-xl border-2 border-ink bg-card text-ink font-medium text-sm focus:outline-none"
            />
            <Button type="submit" variant="lime" className="py-3 px-6 whitespace-nowrap">
              Join waitlist
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
