# Database

PostgreSQL schema for RollnFitness, managed as Supabase migrations.

## Apply locally / to a project

1. Create a Supabase project
2. Run `supabase/migrations/00001_initial_schema.sql` in the SQL editor, **or**
3. Use the Supabase CLI: `supabase db push`

## Core tables

| Table | Purpose |
| --- | --- |
| `profiles` | Public/user profile + preferences (1:1 with `auth.users`) |
| `goals` | Active fitness goals |
| `exercises` | Adaptive exercise catalog |
| `workouts` | Plans / templates |
| `workout_history` | Completed sessions, duration, streaks input |
| `meals` | Nutrition / recipe library |
| `nutrition_preferences` | Per-user nutrition targets |
| `communities` | Goal/interest communities |
| `community_posts` | Discussions |
| `comments` | Post replies |
| `friends` | Friend graph + requests |
| `accountability_partners` | Partner connections + shared goals |
| `messages` | Direct encouragement / partner messages |
| `badges` | Achievement definitions |
| `user_badges` | Earned achievements |
| `notifications` | In-app notifications |

> Note: identity lives in Supabase `auth.users`. Application data references `auth.users(id)`. A trigger creates a `profiles` row on signup.

## Design principles

- Foreign keys for referential integrity
- Indexes on filter/join columns and unread notification paths
- Enums for constrained domain values (goals, mobility, difficulty)
- `updated_at` triggers on mutable tables
- **Row Level Security** enabled on every application table

## RLS summary

- Users read/update their own profile, goals, history, preferences, notifications
- Catalog tables (`exercises`, `meals`, `badges`, public `workouts`) are readable by authenticated users
- Social tables restrict visibility to participants
- Messages are visible only to sender/recipient

Feature branches that change authorization must update both SQL policies and service-layer assumptions.

## Type generation

After schema changes:

```bash
npx supabase gen types typescript --project-id <id> > src/types/database.ts
```

Keep hand-maintained types in sync until CLI generation is wired in CI.
