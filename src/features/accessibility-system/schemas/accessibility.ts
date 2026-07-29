import { z } from "zod";

import { FONT_SCALE_OPTIONS } from "@/features/accessibility-system/lib/constants";

export const accessibilitySettingsSchema = z.object({
  highContrast: z.boolean(),
  fontScale: z.enum(FONT_SCALE_OPTIONS),
  reduceMotion: z.boolean(),
});

export type AccessibilitySettingsInput = z.infer<
  typeof accessibilitySettingsSchema
>;
