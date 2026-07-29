import { cookies } from "next/headers";

import {
  ACCESSIBILITY_COOKIE,
  DEFAULT_ACCESSIBILITY_SETTINGS,
  type AccessibilitySettings,
} from "@/features/accessibility-system/lib/constants";
import {
  parseAccessibilitySettings,
  serializeAccessibilitySettings,
  settingsFromCookieValue,
} from "@/features/accessibility-system/lib/settings";
import { createClient } from "@/lib/supabase/server";

export async function getAccessibilitySettingsFromCookie(): Promise<AccessibilitySettings> {
  const jar = await cookies();
  return settingsFromCookieValue(jar.get(ACCESSIBILITY_COOKIE)?.value);
}

export async function setAccessibilitySettingsCookie(
  settings: AccessibilitySettings,
) {
  const jar = await cookies();
  jar.set(ACCESSIBILITY_COOKIE, encodeURIComponent(serializeAccessibilitySettings(settings)), {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}

/**
 * Prefer persisted profile settings when signed in; otherwise cookie / defaults.
 */
export async function resolveAccessibilitySettings(): Promise<AccessibilitySettings> {
  const fromCookie = await getAccessibilitySettingsFromCookie();

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return fromCookie;
    }

    const { data } = await supabase
      .from("profiles")
      .select("accessibility_settings")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!data?.accessibility_settings) {
      return fromCookie;
    }

    return parseAccessibilitySettings(data.accessibility_settings);
  } catch {
    return fromCookie;
  }
}

export async function updateAccessibilitySettings(
  settings: AccessibilitySettings,
): Promise<{ error?: string }> {
  await setAccessibilitySettingsCookie(settings);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {};
  }

  const { error } = await supabase
    .from("profiles")
    .update({ accessibility_settings: settings })
    .eq("user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  return {};
}

export { DEFAULT_ACCESSIBILITY_SETTINGS };
