import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FITNESS_GOALS, MOBILITY_LEVELS } from "@/lib/constants";
import { DIFFICULTY_LEVELS } from "@/features/workout-library/data/catalog";
import { labelMobility } from "@/features/workout-library/lib/labels";
import {
  labelPlanDifficulty,
  labelPlanGoal,
} from "@/features/workout-plans/lib/labels";
import type { PlanFilters } from "@/features/workout-plans/services/plans";

type PlanFiltersFormProps = {
  filters: PlanFilters;
};

export function PlanFiltersForm({ filters }: PlanFiltersFormProps) {
  return (
    <form
      method="get"
      className="grid gap-4 border-b border-border pb-8 sm:grid-cols-2 lg:grid-cols-3"
      aria-label="Filter plans"
    >
      <div className="space-y-2 sm:col-span-2 lg:col-span-3">
        <Label htmlFor="q">Search</Label>
        <Input
          id="q"
          name="q"
          type="search"
          defaultValue={filters.q ?? ""}
          placeholder="Plan name or slug"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="goal">Goal</Label>
        <select
          id="goal"
          name="goal"
          defaultValue={filters.goal ?? ""}
          className="flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">All goals</option>
          {FITNESS_GOALS.map((goal) => (
            <option key={goal} value={goal}>
              {labelPlanGoal(goal)}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="mobility">Mobility</Label>
        <select
          id="mobility"
          name="mobility"
          defaultValue={filters.mobility ?? ""}
          className="flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">All mobility levels</option>
          {MOBILITY_LEVELS.map((level) => (
            <option key={level} value={level}>
              {labelMobility(level)}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="difficulty">Difficulty</Label>
        <select
          id="difficulty"
          name="difficulty"
          defaultValue={filters.difficulty ?? ""}
          className="flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">All difficulties</option>
          {DIFFICULTY_LEVELS.map((level) => (
            <option key={level} value={level}>
              {labelPlanDifficulty(level)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap items-end gap-3 sm:col-span-2 lg:col-span-3">
        <Button type="submit">Apply filters</Button>
        <Button asChild variant="outline">
          <Link href="/plans">Clear</Link>
        </Button>
      </div>
    </form>
  );
}
