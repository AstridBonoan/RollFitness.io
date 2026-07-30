import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { AppHeader } from "@/components/layout/app-header";
import { Button } from "@/components/ui/button";
import { getAuthUser } from "@/features/authentication/services/session";
import { isAdminRole } from "@/features/authentication/lib/roles";
import { isOnboardingComplete } from "@/features/onboarding/lib/status";
import { ProfileAvatar } from "@/features/user-profile/components/profile-avatar";
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
  const isAdmin = isAdminRole(profile?.role);
  const displayName =
    profile?.display_name ??
    (user.user_metadata?.display_name as string | undefined) ??
    user.email ??
    "Member";

  return (
    <div className="min-h-dvh bg-background">
      <AppHeader current="account" />

      <main id="main-content" className="mx-auto max-w-3xl px-6 py-16">
        <div className="flex flex-wrap items-center gap-5">
          <ProfileAvatar
            name={displayName}
            avatarUrl={profile?.avatar_url}
            size="lg"
          />
          <div>
            <h1 className="font-display text-3xl font-semibold tracking-tight">
              Welcome, {displayName}
            </h1>
            {isAdmin ? (
              <p className="mt-2 text-sm font-medium text-primary">
                Admin account
              </p>
            ) : null}
            <p className="mt-3 max-w-xl text-muted-foreground">
              Your account hub. Keep your profile current so workouts and
              community features can adapt to your goals and ability.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {!isOnboardingComplete(profile) ? (
            <Button asChild>
              <Link href="/onboarding">Complete setup</Link>
            </Button>
          ) : null}
          <Button asChild variant={isOnboardingComplete(profile) ? "default" : "outline"}>
            <Link href="/profile">Edit profile</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/accessibility">Accessibility</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/exercises">Exercise library</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/plans">Workout plans</Link>
          </Button>
          {isAdmin ? (
            <Button asChild variant="outline">
              <Link href="/admin">Admin</Link>
            </Button>
          ) : null}
        </div>

        {!isOnboardingComplete(profile) ? (
          <div
            role="status"
            className="mt-8 rounded-md border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary"
          >
            Finish onboarding so we can personalize workouts around your goals
            and mobility preferences.
          </div>
        ) : null}

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
