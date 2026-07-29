import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { AppHeader } from "@/components/layout/app-header";
import { Button } from "@/components/ui/button";
import { getAuthUser } from "@/features/authentication/services/session";
import { ProfileSummary } from "@/features/user-profile/components/profile-summary";
import { getCurrentProfile } from "@/features/user-profile/services/profile";

export const metadata: Metadata = {
  title: "Account",
};

export default async function AccountPage() {
  const user = await getAuthUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await getCurrentProfile();
  const displayName =
    profile?.display_name ??
    (user.user_metadata?.display_name as string | undefined) ??
    user.email ??
    "Member";

  return (
    <div className="min-h-dvh bg-background">
      <AppHeader current="account" />

      <main id="main-content" className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          Welcome, {displayName}
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Your account hub. Keep your profile current so workouts and community
          features can adapt to your goals and ability.
        </p>

        <div className="mt-8">
          <Button asChild>
            <Link href="/profile">Edit profile</Link>
          </Button>
        </div>

        <section aria-labelledby="account-details" className="mt-12">
          <h2
            id="account-details"
            className="font-display text-xl font-semibold tracking-tight"
          >
            Account details
          </h2>
          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="font-medium text-foreground">Email</dt>
              <dd className="mt-1 text-muted-foreground">{user.email}</dd>
            </div>
          </dl>
        </section>

        {profile ? (
          <section aria-labelledby="profile-overview" className="mt-12">
            <h2
              id="profile-overview"
              className="font-display text-xl font-semibold tracking-tight"
            >
              Profile overview
            </h2>
            <div className="mt-5">
              <ProfileSummary profile={profile} />
            </div>
          </section>
        ) : (
          <p className="mt-12 text-sm text-muted-foreground">
            We couldn’t load your profile yet. Try refreshing, or open Edit
            profile to create your preferences.
          </p>
        )}
      </main>
    </div>
  );
}
