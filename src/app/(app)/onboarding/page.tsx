import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getAuthUser } from "@/features/authentication/services/session";
import { OnboardingWizard } from "@/features/onboarding/components/onboarding-wizard";
import { isOnboardingComplete } from "@/features/onboarding/lib/status";
import { DEFAULT_PRIVACY_SETTINGS } from "@/features/user-profile/lib/labels";
import {
  getCurrentProfile,
  type Profile,
} from "@/features/user-profile/services/profile";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Onboarding",
};

async function ensureProfile(userId: string, displayName?: string | null) {
  const existing = await getCurrentProfile();
  if (existing) {
    return existing;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .insert({
      user_id: userId,
      display_name: displayName ?? null,
      privacy_settings: DEFAULT_PRIVACY_SETTINGS,
    })
    .select("*")
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return {
    ...data,
    privacy_settings: DEFAULT_PRIVACY_SETTINGS,
  } satisfies Profile;
}

export default async function OnboardingPage() {
  const user = await getAuthUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await ensureProfile(
    user.id,
    (user.user_metadata?.display_name as string | undefined) ?? null,
  );

  if (!profile) {
    redirect("/account");
  }

  if (isOnboardingComplete(profile)) {
    redirect("/account");
  }

  return (
    <div className="min-h-dvh bg-[linear-gradient(160deg,#f4f7f5_0%,#e2eee9_45%,#d5ebe3_100%)]">
      <header className="mx-auto flex h-16 w-full max-w-2xl items-center px-6">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          RollnFitness
        </Link>
      </header>

      <main
        id="main-content"
        className="mx-auto w-full max-w-2xl px-6 pb-16 pt-4"
      >
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          Welcome to RollnFitness
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          A short setup so workouts can match your goals and how you move—not a
          medical questionnaire.
        </p>

        <div className="mt-10 rounded-lg border border-border/70 bg-background/80 p-6 shadow-sm backdrop-blur">
          <OnboardingWizard profile={profile} />
        </div>
      </main>
    </div>
  );
}
