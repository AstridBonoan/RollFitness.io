# Feature: user-profile

**Branch:** `feature/user-profile`

## Scope

Profile creation/editing for signed-in members:

- Display name and bio
- Profile picture upload / remove (Supabase Storage `avatars` bucket)
- Mobility level (functional ability — diagnosis never required)
- Fitness interests
- Equipment preferences
- Privacy settings (profile + activity visibility)

## Routes

| Path | Purpose |
| --- | --- |
| `/profile` | Edit profile form (protected) |
| `/account` | Account hub with profile overview + link to edit |

## Structure

- `actions/` — `updateProfileAction`
- `components/` — `ProfileForm`, `ProfileSummary`, `ProfileAvatar`, `AvatarUploadField`
- `lib/` — labels, privacy defaults, avatar validation
- `schemas/` — Zod validation
- `services/` — Supabase profile get/update + avatar upload/remove
- `tests/` — schema + component + avatar helper tests

## API surface

- `getCurrentProfile()` — load the authenticated user’s profile
- `updateCurrentProfile(payload)` — update profile + sync auth `display_name`
- `updateProfileAction` — form server action

## Acceptance criteria

- [x] Implemented behind `feature/user-profile`
- [x] Unit/component tests included
- [x] Accessibility checks for protected redirect path
- [x] Zod schemas for forms
- [x] Feature README updated
- [ ] PR opened; CI green before merge

## Dependencies

Requires `profiles` table + RLS from `00001_initial_schema.sql`, the `avatars` storage bucket from `00002_avatars_storage.sql`, and authenticated sessions from `feature/authentication`.
