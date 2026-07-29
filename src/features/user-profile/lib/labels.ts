import {
  EQUIPMENT_OPTIONS,
  FITNESS_GOALS,
  MOBILITY_LEVELS,
} from "@/lib/constants";

export const PROFILE_VISIBILITY_OPTIONS = [
  "public",
  "friends",
  "private",
] as const;

export type ProfileVisibility = (typeof PROFILE_VISIBILITY_OPTIONS)[number];

export const FITNESS_INTEREST_LABELS: Record<
  (typeof FITNESS_GOALS)[number],
  string
> = {
  strength: "Strength building",
  weight_management: "Weight management",
  mobility: "Mobility",
  endurance: "Endurance",
};

export const MOBILITY_LEVEL_LABELS: Record<
  (typeof MOBILITY_LEVELS)[number],
  string
> = {
  full: "Full mobility",
  limited_lower: "Limited lower body",
  limited_upper: "Limited upper body",
  seated: "Seated / wheelchair-based",
  assisted: "Assisted movement",
};

export const EQUIPMENT_LABELS: Record<
  (typeof EQUIPMENT_OPTIONS)[number],
  string
> = {
  none: "No equipment / bodyweight",
  resistance_bands: "Resistance bands",
  dumbbells: "Dumbbells",
  cable_machine: "Cable machine",
  adaptive_machines: "Adaptive machines",
  wheelchair_accessible: "Wheelchair-accessible equipment",
};

export const PRIVACY_VISIBILITY_LABELS: Record<ProfileVisibility, string> = {
  public: "Everyone",
  friends: "Friends only",
  private: "Only me",
};

export type PrivacySettings = {
  profile_visibility: ProfileVisibility;
  activity_visibility: ProfileVisibility;
};

export const DEFAULT_PRIVACY_SETTINGS: PrivacySettings = {
  profile_visibility: "friends",
  activity_visibility: "friends",
};
