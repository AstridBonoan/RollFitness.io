import { render, screen } from "@testing-library/react";

import { ProfileSummary } from "@/features/user-profile/components/profile-summary";
import type { Profile } from "@/features/user-profile/services/profile";

const profile: Profile = {
  id: "1",
  user_id: "user-1",
  display_name: "Alex",
  bio: "Building strength from a seated position.",
  avatar_url: null,
  fitness_interests: ["strength"],
  equipment_preferences: ["resistance_bands"],
  mobility_level: "seated",
  workout_experience: "beginner",
  onboarding_completed_at: null,
  privacy_settings: {
    profile_visibility: "friends",
    activity_visibility: "private",
  },
  accessibility_settings: {
    theme: "system",
    high_contrast: false,
    font_scale: "default",
    reduce_motion: false,
  },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

describe("ProfileSummary", () => {
  it("renders key profile fields with human-readable labels", () => {
    render(<ProfileSummary profile={profile} />);

    expect(screen.getByText("Alex")).toBeInTheDocument();
    expect(
      screen.getByText("Building strength from a seated position."),
    ).toBeInTheDocument();
    expect(screen.getByText("Seated / wheelchair-based")).toBeInTheDocument();
    expect(screen.getByText("Strength building")).toBeInTheDocument();
    expect(screen.getByText("Resistance bands")).toBeInTheDocument();
    expect(screen.getByText("Friends only")).toBeInTheDocument();
    expect(screen.getByText("Only me")).toBeInTheDocument();
  });
});
