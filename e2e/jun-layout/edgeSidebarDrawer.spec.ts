import { test, expect } from "@playwright/test";

test("drawer functionality", async ({ page }) => {
  await page.goto("/e2e/edgeSidebarDrawer");

  await expect(page.getByText("edge sidebar content")).toBeHidden();

  const drawerTrigger = page.getByRole("button", { name: "toggle drawer" });
  await drawerTrigger.click();

  await expect(page.getByText("edge sidebar content")).toBeVisible();

  // Check that body has overflow hidden when drawer is open
  await expect(page.locator("html")).toHaveCSS("overflow", "hidden");

  await page.mouse.click(
    page.viewportSize()!.width - 1,
    page.viewportSize()!.height / 2
  );

  // Check that body overflow is restored
  await expect(page.locator("html")).not.toHaveCSS("overflow", "hidden");
  await expect(drawerTrigger).toBeVisible();
});
