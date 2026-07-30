import { FITNESS_INTEREST_LABELS } from "@/features/user-profile/lib/labels";
import {
  DIFFICULTY_LABELS,
} from "@/features/workout-library/data/catalog";
import type { PlanDifficulty } from "@/features/workout-plans/data/catalog";
import type { FitnessGoal } from "@/types/database";

export function labelPlanGoal(goal: FitnessGoal): string {
  return FITNESS_INTEREST_LABELS[goal];
}

export function labelPlanDifficulty(value: PlanDifficulty): string {
  return DIFFICULTY_LABELS[value];
}
