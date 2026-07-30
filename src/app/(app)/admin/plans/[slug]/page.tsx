import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AppHeader } from "@/components/layout/app-header";
import { AdminPlanForm } from "@/features/admin/components/admin-plan-form";
import { requireAdmin } from "@/features/authentication/services/admin";
import { getLibraryPlan } from "@/features/workout-plans/services/plans";

type AdminPlanEditPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: AdminPlanEditPageProps): Promise<Metadata> {
  const { slug } = await params;
  const plan = await getLibraryPlan(slug);
  return { title: plan ? `Admin · ${plan.title}` : "Admin · Plan" };
}

export default async function AdminPlanEditPage({
  params,
}: AdminPlanEditPageProps) {
  await requireAdmin();
  const { slug } = await params;
  const plan = await getLibraryPlan(slug);

  if (!plan) {
    notFound();
  }

  return (
    <div className="min-h-dvh bg-background">
      <AppHeader current="admin" />

      <main id="main-content" className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-sm text-muted-foreground">
          <Link
            href="/admin/plans"
            className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Manage plans
          </Link>
          <span aria-hidden="true"> / </span>
          {plan.title}
        </p>

        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight">
          Edit {plan.title}
        </h1>
        <p className="mt-3 font-mono text-xs text-muted-foreground">
          slug: {plan.slug}
        </p>

        <div className="mt-10">
          <AdminPlanForm plan={plan} />
        </div>
      </main>
    </div>
  );
}
