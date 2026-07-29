"use server";

import { revalidatePath } from "next/cache";

import { accessibilitySettingsSchema } from "@/features/accessibility-system/schemas/accessibility";
import { updateAccessibilitySettings } from "@/features/accessibility-system/services/accessibility";
import type { AccessibilitySettings } from "@/features/accessibility-system/lib/constants";

export type AccessibilityActionState = {
  error?: string;
  success?: boolean;
  settings?: AccessibilitySettings;
};

export async function saveAccessibilitySettingsAction(
  _prev: AccessibilityActionState,
  formData: FormData,
): Promise<AccessibilityActionState> {
  const parsed = accessibilitySettingsSchema.safeParse({
    theme: formData.get("theme"),
    highContrast: formData.get("highContrast") === "on",
    fontScale: formData.get("fontScale"),
    reduceMotion: formData.get("reduceMotion") === "on",
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid accessibility settings.",
    };
  }

  const settings: AccessibilitySettings = {
    theme: parsed.data.theme,
    high_contrast: parsed.data.highContrast,
    font_scale: parsed.data.fontScale,
    reduce_motion: parsed.data.reduceMotion,
  };

  const result = await updateAccessibilitySettings(settings);

  if (result.error) {
    return { error: result.error };
  }

  revalidatePath("/account");
  revalidatePath("/accessibility");

  return { success: true, settings };
}
