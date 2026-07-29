"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  updateProfileAction,
  type ProfileActionState,
} from "@/features/user-profile/actions/profile";
import { AvatarUploadField } from "@/features/user-profile/components/avatar-upload-field";
import {
  EQUIPMENT_LABELS,
  FITNESS_INTEREST_LABELS,
  MOBILITY_LEVEL_LABELS,
  PRIVACY_VISIBILITY_LABELS,
  PROFILE_VISIBILITY_OPTIONS,
} from "@/features/user-profile/lib/labels";
import type { Profile } from "@/features/user-profile/services/profile";
import {
  EQUIPMENT_OPTIONS,
  FITNESS_GOALS,
  MOBILITY_LEVELS,
} from "@/lib/constants";

const initialState: ProfileActionState = {};

type ProfileFormProps = {
  profile: Profile;
};

export function ProfileForm({ profile }: ProfileFormProps) {
  const [state, formAction, pending] = useActionState(
    updateProfileAction,
    initialState,
  );

  const selectedInterests = new Set(profile.fitness_interests ?? []);
  const selectedEquipment = new Set(profile.equipment_preferences ?? []);

  return (
    <form action={formAction} className="space-y-10" noValidate>
      <section aria-labelledby="basics-heading" className="space-y-5">
        <div>
          <h2
            id="basics-heading"
            className="font-display text-xl font-semibold tracking-tight"
          >
            Basics
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            How you appear across RollnFitness. Diagnosis is never required.
          </p>
        </div>

        <AvatarUploadField
          displayName={profile.display_name}
          avatarUrl={profile.avatar_url}
        />

        <div>
          <Label htmlFor="displayName">Display name</Label>
          <Input
            id="displayName"
            name="displayName"
            type="text"
            autoComplete="nickname"
            required
            defaultValue={profile.display_name ?? ""}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            defaultValue={profile.bio ?? ""}
            className="mt-2"
            maxLength={280}
            aria-describedby="bio-hint"
          />
          <p id="bio-hint" className="mt-1.5 text-sm text-muted-foreground">
            Optional. Up to 280 characters.
          </p>
        </div>

        <div>
          <Label htmlFor="mobilityLevel">Mobility level</Label>
          <select
            id="mobilityLevel"
            name="mobilityLevel"
            defaultValue={profile.mobility_level ?? ""}
            className="mt-2 flex h-11 w-full rounded-md border border-input bg-background px-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
            aria-describedby="mobility-hint"
          >
            <option value="">Prefer not to say yet</option>
            {MOBILITY_LEVELS.map((level) => (
              <option key={level} value={level}>
                {MOBILITY_LEVEL_LABELS[level]}
              </option>
            ))}
          </select>
          <p id="mobility-hint" className="mt-1.5 text-sm text-muted-foreground">
            Focused on functional ability so workouts can adapt to you.
          </p>
        </div>
      </section>

      <section aria-labelledby="interests-heading" className="space-y-4">
        <div>
          <h2
            id="interests-heading"
            className="font-display text-xl font-semibold tracking-tight"
          >
            Fitness interests
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Select any that apply. You can change these anytime.
          </p>
        </div>
        <fieldset>
          <legend className="sr-only">Fitness interests</legend>
          <ul className="space-y-3">
            {FITNESS_GOALS.map((goal) => (
              <li key={goal} className="flex items-start gap-3">
                <input
                  id={`interest-${goal}`}
                  name="fitnessInterests"
                  type="checkbox"
                  value={goal}
                  defaultChecked={selectedInterests.has(goal)}
                  className="mt-1 size-4 accent-[var(--primary)]"
                />
                <Label htmlFor={`interest-${goal}`} className="font-normal">
                  {FITNESS_INTEREST_LABELS[goal]}
                </Label>
              </li>
            ))}
          </ul>
        </fieldset>
      </section>

      <section aria-labelledby="equipment-heading" className="space-y-4">
        <div>
          <h2
            id="equipment-heading"
            className="font-display text-xl font-semibold tracking-tight"
          >
            Equipment preferences
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            What you typically have access to at home or in the gym.
          </p>
        </div>
        <fieldset>
          <legend className="sr-only">Equipment preferences</legend>
          <ul className="space-y-3">
            {EQUIPMENT_OPTIONS.map((option) => (
              <li key={option} className="flex items-start gap-3">
                <input
                  id={`equipment-${option}`}
                  name="equipmentPreferences"
                  type="checkbox"
                  value={option}
                  defaultChecked={selectedEquipment.has(option)}
                  className="mt-1 size-4 accent-[var(--primary)]"
                />
                <Label htmlFor={`equipment-${option}`} className="font-normal">
                  {EQUIPMENT_LABELS[option]}
                </Label>
              </li>
            ))}
          </ul>
        </fieldset>
      </section>

      <section aria-labelledby="privacy-heading" className="space-y-5">
        <div>
          <h2
            id="privacy-heading"
            className="font-display text-xl font-semibold tracking-tight"
          >
            Privacy
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Control who can see your profile and activity.
          </p>
        </div>

        <div>
          <Label htmlFor="profileVisibility">Profile visibility</Label>
          <select
            id="profileVisibility"
            name="profileVisibility"
            defaultValue={profile.privacy_settings.profile_visibility}
            className="mt-2 flex h-11 w-full rounded-md border border-input bg-background px-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
          >
            {PROFILE_VISIBILITY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {PRIVACY_VISIBILITY_LABELS[option]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="activityVisibility">Activity visibility</Label>
          <select
            id="activityVisibility"
            name="activityVisibility"
            defaultValue={profile.privacy_settings.activity_visibility}
            className="mt-2 flex h-11 w-full rounded-md border border-input bg-background px-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
          >
            {PROFILE_VISIBILITY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {PRIVACY_VISIBILITY_LABELS[option]}
              </option>
            ))}
          </select>
        </div>
      </section>

      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : "Save profile"}
      </Button>

      {state.error ? (
        <div
          role="alert"
          className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {state.error}
        </div>
      ) : null}
    </form>
  );
}
