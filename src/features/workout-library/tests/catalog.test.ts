import {
  CATALOG_EXERCISES,
  getCatalogBySlug,
  groupCatalogByFocusArea,
} from "@/features/workout-library/data/catalog";

describe("workout library catalog", () => {
  it("includes labeled exercises with empty-media guidance", () => {
    expect(CATALOG_EXERCISES.length).toBeGreaterThanOrEqual(20);
    for (const exercise of CATALOG_EXERCISES) {
      expect(exercise.slug.length).toBeGreaterThan(0);
      expect(exercise.photo_label.toLowerCase()).toContain("photo");
      expect(exercise.video_label.toLowerCase()).toContain("video");
    }
  });

  it("uses unique slugs", () => {
    const slugs = CATALOG_EXERCISES.map((exercise) => exercise.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("looks up exercises by slug", () => {
    expect(getCatalogBySlug("seated-shoulder-press")?.name).toBe(
      "Seated Shoulder Press",
    );
    expect(getCatalogBySlug("missing")).toBeUndefined();
  });

  it("groups by focus area without empty groups", () => {
    const groups = groupCatalogByFocusArea();
    expect(groups.length).toBeGreaterThan(0);
    for (const group of groups) {
      expect(group.exercises.length).toBeGreaterThan(0);
    }
  });
});
