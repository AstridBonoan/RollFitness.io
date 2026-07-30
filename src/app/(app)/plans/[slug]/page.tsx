import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AppHeader } from "@/components/layout/app-header";
import { ExerciseMediaSlot } from "@/features/workout-library/components/exercise-card";
import {
  labelEquipment,
  labelMobility,
} from "@/features/workout-library/lib/labels";
import {
  labelPlanDifficulty,
  labelPlanGoal,
} from "@/features/workout-plans/lib/labels";
import {
  getLibraryPlan,
  resolvePlanExercises,
} from "@/features/workout-plans/services/plans";

type PlanDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PlanDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const plan = await getLibraryPlan(slug);
  return { title: plan ? plan.title : "Workout plan" };
}

export default async function PlanDetailPage({ params }: PlanDetailPageProps) {
  const { slug } = await params;
  const plan = await getLibraryPlan(slug);

  if (!plan) {
    notFound();
  }

  const exercises = resolvePlanExercises(plan);

  return (
    <div className="min-h-dvh bg-background">
      <AppHeader current="plans" />

      <main id="main-content" className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-sm text-muted-foreground">
          <Link
            href="/plans"
            className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Workout plans
          </Link>
          <span aria-hidden="true"> / </span>
          {plan.title}
        </p>

        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {plan.title}
        </h1>
        <p className="mt-3 text-muted-foreground">{plan.description}</p>
        <p className="mt-4 font-mono text-xs text-muted-foreground">
          slug: {plan.slug}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <ExerciseMediaSlot
            kind="photo"
            label={plan.photo_label}
            filled={Boolean(plan.image_url)}
            src={plan.image_url}
            title={plan.title}
          />
          <ExerciseMediaSlot
            kind="video"
            label={plan.video_label}
            filled={Boolean(plan.video_url)}
            src={plan.video_url}
            title={plan.title}
          />
        </div>

        <dl className="mt-10 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-medium">Goal</dt>
            <dd className="mt-1 text-muted-foreground">
              {labelPlanGoal(plan.goal_type)}
            </dd>
          </div>
          <div>
            <dt className="font-medium">Difficulty</dt>
            <dd className="mt-1 text-muted-foreground">
              {labelPlanDifficulty(plan.difficulty)}
            </dd>
          </div>
          <div>
            <dt className="font-medium">Mobility</dt>
            <dd className="mt-1 text-muted-foreground">
              {labelMobility(plan.mobility_level)}
            </dd>
          </div>
          <div>
            <dt className="font-medium">Duration</dt>
            <dd className="mt-1 text-muted-foreground">
              ~{plan.estimated_duration_minutes} minutes
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="font-medium">Equipment</dt>
            <dd className="mt-1 text-muted-foreground">
              {plan.equipment.map(labelEquipment).join(", ")}
            </dd>
          </div>
        </dl>

        <section className="mt-10" aria-labelledby="plan-exercises">
          <h2
            id="plan-exercises"
            className="font-display text-xl font-semibold tracking-tight"
          >
            Exercises in this plan
          </h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-muted-foreground">
            {exercises.map((exercise) => (
              <li key={exercise.slug}>
                <Link
                  href={`/exercises/${exercise.slug}`}
                  className="font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {exercise.name}
                </Link>
                <span className="mt-1 block text-sm">{exercise.description}</span>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  );
}
