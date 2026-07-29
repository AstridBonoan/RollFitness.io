# Feature: accessibility-system

**Branch:** `feature/accessibility-system`

## Scope

WCAG 2.2 AA platform controls: dark mode, high contrast, font scaling, reduced motion, keyboard and screen reader support.

## Structure

- `components/` — feature UI
- `hooks/` — feature hooks
- `services/` — Supabase / domain services
- `tests/` — unit and component tests

## Acceptance criteria

- [ ] Implemented behind `feature/accessibility-system` (not directly on `main`)
- [ ] Unit/component tests included
- [ ] Accessibility verified (keyboard + axe)
- [ ] Types and Zod schemas documented where forms exist
- [ ] Feature README updated with API surface and dependencies
- [ ] PR opened; CI green before merge

## Dependencies

See `docs/FEATURE_BRANCHES.md` for recommended delivery order.
