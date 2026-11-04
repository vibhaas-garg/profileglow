import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/AuthCard";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a free ProfileGlow account to get your instant AI dating profile makeover score.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-bg flex flex-col justify-center items-center px-4 py-12">
      <AuthCard mode="signup" />
    </main>
  );
}
