import {
  CATALOG_EXERCISES,
  type CatalogDifficulty,
  type CatalogExercise,
  type FocusArea,
  getCatalogBySlug,
  groupCatalogByFocusArea,
} from "@/features/workout-library/data/catalog";
import type { MobilityLevel } from "@/types/database";
import { createClient } from "@/lib/supabase/server";

export type ExerciseMedia = {
  image_url: string | null;
  video_url: string | null;
};

export type LibraryExercise = CatalogExercise &
  ExerciseMedia & {
    id?: string;
  };

export type ExerciseFilters = {
  focusArea?: FocusArea | "";
  mobility?: MobilityLevel | "";
  difficulty?: CatalogDifficulty | "";
  equipment?: string | "";
  q?: string;
};

function matchesFilters(
  exercise: CatalogExercise,
  filters: ExerciseFilters,
): boolean {
  if (filters.focusArea && exercise.focus_area !== filters.focusArea) {
    return false;
  }
  if (filters.mobility && exercise.mobility_category !== filters.mobility) {
    return false;
  }
  if (filters.difficulty && exercise.difficulty !== filters.difficulty) {
    return false;
  }
  if (
    filters.equipment &&
    !exercise.equipment.includes(filters.equipment)
  ) {
    return false;
  }
  if (filters.q) {
    const query = filters.q.trim().toLowerCase();
    if (!query) return true;
    const haystack = [
      exercise.name,
      exercise.description,
      exercise.slug,
      exercise.focus_area,
      ...exercise.target_muscles,
    ]
      .join(" ")
      .toLowerCase();
    if (!haystack.includes(query)) return false;
  }
  return true;
}

async function loadMediaBySlug(): Promise<Map<string, ExerciseMedia & { id: string }>> {
  const map = new Map<string, ExerciseMedia & { id: string }>();

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("exercises")
      .select("id, slug, image_url, video_url");

    if (error || !data) {
      return map;
    }

    for (const row of data) {
      if (!row.slug) continue;
      map.set(row.slug, {
        id: row.id,
        image_url: row.image_url ?? null,
        video_url: row.video_url ?? null,
      });
    }
  } catch {
    // Catalog still works if DB/migration is not ready.
  }

  return map;
}

function withMedia(
  exercise: CatalogExercise,
  media: Map<string, ExerciseMedia & { id: string }>,
): LibraryExercise {
  const row = media.get(exercise.slug);
  return {
    ...exercise,
    id: row?.id,
    image_url: row?.image_url ?? null,
    video_url: row?.video_url ?? null,
  };
}

export async function listLibraryExercises(
  filters: ExerciseFilters = {},
): Promise<LibraryExercise[]> {
  const media = await loadMediaBySlug();
  return CATALOG_EXERCISES.filter((exercise) => matchesFilters(exercise, filters)).map(
    (exercise) => withMedia(exercise, media),
  );
}

export async function listLibraryGrouped(filters: ExerciseFilters = {}) {
  const exercises = await listLibraryExercises(filters);
  const groups = groupCatalogByFocusArea()
    .map((group) => ({
      ...group,
      exercises: exercises.filter((item) => item.focus_area === group.area),
    }))
    .filter((group) => group.exercises.length > 0);

  return groups;
}

export async function getLibraryExercise(
  slug: string,
): Promise<LibraryExercise | null> {
  const catalog = getCatalogBySlug(slug);
  if (!catalog) return null;
  const media = await loadMediaBySlug();
  return withMedia(catalog, media);
}
