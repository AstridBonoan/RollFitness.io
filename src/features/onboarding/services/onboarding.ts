import { createClient } from "@/lib/supabase/server";
import type { MobilityLevel, WorkoutExperience } from "@/types/database";
import {
  parsePrivacySettings,
  type Profile,
} from "@/features/user-profile/services/profile";

export type OnboardingPayload = {
  displayName: string;
  fitnessInterests: string[];
  mobilityLevel: MobilityLevel;
  equipmentPreferences: string[];
  workoutExperience: WorkoutExperience;
};

export async function completeOnboarding(payload: OnboardingPayload) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in to finish onboarding." };
  }

  const { data, error } = await supabase
    .from("profiles")
    .update({
      display_name: payload.displayName,
      fitness_interests: payload.fitnessInterests,
      mobility_level: payload.mobilityLevel,
      equipment_preferences: payload.equipmentPreferences,
      workout_experience: payload.workoutExperience,
      onboarding_completed_at: new Date().toISOString(),
    })
    .eq("user_id", user.id)
    .select("*")
    .maybeSingle();

  if (error) {
    return { error: error.message };
  }

  await supabase.auth.updateUser({
    data: {
      display_name: payload.displayName,
    },
  });

  if (!data) {
    return { error: "Onboarding could not be completed." };
  }

  return {
    profile: {
      ...data,
      privacy_settings: parsePrivacySettings(data.privacy_settings),
    } satisfies Profile,
  };
}
