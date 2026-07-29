"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  updateAdminExerciseAction,
  type AdminExerciseActionState,
} from "@/features/admin/actions/exercises";
import { FormMessage } from "@/features/authentication/components/auth-shell";
import {
  DIFFICULTY_LABELS,
  DIFFICULTY_LEVELS,
} from "@/features/workout-library/data/catalog";
import { labelMobility } from "@/features/workout-library/lib/labels";
import type { LibraryExercise } from "@/features/workout-library/services/exercises";
import { MOBILITY_LEVELS } from "@/lib/constants";

const initialState: AdminExerciseActionState = {};

type AdminExerciseFormProps = {
  exercise: LibraryExercise;
};

export function AdminExerciseForm({ exercise }: AdminExerciseFormProps) {
  const [state, formAction, pending] = useActionState(
    updateAdminExerciseAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="slug" value={exercise.slug} />

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" defaultValue={exercise.name} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={exercise.description}
          rows={3}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="instructions">Instructions</Label>
        <Textarea
          id="instructions"
          name="instructions"
          defaultValue={exercise.instructions}
          rows={5}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="safetyNotes">Safety notes</Label>
        <Textarea
          id="safetyNotes"
          name="safetyNotes"
          defaultValue={exercise.safety_notes}
          rows={3}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="difficulty">Difficulty</Label>
          <select
            id="difficulty"
            name="difficulty"
            defaultValue={exercise.difficulty}
            className="flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {DIFFICULTY_LEVELS.map((level) => (
              <option key={level} value={level}>
                {DIFFICULTY_LABELS[level]}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="mobilityCategory">Mobility</Label>
          <select
            id="mobilityCategory"
            name="mobilityCategory"
            defaultValue={exercise.mobility_category}
            className="flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {MOBILITY_LEVELS.map((level) => (
              <option key={level} value={level}>
                {labelMobility(level)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">Photo URL (optional)</Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          type="url"
          placeholder="https://…/seated-shoulder-press.jpg"
          defaultValue={exercise.image_url ?? ""}
        />
        <p className="text-xs text-muted-foreground">{exercise.photo_label}</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="videoUrl">Video URL (optional)</Label>
        <Input
          id="videoUrl"
          name="videoUrl"
          type="url"
          placeholder="https://…/seated-shoulder-press.mp4"
          defaultValue={exercise.video_url ?? ""}
        />
        <p className="text-xs text-muted-foreground">{exercise.video_label}</p>
      </div>

      {state.error ? <FormMessage error={state.error} /> : null}
      {state.success ? <FormMessage success={state.success} /> : null}

      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : "Save exercise"}
      </Button>
    </form>
  );
}
