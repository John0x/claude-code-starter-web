import { expect, test } from "@playwright/test";

// This file serves as an example of how to use playwright. Remove it once you have written the first proper test.
test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Create Next App/);
});

test("loads homepage", async ({ page }) => {
  await page.goto("/");

  // Basic check that the page loads without errors
  await expect(page.locator("body")).toBeVisible();
});
