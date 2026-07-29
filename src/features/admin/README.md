# Feature: admin

**Branch:** `feature/admin-role`

## Scope

- `profiles.role`: `member` (default) | `admin`
- Signup / app cannot self-promote — promote only in Supabase SQL
- `/admin` area for improving exercises and media URLs

## Docs

See `docs/ADMIN.md` for the exact SQL to promote your account.

## Routes

| Path | Purpose |
| --- | --- |
| `/admin` | Admin home (admin only) |
| `/admin/exercises` | Catalog list |
| `/admin/exercises/[slug]` | Edit exercise + media URLs |

## Acceptance criteria

- [x] Role defaults to member; signup cannot choose admin
- [x] Role changes blocked from authenticated app sessions
- [x] Admin UI gated server-side
- [x] Docs for Supabase promotion
- [ ] PR opened; CI green before merge
