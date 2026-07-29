import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { LogoutButton } from "@/features/authentication/components/logout-button";
import { getAuthUser } from "@/features/authentication/services/session";

export const metadata: Metadata = {
  title: "Account",
};

export default async function AccountPage() {
  const user = await getAuthUser();

  if (!user) {
    redirect("/login");
  }

  const displayName =
    (user.user_metadata?.display_name as string | undefined) ??
    user.email ??
    "Member";

  return (
    <div className="min-h-dvh bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
          <Link
            href="/"
            className="font-display text-lg font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            RollnFitness
          </Link>
          <LogoutButton />
        </div>
      </header>

      <main id="main-content" className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          Welcome, {displayName}
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          You’re signed in. This account space will grow into your personalized
          dashboard as workout, nutrition, and community modules ship.
        </p>
        <dl className="mt-10 space-y-4 text-sm">
          <div>
            <dt className="font-medium text-foreground">Email</dt>
            <dd className="mt-1 text-muted-foreground">{user.email}</dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">Email verified</dt>
            <dd className="mt-1 text-muted-foreground">
              {user.email_confirmed_at ? "Yes" : "Pending verification"}
            </dd>
          </div>
        </dl>
      </main>
    </div>
  );
}
