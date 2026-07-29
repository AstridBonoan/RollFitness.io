import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AppHeader } from "@/components/layout/app-header";
import { AdminExerciseForm } from "@/features/admin/components/admin-exercise-form";
import { requireAdmin } from "@/features/authentication/services/admin";
import { getLibraryExercise } from "@/features/workout-library/services/exercises";

type AdminExerciseEditPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: AdminExerciseEditPageProps): Promise<Metadata> {
  const { slug } = await params;
  const exercise = await getLibraryExercise(slug);
  return {
    title: exercise ? `Admin · ${exercise.name}` : "Admin · Exercise",
  };
}

export default async function AdminExerciseEditPage({
  params,
}: AdminExerciseEditPageProps) {
  await requireAdmin();
  const { slug } = await params;
  const exercise = await getLibraryExercise(slug);

  if (!exercise) {
    notFound();
  }

  return (
    <div className="min-h-dvh bg-background">
      <AppHeader current="admin" />

      <main id="main-content" className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-sm text-muted-foreground">
          <Link
            href="/admin/exercises"
            className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Manage exercises
          </Link>
          <span aria-hidden="true"> / </span>
          {exercise.name}
        </p>

        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight">
          Edit {exercise.name}
        </h1>
        <p className="mt-3 font-mono text-xs text-muted-foreground">
          slug: {exercise.slug}
        </p>

        <div className="mt-10">
          <AdminExerciseForm exercise={exercise} />
        </div>
      </main>
    </div>
  );
}
