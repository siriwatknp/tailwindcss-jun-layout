import { test, expect } from "@playwright/test";
import {
  validateLayoutStructure,
  waitForLayoutStable,
  getSidebarState,
  triggerBreakpoint,
} from "./utils/test-helpers";

test.describe("Edge Sidebar Collapse Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/e2e/edge-sidebar-collapse");
    await waitForLayoutStable(page);
  });

  test("should toggle sidebar collapse state", async ({ page }) => {
    // Arrange
    const sidebar = page.getByTestId("sidebar-collapsible");
    const collapseTrigger = page.getByTestId("collapse-trigger");
    const sidebarContent = page.getByTestId("sidebar-content");

    // Initial state - sidebar should be expanded
    let sidebarState = await getSidebarState(page);
    expect(sidebarState.isOpen).toBe(true);
    expect(sidebarState.isCollapsed).toBe(false);
    await expect(sidebarContent).toBeVisible();

    // Act - Click collapse trigger
    await collapseTrigger.click();
    await waitForLayoutStable(page);

    // Assert - Sidebar should be collapsed
    sidebarState = await getSidebarState(page);
    expect(sidebarState.isOpen).toBe(true); // Still open but collapsed
    expect(sidebarState.isCollapsed).toBe(true);
    await expect(sidebarContent).not.toBeVisible();

    // Verify sidebar width changed
    await expect(sidebar).toHaveCSS("width", "80px"); // Default collapsed width

    // Act - Click again to expand
    await collapseTrigger.click();
    await waitForLayoutStable(page);

    // Assert - Sidebar should be expanded again
    sidebarState = await getSidebarState(page);
    expect(sidebarState.isOpen).toBe(true);
    expect(sidebarState.isCollapsed).toBe(false);
    await expect(sidebarContent).toBeVisible();
    await expect(sidebar).toHaveCSS("width", "256px");
  });

  test("should show correct icons based on collapse state", async ({
    page,
  }) => {
    // Arrange
    const collapseTrigger = page.getByTestId("collapse-trigger");
    const collapsedIcon = collapseTrigger.locator(
      "svg.jun-edgeCollapsed-visible"
    );
    const uncollapsedIcon = collapseTrigger.locator(
      "svg.jun-edgeUncollapsed-visible"
    );
    const uncollapsedText = collapseTrigger.locator(
      "span.jun-edgeUncollapsed-visible"
    );

    // Initial state - should show uncollapsed icon and text
    await expect(collapsedIcon).not.toBeVisible();
    await expect(uncollapsedIcon).toBeVisible();
    await expect(uncollapsedText).toBeVisible();
    await expect(uncollapsedText).toHaveText("Collapse");

    // Act - Collapse sidebar
    await collapseTrigger.click();
    await waitForLayoutStable(page);

    // Assert - Should show collapsed icon only
    await expect(collapsedIcon).toBeVisible();
    await expect(uncollapsedIcon).not.toBeVisible();
    await expect(uncollapsedText).not.toBeVisible();
  });

  test("should respect custom collapsed width", async ({ page }) => {
    // Arrange
    const sidebar = page.getByTestId("sidebar-collapsible");
    const collapseTrigger = page.getByTestId("collapse-trigger");
    const widthSelect = page.getByTestId("collapsed-width-select");

    // Test different collapsed widths
    const widths = ["64px", "96px"];

    for (const width of widths) {
      // Act - Select new width
      await widthSelect.selectOption(width);
      await waitForLayoutStable(page);

      // Collapse sidebar
      await collapseTrigger.click();
      await waitForLayoutStable(page);

      // Assert - Check collapsed width
      await expect(sidebar).toHaveCSS("width", width);

      // Expand again for next iteration
      await collapseTrigger.click();
      await waitForLayoutStable(page);
    }
  });

  test("should expand on hover when hover uncollapse is enabled", async ({
    page,
  }) => {
    // Arrange
    const sidebar = page.getByTestId("sidebar-collapsible");
    const collapseTrigger = page.getByTestId("collapse-trigger");
    const hoverCheckbox = page.getByTestId("hover-uncollapse-checkbox");
    const sidebarContent = page.getByTestId("sidebar-content");

    // Enable hover uncollapse
    await hoverCheckbox.check();
    await waitForLayoutStable(page);

    // Collapse sidebar
    await collapseTrigger.click();
    await waitForLayoutStable(page);

    // Move mouse to the right edge of the page to ensure it's not hovering over the sidebar
    const viewport = page.viewportSize();
    if (viewport) {
      await page.mouse.move(viewport.width - 10, viewport.height / 2);
      await page.waitForTimeout(500);
    }

    // Verify collapsed
    await expect(sidebarContent).not.toBeVisible();
    await expect(sidebar).toHaveCSS("width", "80px");

    // Act - Hover over sidebar content area using element.hover()
    const edgeContent = sidebar.locator(".jun-edgeContent");
    await edgeContent.hover({ force: true });
    await page.waitForTimeout(500);

    // Wait for the sidebar to expand and assert
    // The sidebar container stays at collapsed width, but the content expands
    await expect(sidebar).toHaveCSS("width", "80px");

    // Check if the edgeContent is expanded by checking its computed width
    const edgeContentWidth = await edgeContent.evaluate((el) => {
      return window.getComputedStyle(el).width;
    });
    expect(edgeContentWidth).toBe("256px");

    await expect(sidebarContent).not.toBeVisible(); // Even hover, it's still considered collapsed.

    // Act - Move mouse away
    if (viewport) {
      await page.mouse.move(viewport.width - 10, viewport.height / 2);
      await page.waitForTimeout(500);
    }

    // Wait for sidebar to collapse again
    await expect(sidebar).toHaveCSS("width", "80px");
    await expect(sidebarContent).not.toBeVisible();
  });

  test("should auto-collapse at specified breakpoint", async ({ page }) => {
    // Arrange
    const sidebar = page.getByTestId("sidebar-collapsible");
    const autoCollapseCheckbox = page.getByTestId("auto-collapse-checkbox");
    const sidebarContent = page.getByTestId("sidebar-content");

    // Start with viewport > lg (1024px) to ensure sidebar is not collapsed
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.reload(); // Reload to apply viewport size
    await waitForLayoutStable(page);

    // Enable auto-collapse
    await autoCollapseCheckbox.check();
    await waitForLayoutStable(page);

    // Verify sidebar is expanded at large viewport
    await expect(sidebarContent).toBeVisible();
    await expect(sidebar).toHaveCSS("width", "256px");

    // Act - Reduce viewport below lg breakpoint (1024px)
    await page.setViewportSize({ width: 768, height: 800 });
    await waitForLayoutStable(page);

    // Assert - Should auto-collapse
    await expect(sidebarContent).not.toBeVisible();
    await expect(sidebar).toHaveCSS("width", "80px");

    // Act - Increase viewport back above lg breakpoint
    await page.setViewportSize({ width: 1280, height: 800 });
    await waitForLayoutStable(page);

    // Assert - Should auto-expand
    await expect(sidebarContent).toBeVisible();
    await expect(sidebar).toHaveCSS("width", "256px");
  });

  test("should maintain collapse trigger visibility", async ({ page }) => {
    // The collapse trigger should always be visible regardless of collapse state
    const collapseTrigger = page.getByTestId("collapse-trigger");

    // Check in expanded state
    await expect(collapseTrigger).toBeVisible();

    // Collapse and check again
    await collapseTrigger.click();
    await waitForLayoutStable(page);
    await expect(collapseTrigger).toBeVisible();
  });

  test("should handle navigation items visibility correctly", async ({
    page,
  }) => {
    // Arrange
    const collapseTrigger = page.getByTestId("collapse-trigger");
    const navLinks = page.locator("nav a");
    const navIcons = navLinks.locator("svg");
    const navTexts = navLinks.locator(".jun-edgeUncollapsed-visible");

    // Initial state - all visible
    await expect(navIcons.first()).toBeVisible();
    await expect(navTexts.first()).toBeVisible();

    // Act - Collapse
    await collapseTrigger.click();
    await waitForLayoutStable(page);

    // Assert - Only icons visible
    await expect(navIcons.first()).toBeVisible();
    await expect(navTexts.first()).not.toBeVisible();

    // Verify nav items are still clickable
    const firstNavItem = navLinks.first();
    await expect(firstNavItem).toBeVisible();
    await expect(firstNavItem).toBeEnabled();
  });
});

test.describe("Edge Sidebar Collapse Tests - Mobile", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/e2e/edge-sidebar-collapse");
    await waitForLayoutStable(page);
  });

  test("should handle collapse on mobile viewport", async ({ page }) => {
    // Arrange
    const collapseTrigger = page.getByTestId("collapse-trigger");
    const sidebar = page.getByTestId("sidebar-collapsible");

    // Should still be functional on mobile
    await expect(collapseTrigger).toBeVisible();

    // Act - Collapse
    await collapseTrigger.click();
    await waitForLayoutStable(page);

    // Assert
    const sidebarState = await getSidebarState(page);
    expect(sidebarState.isCollapsed).toBe(true);

    // Verify collapsed width is applied
    await expect(sidebar).toHaveCSS("width", "80px");
  });
});
