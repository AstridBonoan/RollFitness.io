# Feature: workout-plans

**Branch:** `feature/workout-plans`

## Scope

Adaptive workout plan templates with filters, profile-based recommendations, and admin media/content editing.

## Structure

- `data/catalog.ts` — typed plan templates (empty media labels; links exercise slugs)
- `services/plans.ts` — list/get, filters, scoring; merges Supabase overrides + media
- `components/` — plan cards and filters
- `lib/labels.ts` — display labels
- `tests/` — catalog and scoring unit tests

App routes:

- `/plans`, `/plans/[slug]` — member browse/detail
- `/admin/plans`, `/admin/plans/[slug]` — admin edit + upload

## Admin content model

- Catalog is the fallback seed.
- After `00008`, admins can change title, description, goal, difficulty, mobility, duration, and upload photo/video.
- Member UI prefers Supabase row values when present; media stays null until uploaded.
- Plan files live in Storage bucket `exercise-media` at `plans/{slug}/photo|video.*`.

## Acceptance criteria

- [x] Implemented behind `feature/workout-plans` (not directly on `main`)
- [x] Unit/component tests included
- [x] Accessibility verified (keyboard + axe e2e guard)
- [x] Types and Zod schemas for admin plan form
- [x] Feature README updated with API surface and dependencies

## Dependencies

- `feature/workout-library` (exercise slugs + media slots)
- `feature/admin-role` + `00006` / `00007` / `00008`
- Profile fields for recommendations (`mobility_level`, interests, equipment)

See `docs/FEATURE_BRANCHES.md` for delivery order.
