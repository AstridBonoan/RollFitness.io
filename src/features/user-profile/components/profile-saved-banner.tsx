"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ProfileSavedBannerProps = {
  visible: boolean;
};

const AUTO_DISMISS_MS = 5000;

export function ProfileSavedBanner({ visible }: ProfileSavedBannerProps) {
  const router = useRouter();
  const [open, setOpen] = useState(visible);

  useEffect(() => {
    setOpen(visible);
  }, [visible]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setOpen(false);
      router.replace("/profile", { scroll: false });
    }, AUTO_DISMISS_MS);

    return () => window.clearTimeout(timeoutId);
  }, [open, router]);

  function dismiss() {
    setOpen(false);
    router.replace("/profile", { scroll: false });
  }

  if (!open) {
    return null;
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
