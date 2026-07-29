import { expect, test } from "@playwright/test";

test.describe("Home page", () => {
  test("renders brand and primary landmark", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("link", { name: "RollnFitness", exact: true }),
    ).toBeVisible();
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.locator("#hero-brand")).toHaveText("RollnFitness");
    await expect(
      page.getByRole("heading", {
        name: /adaptive wellness built for real bodies/i,
      }),
    ).toBeVisible();
  });

  test("skip link moves focus to main content", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");

    const skipLink = page.getByRole("link", { name: /skip to main content/i });
    await expect(skipLink).toBeFocused();
    await skipLink.press("Enter");
    await expect(page.locator("#main-content")).toBeVisible();
  });
});
