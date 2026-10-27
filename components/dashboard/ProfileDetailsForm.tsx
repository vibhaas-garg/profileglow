"use client";

import React from "react";
import { DatingApp, GenderPreference, RelationshipGoal } from "@/lib/types";
import { Input } from "@/components/ui/Input";

interface ProfileDetailsFormProps {
  app: DatingApp;
  setApp: (val: DatingApp) => void;
  bio: string;
  setBio: (val: string) => void;
  age: number;
  setAge: (val: number) => void;
  location: string;
  setLocation: (val: string) => void;
  genderPreference: GenderPreference;
  setGenderPreference: (val: GenderPreference) => void;
  relationshipGoal: RelationshipGoal;
  setRelationshipGoal: (val: RelationshipGoal) => void;
}

export const ProfileDetailsForm: React.FC<ProfileDetailsFormProps> = ({
  app,
  setApp,
  bio,
  setBio,
  age,
  setAge,
  location,
  setLocation,
  genderPreference,
  setGenderPreference,
  relationshipGoal,
  setRelationshipGoal,
}) => {
  return (
    <div className="space-y-5">
      {/* Target Dating App */}
      <div>
        <label className="block text-xs font-black uppercase tracking-wider text-ink mb-2">
          Target Dating App
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(["hinge", "bumble", "tinder", "other"] as DatingApp[]).map((option) => (
            <button
              type="button"
              key={option}
              onClick={() => setApp(option)}
              className={`py-2 px-3 rounded-xl border-2 border-ink font-black text-xs uppercase tracking-wider transition-all text-center ${
                app === option
                  ? "bg-purple text-white shadow-brutal-sm"
                  : "bg-card text-ink hover:bg-bg shadow-sm"
              }`}
            >
              {option === "hinge" && "Hinge"}
              {option === "bumble" && "Bumble"}
              {option === "tinder" && "Tinder"}
              {option === "other" && "Other"}
            </button>
          ))}
        </div>
      </div>

      {/* Age & Location in grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          id="age"
          label="Your Age"
          type="number"
          min={18}
          max={99}
          value={age || ""}
          onChange={(e) => setAge(parseInt(e.target.value, 10) || 18)}
          required
        />
        <Input
          id="location"
          label="Your City / Location"
          placeholder="e.g. Bengaluru, Mumbai, Delhi, NYC"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>

      {/* Preferences & Goals in grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-ink mb-1.5">
            Interested in
          </label>
          <select
            value={genderPreference}
            onChange={(e) => setGenderPreference(e.target.value as GenderPreference)}
            className="w-full px-3.5 py-2.5 bg-card border-[1.5px] border-ink rounded-xl text-sm font-semibold text-ink focus:outline-none focus:ring-2 focus:ring-purple shadow-brutal-sm"
          >
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="everyone">Everyone</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-ink mb-1.5">
            Looking for
          </label>
          <select
            value={relationshipGoal}
            onChange={(e) => setRelationshipGoal(e.target.value as RelationshipGoal)}
            className="w-full px-3.5 py-2.5 bg-card border-[1.5px] border-ink rounded-xl text-sm font-semibold text-ink focus:outline-none focus:ring-2 focus:ring-purple shadow-brutal-sm"
          >
            <option value="long-term">Long-term relationship</option>
            <option value="dating">Casual dating & fun</option>
            <option value="casual">Hookups / Short-term</option>
            <option value="not-sure">Still figuring it out</option>
          </select>
        </div>
      </div>

      {/* Current Bio / Text Field */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label htmlFor="bio" className="block text-xs font-black uppercase tracking-wider text-ink">
            Current Bio / Prompt Text
          </label>
          <span className="text-[11px] font-bold text-muted">
            {bio.length}/500 chars
          </span>
        </div>
        <textarea
          id="bio"
          rows={4}
          maxLength={500}
          placeholder="Paste whatever is currently written on your profile (your bio, prompt questions and answers, hobbies)..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          required
          className="w-full p-3.5 bg-card border-[1.5px] border-ink rounded-xl text-sm font-medium text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-purple shadow-brutal-sm"
        />
        <p className="text-[11px] text-muted font-medium mt-1">
          Paste whatever you currently use so the audit can pinpoint what to optimize.
        </p>
      </div>
    </div>
  );
};
