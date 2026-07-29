import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AppHeader } from "@/components/layout/app-header";
import { getAuthUser } from "@/features/authentication/services/session";
import { ProfileForm } from "@/features/user-profile/components/profile-form";
import { ProfileSavedBanner } from "@/features/user-profile/components/profile-saved-banner";
import { DEFAULT_PRIVACY_SETTINGS } from "@/features/user-profile/lib/labels";
import {
  getCurrentProfile,
  type Profile,
} from "@/features/user-profile/services/profile";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Profile",
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

type ProfilePageProps = {
  searchParams: Promise<{ saved?: string }>;
};

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
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

  const params = await searchParams;
  const justSaved = params.saved === "1";

  return (
    <div className="min-h-dvh bg-background">
      <AppHeader current="profile" />

      <main id="main-content" className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          Your profile
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Share functional preferences—not medical diagnoses—so RollnFitness can
          personalize your experience.
        </p>

        <div className="mt-8">
          <ProfileSavedBanner visible={justSaved} />
        </div>

        <div className="mt-2">
          <ProfileForm profile={profile} />
        </div>
      </main>
    </div>
  );
}
