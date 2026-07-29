# Feature: accessibility-system

**Branch:** `feature/accessibility-system`

## Scope

WCAG 2.2 AA platform controls:

- Color theme / dark mode (light / dark / match device)
- High contrast
- Font scaling (default / large / extra large)
- Reduce motion (user preference on top of `prefers-reduced-motion`)

## Routes

| Path | Purpose |
| --- | --- |
| `/accessibility` | Signed-in preference controls (protected) |

## Behavior

- Preferences apply via `html` classes: `dark`, `high-contrast`, `font-scale-*`, `reduce-motion`
- Cookie `rf-a11y` prevents theme flash (bootstrap script in root layout)
- Signed-in users also persist to `profiles.accessibility_settings`
- Guests / signed-out sessions still get cookie-based preferences when set
- Form previews changes immediately before save

## Structure

- `actions/` — `saveAccessibilitySettingsAction`
- `components/` — `AccessibilitySettingsForm`
- `lib/` — constants, parse/serialize, bootstrap script, apply-classes
- `schemas/` — Zod validation
- `services/` — cookie + profile persistence
- `tests/` — parser / schema unit tests

## Database

Requires `supabase/migrations/00004_accessibility_settings.sql`.

## Acceptance criteria

- [x] Implemented behind `feature/accessibility-system`
- [x] Unit tests included
- [x] Accessibility verified (redirect path + axe)
- [x] Zod schemas for settings form
- [x] Feature README updated
- [ ] PR opened; CI green before merge

## Dependencies

`feature/authentication`. Complements future `feature/brand-system` tokens (defaults these prefs adjust).
