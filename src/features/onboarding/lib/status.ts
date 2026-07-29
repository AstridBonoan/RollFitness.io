import type { Profile } from "@/features/user-profile/services/profile";

export function isOnboardingComplete(profile: Profile | null | undefined) {
  return Boolean(profile?.onboarding_completed_at);
}

export function getPostAuthRedirectPath(profile: Profile | null | undefined) {
  return isOnboardingComplete(profile) ? "/account" : "/onboarding";
}
