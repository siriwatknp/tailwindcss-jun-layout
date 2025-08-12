import { test, expect } from "@playwright/test";
import {
  validateLayoutStructure,
  waitForLayoutStable,
  triggerBreakpoint,
} from "./utils/test-helpers";

test.describe("Edge Sidebar Width Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/e2e/edge-sidebar-width");
    await waitForLayoutStable(page);
  });

  test("should apply custom widths to sidebars", async ({ page }) => {
    // Arrange
    const leftSidebar = page.getByTestId("sidebar-left");
    const rightSidebar = page.getByTestId("sidebar-right");
    
    // Initial state - verify default widths
    await expect(leftSidebar).toHaveCSS("width", "256px");
    await expect(rightSidebar).toHaveCSS("width", "300px");
    
    // Verify content displays current width
    await expect(page.getByTestId("left-sidebar-content")).toContainText("Current width: 256px");
    await expect(page.getByTestId("right-sidebar-content")).toContainText("Current width: 300px");
  });

  test("should dynamically change sidebar widths", async ({ page }) => {
    // Arrange
    const leftSidebar = page.getByTestId("sidebar-left");
    const rightSidebar = page.getByTestId("sidebar-right");
    const leftWidthSelect = page.getByTestId("left-width-select");
    const rightWidthSelect = page.getByTestId("right-width-select");
    
    // Test different width combinations
    const testCases = [
      { left: "200px", right: "200px" },
      { left: "300px", right: "256px" },
      { left: "400px", right: "400px" },
    ];
    
    for (const testCase of testCases) {
      // Act - Change left sidebar width
      await leftWidthSelect.selectOption(testCase.left);
      await waitForLayoutStable(page);
      
      // Assert - Left sidebar width changed
      await expect(leftSidebar).toHaveCSS("width", testCase.left);
      await expect(page.getByTestId("left-sidebar-content")).toContainText(`Current width: ${testCase.left}`);
      
      // Act - Change right sidebar width
      await rightWidthSelect.selectOption(testCase.right);
      await waitForLayoutStable(page);
      
      // Assert - Right sidebar width changed
      await expect(rightSidebar).toHaveCSS("width", testCase.right);
      await expect(page.getByTestId("right-sidebar-content")).toContainText(`Current width: ${testCase.right}`);
    }
  });

  test("should maintain content area flexibility with different sidebar widths", async ({ page }) => {
    // Arrange
    const mainContent = page.locator(".jun-content").first();
    const leftWidthSelect = page.getByTestId("left-width-select");
    const rightWidthSelect = page.getByTestId("right-width-select");
    
    // Get initial main content width
    const initialMainWidth = await mainContent.boundingBox();
    expect(initialMainWidth).not.toBeNull();
    
    // Act - Increase sidebar widths
    await leftWidthSelect.selectOption("400px");
    await rightWidthSelect.selectOption("400px");
    await waitForLayoutStable(page);
    
    // Assert - Main content should be narrower
    const narrowMainWidth = await mainContent.boundingBox();
    expect(narrowMainWidth).not.toBeNull();
    expect(narrowMainWidth!.width).toBeLessThan(initialMainWidth!.width);
    
    // Act - Decrease sidebar widths
    await leftWidthSelect.selectOption("200px");
    await rightWidthSelect.selectOption("200px");
    await waitForLayoutStable(page);
    
    // Assert - Main content should be wider
    const widerMainWidth = await mainContent.boundingBox();
    expect(widerMainWidth).not.toBeNull();
    expect(widerMainWidth!.width).toBeGreaterThan(narrowMainWidth!.width);
  });

  test("should apply responsive width classes", async ({ page }) => {
    // Arrange
    const responsiveSidebar = page.getByTestId("sidebar-responsive");
    
    // Test at desktop size (lg)
    await expect(responsiveSidebar).toHaveCSS("width", "300px");
    
    // Act - Switch to tablet size (md)
    await triggerBreakpoint(page, "md");
    
    // Assert - Width should change to md breakpoint value
    await expect(responsiveSidebar).toHaveCSS("width", "256px");
    
    // Act - Switch to mobile size
    await triggerBreakpoint(page, "mobile");
    
    // Assert - Width should change to mobile value
    await expect(responsiveSidebar).toHaveCSS("width", "200px");
    
    // Act - Switch back to desktop
    await triggerBreakpoint(page, "lg");
    
    // Assert - Width should return to desktop value
    await expect(responsiveSidebar).toHaveCSS("width", "300px");
  });

  test("should handle extreme width values gracefully", async ({ page }) => {
    // Arrange
    const leftSidebar = page.getByTestId("sidebar-left");
    const mainContent = page.locator(".jun-content").first();
    
    // Act - Set maximum width
    const leftWidthSelect = page.getByTestId("left-width-select");
    await leftWidthSelect.selectOption("400px");
    await waitForLayoutStable(page);
    
    // Assert - Sidebar has correct width
    await expect(leftSidebar).toHaveCSS("width", "400px");
    
    // Assert - Main content is still visible and has reasonable width
    await expect(mainContent).toBeVisible();
    const mainBox = await mainContent.boundingBox();
    expect(mainBox).not.toBeNull();
    expect(mainBox!.width).toBeGreaterThan(200); // Ensure content area isn't too narrow
  });

  test("should properly layout with both sidebars at maximum width", async ({ page }) => {
    // Arrange
    const leftSidebar = page.getByTestId("sidebar-left");
    const rightSidebar = page.getByTestId("sidebar-right");
    const mainContent = page.locator(".jun-content").first();
    const leftWidthSelect = page.getByTestId("left-width-select");
    const rightWidthSelect = page.getByTestId("right-width-select");
    
    // Act - Set both sidebars to maximum width
    await leftWidthSelect.selectOption("400px");
    await rightWidthSelect.selectOption("400px");
    await waitForLayoutStable(page);
    
    // Assert - Both sidebars have correct width
    await expect(leftSidebar).toHaveCSS("width", "400px");
    await expect(rightSidebar).toHaveCSS("width", "400px");
    
    // Assert - No overlap between elements
    const leftBox = await leftSidebar.boundingBox();
    const rightBox = await rightSidebar.boundingBox();
    const mainBox = await mainContent.boundingBox();
    
    expect(leftBox).not.toBeNull();
    expect(rightBox).not.toBeNull();
    expect(mainBox).not.toBeNull();
    
    // Left sidebar should end before main content starts
    expect(leftBox!.x + leftBox!.width).toBeLessThanOrEqual(mainBox!.x);
    
    // Main content should end before right sidebar starts
    expect(mainBox!.x + mainBox!.width).toBeLessThanOrEqual(rightBox!.x);
  });
});

test.describe("Edge Sidebar Width Tests - Mobile", () => {
  test.use({ viewport: { width: 375, height: 667 } });
  
  test.beforeEach(async ({ page }) => {
    await page.goto("/e2e/edge-sidebar-width");
    await waitForLayoutStable(page);
  });

  test("should handle width changes on mobile viewport", async ({ page }) => {
    // Arrange
    const leftSidebar = page.getByTestId("sidebar-left");
    const leftWidthSelect = page.getByTestId("left-width-select");
    
    // Initial state
    await expect(leftSidebar).toHaveCSS("width", "256px");
    
    // Act - Change width on mobile
    await leftWidthSelect.selectOption("200px");
    await waitForLayoutStable(page);
    
    // Assert - Width changes even on mobile
    await expect(leftSidebar).toHaveCSS("width", "200px");
    
    // Verify sidebar is still functional
    const sidebarBox = await leftSidebar.boundingBox();
    expect(sidebarBox).not.toBeNull();
    expect(sidebarBox!.width).toBe(200);
  });

  test("should apply responsive width at mobile breakpoint", async ({ page }) => {
    // Arrange
    const responsiveSidebar = page.getByTestId("sidebar-responsive");
    
    // Assert - Should use mobile width (200px) at mobile viewport
    await expect(responsiveSidebar).toHaveCSS("width", "200px");
    
    // Verify the responsive sidebar content indicates mobile width
    const content = page.getByTestId("responsive-sidebar-content");
    await expect(content).toContainText("Mobile: 200px");
  });
});