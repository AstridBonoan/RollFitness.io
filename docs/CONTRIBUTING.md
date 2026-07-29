# Contributing

RollnFitness follows **GitHub Flow**. `main` must always remain stable and production-ready.

## Rules

1. Never commit product features directly to `main`
2. One feature branch per capability
3. Pull requests are the only merge path into `main`
4. CI must pass before merge
5. Include tests and docs with every feature

## Branch naming

```text
feature/<capability>
```

Examples: `feature/authentication`, `feature/workout-library`

## Feature development checklist

1. `git checkout main && git pull`
2. `git checkout -b feature/<name>`
3. Implement in `src/features/<name>`
4. Add unit/component tests under the feature `tests/` folder
5. Add or update e2e coverage when user flows change
6. Update the feature `README.md`
7. Run locally:
   - `npm run typecheck`
   - `npm run lint`
   - `npm run test`
   - `npm run test:e2e`
8. Open a PR against `main`
9. Merge only after GitHub Actions is green

## Pull request expectations

- Clear summary of the user-facing change
- Linked acceptance criteria
- Screenshots or clips for UI changes
- Note any schema migrations and rollout order
- Accessibility notes (keyboard, SR, contrast, motion)

## CI gates

Every PR runs:

1. Dependency install
2. TypeScript check
3. ESLint
4. Jest unit/component tests
5. Playwright e2e tests
6. axe accessibility checks (critical/serious must be zero)

## Commit style

Prefer concise, imperative messages focused on why:

- `feat(auth): add password reset flow`
- `fix(a11y): restore skip-link focus order`
- `docs: document workout library filters`
