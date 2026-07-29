import Link from "next/link";

import { cn } from "@/lib/utils";

type AuthShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function AuthShell({
  title,
  description,
  children,
  footer,
}: AuthShellProps) {
  return (
    <div className="relative flex min-h-dvh flex-col bg-[linear-gradient(160deg,#f4f7f5_0%,#e2eee9_45%,#d5ebe3_100%)]">
      <header className="mx-auto flex h-16 w-full max-w-lg items-center px-6">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          RollnFitness
        </Link>
      </header>

      <main
        id="main-content"
        className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-6 pb-16"
      >
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
        <div className="mt-8">{children}</div>
        {footer ? <div className="mt-8 text-sm text-muted-foreground">{footer}</div> : null}
      </main>
    </div>
  );
}

type FieldErrorProps = {
  id: string;
  message?: string;
};

export function FieldError({ id, message }: FieldErrorProps) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-destructive" role="alert">
      {message}
    </p>
  );
}

type FormMessageProps = {
  error?: string;
  success?: string;
  className?: string;
};

export function FormMessage({ error, success, className }: FormMessageProps) {
  if (!error && !success) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "rounded-md px-3 py-2 text-sm",
        error && "bg-destructive/10 text-destructive",
        success && "bg-primary/10 text-primary",
        className,
      )}
    >
      {error ?? success}
    </div>
  );
}
