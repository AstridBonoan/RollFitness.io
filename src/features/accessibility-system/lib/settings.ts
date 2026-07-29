import {
  DEFAULT_ACCESSIBILITY_SETTINGS,
  FONT_SCALE_OPTIONS,
  type AccessibilitySettings,
  type FontScale,
} from "@/features/accessibility-system/lib/constants";

function isFontScale(value: unknown): value is FontScale {
  return (
    typeof value === "string" &&
    (FONT_SCALE_OPTIONS as readonly string[]).includes(value)
  );
}

export function parseAccessibilitySettings(
  value: unknown,
): AccessibilitySettings {
  if (!value || typeof value !== "object") {
    return { ...DEFAULT_ACCESSIBILITY_SETTINGS };
  }

  const record = value as Record<string, unknown>;

  return {
    high_contrast:
      typeof record.high_contrast === "boolean"
        ? record.high_contrast
        : DEFAULT_ACCESSIBILITY_SETTINGS.high_contrast,
    font_scale: isFontScale(record.font_scale)
      ? record.font_scale
      : DEFAULT_ACCESSIBILITY_SETTINGS.font_scale,
    reduce_motion:
      typeof record.reduce_motion === "boolean"
        ? record.reduce_motion
        : DEFAULT_ACCESSIBILITY_SETTINGS.reduce_motion,
  };
}

export function serializeAccessibilitySettings(
  settings: AccessibilitySettings,
): string {
  return JSON.stringify(settings);
}

export function settingsFromCookieValue(
  value: string | undefined,
): AccessibilitySettings {
  if (!value) {
    return { ...DEFAULT_ACCESSIBILITY_SETTINGS };
  }

  try {
    const decoded = decodeURIComponent(value);
    return parseAccessibilitySettings(JSON.parse(decoded));
  } catch {
    try {
      return parseAccessibilitySettings(JSON.parse(value));
    } catch {
      return { ...DEFAULT_ACCESSIBILITY_SETTINGS };
    }
  }
}

export function accessibilityClassNames(
  settings: AccessibilitySettings,
): string {
  const classes: string[] = [];

  if (settings.high_contrast) {
    classes.push("high-contrast");
  }

  if (settings.font_scale === "large") {
    classes.push("font-scale-large");
  } else if (settings.font_scale === "x-large") {
    classes.push("font-scale-x-large");
  }

  if (settings.reduce_motion) {
    classes.push("reduce-motion");
  }

  return classes.join(" ");
}
