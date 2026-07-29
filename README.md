# RollnFitness

Accessibility-first adaptive wellness platform for people with physical disabilities, wheelchair users, and rehabilitation patients.

RollnFitness is a production-oriented SaaS product combining adaptive workouts, personalized goals, nutrition guidance, community, accountability, and progress tracking.

## Stack

| Layer | Technology |
| --- | --- |
| Frontend | Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, Lucide |
| Backend | Supabase (Auth, PostgreSQL, Storage, Realtime) |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Testing | Jest, React Testing Library, Playwright, axe |
| CI/CD | GitHub Actions → Vercel |

## Getting started

```bash
npm install
cp .env.example .env.local
# Add your Supabase project URL and anon key
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run build` | Production build |
| `npm run typecheck` | TypeScript (`tsc --noEmit`) |
| `npm run lint` | ESLint |
| `npm run test` | Unit & component tests (Jest) |
| `npm run test:e2e` | Playwright end-to-end tests |
| `npm run test:a11y` | Accessibility checks via axe + Playwright |

## Architecture

Feature-based modules live under `src/features/*`. Shared UI is in `src/components/ui`. Supabase clients are in `src/lib/supabase`. Database migrations are in `supabase/migrations`.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the full modular map.

## GitHub workflow

`main` stays production-ready. Every product capability ships on its own feature branch and merges only through pull requests after CI passes.

Branch map and PR rules: [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md)

Planned feature branches:

- `feature/authentication`
- `feature/user-profile`
- `feature/onboarding`
- `feature/workout-library`
- `feature/workout-plans`
- `feature/workout-tracking`
- `feature/nutrition-library`
- `feature/community`
- `feature/friends-system`
- `feature/accountability-partners`
- `feature/achievements`
- `feature/accessibility-system`
- `feature/notifications`
- `feature/dashboard`

## Database

Apply `supabase/migrations/00001_initial_schema.sql` to your Supabase project. Details: [docs/DATABASE.md](docs/DATABASE.md).

## Accessibility

WCAG 2.2 AA is a release requirement. See [docs/ACCESSIBILITY.md](docs/ACCESSIBILITY.md).

## License

Proprietary — All rights reserved.
