import type { Metadata } from "next";
import Link from "next/link";

import { AuthShell } from "@/features/authentication/components/auth-shell";
import { SignupForm } from "@/features/authentication/components/signup-form";

export const metadata: Metadata = {
  title: "Create account",
};

export default function SignupPage() {
  return (
    <AuthShell
      title="Create your account"
      description="Start with functional goals—not diagnoses. Your preferences stay private."
      footer={
        <p>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Sign in
          </Link>
        </p>
      }
    >
      <SignupForm />
    </AuthShell>
  );
}
