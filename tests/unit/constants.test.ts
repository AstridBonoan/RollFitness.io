import {
  APP_NAME,
  FITNESS_GOALS,
  MOBILITY_LEVELS,
} from "@/lib/constants";

describe("application constants", () => {
  it("defines the product brand", () => {
    expect(APP_NAME).toBe("RollnFitness");
  });

  it("exposes fitness goals used across features", () => {
    expect(FITNESS_GOALS).toEqual(
      expect.arrayContaining([
        "strength",
        "weight_management",
        "mobility",
        "endurance",
      ]),
    );
  });

  it("exposes mobility levels focused on functional ability", () => {
    expect(MOBILITY_LEVELS).toEqual(
      expect.arrayContaining(["seated", "assisted", "full"]),
    );
  });
});
