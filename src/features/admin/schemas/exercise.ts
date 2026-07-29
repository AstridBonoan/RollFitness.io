import { z } from "zod";

import { DIFFICULTY_LEVELS } from "@/features/workout-library/data/catalog";
import { MOBILITY_LEVELS } from "@/lib/constants";

const optionalUrl = z
  .string()
  .trim()
  .max(2000)
  .refine((value) => value === "" || /^https?:\/\//i.test(value), {
    message: "Use a full http(s) URL, or leave blank",
  });

export const adminExerciseUpdateSchema = z.object({
  slug: z.string().trim().min(1).max(120),
  name: z.string().trim().min(2).max(120),
  description: z.string().trim().min(10).max(1000),
  instructions: z.string().trim().min(10).max(4000),
  safetyNotes: z.string().trim().max(1000).optional().or(z.literal("")),
  difficulty: z.enum(DIFFICULTY_LEVELS),
  mobilityCategory: z.enum(MOBILITY_LEVELS),
  imageUrl: optionalUrl,
  videoUrl: optionalUrl,
});

export type AdminExerciseUpdateInput = z.infer<typeof adminExerciseUpdateSchema>;
