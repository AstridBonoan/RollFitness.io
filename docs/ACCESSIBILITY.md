# Accessibility

Accessibility is a **core product feature**, not a retrofit.

## Standard

Target: **WCAG 2.2 AA**

## Platform requirements

| Capability | Implementation home |
| --- | --- |
| High contrast | `feature/accessibility-system` (`/accessibility`, cookie + profile) |
| Font scaling | `feature/accessibility-system` |
| Reduced motion | CSS `prefers-reduced-motion` + user `reduce_motion` preference |
| Keyboard navigation | All interactive features |
| Screen reader support | Semantic HTML, labels, live regions |

## Baseline already in foundation

- Skip link to `#main-content`
- Landmark regions (`header`, `nav`, `main`)
- Visible focus rings on interactive elements
- Prefer `prefers-reduced-motion` for hero animation
- Minimum control height ≈ 44px on primary buttons/inputs
- axe Playwright gate fails on critical/serious violations

## Engineering rules

1. Every interactive control must have an accessible name
2. Do not rely on color alone for state
3. Decorative images use empty `alt`; informative images need meaningful `alt`
4. Forms use labels (not placeholder-only)
5. Dialogs/menus must trap focus and restore it on close
6. Do not disable zoom
7. Test with keyboard-only before opening a PR

## Automated checks

```bash
npm run test:a11y
```

CI runs axe with WCAG 2.A/AA tags. Critical and serious findings fail the build.

## Manual checks (required for UI PRs)

- Tab order matches visual order
- Screen reader announces page purpose and primary actions
- Contrast meets AA for text and UI components
- Motion can be reduced without losing meaning
