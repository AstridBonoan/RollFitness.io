"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  saveAccessibilitySettingsAction,
  type AccessibilityActionState,
} from "@/features/accessibility-system/actions/accessibility";
import { applyAccessibilityClasses } from "@/features/accessibility-system/lib/apply-classes";
import {
  FONT_SCALE_LABELS,
  FONT_SCALE_OPTIONS,
  THEME_LABELS,
  THEME_OPTIONS,
  type AccessibilitySettings,
  type FontScale,
  type ThemePreference,
} from "@/features/accessibility-system/lib/constants";
import { FormMessage } from "@/features/authentication/components/auth-shell";

const initialState: AccessibilityActionState = {};

type AccessibilitySettingsFormProps = {
  settings: AccessibilitySettings;
};

export function AccessibilitySettingsForm({
  settings,
}: AccessibilitySettingsFormProps) {
  const router = useRouter();
  const [draft, setDraft] = useState(settings);
  const [state, formAction, pending] = useActionState(
    saveAccessibilitySettingsAction,
    initialState,
  );

  useEffect(() => {
    if (state.success && state.settings) {
      applyAccessibilityClasses(state.settings);
      router.refresh();
    }
  }, [state.success, state.settings, router]);

  function preview(next: AccessibilitySettings) {
    setDraft(next);
    applyAccessibilityClasses(next);
  }

  return (
    <form action={formAction} className="space-y-10">
      <div
        role="status"
        className="rounded-md border border-border bg-card px-4 py-3 text-sm text-card-foreground"
      >
        Preview updates as soon as you change an option. Click save to keep it.
      </div>

      <fieldset className="space-y-4">
        <legend className="font-display text-xl font-semibold tracking-tight text-foreground">
          Dark mode
        </legend>
        <p className="text-sm text-muted-foreground">
          Switch the app between light and dark surfaces. Account and profile
          pages show this most clearly.
        </p>
        <div
          className="grid gap-2 sm:grid-cols-3"
          role="radiogroup"
          aria-label="Color theme"
        >
          {THEME_OPTIONS.map((theme) => {
            const selected = draft.theme === theme;
            return (
              <label
                key={theme}
                className={
                  selected
                    ? "flex min-h-12 cursor-pointer items-center justify-center rounded-md border-2 border-primary bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
                    : "flex min-h-12 cursor-pointer items-center justify-center rounded-md border border-border bg-background px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary"
                }
              >
                <input
                  type="radio"
                  name="theme"
                  value={theme}
                  checked={selected}
                  onChange={() =>
                    preview({ ...draft, theme: theme as ThemePreference })
                  }
                  className="sr-only"
                />
                {THEME_LABELS[theme]}
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-display text-xl font-semibold tracking-tight text-foreground">
          Text size
        </legend>
        <p className="text-sm text-muted-foreground">
          Scales the whole interface. Browser zoom still works on its own.
        </p>
        <div
          className="grid gap-2 sm:grid-cols-3"
          role="radiogroup"
          aria-label="Text size"
        >
          {FONT_SCALE_OPTIONS.map((scale) => {
            const selected = draft.font_scale === scale;
            return (
              <label
                key={scale}
                className={
                  selected
                    ? "flex min-h-12 cursor-pointer items-center justify-center rounded-md border-2 border-primary bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
                    : "flex min-h-12 cursor-pointer items-center justify-center rounded-md border border-border bg-background px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary"
                }
              >
                <input
                  type="radio"
                  name="fontScale"
                  value={scale}
                  checked={selected}
                  onChange={() =>
                    preview({ ...draft, font_scale: scale as FontScale })
                  }
                  className="sr-only"
                />
                {FONT_SCALE_LABELS[scale]}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="space-y-5">
        <div className="flex items-start gap-3 rounded-md border border-border px-4 py-3">
          <input
            id="highContrast"
            name="highContrast"
            type="checkbox"
            checked={draft.high_contrast}
            onChange={(event) =>
              preview({ ...draft, high_contrast: event.target.checked })
            }
            className="mt-1 size-5 accent-[var(--primary)]"
          />
          <div>
            <Label htmlFor="highContrast" className="text-base">
              High contrast
            </Label>
            <p className="mt-1 text-sm text-muted-foreground">
              Stronger borders and text for low-vision readability.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-md border border-border px-4 py-3">
          <input
            id="reduceMotion"
            name="reduceMotion"
            type="checkbox"
            checked={draft.reduce_motion}
            onChange={(event) =>
              preview({ ...draft, reduce_motion: event.target.checked })
            }
            className="mt-1 size-5 accent-[var(--primary)]"
          />
          <div>
            <Label htmlFor="reduceMotion" className="text-base">
              Reduce motion
            </Label>
            <p className="mt-1 text-sm text-muted-foreground">
              Turns off decorative animation on the landing page.
            </p>
          </div>
        </div>
      </div>

      {state.error ? <FormMessage error={state.error} /> : null}
      {state.warning ? (
        <div
          role="status"
          aria-live="polite"
          className="rounded-md bg-secondary px-3 py-2 text-sm text-secondary-foreground"
        >
          {state.warning}
        </div>
      ) : null}
      {state.success && !state.warning ? (
        <FormMessage success="Accessibility settings saved." />
      ) : null}

      <Button type="submit" disabled={pending} size="lg">
        {pending ? "Saving…" : "Save accessibility settings"}
      </Button>
    </form>
  );
}
