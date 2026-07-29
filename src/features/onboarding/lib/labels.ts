import { WORKOUT_EXPERIENCE_LEVELS } from "@/lib/constants";

export const WORKOUT_EXPERIENCE_LABELS: Record<
  (typeof WORKOUT_EXPERIENCE_LEVELS)[number],
  string
> = {
  beginner: "New to structured workouts",
  some_experience: "Some experience",
  experienced: "Experienced and consistent",
};

export const ONBOARDING_STEPS = [
  "welcome",
  "goals",
  "mobility",
  "equipment",
  "experience",
  "review",
] as const;

export type OnboardingStep = (typeof ONBOARDING_STEPS)[number];
