export const FONT_SCALE_OPTIONS = ["default", "large", "x-large"] as const;

export type FontScale = (typeof FONT_SCALE_OPTIONS)[number];

export type AccessibilitySettings = {
  high_contrast: boolean;
  font_scale: FontScale;
  reduce_motion: boolean;
};

export const DEFAULT_ACCESSIBILITY_SETTINGS: AccessibilitySettings = {
  high_contrast: false,
  font_scale: "default",
  reduce_motion: false,
};

export const ACCESSIBILITY_COOKIE = "rf-a11y";

export const FONT_SCALE_LABELS: Record<FontScale, string> = {
  default: "Default",
  large: "Large",
  "x-large": "Extra large",
};
