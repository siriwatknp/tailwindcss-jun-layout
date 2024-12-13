import { test, expect } from "@playwright/test";

test("basic layout test", async ({ page }) => {
  await page.goto("/examples/meta-business");

  // Test that the layout container exists
  await expect(page.locator(".jun-layout")).toBeVisible();

  // Add more specific tests for your layout components
});
