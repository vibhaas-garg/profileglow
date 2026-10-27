import { AuthCard } from "@/components/auth/AuthCard";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-bg flex flex-col justify-center items-center px-4 py-12">
      <AuthCard mode="signup" />
    </main>
  );
}
