# Feature branch roadmap

Each branch is an independent product increment. Implement, test, document, PR, then merge to `main`.

| Branch | Module path | Outcome |
| --- | --- | --- |
| `feature/authentication` | `src/features/authentication` | Signup, login, logout, reset, verification, sessions, protected routes |
| `feature/user-profile` | `src/features/user-profile` | Profile CRUD, preferences, equipment, privacy |
| `feature/onboarding` | `src/features/onboarding` | Guided setup focused on functional ability (no mandatory diagnosis) |
| `feature/workout-library` | `src/features/workout-library` | Adaptive exercise DB + filters |
| `feature/workout-plans` | `src/features/workout-plans` | Personalized plan recommendations |
| `feature/workout-tracking` | `src/features/workout-tracking` | History, duration, progress, streaks |
| `feature/nutrition-library` | `src/features/nutrition-library` | Meals, macros, categories |
| `feature/community` | `src/features/community` | Communities, posts, comments, reactions |
| `feature/friends-system` | `src/features/friends-system` | Requests, invites, friend activity |
| `feature/accountability-partners` | `src/features/accountability-partners` | Partners, shared goals, check-ins |
| `feature/achievements` | `src/features/achievements` | Professional gamification / badges |
| `feature/accessibility-system` | `src/features/accessibility-system` | Theme, contrast, font scale, motion, SR tooling |
| `feature/notifications` | `src/features/notifications` | In-app + realtime notifications |
| `feature/dashboard` | `src/features/dashboard` | Personalized home surface composing modules |

## Suggested delivery order

1. Authentication
2. Accessibility system (preferences shell)
3. User profile + onboarding
4. Workout library → plans → tracking
5. Nutrition library
6. Community → friends → accountability
7. Achievements + notifications
8. Dashboard composition

This order unlocks secure identity early, keeps a11y as a platform concern, and lands high-value wellness loops before social graph complexity.
