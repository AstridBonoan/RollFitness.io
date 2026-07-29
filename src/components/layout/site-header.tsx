import Link from "next/link";

/**
 * Skip link for keyboard and screen reader users.
 * First focusable element on every page.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-3 focus:text-primary-foreground focus:shadow-lg"
    >
      Skip to main content
    </a>
  );
}

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
        >
          RollnFitness
        </Link>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-6 text-sm text-white/85">
            <li>
              <Link
                href="#about"
                className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                Sign in
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className="rounded-md bg-white/15 px-3 py-2 text-white transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                Join
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
