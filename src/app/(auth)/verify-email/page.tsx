import type { Metadata } from "next";
import Link from "next/link";

import { AuthShell } from "@/features/authentication/components/auth-shell";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Verify email",
};

export default function VerifyEmailPage() {
  return (
    <AuthShell
      title="Check your email"
      description="We sent a verification link to confirm your address. Open it to finish setting up your RollnFitness account."
      footer={
        <p>
          Wrong inbox?{" "}
          <Link
            href="/signup"
            className="font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Try a different email
          </Link>
        </p>
      }
    >
      <Button asChild variant="secondary" className="w-full">
        <Link href="/login">Return to sign in</Link>
      </Button>
    </AuthShell>
  );
}
