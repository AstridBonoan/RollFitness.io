"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AUTO_DISMISS_MS = 5000;

/**
 * Mount only when a save just succeeded. Auto-hides after 5s or on dismiss
 * by clearing the `saved` query param.
 */
export function ProfileSavedBanner() {
  const router = useRouter();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      router.replace("/profile", { scroll: false });
    }, AUTO_DISMISS_MS);

    return () => window.clearTimeout(timeoutId);
  }, [router]);

  function dismiss() {
    router.replace("/profile", { scroll: false });
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="mb-8 flex items-start justify-between gap-3 rounded-md border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-medium text-primary"
    >
      <p>Your profile has been saved.</p>
      <button
        type="button"
        onClick={dismiss}
        className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Dismiss saved message"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
