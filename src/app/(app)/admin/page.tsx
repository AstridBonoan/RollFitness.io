import type { Metadata } from "next";
import Link from "next/link";

import { AppHeader } from "@/components/layout/app-header";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/features/authentication/services/admin";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function AdminPage() {
  await requireAdmin();

  return (
    <div className="min-h-dvh bg-background">
      <AppHeader current="admin" />

      <main id="main-content" className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          Admin
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Improve catalog content and attach your own media URLs. Role changes
          only happen in Supabase — signup always creates members.
        </p>

        <div className="mt-10 space-y-4">
          <div className="rounded-md border border-border px-4 py-4">
            <h2 className="font-medium text-foreground">Exercise library</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Edit copy and upload photos or videos from your computer (or paste
              a URL if you already host the file).
            </p>
            <Button asChild className="mt-4">
              <Link href="/admin/exercises">Manage exercises</Link>
            </Button>
          </div>

          <div className="rounded-md border border-border px-4 py-4 text-sm text-muted-foreground">
            Promote or demote admins with the SQL in{" "}
            <code className="font-mono text-xs">docs/ADMIN.md</code>.
          </div>
        </div>
      </main>
    </div>
  );
}
