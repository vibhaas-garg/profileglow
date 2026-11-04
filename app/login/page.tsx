import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/AuthCard";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your ProfileGlow account to view your dating profile audit report and coaching history.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-bg flex flex-col justify-center items-center px-4 py-12">
      <AuthCard mode="login" />
    </main>
  );
}
