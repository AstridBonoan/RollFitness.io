"use client";

import Link from "next/link";
import { useActionState, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  completeOnboardingAction,
  type OnboardingActionState,
} from "@/features/onboarding/actions/onboarding";
import {
  ONBOARDING_STEPS,
  type OnboardingStep,
  WORKOUT_EXPERIENCE_LABELS,
} from "@/features/onboarding/lib/labels";
import {
  EQUIPMENT_LABELS,
  FITNESS_INTEREST_LABELS,
  MOBILITY_LEVEL_LABELS,
} from "@/features/user-profile/lib/labels";
import type { Profile } from "@/features/user-profile/services/profile";
import {
  EQUIPMENT_OPTIONS,
  FITNESS_GOALS,
  MOBILITY_LEVELS,
  WORKOUT_EXPERIENCE_LEVELS,
} from "@/lib/constants";

const initialState: OnboardingActionState = {};

type OnboardingWizardProps = {
  profile: Profile;
};

type WizardState = {
  displayName: string;
  fitnessInterests: string[];
  mobilityLevel: string;
  equipmentPreferences: string[];
  workoutExperience: string;
};

export function OnboardingWizard({ profile }: OnboardingWizardProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [state, formAction, pending] = useActionState(
    completeOnboardingAction,
    initialState,
  );
  const [draft, setDraft] = useState<WizardState>({
    displayName: profile.display_name ?? "",
    fitnessInterests: profile.fitness_interests ?? [],
    mobilityLevel: profile.mobility_level ?? "",
    equipmentPreferences: profile.equipment_preferences ?? [],
    workoutExperience: profile.workout_experience ?? "",
  });

  const step = ONBOARDING_STEPS[stepIndex] as OnboardingStep;
  const progressLabel = useMemo(
    () => `Step ${stepIndex + 1} of ${ONBOARDING_STEPS.length}`,
    [stepIndex],
  );

  function toggleValue(field: "fitnessInterests" | "equipmentPreferences", value: string) {
    setDraft((current) => {
      const set = new Set(current[field]);
      if (set.has(value)) {
        set.delete(value);
      } else {
        set.add(value);
      }
      return { ...current, [field]: Array.from(set) };
    });
  }

  function canContinue() {
    switch (step) {
      case "welcome":
        return draft.displayName.trim().length >= 2;
      case "goals":
        return draft.fitnessInterests.length > 0;
      case "mobility":
        return Boolean(draft.mobilityLevel);
      case "equipment":
        return true;
      case "experience":
        return Boolean(draft.workoutExperience);
      case "review":
        return true;
      default:
        return false;
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-primary">{progressLabel}</p>
        <div
          className="mt-3 h-2 overflow-hidden rounded-full bg-secondary"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={ONBOARDING_STEPS.length}
          aria-valuenow={stepIndex + 1}
          aria-label="Onboarding progress"
        >
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-300"
            style={{
              width: `${((stepIndex + 1) / ONBOARDING_STEPS.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {step === "welcome" ? (
        <section aria-labelledby="welcome-heading" className="space-y-5">
          <div>
            <h2
              id="welcome-heading"
              className="font-display text-2xl font-semibold tracking-tight"
            >
              Let’s personalize your experience
            </h2>
            <p className="mt-2 text-muted-foreground">
              We’ll ask about goals, functional ability, and equipment—never a
              diagnosis.
            </p>
          </div>
          <div>
            <Label htmlFor="displayName">What should we call you?</Label>
            <Input
              id="displayName"
              value={draft.displayName}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  displayName: event.target.value,
                }))
              }
              className="mt-2"
              autoComplete="nickname"
            />
          </div>
        </section>
      ) : null}

      {step === "goals" ? (
        <section aria-labelledby="goals-heading" className="space-y-5">
          <div>
            <h2
              id="goals-heading"
              className="font-display text-2xl font-semibold tracking-tight"
            >
              What are you working toward?
            </h2>
            <p className="mt-2 text-muted-foreground">
              Select every goal that matters to you right now.
            </p>
          </div>
          <fieldset>
            <legend className="sr-only">Fitness goals</legend>
            <ul className="space-y-3">
              {FITNESS_GOALS.map((goal) => (
                <li key={goal} className="flex items-start gap-3">
                  <input
                    id={`goal-${goal}`}
                    type="checkbox"
                    checked={draft.fitnessInterests.includes(goal)}
                    onChange={() => toggleValue("fitnessInterests", goal)}
                    className="mt-1 size-4 accent-[var(--primary)]"
                  />
                  <Label htmlFor={`goal-${goal}`} className="font-normal">
                    {FITNESS_INTEREST_LABELS[goal]}
                  </Label>
                </li>
              ))}
            </ul>
          </fieldset>
        </section>
      ) : null}

      {step === "mobility" ? (
        <section aria-labelledby="mobility-heading" className="space-y-5">
          <div>
            <h2
              id="mobility-heading"
              className="font-display text-2xl font-semibold tracking-tight"
            >
              How do you move best?
            </h2>
            <p className="mt-2 text-muted-foreground">
              Choose the option that best matches your functional ability today.
            </p>
          </div>
          <fieldset className="space-y-3">
            <legend className="sr-only">Mobility level</legend>
            {MOBILITY_LEVELS.map((level) => (
              <label
                key={level}
                className="flex cursor-pointer items-start gap-3 rounded-md border border-border px-3 py-3 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
              >
                <input
                  type="radio"
                  name="mobilityLevelUi"
                  value={level}
                  checked={draft.mobilityLevel === level}
                  onChange={() =>
                    setDraft((current) => ({
                      ...current,
                      mobilityLevel: level,
                    }))
                  }
                  className="mt-1 size-4 accent-[var(--primary)]"
                />
                <span className="text-sm">{MOBILITY_LEVEL_LABELS[level]}</span>
              </label>
            ))}
          </fieldset>
        </section>
      ) : null}

      {step === "equipment" ? (
        <section aria-labelledby="equipment-heading" className="space-y-5">
          <div>
            <h2
              id="equipment-heading"
              className="font-display text-2xl font-semibold tracking-tight"
            >
              What equipment can you use?
            </h2>
            <p className="mt-2 text-muted-foreground">
              Pick anything you typically have access to. Bodyweight-only is
              fine.
            </p>
          </div>
          <fieldset>
            <legend className="sr-only">Equipment</legend>
            <ul className="space-y-3">
              {EQUIPMENT_OPTIONS.map((option) => (
                <li key={option} className="flex items-start gap-3">
                  <input
                    id={`equipment-${option}`}
                    type="checkbox"
                    checked={draft.equipmentPreferences.includes(option)}
                    onChange={() =>
                      toggleValue("equipmentPreferences", option)
                    }
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
      ) : null}

      {step === "experience" ? (
        <section aria-labelledby="experience-heading" className="space-y-5">
          <div>
            <h2
              id="experience-heading"
              className="font-display text-2xl font-semibold tracking-tight"
            >
              What’s your workout experience?
            </h2>
            <p className="mt-2 text-muted-foreground">
              This helps us pace recommendations—not judge your fitness.
            </p>
          </div>
          <fieldset className="space-y-3">
            <legend className="sr-only">Workout experience</legend>
            {WORKOUT_EXPERIENCE_LEVELS.map((level) => (
              <label
                key={level}
                className="flex cursor-pointer items-start gap-3 rounded-md border border-border px-3 py-3 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
              >
                <input
                  type="radio"
                  name="workoutExperienceUi"
                  value={level}
                  checked={draft.workoutExperience === level}
                  onChange={() =>
                    setDraft((current) => ({
                      ...current,
                      workoutExperience: level,
                    }))
                  }
                  className="mt-1 size-4 accent-[var(--primary)]"
                />
                <span className="text-sm">
                  {WORKOUT_EXPERIENCE_LABELS[level]}
                </span>
              </label>
            ))}
          </fieldset>
        </section>
      ) : null}

      {step === "review" ? (
        <section aria-labelledby="review-heading" className="space-y-5">
          <div>
            <h2
              id="review-heading"
              className="font-display text-2xl font-semibold tracking-tight"
            >
              Looking good, {draft.displayName.trim() || "friend"}
            </h2>
            <p className="mt-2 text-muted-foreground">
              Confirm your setup. You can edit these anytime in Profile.
            </p>
          </div>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="font-medium">Goals</dt>
              <dd className="mt-1 text-muted-foreground">
                {draft.fitnessInterests
                  .map(
                    (goal) =>
                      FITNESS_INTEREST_LABELS[
                        goal as (typeof FITNESS_GOALS)[number]
                      ],
                  )
                  .join(", ")}
              </dd>
            </div>
            <div>
              <dt className="font-medium">Mobility</dt>
              <dd className="mt-1 text-muted-foreground">
                {
                  MOBILITY_LEVEL_LABELS[
                    draft.mobilityLevel as (typeof MOBILITY_LEVELS)[number]
                  ]
                }
              </dd>
            </div>
            <div>
              <dt className="font-medium">Equipment</dt>
              <dd className="mt-1 text-muted-foreground">
                {draft.equipmentPreferences.length > 0
                  ? draft.equipmentPreferences
                      .map(
                        (item) =>
                          EQUIPMENT_LABELS[
                            item as (typeof EQUIPMENT_OPTIONS)[number]
                          ],
                      )
                      .join(", ")
                  : "None selected"}
              </dd>
            </div>
            <div>
              <dt className="font-medium">Experience</dt>
              <dd className="mt-1 text-muted-foreground">
                {
                  WORKOUT_EXPERIENCE_LABELS[
                    draft.workoutExperience as (typeof WORKOUT_EXPERIENCE_LEVELS)[number]
                  ]
                }
              </dd>
            </div>
          </dl>

          <form action={formAction} className="space-y-4">
            <input type="hidden" name="displayName" value={draft.displayName} />
            <input
              type="hidden"
              name="mobilityLevel"
              value={draft.mobilityLevel}
            />
            <input
              type="hidden"
              name="workoutExperience"
              value={draft.workoutExperience}
            />
            {draft.fitnessInterests.map((goal) => (
              <input
                key={goal}
                type="hidden"
                name="fitnessInterests"
                value={goal}
              />
            ))}
            {draft.equipmentPreferences.map((item) => (
              <input
                key={item}
                type="hidden"
                name="equipmentPreferences"
                value={item}
              />
            ))}

            {state.error ? (
              <div
                role="alert"
                className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
              >
                {state.error}
              </div>
            ) : null}

            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Saving your setup…" : "Finish setup"}
            </Button>
          </form>
        </section>
      ) : null}

      {step !== "review" ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button
            type="button"
            variant="ghost"
            disabled={stepIndex === 0}
            onClick={() => setStepIndex((current) => Math.max(0, current - 1))}
          >
            Back
          </Button>
          <div className="flex items-center gap-3">
            <Button asChild variant="outline">
              <Link href="/account">Finish later</Link>
            </Button>
            <Button
              type="button"
              disabled={!canContinue()}
              onClick={() =>
                setStepIndex((current) =>
                  Math.min(ONBOARDING_STEPS.length - 1, current + 1),
                )
              }
            >
              Continue
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setStepIndex((current) => Math.max(0, current - 1))}
          >
            Back
          </Button>
          <Button asChild variant="outline">
            <Link href="/account">Finish later</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
