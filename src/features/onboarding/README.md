# Feature: onboarding

**Branch:** `feature/onboarding`

## Scope

Guided first-run setup focused on functional ability (never diagnosis):

1. Display name
2. Fitness goals
3. Mobility level
4. Equipment available
5. Workout experience
6. Review + finish

## Routes

| Path | Purpose |
| --- | --- |
| `/onboarding` | Multi-step wizard (protected) |

## Behavior

- New signups land on `/onboarding`
- Sign-in routes incomplete profiles to `/onboarding`
- Completed profiles go to `/account`
- Account shows a “Complete setup” nudge when onboarding is unfinished
- “Finish later” remains available during the wizard

## Structure

- `actions/` — `completeOnboardingAction`
- `components/` — `OnboardingWizard`
- `lib/` — step labels + completion helpers
- `schemas/` — Zod validation
- `services/` — persist onboarding to `profiles`
- `tests/` — schema + status helpers

## Database

Requires `supabase/migrations/00003_onboarding_fields.sql`:

- `profiles.workout_experience`
- `profiles.onboarding_completed_at`

## Acceptance criteria

- [x] Implemented behind `feature/onboarding`
- [x] Unit tests included
- [x] Accessibility checks for protected redirect path
- [x] Zod schemas for final submission
- [x] Feature README updated
- [ ] PR opened; CI green before merge

## Dependencies

`feature/authentication`, `feature/user-profile`, and migration `00003_onboarding_fields.sql`.
