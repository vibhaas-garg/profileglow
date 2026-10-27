export type DatingApp = "tinder" | "bumble" | "hinge" | "other";

export type GenderPreference = "women" | "men" | "everyone";

export type RelationshipGoal = "long-term" | "casual" | "dating" | "not-sure";

export interface ProfileInputData {
  app: DatingApp;
  bio: string;
  age: number;
  location: string;
  genderPreference: GenderPreference;
  relationshipGoal: RelationshipGoal;
  photoUrls: string[];
}

export interface PhotoCritique {
  photoIndex: number;
  score: number; // 1-10
  recommendation: "lead" | "keep" | "replace";
  critique: string;
}

export interface BioRewrite {
  style: "witty" | "genuine" | "bold";
  title: string;
  bio: string;
}

export interface PromptRewrite {
  prompt: string;
  answer: string;
}

export interface RedFlagItem {
  flag: string;
  severity: "low" | "medium" | "high";
  advice: string;
}

export interface ProfileReport {
  id: string;
  userId: string;
  createdAt: string;
  inputData: ProfileInputData;
  overallScore: number; // 1-10
  subScores: {
    originality: number; // 1-10
    visualImpact: number; // 1-10
    vibe: number; // 1-10
    conversationHooks: number; // 1-10
  };
  headlineVerdict: string;
  verdictSummary: string;
  photoCritiques: PhotoCritique[];
  bioRewrites: BioRewrite[];
  promptRewrites: PromptRewrite[];
  conversationOpeners: string[];
  redFlags: RedFlagItem[];
  isChatUnlocked: boolean;
  paymentId?: string;
  unlockedAt?: string;
  chatMessageCount: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  image?: string;
  createdAt: string;
}
