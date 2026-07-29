import { z } from "zod";

import {
  EQUIPMENT_OPTIONS,
  FITNESS_GOALS,
  MOBILITY_LEVELS,
  WORKOUT_EXPERIENCE_LEVELS,
} from "@/lib/constants";

export const onboardingSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name must be 60 characters or fewer"),
  fitnessInterests: z
    .array(z.enum(FITNESS_GOALS))
    .min(1, "Select at least one fitness goal"),
  mobilityLevel: z.enum(MOBILITY_LEVELS, {
    message: "Choose the mobility level that fits you best",
  }),
  equipmentPreferences: z.array(z.enum(EQUIPMENT_OPTIONS)).default([]),
  workoutExperience: z.enum(WORKOUT_EXPERIENCE_LEVELS, {
    message: "Choose your workout experience",
  }),
});

export type OnboardingInput = z.infer<typeof onboardingSchema>;
