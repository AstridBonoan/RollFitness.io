import { ProfileAvatar } from "@/features/user-profile/components/profile-avatar";
import {
  EQUIPMENT_LABELS,
  FITNESS_INTEREST_LABELS,
  MOBILITY_LEVEL_LABELS,
  PRIVACY_VISIBILITY_LABELS,
} from "@/features/user-profile/lib/labels";
import type { Profile } from "@/features/user-profile/services/profile";
import {
  EQUIPMENT_OPTIONS,
  FITNESS_GOALS,
  MOBILITY_LEVELS,
} from "@/lib/constants";

type ProfileSummaryProps = {
  profile: Profile;
};

function labelForInterest(value: string) {
  if ((FITNESS_GOALS as readonly string[]).includes(value)) {
    return FITNESS_INTEREST_LABELS[
      value as (typeof FITNESS_GOALS)[number]
    ];
  }
  return value;
}

function labelForEquipment(value: string) {
  if ((EQUIPMENT_OPTIONS as readonly string[]).includes(value)) {
    return EQUIPMENT_LABELS[value as (typeof EQUIPMENT_OPTIONS)[number]];
  }
  return value;
}

export function ProfileSummary({ profile }: ProfileSummaryProps) {
  const mobility =
    profile.mobility_level &&
    (MOBILITY_LEVELS as readonly string[]).includes(profile.mobility_level)
      ? MOBILITY_LEVEL_LABELS[profile.mobility_level]
      : "Not set yet";

  const interests = (profile.fitness_interests ?? []).map(labelForInterest);
  const equipment = (profile.equipment_preferences ?? []).map(
    labelForEquipment,
  );

  return (
    <div className="space-y-6">
      <ProfileAvatar
        name={profile.display_name}
        avatarUrl={profile.avatar_url}
        size="lg"
      />

      <dl className="space-y-5 text-sm">
        <div>
          <dt className="font-medium text-foreground">Display name</dt>
          <dd className="mt-1 text-muted-foreground">
            {profile.display_name || "Not set yet"}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">Bio</dt>
          <dd className="mt-1 text-muted-foreground">
            {profile.bio || "No bio yet"}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">Mobility level</dt>
          <dd className="mt-1 text-muted-foreground">{mobility}</dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">Fitness interests</dt>
          <dd className="mt-1 text-muted-foreground">
            {interests.length > 0 ? interests.join(", ") : "None selected"}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">Equipment</dt>
          <dd className="mt-1 text-muted-foreground">
            {equipment.length > 0 ? equipment.join(", ") : "None selected"}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">Profile visibility</dt>
          <dd className="mt-1 text-muted-foreground">
            {
              PRIVACY_VISIBILITY_LABELS[
                profile.privacy_settings.profile_visibility
              ]
            }
          </dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">Activity visibility</dt>
          <dd className="mt-1 text-muted-foreground">
            {
              PRIVACY_VISIBILITY_LABELS[
                profile.privacy_settings.activity_visibility
              ]
            }
          </dd>
        </div>
      </dl>
    </div>
  );
}
