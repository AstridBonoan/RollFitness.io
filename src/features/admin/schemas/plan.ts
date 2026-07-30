import { z } from "zod";

import { DIFFICULTY_LEVELS } from "@/features/workout-library/data/catalog";
import { FITNESS_GOALS, MOBILITY_LEVELS } from "@/lib/constants";

const optionalUrl = z
  .string()
  .trim()
  .max(2000)
  .refine((value) => value === "" || /^https?:\/\//i.test(value), {
    message: "Use a full http(s) URL, or leave blank",
  });

export const adminPlanUpdateSchema = z.object({
  slug: z.string().trim().min(1).max(120),
  title: z.string().trim().min(2).max(120),
  description: z.string().trim().min(10).max(1000),
  goalType: z.enum(FITNESS_GOALS),
  difficulty: z.enum(DIFFICULTY_LEVELS),
  mobilityLevel: z.enum(MOBILITY_LEVELS),
  estimatedDurationMinutes: z.coerce.number().int().min(5).max(180),
  imageUrl: optionalUrl,
  videoUrl: optionalUrl,
});

export type AdminPlanUpdateInput = z.infer<typeof adminPlanUpdateSchema>;
