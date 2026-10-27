import { z } from "zod";

export const ProfileInputSchema = z.object({
  app: z.enum(["tinder", "bumble", "hinge", "other"]),
  bio: z.string().min(10, "Bio should be at least 10 characters").max(1000),
  age: z.coerce.number().min(18, "Must be at least 18").max(99),
  location: z.string().min(2, "Location is required"),
  genderPreference: z.enum(["women", "men", "everyone"]),
  relationshipGoal: z.enum(["long-term", "casual", "dating", "not-sure"]),
  photoUrls: z.array(z.string().url()).min(1, "Upload at least 1 photo").max(6, "Maximum 6 photos allowed"),
});

export const GeminiReportSchema = z.object({
  overallScore: z.number().min(1).max(10),
  subScores: z.object({
    originality: z.number().min(1).max(10),
    visualImpact: z.number().min(1).max(10),
    vibe: z.number().min(1).max(10),
    conversationHooks: z.number().min(1).max(10),
  }),
  headlineVerdict: z.string(),
  verdictSummary: z.string(),
  photoCritiques: z.array(
    z.object({
      photoIndex: z.number(),
      score: z.number().min(1).max(10),
      recommendation: z.enum(["lead", "keep", "replace"]),
      critique: z.string(),
    })
  ),
  bioRewrites: z.array(
    z.object({
      style: z.enum(["witty", "genuine", "bold"]),
      title: z.string(),
      bio: z.string(),
    })
  ),
  promptRewrites: z.array(
    z.object({
      prompt: z.string(),
      answer: z.string(),
    })
  ),
  conversationOpeners: z.array(z.string()),
  redFlags: z.array(
    z.object({
      flag: z.string(),
      severity: z.enum(["low", "medium", "high"]),
      advice: z.string(),
    })
  ),
});
