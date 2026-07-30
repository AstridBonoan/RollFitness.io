/**
 * Workout plan templates. Media URLs stay empty until an admin uploads files.
 * exercise_slugs reference workout-library catalog slugs.
 */

import { DIFFICULTY_LEVELS, type CatalogDifficulty } from "@/features/workout-library/data/catalog";
import type { FitnessGoal, MobilityLevel } from "@/types/database";

export { DIFFICULTY_LEVELS };
export type PlanDifficulty = CatalogDifficulty;

export type PlanCatalogItem = {
  slug: string;
  title: string;
  description: string;
  goal_type: FitnessGoal;
  difficulty: PlanDifficulty;
  estimated_duration_minutes: number;
  mobility_level: MobilityLevel;
  equipment: string[];
  exercise_slugs: string[];
  photo_label: string;
  video_label: string;
};

export const PLAN_CATALOG: readonly PlanCatalogItem[] = [
  {
    slug: "seated-upper-starter",
    title: "Seated Upper-Body Starter",
    description:
      "A gentle seated session for building shoulder and back strength with bands or light weights.",
    goal_type: "strength",
    difficulty: "beginner",
    estimated_duration_minutes: 25,
    mobility_level: "seated",
    equipment: ["resistance_bands", "wheelchair_accessible"],
    exercise_slugs: [
      "seated-row-band",
      "seated-chest-press-band",
      "seated-shoulder-press",
      "seated-bicep-curl",
    ],
    photo_label: "Photo: seated athlete mid row or press",
    video_label: "Video: full starter session overview (45–60s)",
  },
  {
    slug: "seated-core-mobility",
    title: "Seated Core & Mobility",
    description:
      "Core control and torso mobility from a chair or wheelchair—no floor work required.",
    goal_type: "mobility",
    difficulty: "beginner",
    estimated_duration_minutes: 20,
    mobility_level: "seated",
    equipment: ["none", "wheelchair_accessible"],
    exercise_slugs: [
      "seated-torso-rotation",
      "seated-dead-bug",
      "scapular-retraction",
    ],
    photo_label: "Photo: seated torso rotation mid-range",
    video_label: "Video: seated core flow demo",
  },
  {
    slug: "seated-cardio-boost",
    title: "Seated Cardio Boost",
    description:
      "Low-impact cardio using marching and shadow boxing from a seated base.",
    goal_type: "endurance",
    difficulty: "beginner",
    estimated_duration_minutes: 15,
    mobility_level: "seated",
    equipment: ["none", "wheelchair_accessible"],
    exercise_slugs: ["seated-march", "seated-shadow-boxing"],
    photo_label: "Photo: seated shadow boxing guard",
    video_label: "Video: 15-minute seated cardio overview",
  },
  {
    slug: "limited-lower-foundations",
    title: "Limited Lower-Body Foundations",
    description:
      "Supported sit-to-stand and hip work for members with limited lower-body mobility.",
    goal_type: "strength",
    difficulty: "beginner",
    estimated_duration_minutes: 25,
    mobility_level: "limited_lower",
    equipment: ["none"],
    exercise_slugs: [
      "chair-supported-sit-to-stand",
      "supported-calf-raise",
      "standing-hip-abduction-support",
    ],
    photo_label: "Photo: chair-supported sit-to-stand mid-rise",
    video_label: "Video: limited-lower foundations session",
  },
  {
    slug: "limited-upper-push-pull",
    title: "Limited Upper Push & Pull",
    description:
      "Wall push-ups and posture drills when overhead or floor pressing is limited.",
    goal_type: "strength",
    difficulty: "beginner",
    estimated_duration_minutes: 20,
    mobility_level: "limited_upper",
    equipment: ["none", "resistance_bands"],
    exercise_slugs: ["wall-push-up", "scapular-retraction", "band-pull-apart"],
    photo_label: "Photo: wall push-up side angle",
    video_label: "Video: limited-upper push/pull circuit",
  },
  {
    slug: "assisted-daily-strength",
    title: "Assisted Daily Strength",
    description:
      "Partner- or rail-assisted fundamentals for safe practice with support.",
    goal_type: "mobility",
    difficulty: "beginner",
    estimated_duration_minutes: 20,
    mobility_level: "assisted",
    equipment: ["none"],
    exercise_slugs: ["assisted-sit-to-stand-partner", "assisted-arm-raise"],
    photo_label: "Photo: assisted sit-to-stand with spotter",
    video_label: "Video: assisted session with spotting cues",
  },
  {
    slug: "full-body-foundations",
    title: "Full-Body Foundations",
    description:
      "Squat, hinge, and core basics for members with full mobility.",
    goal_type: "strength",
    difficulty: "beginner",
    estimated_duration_minutes: 30,
    mobility_level: "full",
    equipment: ["none"],
    exercise_slugs: ["bodyweight-squat", "glute-bridge", "bird-dog"],
    photo_label: "Photo: bodyweight squat bottom position",
    video_label: "Video: full-body foundations walkthrough",
  },
  {
    slug: "strength-bands-dumbbells",
    title: "Bands & Dumbbells Strength",
    description:
      "Loaded strength with goblet squats, RDLs, and upper-back work.",
    goal_type: "strength",
    difficulty: "intermediate",
    estimated_duration_minutes: 35,
    mobility_level: "full",
    equipment: ["dumbbells", "resistance_bands"],
    exercise_slugs: [
      "dumbbell-goblet-squat",
      "dumbbell-romanian-deadlift",
      "band-pull-apart",
      "cable-face-pull-adaptive",
    ],
    photo_label: "Photo: goblet squat with dumbbell at chest",
    video_label: "Video: bands & dumbbells strength overview",
  },
  {
    slug: "seated-strength-progress",
    title: "Seated Strength Progression",
    description:
      "Intermediate seated pressing and pulling for members ready for more volume.",
    goal_type: "strength",
    difficulty: "intermediate",
    estimated_duration_minutes: 30,
    mobility_level: "seated",
    equipment: ["dumbbells", "resistance_bands", "wheelchair_accessible"],
    exercise_slugs: [
      "seated-shoulder-press",
      "seated-lat-pulldown-band",
      "seated-overhead-tricep-extension",
      "seated-row-band",
    ],
    photo_label: "Photo: seated overhead press lockout",
    video_label: "Video: seated strength progression session",
  },
  {
    slug: "weight-management-move",
    title: "Move for Weight Management",
    description:
      "Mix of seated cardio and full-mobility basics to support consistent activity.",
    goal_type: "weight_management",
    difficulty: "beginner",
    estimated_duration_minutes: 25,
    mobility_level: "full",
    equipment: ["none"],
    exercise_slugs: [
      "seated-march",
      "bodyweight-squat",
      "glute-bridge",
      "seated-shadow-boxing",
    ],
    photo_label: "Photo: mix of seated march and squat",
    video_label: "Video: weight-management movement circuit",
  },
] as const;

export function getPlanBySlug(slug: string): PlanCatalogItem | undefined {
  return PLAN_CATALOG.find((plan) => plan.slug === slug);
}

export function groupPlansByGoal() {
  const goals: FitnessGoal[] = [
    "strength",
    "mobility",
    "endurance",
    "weight_management",
  ];
  return goals
    .map((goal) => ({
      goal,
      plans: PLAN_CATALOG.filter((plan) => plan.goal_type === goal),
    }))
    .filter((group) => group.plans.length > 0);
}
