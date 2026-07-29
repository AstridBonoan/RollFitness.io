import type { AccessibilitySettings } from "@/features/accessibility-system/lib/constants";
import { accessibilityClassNames } from "@/features/accessibility-system/lib/settings";

const MANAGED_CLASSES = [
  "dark",
  "high-contrast",
  "font-scale-large",
  "font-scale-x-large",
  "reduce-motion",
] as const;

/**
 * Applies accessibility preference classes on `<html>` for immediate preview.
 */
export function applyAccessibilityClasses(settings: AccessibilitySettings) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const next = new Set(
    accessibilityClassNames(settings, prefersDark)
      .split(" ")
      .filter(Boolean),
  );

  for (const className of MANAGED_CLASSES) {
    root.classList.toggle(className, next.has(className));
  }

  root.style.colorScheme = next.has("dark") ? "dark" : "light";
}
