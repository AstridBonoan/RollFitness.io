import Link from "next/link";

import {
  labelDifficulty,
  labelEquipment,
  labelFocusArea,
  labelMobility,
} from "@/features/workout-library/lib/labels";
import type { LibraryExercise } from "@/features/workout-library/services/exercises";

type ExerciseCardProps = {
  exercise: LibraryExercise;
};

export function ExerciseMediaSlot({
  kind,
  label,
  filled,
  src,
  title,
}: {
  kind: "photo" | "video";
  label: string;
  filled: boolean;
  src?: string | null;
  title?: string;
}) {
  if (filled && src && kind === "photo") {
    return (
      <div className="overflow-hidden rounded-md border border-border">
        {/* Storage URLs are dynamic; native img avoids remote-pattern churn. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={title ? `Photo of ${title}` : label}
          className="aspect-[16/10] w-full object-cover"
        />
      </div>
    );
  }

  if (filled && src && kind === "video") {
    return (
      <div className="overflow-hidden rounded-md border border-border bg-black">
        <video
          src={src}
          controls
          className="aspect-[16/10] w-full"
          aria-label={title ? `Video of ${title}` : label}
        >
          Your browser cannot play this video.
        </video>
      </div>
    );
  }

  return (
    <div
      className={
        filled
          ? "flex aspect-[16/10] items-center justify-center rounded-md border border-primary/40 bg-primary/10 px-4 text-center text-sm text-primary"
          : "flex aspect-[16/10] items-center justify-center rounded-md border border-dashed border-border bg-muted/40 px-4 text-center"
      }
      aria-label={filled ? `${kind} ready` : `Empty ${kind} slot`}
    >
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {kind === "photo" ? "Photo slot" : "Video slot"}
          {filled ? " · linked" : " · empty"}
        </p>
        <p className="mt-2 text-sm font-medium text-foreground">{label}</p>
        {!filled ? (
          <p className="mt-1 text-xs text-muted-foreground">
            Admin can upload from the computer on the Admin → Exercises page.
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <article className="flex h-full flex-col border-b border-border pb-8 sm:border sm:border-border sm:p-5 sm:pb-5">
      <ExerciseMediaSlot
        kind="photo"
        label={exercise.photo_label}
        filled={Boolean(exercise.image_url)}
        src={exercise.image_url}
        title={exercise.name}
      />

      <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
        <span className="rounded-md bg-secondary px-2 py-1 text-secondary-foreground">
          {labelFocusArea(exercise.focus_area)}
        </span>
        <span className="rounded-md bg-secondary px-2 py-1 text-secondary-foreground">
          {labelDifficulty(exercise.difficulty)}
        </span>
        <span className="rounded-md bg-secondary px-2 py-1 text-secondary-foreground">
          {labelMobility(exercise.mobility_category)}
        </span>
      </div>

      <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">
        <Link
          href={`/exercises/${exercise.slug}`}
          className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {exercise.name}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {exercise.description}
      </p>
      <p className="mt-3 font-mono text-xs text-muted-foreground">
        slug: {exercise.slug}
      </p>
      <ul className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
        {exercise.equipment.map((item) => (
          <li key={item}>{labelEquipment(item)}</li>
        ))}
      </ul>
      <div className="mt-4">
        <Link
          href={`/exercises/${exercise.slug}`}
          className="text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Open details & media checklist
        </Link>
      </div>
    </article>
  );
}
