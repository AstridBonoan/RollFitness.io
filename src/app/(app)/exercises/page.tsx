import type { Metadata } from "next";

import { AppHeader } from "@/components/layout/app-header";
import { ExerciseCard } from "@/features/workout-library/components/exercise-card";
import { ExerciseFiltersForm } from "@/features/workout-library/components/exercise-filters";
import {
  DIFFICULTY_LEVELS,
  FOCUS_AREAS,
  type CatalogDifficulty,
  type FocusArea,
} from "@/features/workout-library/data/catalog";
import { listLibraryGrouped } from "@/features/workout-library/services/exercises";
import { MOBILITY_LEVELS } from "@/lib/constants";
import type { MobilityLevel } from "@/types/database";

export const metadata: Metadata = {
  title: "Exercise library",
};

type ExercisesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function first(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function asFocusArea(value: string): FocusArea | "" {
  return (FOCUS_AREAS as readonly string[]).includes(value)
    ? (value as FocusArea)
    : "";
}

function asMobility(value: string): MobilityLevel | "" {
  return (MOBILITY_LEVELS as readonly string[]).includes(value)
    ? (value as MobilityLevel)
    : "";
}

function asDifficulty(value: string): CatalogDifficulty | "" {
  return (DIFFICULTY_LEVELS as readonly string[]).includes(value)
    ? (value as CatalogDifficulty)
    : "";
}

export default async function ExercisesPage({ searchParams }: ExercisesPageProps) {
  const params = await searchParams;
  const filters = {
    q: first(params.q),
    focusArea: asFocusArea(first(params.focusArea)),
    mobility: asMobility(first(params.mobility)),
    difficulty: asDifficulty(first(params.difficulty)),
    equipment: first(params.equipment),
  };

  const groups = await listLibraryGrouped(filters);
  const total = groups.reduce((sum, group) => sum + group.exercises.length, 0);

  return (
    <div className="min-h-dvh bg-background">
      <AppHeader current="exercises" />

      <main id="main-content" className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Exercise library
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Adaptive exercises organized by focus area. Photo and video slots are
          empty on purpose — use each card’s labels and slug when you upload your
          own media.
        </p>

        <div className="mt-10">
          <ExerciseFiltersForm filters={filters} />
        </div>

        <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
          Showing {total} exercise{total === 1 ? "" : "s"}
        </p>

        {groups.length === 0 ? (
          <p className="mt-10 text-muted-foreground">
            No exercises match these filters. Clear filters to see the full
            catalog.
          </p>
        ) : (
          <div className="mt-10 space-y-14">
            {groups.map((group) => (
              <section
                key={group.area}
                aria-labelledby={`focus-${group.area}`}
              >
                <h2
                  id={`focus-${group.area}`}
                  className="font-display text-2xl font-semibold tracking-tight"
                >
                  {group.label}
                </h2>
                <div className="mt-6 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                  {group.exercises.map((exercise) => (
                    <ExerciseCard key={exercise.slug} exercise={exercise} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
