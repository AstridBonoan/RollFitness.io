import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Onboarding routes", () => {
  test("unauthenticated /onboarding redirects to login", async ({ page }) => {
    await page.goto("/onboarding");
    await expect(page).toHaveURL(/\/login/);
  });
});

test.describe("Onboarding accessibility when redirected", () => {
  test("login remains accessible after onboarding guard", async ({ page }) => {
    await page.goto("/onboarding");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    const blocking = results.violations.filter((violation) =>
      ["critical", "serious"].includes(violation.impact ?? ""),
    );

    expect(blocking).toEqual([]);
  });
});
