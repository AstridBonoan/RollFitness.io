import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Exercise library routes", () => {
  test("unauthenticated /exercises redirects to login", async ({ page }) => {
    await page.goto("/exercises");
    await expect(page).toHaveURL(/\/login/);
  });
});

test.describe("Exercise library accessibility when redirected", () => {
  test("login remains accessible after exercises guard", async ({ page }) => {
    await page.goto("/exercises");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    const blocking = results.violations.filter((violation) =>
      ["critical", "serious"].includes(violation.impact ?? ""),
    );

    expect(blocking).toEqual([]);
  });
});
