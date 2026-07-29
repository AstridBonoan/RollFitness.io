import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AppHeader } from "@/components/layout/app-header";
import { ExerciseMediaSlot } from "@/features/workout-library/components/exercise-card";
import {
  labelDifficulty,
  labelEquipment,
  labelFocusArea,
  labelMobility,
  labelMuscle,
} from "@/features/workout-library/lib/labels";
import { getLibraryExercise } from "@/features/workout-library/services/exercises";

type ExerciseDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ExerciseDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const exercise = await getLibraryExercise(slug);
  return {
    title: exercise ? exercise.name : "Exercise",
  };
}

export default async function ExerciseDetailPage({
  params,
}: ExerciseDetailPageProps) {
  const { slug } = await params;
  const exercise = await getLibraryExercise(slug);

  if (!exercise) {
    notFound();
  }

  return (
    <div className="min-h-dvh bg-background">
      <AppHeader current="exercises" />

      <main id="main-content" className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-sm text-muted-foreground">
          <Link
            href="/exercises"
            className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Exercise library
          </Link>
          <span aria-hidden="true"> / </span>
          {exercise.name}
        </p>

        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {exercise.name}
        </h1>
        <p className="mt-3 text-muted-foreground">{exercise.description}</p>

        <p className="mt-4 font-mono text-xs text-muted-foreground">
          Upload key / slug: {exercise.slug}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <ExerciseMediaSlot
            kind="photo"
            label={exercise.photo_label}
            filled={Boolean(exercise.image_url)}
            src={exercise.image_url}
            title={exercise.name}
          />
          <ExerciseMediaSlot
            kind="video"
            label={exercise.video_label}
            filled={Boolean(exercise.video_url)}
            src={exercise.video_url}
            title={exercise.name}
          />
        </div>

        <dl className="mt-10 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-medium text-foreground">Focus area</dt>
            <dd className="mt-1 text-muted-foreground">
              {labelFocusArea(exercise.focus_area)}
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">Difficulty</dt>
            <dd className="mt-1 text-muted-foreground">
              {labelDifficulty(exercise.difficulty)}
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">Mobility</dt>
            <dd className="mt-1 text-muted-foreground">
              {labelMobility(exercise.mobility_category)}
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">Equipment</dt>
            <dd className="mt-1 text-muted-foreground">
              {exercise.equipment.map(labelEquipment).join(", ")}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="font-medium text-foreground">Target muscles</dt>
            <dd className="mt-1 text-muted-foreground">
              {exercise.target_muscles.map(labelMuscle).join(", ")}
            </dd>
          </div>
        </dl>

        <section className="mt-10" aria-labelledby="instructions-heading">
          <h2
            id="instructions-heading"
            className="font-display text-xl font-semibold tracking-tight"
          >
            How to perform
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            {exercise.instructions}
          </p>
        </section>

        <section className="mt-10" aria-labelledby="safety-heading">
          <h2
            id="safety-heading"
            className="font-display text-xl font-semibold tracking-tight"
          >
            Safety notes
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            {exercise.safety_notes}
          </p>
        </section>

        <section className="mt-10" aria-labelledby="variations-heading">
          <h2
            id="variations-heading"
            className="font-display text-xl font-semibold tracking-tight"
          >
            Variations to film later
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
            {exercise.variations.map((variation) => (
              <li key={variation}>{variation}</li>
            ))}
          </ul>
        </section>

        <section
          className="mt-10 rounded-md border border-border bg-card px-4 py-4 text-sm text-card-foreground"
          aria-labelledby="upload-checklist"
        >
          <h2 id="upload-checklist" className="font-medium text-foreground">
            Media checklist
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
            <li>{exercise.photo_label}</li>
            <li>{exercise.video_label}</li>
            <li>
              Suggested filenames:{" "}
              <code className="font-mono text-xs">
                {exercise.slug}.jpg
              </code>{" "}
              /{" "}
              <code className="font-mono text-xs">
                {exercise.slug}.mp4
              </code>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
