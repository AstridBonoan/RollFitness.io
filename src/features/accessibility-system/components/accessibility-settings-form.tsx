"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  saveAccessibilitySettingsAction,
  type AccessibilityActionState,
} from "@/features/accessibility-system/actions/accessibility";
import {
  FONT_SCALE_LABELS,
  FONT_SCALE_OPTIONS,
  type AccessibilitySettings,
} from "@/features/accessibility-system/lib/constants";
import { accessibilityClassNames } from "@/features/accessibility-system/lib/settings";
import { FormMessage } from "@/features/authentication/components/auth-shell";

const initialState: AccessibilityActionState = {};

const MANAGED_CLASSES = [
  "dark",
  "high-contrast",
  "font-scale-large",
  "font-scale-x-large",
  "reduce-motion",
] as const;

function applyAccessibilityClasses(settings: AccessibilitySettings) {
  const root = document.documentElement;
  const next = new Set(
    accessibilityClassNames(settings).split(" ").filter(Boolean),
  );

  for (const className of MANAGED_CLASSES) {
    root.classList.toggle(className, next.has(className));
  }

  root.style.colorScheme = "light";
}

type AccessibilitySettingsFormProps = {
  settings: AccessibilitySettings;
};

export function AccessibilitySettingsForm({
  settings,
}: AccessibilitySettingsFormProps) {
  const router = useRouter();
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

  return (
    <form action={formAction} className="space-y-8">
      <fieldset className="space-y-3">
        <legend className="font-medium text-foreground">Text size</legend>
        <p className="text-sm text-muted-foreground">
          Scales the whole interface. Zoom still works independently.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          {FONT_SCALE_OPTIONS.map((scale) => (
            <label
              key={scale}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-md border border-border px-4 py-2 has-[:checked]:border-primary has-[:checked]:bg-primary/10"
            >
              <input
                type="radio"
                name="fontScale"
                value={scale}
                defaultChecked={settings.font_scale === scale}
                className="size-4 accent-[var(--primary)]"
              />
              <span className="text-sm">{FONT_SCALE_LABELS[scale]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <input
            id="highContrast"
            name="highContrast"
            type="checkbox"
            defaultChecked={settings.high_contrast}
            className="mt-1 size-4 accent-[var(--primary)]"
          />
          <div>
            <Label htmlFor="highContrast">High contrast</Label>
            <p className="mt-1 text-sm text-muted-foreground">
              Stronger borders and text contrast for low-vision readability.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <input
            id="reduceMotion"
            name="reduceMotion"
            type="checkbox"
            defaultChecked={settings.reduce_motion}
            className="mt-1 size-4 accent-[var(--primary)]"
          />
          <div>
            <Label htmlFor="reduceMotion">Reduce motion</Label>
            <p className="mt-1 text-sm text-muted-foreground">
              Turns off decorative animation. Your device setting still applies
              when this is off.
            </p>
          </div>
        </div>
      </div>

      {state.error ? <FormMessage error={state.error} /> : null}
      {state.success ? (
        <FormMessage success="Accessibility settings saved." />
      ) : null}

      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : "Save accessibility settings"}
      </Button>
    </form>
  );
}
