import { createClient } from "@/lib/supabase/server";
import type { Database, MobilityLevel } from "@/types/database";
import {
  DEFAULT_PRIVACY_SETTINGS,
  type PrivacySettings,
  PROFILE_VISIBILITY_OPTIONS,
  type ProfileVisibility,
} from "@/features/user-profile/lib/labels";

export type Profile =
  Database["public"]["Tables"]["profiles"]["Row"] & {
    privacy_settings: PrivacySettings;
  };

function isVisibility(value: unknown): value is ProfileVisibility {
  return (
    typeof value === "string" &&
    (PROFILE_VISIBILITY_OPTIONS as readonly string[]).includes(value)
  );
}

export function parsePrivacySettings(value: unknown): PrivacySettings {
  if (!value || typeof value !== "object") {
    return { ...DEFAULT_PRIVACY_SETTINGS };
  }

  const record = value as Record<string, unknown>;

  return {
    profile_visibility: isVisibility(record.profile_visibility)
      ? record.profile_visibility
      : DEFAULT_PRIVACY_SETTINGS.profile_visibility,
    activity_visibility: isVisibility(record.activity_visibility)
      ? record.activity_visibility
      : DEFAULT_PRIVACY_SETTINGS.activity_visibility,
  };
}

export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return {
    ...data,
    privacy_settings: parsePrivacySettings(data.privacy_settings),
  };
}

export type ProfileUpdatePayload = {
  displayName: string;
  bio: string;
  mobilityLevel: MobilityLevel | null;
  fitnessInterests: string[];
  equipmentPreferences: string[];
  privacySettings: PrivacySettings;
};

export async function updateCurrentProfile(payload: ProfileUpdatePayload) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in to update your profile." };
  }

  const { data, error } = await supabase
    .from("profiles")
    .update({
      display_name: payload.displayName,
      bio: payload.bio || null,
      mobility_level: payload.mobilityLevel,
      fitness_interests: payload.fitnessInterests,
      equipment_preferences: payload.equipmentPreferences,
      privacy_settings: payload.privacySettings,
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
    return { error: "Profile could not be updated." };
  }

  return {
    profile: {
      ...data,
      privacy_settings: parsePrivacySettings(data.privacy_settings),
    } satisfies Profile,
  };
}
