import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  EQUIPMENT_OPTIONS,
  MOBILITY_LEVELS,
} from "@/lib/constants";
import {
  DIFFICULTY_LEVELS,
  FOCUS_AREAS,
  FOCUS_AREA_LABELS,
  DIFFICULTY_LABELS,
} from "@/features/workout-library/data/catalog";
import {
  labelEquipment,
  labelMobility,
} from "@/features/workout-library/lib/labels";
import type { ExerciseFilters } from "@/features/workout-library/services/exercises";

type ExerciseFiltersFormProps = {
  filters: ExerciseFilters;
};

export function ExerciseFiltersForm({ filters }: ExerciseFiltersFormProps) {
  return (
    <form
      method="get"
      className="grid gap-4 border-b border-border pb-8 sm:grid-cols-2 lg:grid-cols-3"
      aria-label="Filter exercises"
    >
      <div className="space-y-2 sm:col-span-2 lg:col-span-3">
        <Label htmlFor="q">Search</Label>
        <Input
          id="q"
          name="q"
          type="search"
          defaultValue={filters.q ?? ""}
          placeholder="Name, muscle, or slug"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="focusArea">Focus area</Label>
        <select
          id="focusArea"
          name="focusArea"
          defaultValue={filters.focusArea ?? ""}
          className="flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">All focus areas</option>
          {FOCUS_AREAS.map((area) => (
            <option key={area} value={area}>
              {FOCUS_AREA_LABELS[area]}
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
              {DIFFICULTY_LABELS[level]}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="equipment">Equipment</Label>
        <select
          id="equipment"
          name="equipment"
          defaultValue={filters.equipment ?? ""}
          className="flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">Any equipment</option>
          {EQUIPMENT_OPTIONS.map((item) => (
            <option key={item} value={item}>
              {labelEquipment(item)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap items-end gap-3 sm:col-span-2 lg:col-span-3">
        <Button type="submit">Apply filters</Button>
        <Button asChild variant="outline">
          <Link href="/exercises">Clear</Link>
        </Button>
      </div>
    </form>
  );
}
