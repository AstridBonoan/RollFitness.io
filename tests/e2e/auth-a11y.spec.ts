import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Authentication accessibility", () => {
  for (const path of ["/login", "/signup", "/forgot-password"] as const) {
    test(`${path} has no critical or serious axe violations`, async ({
      page,
    }) => {
      await page.goto(path);

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();

      const blocking = results.violations.filter((violation) =>
        ["critical", "serious"].includes(violation.impact ?? ""),
      );

      expect(blocking).toEqual([]);
    });
  }
});
