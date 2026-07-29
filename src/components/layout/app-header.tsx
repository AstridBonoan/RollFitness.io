import Link from "next/link";

import { LogoutButton } from "@/features/authentication/components/logout-button";

type AppHeaderProps = {
  current?: "account" | "profile";
};

export function AppHeader({ current }: AppHeaderProps) {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="font-display text-lg font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            RollnFitness
          </Link>
          <nav aria-label="Account">
            <ul className="flex items-center gap-4 text-sm">
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
            </ul>
          </nav>
        </div>
        <LogoutButton />
      </div>
    </header>
  );
}
