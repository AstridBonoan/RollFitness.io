import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility routes", () => {
  test("unauthenticated /accessibility redirects to login", async ({
    page,
  }) => {
    await page.goto("/accessibility");
    await expect(page).toHaveURL(/\/login/);
  });
});

test.describe("Accessibility settings gate", () => {
  test("login remains accessible after accessibility guard", async ({
    page,
  }) => {
    await page.goto("/accessibility");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    const blocking = results.violations.filter((violation) =>
      ["critical", "serious"].includes(violation.impact ?? ""),
    );

    expect(blocking).toEqual([]);
  });
});
