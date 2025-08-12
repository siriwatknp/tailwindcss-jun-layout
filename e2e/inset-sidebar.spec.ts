import { test, expect } from "@playwright/test";
import {
  validateLayoutStructure,
  waitForLayoutStable,
  triggerBreakpoint,
} from "./utils/test-helpers";

test.describe("Inset Sidebar Positioning Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/e2e/inset-sidebar");
    await waitForLayoutStable(page);
  });

  test("should render inset sidebar with sticky positioning by default", async ({
    page,
  }) => {
    // Default should be sticky
    const sidebar = page.getByTestId("inset-sidebar-right");
    await expect(sidebar).toBeVisible();

    // Check it has the insetSidebar class (sticky is default, no modifier needed)
    await expect(sidebar).toHaveClass(/jun-insetSidebar/);
    await expect(sidebar).not.toHaveClass(/jun-insetSidebar-fixed/);
    await expect(sidebar).not.toHaveClass(/jun-insetSidebar-absolute/);

    // Verify sidebar content
    await expect(page.getByTestId("sidebar-content-right")).toBeVisible();
    await expect(page.getByTestId("sidebar-content-right")).toContainText(
      "Position: sticky"
    );

    // Check that sidebar sticks when scrolling
    await page.evaluate(() => window.scrollBy(0, 1000));
    await page.waitForTimeout(100);
    const afterScrollPosition = await sidebar.boundingBox();

    // Sticky sidebar should maintain its position relative to viewport when scrolling
    // `48` is the height of the header
    expect(afterScrollPosition?.y).toEqual(48);
  });

  test("should apply fixed positioning when selected", async ({ page }) => {
    // Select fixed positioning
    const positionSelector = page.getByTestId("position-selector");
    await positionSelector.selectOption("fixed");
    await waitForLayoutStable(page);

    const sidebar = page.getByTestId("inset-content-right");
    await expect(sidebar).toBeVisible();

    // Verify content shows fixed position
    await expect(page.getByTestId("sidebar-content-right")).toContainText(
      "Position: fixed"
    );

    // Fixed sidebar should stay in exact same position when scrolling
    const initialPosition = await sidebar.boundingBox();
    await page.evaluate(() => window.scrollBy(0, 400));
    await page.waitForTimeout(100);
    const afterScrollPosition = await sidebar.boundingBox();

    // Fixed position should not change at all
    expect(initialPosition!.y).toBe(afterScrollPosition!.y);
  });

  test("should apply absolute positioning for standalone layout", async ({
    page,
  }) => {
    // Select absolute positioning
    const positionSelector = page.getByTestId("position-selector");
    await positionSelector.selectOption("absolute");
    await waitForLayoutStable(page);

    const sidebar = page.getByTestId("inset-sidebar-right");
    await expect(sidebar).toBeVisible();

    // Check it has the absolute modifier class
    await expect(sidebar).toHaveClass(/jun-insetSidebar-absolute/);

    // Verify content shows absolute position
    await expect(page.getByTestId("sidebar-content-right")).toContainText(
      "Position: absolute"
    );

    // Check that layout is in standalone mode
    const layout = page.getByTestId("layout-absolute");
    await expect(layout).toHaveClass(/jun-layout-standalone/);

    // Footer should be visible with insetAvoidingView
    const footer = page.getByTestId("footer");
    await expect(footer).toBeVisible();
    await expect(footer.locator(".jun-insetAvoidingView")).toBeVisible();
  });

  test("should switch sidebar position between left and right", async ({
    page,
  }) => {
    // Initially on right
    let sidebar = page.getByTestId("inset-sidebar-right");
    await expect(sidebar).toBeVisible();
    await expect(page.getByTestId("inset-sidebar-left")).not.toBeVisible();

    // Switch to left
    const positionSelector = page.getByTestId("sidebar-position-selector");
    await positionSelector.selectOption("left");
    await waitForLayoutStable(page);

    // Now should be on left
    sidebar = page.getByTestId("inset-sidebar-left");
    await expect(sidebar).toBeVisible();
    await expect(page.getByTestId("inset-sidebar-right")).not.toBeVisible();

    // Verify left sidebar content
    await expect(page.getByTestId("sidebar-content-left")).toBeVisible();
    await expect(page.getByTestId("sidebar-content-left")).toContainText(
      "Left Inset Sidebar"
    );
  });
});

test.describe("Inset Sidebar Width Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/e2e/inset-sidebar");
    await waitForLayoutStable(page);
  });

  test("should change sidebar width based on selection", async ({ page }) => {
    const sidebar = page.getByTestId("inset-sidebar-right");
    const widthSelector = page.getByTestId("width-selector");

    // Test different widths
    const widths = ["200px", "300px", "400px", "256px"];

    for (const width of widths) {
      await widthSelector.selectOption(width);
      await waitForLayoutStable(page);

      // Check inline style is applied
      const styleWidth = await sidebar.evaluate((el) => el.style.width);
      expect(styleWidth).toBe(width);

      // Verify content shows correct width
      await expect(page.getByTestId("sidebar-content-right")).toContainText(
        `Width: ${width}`
      );

      // Check actual computed width
      const box = await sidebar.boundingBox();
      expect(box!.width).toBe(parseInt(width));
    }
  });

  test("should maintain width when changing position modes", async ({
    page,
  }) => {
    const widthSelector = page.getByTestId("width-selector");
    const positionSelector = page.getByTestId("position-selector");

    // Set a specific width
    await widthSelector.selectOption("300px");
    await waitForLayoutStable(page);

    // Test width is maintained across all position modes
    const positions = ["sticky", "fixed", "absolute"];

    for (const position of positions) {
      await positionSelector.selectOption(position);
      await waitForLayoutStable(page);

      const sidebar = page.getByTestId("inset-sidebar-right");
      const styleWidth = await sidebar.evaluate((el) => el.style.width);
      expect(styleWidth).toBe("300px");

      const box = await sidebar.boundingBox();
      expect(box!.width).toBe(300);
    }
  });
});

test.describe("Inset Sidebar Content Integration", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/e2e/inset-sidebar");
    await waitForLayoutStable(page);
  });

  test("should properly integrate with main content area", async ({ page }) => {
    // Check layout structure
    const structure = await validateLayoutStructure(page);
    expect(structure.hasHeader).toBe(true);

    // Check main content and sidebar are siblings
    const mainContent = page.getByTestId("main-content");
    await expect(mainContent).toBeVisible();

    // Content area and sidebar should both be visible
    const contentArea = page.getByTestId("content-area");
    const sidebar = page.getByTestId("inset-sidebar-right");

    await expect(contentArea).toBeVisible();
    await expect(sidebar).toBeVisible();

    // Check they don't overlap
    const contentBox = await contentArea.boundingBox();
    const sidebarBox = await sidebar.boundingBox();

    // Sidebar should be to the right of content (no overlap)
    expect(sidebarBox!.x).toBeGreaterThanOrEqual(
      contentBox!.x + contentBox!.width
    );
  });

  test("should handle sidebar on both left and right positions", async ({
    page,
  }) => {
    const positionSelector = page.getByTestId("sidebar-position-selector");

    // Test left position
    await positionSelector.selectOption("left");
    await waitForLayoutStable(page);

    const leftSidebar = page.getByTestId("inset-sidebar-left");
    const contentArea = page.getByTestId("content-area");

    await expect(leftSidebar).toBeVisible();
    await expect(contentArea).toBeVisible();

    // Check left sidebar is actually on the left
    const leftBox = await leftSidebar.boundingBox();
    const contentBox = await contentArea.boundingBox();

    expect(leftBox!.x).toBeLessThan(contentBox!.x);
    expect(leftBox!.x + leftBox!.width).toBeLessThanOrEqual(contentBox!.x);

    // Test right position
    await positionSelector.selectOption("right");
    await waitForLayoutStable(page);

    const rightSidebar = page.getByTestId("inset-sidebar-right");

    await expect(rightSidebar).toBeVisible();

    // Check right sidebar is actually on the right
    const rightBox = await rightSidebar.boundingBox();
    const contentBox2 = await contentArea.boundingBox();

    expect(rightBox!.x).toBeGreaterThan(contentBox2!.x);
    expect(rightBox!.x).toBeGreaterThanOrEqual(
      contentBox2!.x + contentBox2!.width
    );
  });
});

test.describe("Inset Sidebar Responsive Tests", () => {
  test("should hide sidebar on mobile viewport", async ({ page }) => {
    await page.goto("/e2e/inset-sidebar");
    await waitForLayoutStable(page);

    // Check responsive sidebar section
    const responsiveSidebar = page.getByTestId("inset-sidebar-responsive");

    // Desktop viewport - should be visible
    await expect(responsiveSidebar).toBeVisible();

    // Switch to mobile viewport
    await triggerBreakpoint(page, "mobile");

    // Should be hidden on mobile (has hidden class)
    await expect(responsiveSidebar).toHaveClass(/hidden/);
    await expect(responsiveSidebar).not.toBeVisible();
  });

  test("should show sidebar with correct width on tablet", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 }); // Tablet size
    await page.goto("/e2e/inset-sidebar");
    await waitForLayoutStable(page);

    const responsiveSidebar = page.getByTestId("inset-sidebar-responsive");

    // Should be visible on tablet
    await expect(responsiveSidebar).toBeVisible();
    await expect(responsiveSidebar).toHaveClass(/md:block/);

    // Should have tablet width (200px)
    await expect(responsiveSidebar).toHaveClass(/jun-insetSidebar-w-\[200px\]/);
  });

  test("should show sidebar with correct width on desktop", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 }); // Desktop size
    await page.goto("/e2e/inset-sidebar");
    await waitForLayoutStable(page);

    const responsiveSidebar = page.getByTestId("inset-sidebar-responsive");

    // Should be visible on desktop
    await expect(responsiveSidebar).toBeVisible();

    // Should have desktop width (300px)
    await expect(responsiveSidebar).toHaveClass(
      /lg:jun-insetSidebar-w-\[300px\]/
    );
  });

  test("should handle viewport transitions smoothly", async ({ page }) => {
    await page.goto("/e2e/inset-sidebar");
    await waitForLayoutStable(page);

    const responsiveSidebar = page.getByTestId("inset-sidebar-responsive");

    // Start at desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await waitForLayoutStable(page);
    await expect(responsiveSidebar).toBeVisible();

    // Transition to tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await waitForLayoutStable(page);
    await expect(responsiveSidebar).toBeVisible();

    // Transition to mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await waitForLayoutStable(page);
    await expect(responsiveSidebar).not.toBeVisible();

    // Back to desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await waitForLayoutStable(page);
    await expect(responsiveSidebar).toBeVisible();
  });
});

test.describe("Inset Sidebar Absolute Mode with Footer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/e2e/inset-sidebar");
    await waitForLayoutStable(page);
  });

  test("should properly handle absolute sidebar with footer avoidance", async ({
    page,
  }) => {
    // Select absolute positioning
    const positionSelector = page.getByTestId("position-selector");
    await positionSelector.selectOption("absolute");
    await waitForLayoutStable(page);

    // Check footer exists and has avoidance view
    const footer = page.getByTestId("footer");
    await expect(footer).toBeVisible();

    const avoidingView = footer.locator(".jun-insetAvoidingView");
    await expect(avoidingView).toBeVisible();

    // Sidebar should extend to bottom but not overlap footer content
    const sidebar = page.getByTestId("inset-sidebar-right");
    const sidebarBox = await sidebar.boundingBox();
    const footerBox = await footer.boundingBox();

    // Sidebar should extend close to footer
    expect(sidebarBox!.y + sidebarBox!.height).toBeGreaterThanOrEqual(
      footerBox!.y - 10
    );
  });
});
