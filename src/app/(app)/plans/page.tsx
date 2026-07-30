import type { Metadata } from "next";

import { AppHeader } from "@/components/layout/app-header";
import { PlanCard } from "@/features/workout-plans/components/plan-card";
import { PlanFiltersForm } from "@/features/workout-plans/components/plan-filters";
import {
  DIFFICULTY_LEVELS,
  type PlanDifficulty,
} from "@/features/workout-plans/data/catalog";
import { listLibraryPlans } from "@/features/workout-plans/services/plans";
import { FITNESS_GOALS, MOBILITY_LEVELS } from "@/lib/constants";
import type { FitnessGoal, MobilityLevel } from "@/types/database";

export const metadata: Metadata = {
  title: "Workout plans",
};

type PlansPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function first(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export default async function PlansPage({ searchParams }: PlansPageProps) {
  const params = await searchParams;
  const goalRaw = first(params.goal);
  const mobilityRaw = first(params.mobility);
  const difficultyRaw = first(params.difficulty);

  const filters = {
    q: first(params.q),
    goal: (FITNESS_GOALS as readonly string[]).includes(goalRaw)
      ? (goalRaw as FitnessGoal)
      : ("" as const),
    mobility: (MOBILITY_LEVELS as readonly string[]).includes(mobilityRaw)
      ? (mobilityRaw as MobilityLevel)
      : ("" as const),
    difficulty: (DIFFICULTY_LEVELS as readonly string[]).includes(difficultyRaw)
      ? (difficultyRaw as PlanDifficulty)
      : ("" as const),
  };

  const plans = await listLibraryPlans(filters);
  const recommended = plans.filter(
    (plan) => (plan.recommendationScore ?? 0) >= 4,
  );
  const recommendedSlugs = new Set(recommended.map((plan) => plan.slug));

  return (
    <div className="min-h-dvh bg-background">
      <AppHeader current="plans" />

      <main id="main-content" className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Workout plans
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Adaptive templates matched to goals and mobility. Photo and video
          slots stay empty until an admin uploads media.
        </p>

        <div className="mt-10">
          <PlanFiltersForm filters={filters} />
        </div>

        {recommended.length > 0 ? (
          <section className="mt-12" aria-labelledby="recommended-heading">
            <h2
              id="recommended-heading"
              className="font-display text-2xl font-semibold tracking-tight"
            >
              Recommended for you
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Based on your profile mobility, goals, and equipment.
            </p>
            <div className="mt-6 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {recommended.slice(0, 3).map((plan) => (
                <PlanCard key={plan.slug} plan={plan} recommended />
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-14" aria-labelledby="all-plans-heading">
          <h2
            id="all-plans-heading"
            className="font-display text-2xl font-semibold tracking-tight"
          >
            All plans
          </h2>
          <p className="mt-2 text-sm text-muted-foreground" aria-live="polite">
            Showing {plans.length} plan{plans.length === 1 ? "" : "s"}
          </p>

          {plans.length === 0 ? (
            <p className="mt-8 text-muted-foreground">
              No plans match these filters.
            </p>
          ) : (
            <div className="mt-6 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {plans.map((plan) => (
                <PlanCard
                  key={plan.slug}
                  plan={plan}
                  recommended={recommendedSlugs.has(plan.slug)}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
