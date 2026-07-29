import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { AppHeader } from "@/components/layout/app-header";
import { AccessibilitySettingsForm } from "@/features/accessibility-system/components/accessibility-settings-form";
import { resolveAccessibilitySettings } from "@/features/accessibility-system/services/accessibility";
import { getAuthUser } from "@/features/authentication/services/session";

export const metadata: Metadata = {
  title: "Accessibility",
};

export default async function AccessibilityPage() {
  const user = await getAuthUser();

  if (!user) {
    redirect("/login");
  }

  const settings = await resolveAccessibilitySettings();

  return (
    <div className="min-h-dvh bg-background">
      <AppHeader current="accessibility" />

      <main id="main-content" className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-sm text-muted-foreground">
          <Link
            href="/account"
            className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Account
          </Link>
          <span aria-hidden="true"> / </span>
          Accessibility
        </p>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight">
          Accessibility
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Adjust contrast, text size, and motion so RollnFitness fits how you
          see and move through the product.
        </p>

        <div className="mt-10">
          <AccessibilitySettingsForm settings={settings} />
        </div>
      </main>
    </div>
  );
}
