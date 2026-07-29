import {
  getPostAuthRedirectPath,
  isOnboardingComplete,
} from "@/features/onboarding/lib/status";
import { onboardingSchema } from "@/features/onboarding/schemas/onboarding";
import type { Profile } from "@/features/user-profile/services/profile";

const baseProfile = {
  id: "1",
  user_id: "user-1",
  display_name: "Alex",
  bio: null,
  avatar_url: null,
  fitness_interests: ["strength"],
  equipment_preferences: [],
  mobility_level: "seated",
  workout_experience: "beginner",
  onboarding_completed_at: null,
  privacy_settings: {
    profile_visibility: "friends",
    activity_visibility: "friends",
  },
  accessibility_settings: {
    theme: "system",
    high_contrast: false,
    font_scale: "default",
    reduce_motion: false,
  },
  role: "member",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
} satisfies Profile;

describe("onboardingSchema", () => {
  it("accepts a complete onboarding payload", () => {
    const result = onboardingSchema.safeParse({
      displayName: "Alex",
      fitnessInterests: ["strength", "mobility"],
      mobilityLevel: "seated",
      equipmentPreferences: ["resistance_bands"],
      workoutExperience: "beginner",
    });
    expect(result.success).toBe(true);
  });

  it("requires at least one fitness goal", () => {
    const result = onboardingSchema.safeParse({
      displayName: "Alex",
      fitnessInterests: [],
      mobilityLevel: "seated",
      equipmentPreferences: [],
      workoutExperience: "beginner",
    });
    expect(result.success).toBe(false);
  });
});

describe("onboarding status helpers", () => {
  it("treats missing completion timestamp as incomplete", () => {
    expect(isOnboardingComplete(baseProfile)).toBe(false);
    expect(getPostAuthRedirectPath(baseProfile)).toBe("/onboarding");
  });

  it("routes completed members to account", () => {
    const complete = {
      ...baseProfile,
      onboarding_completed_at: new Date().toISOString(),
    };
    expect(isOnboardingComplete(complete)).toBe(true);
    expect(getPostAuthRedirectPath(complete)).toBe("/account");
  });
});
