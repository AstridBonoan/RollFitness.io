# Admin access

Admin is **not** available at signup. Every new account is `member`.

## Promote an account (Supabase only)

1. Open the [Supabase SQL Editor](https://supabase.com/dashboard) for this project.
2. Run (replace the email):

```sql
update public.profiles
set role = 'admin'
where user_id = (
  select id from auth.users where email = 'your@email.com'
);

-- Confirm:
select u.email, p.role
from public.profiles p
join auth.users u on u.id = p.user_id
where u.email = 'your@email.com';
```

3. Sign out and sign back in (or refresh), then open **Account → Admin**.

## Demote

```sql
update public.profiles
set role = 'member'
where user_id = (
  select id from auth.users where email = 'your@email.com'
);
```

## Why the app cannot self-promote

- Signup / profile forms never send a `role` field.
- DB default is `member`.
- Insert trigger forces `role = 'member'`.
- Update trigger blocks role changes when `auth.uid()` is present (normal app sessions).
- Column grants omit `role` from what the `authenticated` role can update.

SQL editor sessions (no end-user JWT) can still change `role` — that is intentional.

## What admins can do

- `/admin` — admin home
- `/admin/exercises` — edit exercise copy + upload photo/video
- `/admin/plans` — edit plan templates + upload overview photo/video
- Upload **files from your computer** (Supabase Storage bucket `exercise-media`)
- Optional paste URL still available as a fallback
- Meals and other catalogs will reuse this same pattern

### Migrations

Apply in order after earlier schema seeds:

- `00006_admin_role.sql`
- `00007_exercise_media_storage.sql`
- `00008_workout_plans.sql` (plan columns, admin RLS on `workouts`, template seed)

Limits: photos ≤ 5 MB (JPEG/PNG/WebP/GIF); videos ≤ 50 MB (MP4/WebM/MOV).

Paths: exercises at `{slug}/…`; plans at `plans/{slug}/…`.
