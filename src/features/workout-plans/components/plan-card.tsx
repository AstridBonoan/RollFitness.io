import Link from "next/link";

import { ExerciseMediaSlot } from "@/features/workout-library/components/exercise-card";
import {
  labelEquipment,
  labelMobility,
} from "@/features/workout-library/lib/labels";
import {
  labelPlanDifficulty,
  labelPlanGoal,
} from "@/features/workout-plans/lib/labels";
import type { LibraryPlan } from "@/features/workout-plans/services/plans";

type PlanCardProps = {
  plan: LibraryPlan;
  recommended?: boolean;
};

export function PlanCard({ plan, recommended }: PlanCardProps) {
  return (
    <article className="flex h-full flex-col border-b border-border pb-8 sm:border sm:border-border sm:p-5 sm:pb-5">
      <ExerciseMediaSlot
        kind="photo"
        label={plan.photo_label}
        filled={Boolean(plan.image_url)}
        src={plan.image_url}
        title={plan.title}
      />

      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {recommended ? (
          <span className="rounded-md bg-primary px-2 py-1 text-primary-foreground">
            Recommended
          </span>
        ) : null}
        <span className="rounded-md bg-secondary px-2 py-1 text-secondary-foreground">
          {labelPlanGoal(plan.goal_type)}
        </span>
        <span className="rounded-md bg-secondary px-2 py-1 text-secondary-foreground">
          {labelPlanDifficulty(plan.difficulty)}
        </span>
        <span className="rounded-md bg-secondary px-2 py-1 text-secondary-foreground">
          {labelMobility(plan.mobility_level)}
        </span>
        <span className="rounded-md bg-secondary px-2 py-1 text-secondary-foreground">
          {plan.estimated_duration_minutes} min
        </span>
      </div>

      <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">
        <Link
          href={`/plans/${plan.slug}`}
          className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {plan.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {plan.description}
      </p>
      <p className="mt-3 font-mono text-xs text-muted-foreground">
        slug: {plan.slug} · {plan.exercise_slugs.length} exercises
      </p>
      <ul className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
        {plan.equipment.map((item) => (
          <li key={item}>{labelEquipment(item)}</li>
        ))}
      </ul>
      <div className="mt-4">
        <Link
          href={`/plans/${plan.slug}`}
          className="text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          View plan
        </Link>
      </div>
    </article>
  );
}
