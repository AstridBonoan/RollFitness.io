# Architecture

RollnFitness uses a **feature-based** Next.js App Router architecture. Each major capability is treated as an independent product module with its own components, hooks, services, tests, and documentation.

## Directory map

```text
src/
  app/                         # Routes, layouts, metadata
  components/
    ui/                        # Design-system primitives (shadcn-style)
    layout/                    # Shared chrome (header, skip link)
  features/
    authentication/
    user-profile/
    onboarding/
    workout-library/
    workout-plans/
    workout-tracking/
    nutrition-library/
    community/
    friends-system/
    accountability-partners/
    achievements/
    accessibility-system/
    notifications/
    dashboard/
  lib/
    supabase/                  # Browser, server, middleware clients
    constants.ts
    utils.ts
  types/                       # Shared domain + Database types
  middleware.ts                # Session refresh / future route guards

supabase/
  migrations/                  # Versioned PostgreSQL + RLS

docs/                          # Engineering documentation
tests/
  e2e/                         # Playwright + axe
  unit/                        # Cross-cutting unit tests
  setup/                       # Jest setup
.github/workflows/             # CI quality gates
```

## Module contract

Every feature folder should contain:

| Path | Responsibility |
| --- | --- |
| `components/` | Feature UI only |
| `hooks/` | Client state / data hooks |
| `services/` | Supabase / API orchestration |
| `tests/` | Unit & component tests for the feature |
| `README.md` | Scope, dependencies, acceptance criteria |

Features may import from `src/lib`, `src/components/ui`, and `src/types`. Features should **not** import from sibling features except through shared `lib`/`types` contracts.

## Layering

1. **UI** — accessible React components
2. **Hooks** — React Hook Form, local UI state, query orchestration
3. **Services** — typed Supabase calls; no JSX
4. **Schema** — Zod for runtime validation; SQL for persistence
5. **Policies** — Row Level Security enforces authorization at the database

## Environment

| Variable | Used by |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Browser + server clients |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser + server clients |

Service-role keys must never be exposed to the client.

## Deployment topology

- **Vercel** hosts the Next.js application
- **Supabase** hosts Auth, Postgres, Storage, Realtime
- **GitHub Actions** gates merges on typecheck, lint, unit, e2e, and a11y

## Extending the platform

1. Create `feature/<name>` from `main`
2. Implement inside `src/features/<name>`
3. Add/adjust migrations if schema changes
4. Ship tests + feature README updates
5. Open a PR; merge only after CI is green
