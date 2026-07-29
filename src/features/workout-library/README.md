# Feature: workout-library

**Branch:** `feature/workout-library`

## Scope

Adaptive exercise catalog with:

- Organized focus areas (seated upper/core/cardio, limited mobility, assisted, full mobility, bands & weights)
- Difficulty, equipment, muscles, mobility category, safety notes, variations
- **Empty photo and video slots** — you upload media later; each exercise has clear labels + a stable `slug`
- Filters on `/exercises`

## Routes

| Path | Purpose |
| --- | --- |
| `/exercises` | Browse + filter catalog (protected) |
| `/exercises/[slug]` | Detail + media checklist (protected) |

## Media workflow

1. Run `supabase/migrations/00005_workout_library_seed.sql` (adds `slug`, `image_url`, `focus_area`, seeds rows with null media).
2. Shoot assets using each card’s photo/video labels.
3. Name files after the slug, e.g. `seated-shoulder-press.jpg` / `.mp4`.
4. Later: upload to Storage and set `image_url` / `video_url` on the matching row.

The UI works from the in-app catalog even before the migration; DB enrichment only attaches URLs when present.

## Structure

- `data/catalog.ts` — source of truth for labeled exercises
- `components/` — cards, empty media slots, filters
- `lib/labels.ts` — human-readable labels
- `services/exercises.ts` — filter + optional DB media merge
- `tests/` — catalog integrity

## Acceptance criteria

- [x] Implemented behind `feature/workout-library`
- [x] Unit tests included
- [x] Accessibility verified (redirect path + axe)
- [x] Feature README updated
- [ ] PR opened; CI green before merge

## Dependencies

`feature/authentication`. Uses mobility/equipment constants from profile/onboarding.
