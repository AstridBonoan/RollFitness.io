import type { Metadata } from "next";
import Link from "next/link";

import { AppHeader } from "@/components/layout/app-header";
import { requireAdmin } from "@/features/authentication/services/admin";
import { labelFocusArea } from "@/features/workout-library/lib/labels";
import { listLibraryGrouped } from "@/features/workout-library/services/exercises";

export const metadata: Metadata = {
  title: "Admin · Exercises",
};

export default async function AdminExercisesPage() {
  await requireAdmin();
  const groups = await listLibraryGrouped();

  return (
    <div className="min-h-dvh bg-background">
      <AppHeader current="admin" />

      <main id="main-content" className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-sm text-muted-foreground">
          <Link
            href="/admin"
            className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Admin
          </Link>
          <span aria-hidden="true"> / </span>
          Exercises
        </p>

        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight">
          Manage exercises
        </h1>
        <p className="mt-3 text-muted-foreground">
          Open an exercise to improve copy or paste photo/video URLs after you
          upload assets.
        </p>

        <div className="mt-10 space-y-10">
          {groups.map((group) => (
            <section key={group.area} aria-labelledby={`admin-${group.area}`}>
              <h2
                id={`admin-${group.area}`}
                className="font-display text-xl font-semibold tracking-tight"
              >
                {labelFocusArea(group.area)}
              </h2>
              <ul className="mt-4 divide-y divide-border border-y border-border">
                {group.exercises.map((exercise) => (
                  <li key={exercise.slug}>
                    <Link
                      href={`/admin/exercises/${exercise.slug}`}
                      className="flex flex-wrap items-baseline justify-between gap-2 py-3 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span className="font-medium text-foreground">
                        {exercise.name}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {exercise.slug}
                        {exercise.image_url || exercise.video_url
                          ? " · media linked"
                          : " · media empty"}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
