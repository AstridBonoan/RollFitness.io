"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { onboardingSchema } from "@/features/onboarding/schemas/onboarding";
import { completeOnboarding } from "@/features/onboarding/services/onboarding";
import {
  EQUIPMENT_OPTIONS,
  FITNESS_GOALS,
  MOBILITY_LEVELS,
  WORKOUT_EXPERIENCE_LEVELS,
} from "@/lib/constants";
import type { MobilityLevel, WorkoutExperience } from "@/types/database";

export type OnboardingActionState = {
  error?: string;
};

function firstIssueMessage(error: {
  issues: { message: string }[];
}): string {
  return error.issues[0]?.message ?? "Invalid form data";
}

function asStringArray(value: FormDataEntryValue[]): string[] {
  return value.filter((item): item is string => typeof item === "string");
}

export async function completeOnboardingAction(
  _prev: OnboardingActionState,
  formData: FormData,
): Promise<OnboardingActionState> {
  const parsed = onboardingSchema.safeParse({
    displayName: formData.get("displayName"),
    fitnessInterests: asStringArray(formData.getAll("fitnessInterests")),
    mobilityLevel: formData.get("mobilityLevel"),
    equipmentPreferences: asStringArray(
      formData.getAll("equipmentPreferences"),
    ),
    workoutExperience: formData.get("workoutExperience"),
  });

  if (!parsed.success) {
    return { error: firstIssueMessage(parsed.error) };
  }

  const fitnessInterests = parsed.data.fitnessInterests.filter((item) =>
    (FITNESS_GOALS as readonly string[]).includes(item),
  );
  const equipmentPreferences = parsed.data.equipmentPreferences.filter(
    (item) => (EQUIPMENT_OPTIONS as readonly string[]).includes(item),
  );

  if (
    !(MOBILITY_LEVELS as readonly string[]).includes(parsed.data.mobilityLevel)
  ) {
    return { error: "Choose a valid mobility level." };
  }

  if (
    !(WORKOUT_EXPERIENCE_LEVELS as readonly string[]).includes(
      parsed.data.workoutExperience,
    )
  ) {
    return { error: "Choose a valid experience level." };
  }

  const result = await completeOnboarding({
    displayName: parsed.data.displayName,
    fitnessInterests,
    mobilityLevel: parsed.data.mobilityLevel as MobilityLevel,
    equipmentPreferences,
    workoutExperience: parsed.data.workoutExperience as WorkoutExperience,
  });

  if (result.error) {
    return { error: result.error };
  }

  revalidatePath("/account");
  revalidatePath("/profile");
  revalidatePath("/onboarding");
  redirect("/account");
}
