import {
  PLAN_CATALOG,
  getPlanBySlug,
  type PlanCatalogItem,
  type PlanDifficulty,
} from "@/features/workout-plans/data/catalog";
import { getCatalogBySlug } from "@/features/workout-library/data/catalog";
import { getCurrentProfile } from "@/features/user-profile/services/profile";
import { createClient } from "@/lib/supabase/server";
import type { FitnessGoal, MobilityLevel } from "@/types/database";

export type PlanMedia = {
  image_url: string | null;
  video_url: string | null;
};

export type LibraryPlan = PlanCatalogItem &
  PlanMedia & {
    id?: string;
    recommendationScore?: number;
  };

export type PlanFilters = {
  goal?: FitnessGoal | "";
  mobility?: MobilityLevel | "";
  difficulty?: PlanDifficulty | "";
  q?: string;
};

type PlanDbOverride = PlanMedia & {
  id: string;
  title: string | null;
  description: string | null;
  goal_type: FitnessGoal | null;
  difficulty: PlanDifficulty | null;
  estimated_duration_minutes: number | null;
  mobility_level: MobilityLevel | null;
  equipment: string[] | null;
  exercise_slugs: string[] | null;
};

export function matchesPlanFilters(
  plan: PlanCatalogItem,
  filters: PlanFilters,
): boolean {
  if (filters.goal && plan.goal_type !== filters.goal) return false;
  if (filters.mobility && plan.mobility_level !== filters.mobility) return false;
  if (filters.difficulty && plan.difficulty !== filters.difficulty) return false;
  if (filters.q) {
    const query = filters.q.trim().toLowerCase();
    if (!query) return true;
    const haystack = [plan.title, plan.description, plan.slug, plan.goal_type]
      .join(" ")
      .toLowerCase();
    if (!haystack.includes(query)) return false;
  }
  return true;
}

async function loadOverridesBySlug(): Promise<Map<string, PlanDbOverride>> {
  const map = new Map<string, PlanDbOverride>();
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("workouts")
      .select(
        "id, slug, title, description, goal_type, difficulty, estimated_duration_minutes, mobility_level, equipment, exercise_slugs, image_url, video_url",
      )
      .eq("is_template", true);

    if (error || !data) return map;

    for (const row of data) {
      if (!row.slug) continue;
      map.set(row.slug, {
        id: row.id,
        title: row.title ?? null,
        description: row.description ?? null,
        goal_type: row.goal_type ?? null,
        difficulty: (row.difficulty as PlanDifficulty | null) ?? null,
        estimated_duration_minutes: row.estimated_duration_minutes ?? null,
        mobility_level: row.mobility_level ?? null,
        equipment: row.equipment ?? null,
        exercise_slugs: row.exercise_slugs ?? null,
        image_url: row.image_url ?? null,
        video_url: row.video_url ?? null,
      });
    }
  } catch {
    // Catalog still works without migration.
  }
  return map;
}

function withOverrides(
  plan: PlanCatalogItem,
  overrides: Map<string, PlanDbOverride>,
): LibraryPlan {
  const row = overrides.get(plan.slug);
  if (!row) {
    return {
      ...plan,
      image_url: null,
      video_url: null,
    };
  }

  return {
    ...plan,
    id: row.id,
    title: row.title ?? plan.title,
    description: row.description ?? plan.description,
    goal_type: row.goal_type ?? plan.goal_type,
    difficulty: row.difficulty ?? plan.difficulty,
    estimated_duration_minutes:
      row.estimated_duration_minutes ?? plan.estimated_duration_minutes,
    mobility_level: row.mobility_level ?? plan.mobility_level,
    equipment:
      row.equipment && row.equipment.length > 0
        ? row.equipment
        : plan.equipment,
    exercise_slugs:
      row.exercise_slugs && row.exercise_slugs.length > 0
        ? row.exercise_slugs
        : plan.exercise_slugs,
    image_url: row.image_url ?? null,
    video_url: row.video_url ?? null,
  };
}

export function scorePlanForProfile(
  plan: PlanCatalogItem,
  profile: {
    mobility_level: MobilityLevel | null;
    fitness_interests: string[] | null;
    equipment_preferences: string[] | null;
  } | null,
): number {
  if (!profile) return 0;
  let score = 0;
  if (
    profile.mobility_level &&
    profile.mobility_level === plan.mobility_level
  ) {
    score += 4;
  }
  if (profile.fitness_interests?.includes(plan.goal_type)) {
    score += 3;
  }
  const prefs = profile.equipment_preferences ?? [];
  if (prefs.length > 0) {
    const overlap = plan.equipment.filter((item) => prefs.includes(item));
    score += Math.min(overlap.length, 2);
  }
  return score;
}

export async function listLibraryPlans(
  filters: PlanFilters = {},
): Promise<LibraryPlan[]> {
  const overrides = await loadOverridesBySlug();
  const profile = await getCurrentProfile();

  return PLAN_CATALOG.filter((plan) => matchesPlanFilters(plan, filters))
    .map((plan) => {
      const item = withOverrides(plan, overrides);
      return {
        ...item,
        recommendationScore: scorePlanForProfile(item, profile),
      };
    })
    .sort(
      (a, b) =>
        (b.recommendationScore ?? 0) - (a.recommendationScore ?? 0) ||
        a.title.localeCompare(b.title),
    );
}

export async function getLibraryPlan(slug: string): Promise<LibraryPlan | null> {
  const catalog = getPlanBySlug(slug);
  if (!catalog) return null;
  const overrides = await loadOverridesBySlug();
  const profile = await getCurrentProfile();
  const plan = withOverrides(catalog, overrides);
  return {
    ...plan,
    recommendationScore: scorePlanForProfile(plan, profile),
  };
}

export function resolvePlanExercises(plan: PlanCatalogItem) {
  return plan.exercise_slugs
    .map((slug) => getCatalogBySlug(slug))
    .filter((exercise): exercise is NonNullable<typeof exercise> =>
      Boolean(exercise),
    );
}
