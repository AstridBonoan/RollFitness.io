import Link from "next/link";

import { LogoutButton } from "@/features/authentication/components/logout-button";
import { isCurrentUserAdmin } from "@/features/authentication/services/admin";

type AppHeaderProps = {
  current?:
    | "account"
    | "profile"
    | "accessibility"
    | "exercises"
    | "plans"
    | "admin";
};

export async function AppHeader({ current }: AppHeaderProps) {
  const admin = await isCurrentUserAdmin();

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <div className="flex min-w-0 items-center gap-4 sm:gap-6">
          <Link
            href="/"
            className="shrink-0 font-display text-lg font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            RollnFitness
          </Link>
          <nav aria-label="Account">
            <ul className="flex items-center gap-3 overflow-x-auto text-sm sm:gap-4">
              <li>
                <Link
                  href="/account"
                  className={
                    current === "account"
                      ? "font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }
                  aria-current={current === "account" ? "page" : undefined}
                >
                  Account
                </Link>
              </li>
              <li>
                <Link
                  href="/exercises"
                  className={
                    current === "exercises"
                      ? "font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }
                  aria-current={current === "exercises" ? "page" : undefined}
                >
                  Exercises
                </Link>
              </li>
              <li>
                <Link
                  href="/plans"
                  className={
                    current === "plans"
                      ? "font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }
                  aria-current={current === "plans" ? "page" : undefined}
                >
                  Plans
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className={
                    current === "profile"
                      ? "font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }
                  aria-current={current === "profile" ? "page" : undefined}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/accessibility"
                  className={
                    current === "accessibility"
                      ? "font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }
                  aria-current={
                    current === "accessibility" ? "page" : undefined
                  }
                >
                  Accessibility
                </Link>
              </li>
              {admin ? (
                <li>
                  <Link
                    href="/admin"
                    className={
                      current === "admin"
                        ? "font-medium text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }
                    aria-current={current === "admin" ? "page" : undefined}
                  >
                    Admin
                  </Link>
                </li>
              ) : null}
            </ul>
          </nav>
        </div>
        <LogoutButton />
      </div>
    </header>
  );
}
