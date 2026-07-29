# Feature: authentication

**Branch:** `feature/authentication`

## Scope

Supabase Auth for RollnFitness:

- Email/password signup and login
- Logout
- Password reset request + update
- Email verification handoff
- Session refresh via middleware (`getClaims`)
- Protected routes (`/account`, `/update-password`)
- Auth callback for PKCE email links

## Routes

| Path | Purpose |
| --- | --- |
| `/signup` | Create account |
| `/login` | Sign in |
| `/forgot-password` | Request reset email |
| `/update-password` | Set new password (authenticated via reset link) |
| `/verify-email` | Post-signup verification instructions |
| `/auth/callback` | Exchange email `code` for session |
| `/account` | Protected account landing (pre-dashboard) |

## Structure

- `actions/` — server actions for auth mutations
- `components/` — accessible forms + shell
- `schemas/` — Zod validation
- `services/` — session helpers (`getClaims` / `getUser`)
- `tests/` — schema + component tests

## Env

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Public client key |
| `NEXT_PUBLIC_SITE_URL` | Absolute origin for email redirects (recommended in Vercel) |

Email redirect targets:

- Signup verify → `{SITE_URL}/auth/callback?next=/account`
- Password reset → `{SITE_URL}/auth/callback?next=/update-password`

## Acceptance criteria

- [x] Implemented behind `feature/authentication`
- [x] Unit/component tests included
- [x] Accessibility checks for auth pages
- [x] Zod schemas for forms
- [x] Feature README updated
- [ ] PR opened; CI green before merge

## Dependencies

Supabase Auth + `@supabase/ssr`. Profile row creation remains handled by the DB trigger in `00001_initial_schema.sql`.
