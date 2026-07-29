import {
  DEFAULT_ACCESSIBILITY_SETTINGS,
} from "@/features/accessibility-system/lib/constants";
import {
  accessibilityClassNames,
  parseAccessibilitySettings,
  settingsFromCookieValue,
} from "@/features/accessibility-system/lib/settings";
import { accessibilitySettingsSchema } from "@/features/accessibility-system/schemas/accessibility";

describe("parseAccessibilitySettings", () => {
  it("returns defaults for invalid input", () => {
    expect(parseAccessibilitySettings(null)).toEqual(
      DEFAULT_ACCESSIBILITY_SETTINGS,
    );
  });

  it("parses a valid settings object and ignores legacy theme", () => {
    expect(
      parseAccessibilitySettings({
        theme: "dark",
        high_contrast: true,
        font_scale: "large",
        reduce_motion: true,
      }),
    ).toEqual({
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
        high_contrast: false,
        font_scale: "x-large",
        reduce_motion: false,
      }),
    );

    expect(settingsFromCookieValue(raw)).toMatchObject({
      font_scale: "x-large",
    });
  });
});

describe("accessibilityClassNames", () => {
  it("composes contrast, scale, and motion classes", () => {
    expect(
      accessibilityClassNames({
        high_contrast: true,
        font_scale: "large",
        reduce_motion: true,
      }),
    ).toBe("high-contrast font-scale-large reduce-motion");
  });
});

describe("accessibilitySettingsSchema", () => {
  it("accepts valid form payloads", () => {
    const result = accessibilitySettingsSchema.safeParse({
      highContrast: true,
      fontScale: "default",
      reduceMotion: false,
    });
    expect(result.success).toBe(true);
  });
});
