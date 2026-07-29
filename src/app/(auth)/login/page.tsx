import type { Metadata } from "next";
import Link from "next/link";

import { LoginForm } from "@/features/authentication/components/login-form";
import { AuthShell } from "@/features/authentication/components/auth-shell";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      description="Sign in to continue your adaptive wellness plan."
      footer={
        <p>
          New here?{" "}
          <Link
            href="/signup"
            className="font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Create an account
          </Link>
        </p>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
