"use server";

import { revalidatePath } from "next/cache";

import { profileUpdateSchema } from "@/features/user-profile/schemas/profile";
import { updateCurrentProfile } from "@/features/user-profile/services/profile";
import type { MobilityLevel } from "@/types/database";
import {
  EQUIPMENT_OPTIONS,
  FITNESS_GOALS,
  MOBILITY_LEVELS,
} from "@/lib/constants";

export type ProfileActionState = {
  error?: string;
  success?: string;
};

function firstIssueMessage(error: {
  issues: { message: string }[];
}): string {
  return error.issues[0]?.message ?? "Invalid form data";
}

function asStringArray(value: FormDataEntryValue[]): string[] {
  return value.filter((item): item is string => typeof item === "string");
}

export async function updateProfileAction(
  _prev: ProfileActionState,
  formData: FormData,
): Promise<ProfileActionState> {
  const mobilityRaw = String(formData.get("mobilityLevel") ?? "");
  const parsed = profileUpdateSchema.safeParse({
    displayName: formData.get("displayName"),
    bio: formData.get("bio") ?? "",
    mobilityLevel: mobilityRaw,
    fitnessInterests: asStringArray(formData.getAll("fitnessInterests")),
    equipmentPreferences: asStringArray(
      formData.getAll("equipmentPreferences"),
    ),
    profileVisibility: formData.get("profileVisibility"),
    activityVisibility: formData.get("activityVisibility"),
  });

  if (!parsed.success) {
    return { error: firstIssueMessage(parsed.error) };
  }

  const mobilityLevel =
    parsed.data.mobilityLevel &&
    (MOBILITY_LEVELS as readonly string[]).includes(parsed.data.mobilityLevel)
      ? (parsed.data.mobilityLevel as MobilityLevel)
      : null;

  const fitnessInterests = parsed.data.fitnessInterests.filter((item) =>
    (FITNESS_GOALS as readonly string[]).includes(item),
  );
  const equipmentPreferences = parsed.data.equipmentPreferences.filter(
    (item) => (EQUIPMENT_OPTIONS as readonly string[]).includes(item),
  );

  const result = await updateCurrentProfile({
    displayName: parsed.data.displayName,
    bio: parsed.data.bio ?? "",
    mobilityLevel,
    fitnessInterests,
    equipmentPreferences,
    privacySettings: {
      profile_visibility: parsed.data.profileVisibility,
      activity_visibility: parsed.data.activityVisibility,
    },
  });

  if (result.error) {
    return { error: result.error };
  }

  revalidatePath("/profile");
  revalidatePath("/account");

  return { success: "Profile saved." };
}
