import { z } from "zod";

import {
  EQUIPMENT_OPTIONS,
  FITNESS_GOALS,
  MOBILITY_LEVELS,
} from "@/lib/constants";
import { PROFILE_VISIBILITY_OPTIONS } from "@/features/user-profile/lib/labels";

export const profileUpdateSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name must be 60 characters or fewer"),
  bio: z
    .string()
    .trim()
    .max(280, "Bio must be 280 characters or fewer")
    .optional()
    .or(z.literal("")),
  mobilityLevel: z.enum(MOBILITY_LEVELS).optional().or(z.literal("")),
  fitnessInterests: z.array(z.enum(FITNESS_GOALS)).default([]),
  equipmentPreferences: z.array(z.enum(EQUIPMENT_OPTIONS)).default([]),
  profileVisibility: z.enum(PROFILE_VISIBILITY_OPTIONS),
  activityVisibility: z.enum(PROFILE_VISIBILITY_OPTIONS),
});

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
