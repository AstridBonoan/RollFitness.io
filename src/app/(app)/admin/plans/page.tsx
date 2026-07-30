import type { Metadata } from "next";
import Link from "next/link";

import { AppHeader } from "@/components/layout/app-header";
import { requireAdmin } from "@/features/authentication/services/admin";
import { labelPlanGoal } from "@/features/workout-plans/lib/labels";
import { listLibraryPlans } from "@/features/workout-plans/services/plans";

export const metadata: Metadata = {
  title: "Admin · Plans",
};

export default async function AdminPlansPage() {
  await requireAdmin();
  const plans = await listLibraryPlans();

  const byGoal = plans.reduce<Record<string, typeof plans>>((acc, plan) => {
    const key = plan.goal_type;
    acc[key] = acc[key] ? [...acc[key], plan] : [plan];
    return acc;
  }, {});

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
          Plans
        </p>

        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight">
          Manage workout plans
        </h1>
        <p className="mt-3 text-muted-foreground">
          Edit plan copy and upload photos or videos from your computer.
        </p>

        <div className="mt-10 space-y-10">
          {Object.entries(byGoal).map(([goal, group]) => (
            <section key={goal} aria-labelledby={`admin-plan-${goal}`}>
              <h2
                id={`admin-plan-${goal}`}
                className="font-display text-xl font-semibold tracking-tight"
              >
                {labelPlanGoal(goal as typeof group[0]["goal_type"])}
              </h2>
              <ul className="mt-4 divide-y divide-border border-y border-border">
                {group.map((plan) => (
                  <li key={plan.slug}>
                    <Link
                      href={`/admin/plans/${plan.slug}`}
                      className="flex flex-wrap items-baseline justify-between gap-2 py-3 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span className="font-medium">{plan.title}</span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {plan.slug}
                        {plan.image_url || plan.video_url
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
