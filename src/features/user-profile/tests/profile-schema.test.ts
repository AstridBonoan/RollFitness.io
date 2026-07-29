import {
  parsePrivacySettings,
} from "@/features/user-profile/services/profile";
import { profileUpdateSchema } from "@/features/user-profile/schemas/profile";
import { DEFAULT_PRIVACY_SETTINGS } from "@/features/user-profile/lib/labels";

describe("profileUpdateSchema", () => {
  it("accepts a complete profile payload", () => {
    const result = profileUpdateSchema.safeParse({
      displayName: "Alex",
      bio: "Seated strength training",
      mobilityLevel: "seated",
      fitnessInterests: ["strength", "mobility"],
      equipmentPreferences: ["resistance_bands", "wheelchair_accessible"],
      profileVisibility: "friends",
      activityVisibility: "private",
    });

    expect(result.success).toBe(true);
  });

  it("rejects a short display name", () => {
    const result = profileUpdateSchema.safeParse({
      displayName: "A",
      bio: "",
      mobilityLevel: "",
      fitnessInterests: [],
      equipmentPreferences: [],
      profileVisibility: "friends",
      activityVisibility: "friends",
    });

    expect(result.success).toBe(false);
  });

  it("rejects invalid fitness interests", () => {
    const result = profileUpdateSchema.safeParse({
      displayName: "Alex",
      bio: "",
      mobilityLevel: "",
      fitnessInterests: ["yoga"],
      equipmentPreferences: [],
      profileVisibility: "public",
      activityVisibility: "public",
    });

    expect(result.success).toBe(false);
  });
});

describe("parsePrivacySettings", () => {
  it("returns defaults for invalid input", () => {
    expect(parsePrivacySettings(null)).toEqual(DEFAULT_PRIVACY_SETTINGS);
  });

  it("preserves valid visibility values", () => {
    expect(
      parsePrivacySettings({
        profile_visibility: "private",
        activity_visibility: "public",
      }),
    ).toEqual({
      profile_visibility: "private",
      activity_visibility: "public",
    });
  });
});
