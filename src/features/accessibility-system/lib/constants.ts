export const THEME_OPTIONS = ["system", "light", "dark"] as const;
export const FONT_SCALE_OPTIONS = ["default", "large", "x-large"] as const;

export type ThemePreference = (typeof THEME_OPTIONS)[number];
export type FontScale = (typeof FONT_SCALE_OPTIONS)[number];

export type AccessibilitySettings = {
  theme: ThemePreference;
  high_contrast: boolean;
  font_scale: FontScale;
  reduce_motion: boolean;
};

export const DEFAULT_ACCESSIBILITY_SETTINGS: AccessibilitySettings = {
  theme: "system",
  high_contrast: false,
  font_scale: "default",
  reduce_motion: false,
};

export const ACCESSIBILITY_COOKIE = "rf-a11y";

export const THEME_LABELS: Record<ThemePreference, string> = {
  system: "Match device",
  light: "Light",
  dark: "Dark",
};

export const FONT_SCALE_LABELS: Record<FontScale, string> = {
  default: "Default",
  large: "Large",
  "x-large": "Extra large",
};
