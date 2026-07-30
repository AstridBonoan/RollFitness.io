import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Workout plans routes", () => {
  test("unauthenticated /plans redirects to login", async ({ page }) => {
    await page.goto("/plans");
    await expect(page).toHaveURL(/\/login/);
  });
});

test.describe("Workout plans accessibility when redirected", () => {
  test("login remains accessible after plans guard", async ({ page }) => {
    await page.goto("/plans");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    const blocking = results.violations.filter((violation) =>
      ["critical", "serious"].includes(violation.impact ?? ""),
    );

    expect(blocking).toEqual([]);
  });
});
