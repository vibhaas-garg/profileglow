"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { AlertCircle } from "lucide-react";

interface AuthCardProps {
  mode: "login" | "signup";
}

export const AuthCard: React.FC<AuthCardProps> = ({ mode }) => {
  const router = useRouter();
  const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === "signup") {
        await signUpWithEmail(name, email, password);
        router.push("/dashboard");
      } else {
        await signInWithEmail(email, password);
        const savedReport = typeof window !== "undefined" ? localStorage.getItem("profileglow_latest_report") : null;
        if (savedReport) {
          router.push(`/report/${savedReport}`);
        } else {
          router.push("/dashboard");
        }
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Authentication failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      await signInWithGoogle();
      const savedReport = typeof window !== "undefined" ? localStorage.getItem("profileglow_latest_report") : null;
      if (savedReport) {
        router.push(`/report/${savedReport}`);
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Google sign in failed.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto card-brutal p-8 md:p-10 my-10 bg-card">
      <div className="text-center mb-6">
        <Link href="/" className="inline-block font-black text-2xl tracking-tighter text-ink">
          Profile<span className="text-purple">Glow</span>
        </Link>
        <h2 className="text-2xl font-black mt-4 text-ink tracking-tight">
          {mode === "signup" ? "Create your account" : "Welcome back"}
        </h2>
        <p className="text-sm font-medium text-muted mt-1">
          {mode === "signup"
            ? "Get your free profile score and analysis in 60s"
            : "Log in to view your reports and coaching chat"}
        </p>
      </div>

      {error && (
        <div className="p-3 mb-5 bg-pink/50 border border-ink rounded-xl text-xs font-bold text-ink flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-ink shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <Input
            id="name"
            label="Full Name"
            placeholder="Jake Smith"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Min 6 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />

        <Button
          type="submit"
          variant="purple"
          className="w-full py-3 mt-2"
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : mode === "signup"
            ? "Create free account"
            : "Log in →"}
        </Button>
      </form>

      <div className="relative my-6 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-line" />
        </div>
        <span className="relative px-3 bg-card text-xs font-black uppercase text-muted tracking-wider">
          or continue with
        </span>
      </div>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="w-full py-2.5 px-4 bg-bg border-2 border-ink rounded-xl font-bold text-sm text-ink shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center gap-3"
      >
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Sign in with Google
      </button>

      <div className="text-center mt-6 text-xs text-muted font-bold">
        {mode === "signup" ? (
          <>
            Already have an account?{" "}
            <Link href="/login" className="text-purple hover:underline">
              Log in →
            </Link>
          </>
        ) : (
          <>
            Don't have an account?{" "}
            <Link href="/signup" className="text-purple hover:underline">
              Sign up free →
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
