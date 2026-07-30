import {
  PLAN_CATALOG,
  getPlanBySlug,
} from "@/features/workout-plans/data/catalog";
import { getCatalogBySlug } from "@/features/workout-library/data/catalog";
import {
  matchesPlanFilters,
  resolvePlanExercises,
  scorePlanForProfile,
} from "@/features/workout-plans/services/plans";

describe("workout plans catalog", () => {
  it("seeds labeled plans with empty-media guidance", () => {
    expect(PLAN_CATALOG.length).toBeGreaterThanOrEqual(8);
    for (const plan of PLAN_CATALOG) {
      expect(plan.slug.length).toBeGreaterThan(0);
      expect(plan.exercise_slugs.length).toBeGreaterThan(0);
      expect(plan.photo_label.toLowerCase()).toContain("photo");
      expect(plan.video_label.toLowerCase()).toContain("video");
    }
  });

  it("uses unique slugs", () => {
    const slugs = PLAN_CATALOG.map((plan) => plan.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("references real exercise catalog slugs", () => {
    for (const plan of PLAN_CATALOG) {
      for (const slug of plan.exercise_slugs) {
        expect(getCatalogBySlug(slug)).toBeDefined();
      }
    }
  });

  it("looks up plans by slug", () => {
    expect(getPlanBySlug("seated-upper-starter")?.title).toMatch(/Seated/i);
    expect(getPlanBySlug("missing")).toBeUndefined();
  });
});

describe("plan filters and scoring", () => {
  const sample = PLAN_CATALOG[0];

  it("filters by goal and query", () => {
    expect(matchesPlanFilters(sample, { goal: sample.goal_type })).toBe(true);
    expect(
      matchesPlanFilters(sample, {
        goal: sample.goal_type === "strength" ? "mobility" : "strength",
      }),
    ).toBe(false);
    expect(
      matchesPlanFilters(sample, { q: sample.title.slice(0, 6) }),
    ).toBe(true);
  });

  it("scores mobility and goals for a profile", () => {
    const score = scorePlanForProfile(sample, {
      mobility_level: sample.mobility_level,
      fitness_interests: [sample.goal_type],
      equipment_preferences: sample.equipment.slice(0, 1),
    });
    expect(score).toBeGreaterThanOrEqual(7);
  });

  it("resolves linked exercises", () => {
    const exercises = resolvePlanExercises(sample);
    expect(exercises.length).toBe(sample.exercise_slugs.length);
  });
});
