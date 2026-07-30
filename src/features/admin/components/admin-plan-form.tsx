"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  updateAdminPlanAction,
  type AdminPlanActionState,
} from "@/features/admin/actions/plans";
import { FormMessage } from "@/features/authentication/components/auth-shell";
import {
  DIFFICULTY_LABELS,
  DIFFICULTY_LEVELS,
} from "@/features/workout-library/data/catalog";
import { labelMobility } from "@/features/workout-library/lib/labels";
import {
  labelPlanGoal,
} from "@/features/workout-plans/lib/labels";
import type { LibraryPlan } from "@/features/workout-plans/services/plans";
import { FITNESS_GOALS, MOBILITY_LEVELS } from "@/lib/constants";

const initialState: AdminPlanActionState = {};

type AdminPlanFormProps = {
  plan: LibraryPlan;
};

export function AdminPlanForm({ plan }: AdminPlanFormProps) {
  const [state, formAction, pending] = useActionState(
    updateAdminPlanAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-6" encType="multipart/form-data">
      <input type="hidden" name="slug" value={plan.slug} />

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={plan.title} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={plan.description}
          rows={3}
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="goalType">Goal</Label>
          <select
            id="goalType"
            name="goalType"
            defaultValue={plan.goal_type}
            className="flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {FITNESS_GOALS.map((goal) => (
              <option key={goal} value={goal}>
                {labelPlanGoal(goal)}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="difficulty">Difficulty</Label>
          <select
            id="difficulty"
            name="difficulty"
            defaultValue={plan.difficulty}
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
          <Label htmlFor="mobilityLevel">Mobility</Label>
          <select
            id="mobilityLevel"
            name="mobilityLevel"
            defaultValue={plan.mobility_level}
            className="flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {MOBILITY_LEVELS.map((level) => (
              <option key={level} value={level}>
                {labelMobility(level)}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="estimatedDurationMinutes">Duration (minutes)</Label>
          <Input
            id="estimatedDurationMinutes"
            name="estimatedDurationMinutes"
            type="number"
            min={5}
            max={180}
            defaultValue={plan.estimated_duration_minutes}
            required
          />
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Exercises in this plan ({plan.exercise_slugs.length}):{" "}
        {plan.exercise_slugs.join(", ")}
      </p>

      <fieldset className="space-y-4 rounded-md border border-border px-4 py-4">
        <legend className="px-1 font-medium">Photo</legend>
        <p className="text-sm text-muted-foreground">{plan.photo_label}</p>
        {plan.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={plan.image_url}
            alt={`Current photo for ${plan.title}`}
            className="max-h-48 w-full rounded-md border border-border object-cover"
          />
        ) : (
          <p className="text-sm text-muted-foreground">No photo uploaded yet.</p>
        )}
        <div className="space-y-2">
          <Label htmlFor="imageFile">Upload photo from your computer</Label>
          <Input
            id="imageFile"
            name="imageFile"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="imageUrl">Or paste a photo URL</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            type="url"
            defaultValue={plan.image_url ?? ""}
          />
        </div>
        {plan.image_url ? (
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="removeImage"
              className="size-4 accent-[var(--primary)]"
            />
            Remove current photo
          </label>
        ) : null}
      </fieldset>

      <fieldset className="space-y-4 rounded-md border border-border px-4 py-4">
        <legend className="px-1 font-medium">Video</legend>
        <p className="text-sm text-muted-foreground">{plan.video_label}</p>
        {plan.video_url ? (
          <video
            src={plan.video_url}
            controls
            className="max-h-64 w-full rounded-md border border-border bg-black"
          />
        ) : (
          <p className="text-sm text-muted-foreground">No video uploaded yet.</p>
        )}
        <div className="space-y-2">
          <Label htmlFor="videoFile">Upload video from your computer</Label>
          <Input
            id="videoFile"
            name="videoFile"
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="videoUrl">Or paste a video URL</Label>
          <Input
            id="videoUrl"
            name="videoUrl"
            type="url"
            defaultValue={plan.video_url ?? ""}
          />
        </div>
        {plan.video_url ? (
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="removeVideo"
              className="size-4 accent-[var(--primary)]"
            />
            Remove current video
          </label>
        ) : null}
      </fieldset>

      {state.error ? <FormMessage error={state.error} /> : null}
      {state.success ? <FormMessage success={state.success} /> : null}

      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : "Save plan"}
      </Button>
    </form>
  );
}
