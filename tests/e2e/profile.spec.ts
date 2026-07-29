import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Profile routes", () => {
  test("unauthenticated /profile redirects to login", async ({ page }) => {
    await page.goto("/profile");
    await expect(page).toHaveURL(/\/login/);
  });
});

test.describe("Profile accessibility when redirected", () => {
  test("login page remains accessible after profile guard", async ({
    page,
  }) => {
    await page.goto("/profile");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    const blocking = results.violations.filter((violation) =>
      ["critical", "serious"].includes(violation.impact ?? ""),
    );

    expect(blocking).toEqual([]);
  });
});
