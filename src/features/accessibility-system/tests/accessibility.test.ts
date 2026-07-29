import {
  DEFAULT_ACCESSIBILITY_SETTINGS,
} from "@/features/accessibility-system/lib/constants";
import {
  accessibilityClassNames,
  parseAccessibilitySettings,
  resolveThemeClass,
  settingsFromCookieValue,
} from "@/features/accessibility-system/lib/settings";
import { accessibilitySettingsSchema } from "@/features/accessibility-system/schemas/accessibility";

describe("parseAccessibilitySettings", () => {
  it("returns defaults for invalid input", () => {
    expect(parseAccessibilitySettings(null)).toEqual(
      DEFAULT_ACCESSIBILITY_SETTINGS,
    );
  });

  it("parses a valid settings object", () => {
    expect(
      parseAccessibilitySettings({
        theme: "dark",
        high_contrast: true,
        font_scale: "large",
        reduce_motion: true,
      }),
    ).toEqual({
      theme: "dark",
      high_contrast: true,
      font_scale: "large",
      reduce_motion: true,
    });
  });
});

describe("settingsFromCookieValue", () => {
  it("decodes URI-encoded cookie payloads", () => {
    const raw = encodeURIComponent(
      JSON.stringify({
        theme: "light",
        high_contrast: false,
        font_scale: "x-large",
        reduce_motion: false,
      }),
    );

    expect(settingsFromCookieValue(raw)).toMatchObject({
      theme: "light",
      font_scale: "x-large",
    });
  });
});

describe("resolveThemeClass", () => {
  it("follows system preference when theme is system", () => {
    expect(resolveThemeClass("system", true)).toBe("dark");
    expect(resolveThemeClass("system", false)).toBe("light");
  });
});

describe("accessibilityClassNames", () => {
  it("composes dark, contrast, scale, and motion classes", () => {
    expect(
      accessibilityClassNames({
        theme: "dark",
        high_contrast: true,
        font_scale: "large",
        reduce_motion: true,
      }),
    ).toBe("dark high-contrast font-scale-large reduce-motion");
  });
});

describe("accessibilitySettingsSchema", () => {
  it("accepts valid form payloads", () => {
    const result = accessibilitySettingsSchema.safeParse({
      theme: "system",
      highContrast: true,
      fontScale: "default",
      reduceMotion: false,
    });
    expect(result.success).toBe(true);
  });
});
