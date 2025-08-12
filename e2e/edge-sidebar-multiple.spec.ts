import { test, expect } from "@playwright/test";
import { waitForLayoutStable } from "./utils/test-helpers";

test.describe("Multiple Edge Sidebars - Basic Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/e2e/edge-sidebar-multiple");
    await waitForLayoutStable(page);
  });

  test("should support both left and right sidebars", async ({ page }) => {
    // Check that both sidebar containers exist
    const leftSidebar = page.getByTestId("sidebar-left-multi");
    const rightSidebar = page.getByTestId("sidebar-right-multi");
    
    expect(await leftSidebar.count()).toBe(1);
    expect(await rightSidebar.count()).toBe(1);
    
    // Check classes
    const leftClasses = await leftSidebar.getAttribute("class");
    const rightClasses = await rightSidebar.getAttribute("class");
    
    expect(leftClasses).toContain("jun-edgeSidebar");
    expect(rightClasses).toContain("jun-edgeSidebarR");
  });

  test("should support both sidebars in permanent mode", async ({ page }) => {
    // Enable both permanent
    const checkbox = page.getByTestId("both-permanent-checkbox");
    await checkbox.check();
    await waitForLayoutStable(page);
    
    // Both should be visible
    const leftSidebar = page.getByTestId("sidebar-left-multi");
    const rightSidebar = page.getByTestId("sidebar-right-multi");
    
    await expect(leftSidebar).toBeVisible();
    await expect(rightSidebar).toBeVisible();
    
    // Check widths
    await expect(leftSidebar).toHaveCSS("width", "256px");
    await expect(rightSidebar).toHaveCSS("width", "300px");
    
    // Main content should adjust
    const mainContent = page.locator(".jun-content").first();
    const mainBox = await mainContent.boundingBox();
    expect(mainBox).not.toBeNull();
    expect(mainBox!.width).toBeLessThan(800);
  });

  test("should support responsive sidebars", async ({ page }) => {
    // Check the responsive layout section
    const responsiveLeft = page.getByTestId("sidebar-responsive-left");
    const responsiveRight = page.getByTestId("sidebar-responsive-right");
    
    // Verify they have responsive classes
    const leftClasses = await responsiveLeft.getAttribute("class");
    const rightClasses = await responsiveRight.getAttribute("class");
    
    expect(leftClasses).toContain("jun-edgeSidebar-drawer");
    expect(leftClasses).toContain("md:jun-edgeSidebar-permanent");
    
    expect(rightClasses).toContain("jun-edgeSidebarR-drawer");
    expect(rightClasses).toContain("lg:jun-edgeSidebarR-permanent");
  });

  test("should handle independent sidebar modes", async ({ page }) => {
    // Set left to drawer mode
    await page.getByTestId("left-mode-select").selectOption("drawer");
    await waitForLayoutStable(page);
    
    // Left trigger should appear
    const leftTrigger = page.getByTestId("left-drawer-trigger");
    await expect(leftTrigger).toBeVisible();
    
    // Right trigger should still be visible (already in drawer mode)
    const rightTrigger = page.getByTestId("right-drawer-trigger");
    await expect(rightTrigger).toBeVisible();
    
    // Change right to permanent
    await page.getByTestId("right-mode-select").selectOption("permanent");
    await waitForLayoutStable(page);
    
    // Right trigger should disappear, left should remain
    await expect(leftTrigger).toBeVisible();
    await expect(rightTrigger).not.toBeVisible();
    
    // Right sidebar should be visible in permanent mode
    const rightSidebar = page.getByTestId("sidebar-right-multi");
    await expect(rightSidebar).toBeVisible();
  });
});

test.describe("Multiple Edge Sidebars - Mobile Tests", () => {
  test.use({ viewport: { width: 375, height: 667 } });
  
  test.beforeEach(async ({ page }) => {
    await page.goto("/e2e/edge-sidebar-multiple");
    await waitForLayoutStable(page);
  });

  test("should show responsive triggers on mobile", async ({ page }) => {
    // Check responsive section triggers
    await expect(page.getByTestId("responsive-left-trigger")).toBeVisible();
    await expect(page.getByTestId("responsive-right-trigger")).toBeVisible();
  });

  test("should handle drawer mode on mobile", async ({ page }) => {
    // Set both to drawer
    await page.getByTestId("left-mode-select").selectOption("drawer");
    await page.getByTestId("right-mode-select").selectOption("drawer");
    await waitForLayoutStable(page);
    
    // Both triggers should be in header
    const leftTrigger = page.getByTestId("left-drawer-trigger");
    const rightTrigger = page.getByTestId("right-drawer-trigger");
    
    await expect(leftTrigger).toBeVisible();
    await expect(rightTrigger).toBeVisible();
    
    // Can open left drawer
    await leftTrigger.click();
    await waitForLayoutStable(page);
    
    const leftSidebar = page.getByTestId("sidebar-left-multi");
    expect(await leftSidebar.getAttribute("data-drawer-open")).not.toBeNull();
  });
});