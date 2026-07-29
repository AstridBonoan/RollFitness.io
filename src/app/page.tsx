import Link from "next/link";

import { Button } from "@/components/ui/button";

const pillars = [
  {
    title: "Adaptive workouts",
    body: "Exercise libraries built around functional ability, mobility level, and available equipment—not diagnosis labels.",
  },
  {
    title: "Accountable community",
    body: "Friends, partners, and goal-based communities that keep progress social without sacrificing privacy.",
  },
  {
    title: "Accessible by design",
    body: "WCAG 2.2 AA as a product requirement: keyboard-first flows, screen reader support, contrast, and motion preferences.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <section
        className="hero-atmosphere relative flex min-h-dvh items-end overflow-hidden text-white"
        aria-labelledby="hero-brand"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          aria-hidden="true"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-32 sm:pb-28">
          <p
            id="hero-brand"
            className="animate-fade-up font-display text-5xl font-semibold tracking-tight sm:text-7xl md:text-8xl"
          >
            RollnFitness
          </p>
          <h1 className="animate-fade-up-delay mt-6 max-w-2xl text-2xl font-medium leading-snug text-white/95 sm:text-3xl">
            Adaptive wellness built for real bodies and real recovery.
          </h1>
          <p className="animate-fade-up-delay-2 mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            Workouts, nutrition, community, and progress tracking designed for
            wheelchair users, rehabilitation patients, and anyone navigating
            physical disability.
          </p>
          <div className="animate-fade-up-delay-2 mt-10 flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-white text-[#0a4a3d] hover:bg-white/90">
              <Link href="#pillars">Explore the platform</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="#about">Why RollnFitness</Link>
            </Button>
          </div>
        </div>
      </section>

      <main id="main-content">
        <section
          id="about"
          className="mx-auto max-w-6xl px-6 py-20 sm:py-28"
          aria-labelledby="about-heading"
        >
          <h2
            id="about-heading"
            className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Professional adaptive fitness—not a medical afterthought.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            RollnFitness combines personalized goals, adaptive exercise libraries,
            nutrition guidance, and accountability into one accessibility-first
            SaaS platform. Functional ability comes first; diagnosis is never
            required.
          </p>
        </section>

        <section
          id="pillars"
          className="border-t border-border bg-secondary/40"
          aria-labelledby="pillars-heading"
        >
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <h2
              id="pillars-heading"
              className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Built as a full wellness ecosystem
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Each capability ships as an independent product module with its own
              tests, docs, and feature branch.
            </p>
            <ul className="mt-14 grid gap-12 md:grid-cols-3">
              {pillars.map((pillar) => (
                <li key={pillar.title}>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {pillar.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <footer className="border-t border-border">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display font-medium text-foreground">
              RollnFitness
            </p>
            <p>Accessibility-first adaptive wellness platform</p>
          </div>
        </footer>
      </main>
    </>
  );
}
