import { test, expect } from "@playwright/test";
import {
  validateLayoutStructure,
  waitForLayoutStable,
  getCSSVariable,
} from "./utils/test-helpers";

test.describe("Core Layout Tests", () => {
  test("should render basic layout with header, content, and footer", async ({
    page,
  }) => {
    await page.goto("/e2e/core-layout");
    await waitForLayoutStable(page);

    // Validate basic structure
    const structure = await validateLayoutStructure(page);
    expect(structure.hasHeader).toBe(true);
    expect(structure.hasFooter).toBe(true);

    // Check visibility of main components
    await expect(page.getByTestId("header")).toBeVisible();
    await expect(page.getByTestId("content")).toBeVisible();
    await expect(page.getByTestId("footer")).toBeVisible();

    // Verify layout uses CSS Grid
    const layoutDisplay = await page
      .locator(".jun-layout")
      .evaluate((el) => window.getComputedStyle(el).display);
    expect(layoutDisplay).toBe("grid");

    // Check header is sticky
    const headerPosition = await page
      .getByTestId("header")
      .evaluate((el) => window.getComputedStyle(el).position);
    expect(headerPosition).toBe("sticky");
  });

  test("should handle different layout variants", async ({ page }) => {
    await page.goto("/e2e/layout-variants");
    await waitForLayoutStable(page);

    const variantSelector = page.getByTestId("variant-selector");
    const layoutContainer = page.getByTestId("layout-container");

    // Test default variant
    await expect(layoutContainer).toHaveClass(/jun-layout/);
    await expect(layoutContainer).not.toHaveClass(/jun-layout-standalone/);

    // Test standalone variant
    await variantSelector.selectOption("standalone");
    await waitForLayoutStable(page);
    await expect(layoutContainer).toHaveClass(/jun-layout-standalone/);

    // Verify standalone mode affects overflow
    const contentOverflow = await page
      .getByTestId("content")
      .evaluate((el) => window.getComputedStyle(el).overflow);
    expect(["auto", "scroll"]).toContain(contentOverflow);

    // Test no transition variant
    await variantSelector.selectOption("noTransition");
    await waitForLayoutStable(page);
    await expect(layoutContainer).toHaveClass(/jun-layout-noTransition/);

    // Test custom height variant
    await variantSelector.selectOption("customHeight");
    await waitForLayoutStable(page);
    await expect(layoutContainer).toHaveClass(/jun-layout-h-\[600px\]/);

    // Verify custom height is applied as min-height (not fixed height for non-standalone)
    const layoutMinHeight = await layoutContainer.evaluate(
      (el) => window.getComputedStyle(el).minHeight
    );
    expect(layoutMinHeight).toBe("600px");
  });

  test("should handle layout height correctly with standalone mode", async ({
    page,
  }) => {
    await page.goto("/e2e/layout-height");
    await waitForLayoutStable(page);

    const standaloneCheckbox = page.getByTestId("standalone-checkbox");
    const customHeightCheckbox = page.getByTestId("custom-height-checkbox");
    const layoutContainer = page.getByTestId("layout-container");

    // Test 1: Default layout (no standalone, no custom height)
    // Should have min-height but not fixed height
    let computedStyle = await layoutContainer.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        height: styles.height,
        minHeight: styles.minHeight,
      };
    });
    expect(computedStyle.height).not.toBe("500px");
    expect(parseFloat(computedStyle.minHeight)).toBeGreaterThan(0);

    // Test 2: Custom height without standalone
    // Should set min-height to 500px
    await customHeightCheckbox.check();
    await waitForLayoutStable(page);

    computedStyle = await layoutContainer.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        height: styles.height,
        minHeight: styles.minHeight,
      };
    });
    expect(computedStyle.minHeight).toBe("500px");

    // Test 3: Standalone mode without custom height
    // Should have fixed height (viewport height)
    await customHeightCheckbox.uncheck();
    await standaloneCheckbox.check();
    await waitForLayoutStable(page);

    await expect(layoutContainer).toHaveClass(/jun-layout-standalone/);

    // Test 4: Standalone mode with custom height
    // Should have fixed height of 500px
    await customHeightCheckbox.check();
    await waitForLayoutStable(page);

    computedStyle = await layoutContainer.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        height: styles.height,
        minHeight: styles.minHeight,
      };
    });
    expect(computedStyle.height).toBe("500px");
  });

  test("should handle header height variants", async ({ page }) => {
    await page.goto("/e2e/layout-variants");
    await waitForLayoutStable(page);

    const header = page.getByTestId("header");

    // Check custom header height class
    await expect(header).toHaveClass(/jun-header-h-\[64px\]/);

    // Verify computed height
    const headerHeight = await header.evaluate(
      (el) => window.getComputedStyle(el).height
    );
    expect(headerHeight).toBe("64px");
  });

  test("should handle header clipping correctly", async ({ page }) => {
    await page.goto("/e2e/header-clipping");
    await waitForLayoutStable(page);

    const viewportWidth = page.viewportSize()?.width || 1280;

    // Test no clipping - header should span full viewport width
    const headerNoClip = page.getByTestId("header-no-clip");
    const noClipWidth = await headerNoClip.evaluate(
      (el) => el.getBoundingClientRect().width
    );
    expect(noClipWidth).toBe(viewportWidth);

    // Test both sides clipped - header should span full viewport width (covers sidebars)
    const headerClipBoth = page.getByTestId("header-clip-both");
    await expect(headerClipBoth).toHaveClass(/jun-header-clip/);
    const clipBothWidth = await headerClipBoth.evaluate(
      (el) => el.getBoundingClientRect().width
    );
    expect(clipBothWidth).toBe(viewportWidth);

    // Verify header is above sidebars (higher z-index)
    const headerBothZIndex = await headerClipBoth.evaluate(
      (el) => window.getComputedStyle(el).zIndex
    );
    const leftSidebar = page.locator(".jun-edgeSidebar").nth(1);
    const sidebarZIndex = await leftSidebar.evaluate(
      (el) => window.getComputedStyle(el).zIndex
    );
    expect(parseInt(headerBothZIndex) || 0).toBeGreaterThan(
      parseInt(sidebarZIndex) || 0
    );

    // Test left side clipped - header should span full viewport width
    const headerClipLeft = page.getByTestId("header-clip-left");
    await expect(headerClipLeft).toHaveClass(/jun-header-clip-left/);
    const clipLeftWidth = await headerClipLeft.evaluate(
      (el) => el.getBoundingClientRect().width
    );
    expect(clipLeftWidth).toBe(viewportWidth);

    // Test right side clipped - header should span full viewport width
    const headerClipRight = page.getByTestId("header-clip-right");
    await expect(headerClipRight).toHaveClass(/jun-header-clip-right/);
    const clipRightWidth = await headerClipRight.evaluate(
      (el) => el.getBoundingClientRect().width
    );
    expect(clipRightWidth).toBe(viewportWidth);
  });

  test("should maintain proper z-index stacking", async ({ page }) => {
    await page.goto("/e2e/core-layout");
    await waitForLayoutStable(page);

    // Check header z-index
    const headerZIndex = await page
      .getByTestId("header")
      .evaluate((el) => window.getComputedStyle(el).zIndex);
    expect(parseInt(headerZIndex)).toBeGreaterThan(0);

    // Check content z-index is lower than header
    const contentZIndex = await page
      .getByTestId("content")
      .evaluate((el) => window.getComputedStyle(el).zIndex);
    expect(contentZIndex).toBe("auto");
  });

});

test.describe("Core Layout Responsive Tests", () => {
  test("should adapt layout for mobile viewport", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/e2e/core-layout");
    await waitForLayoutStable(page);

    // Verify layout still works on mobile
    const structure = await validateLayoutStructure(page);
    expect(structure.hasHeader).toBe(true);
    expect(structure.hasFooter).toBe(true);

    // Check that layout maintains structure
    await expect(page.getByTestId("header")).toBeVisible();
    await expect(page.getByTestId("content")).toBeVisible();
    await expect(page.getByTestId("footer")).toBeVisible();
  });

  test("should handle no transition variant", async ({ page }) => {
    await page.goto("/e2e/layout-variants");

    const variantSelector = page.getByTestId("variant-selector");
    await variantSelector.selectOption("noTransition");
    await waitForLayoutStable(page);

    // Check that no transition classes are applied
    const layoutContainer = page.getByTestId("layout-container");
    await expect(layoutContainer).toHaveClass(/jun-layout-noTransition/);

    // Verify transitions are disabled
    const footer = page.getByTestId("footer");
    const footerTransition = await footer.evaluate(
      (el) => window.getComputedStyle(el).transition
    );
    // When noTransition is applied, transitions should be set to "none"
    expect(footerTransition).toContain("none");
  });
});
