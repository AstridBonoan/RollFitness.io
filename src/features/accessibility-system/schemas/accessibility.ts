import { z } from "zod";

import {
  FONT_SCALE_OPTIONS,
  THEME_OPTIONS,
} from "@/features/accessibility-system/lib/constants";

export const accessibilitySettingsSchema = z.object({
  theme: z.enum(THEME_OPTIONS),
  highContrast: z.boolean(),
  fontScale: z.enum(FONT_SCALE_OPTIONS),
  reduceMotion: z.boolean(),
});

export type AccessibilitySettingsInput = z.infer<
  typeof accessibilitySettingsSchema
>;
