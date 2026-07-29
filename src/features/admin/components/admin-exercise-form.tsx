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
    <form action={formAction} className="space-y-6" encType="multipart/form-data">
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

      <fieldset className="space-y-4 rounded-md border border-border px-4 py-4">
        <legend className="px-1 font-medium text-foreground">Photo</legend>
        <p className="text-sm text-muted-foreground">{exercise.photo_label}</p>

        {exercise.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={exercise.image_url}
            alt={`Current photo for ${exercise.name}`}
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
          <p className="text-xs text-muted-foreground">
            JPEG, PNG, WebP, or GIF · max 5 MB
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="imageUrl">Or paste a photo URL (optional)</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            type="url"
            placeholder="https://…"
            defaultValue={exercise.image_url ?? ""}
          />
        </div>

        {exercise.image_url ? (
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
        <legend className="px-1 font-medium text-foreground">Video</legend>
        <p className="text-sm text-muted-foreground">{exercise.video_label}</p>

        {exercise.video_url ? (
          <video
            src={exercise.video_url}
            controls
            className="max-h-64 w-full rounded-md border border-border bg-black"
          >
            Your browser cannot play this video.
          </video>
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
          <p className="text-xs text-muted-foreground">
            MP4, WebM, or MOV · max 50 MB
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="videoUrl">Or paste a video URL (optional)</Label>
          <Input
            id="videoUrl"
            name="videoUrl"
            type="url"
            placeholder="https://…"
            defaultValue={exercise.video_url ?? ""}
          />
        </div>

        {exercise.video_url ? (
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
        {pending ? "Saving…" : "Save exercise"}
      </Button>
    </form>
  );
}
