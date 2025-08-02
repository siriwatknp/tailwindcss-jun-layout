import { Page, expect } from "@playwright/test";

/**
 * Wait for all CSS transitions and animations to complete
 * This is better than hard waits as it dynamically checks for animations
 * @param page - Playwright page object
 * @param timeout - Maximum time to wait for animations to complete (default: 1000ms)
 */
export async function waitForLayoutStable(page: Page, timeout = 1000) {
  // Wait a short time for transitions to start
  await page.waitForTimeout(100);

  // Wait for all animations to complete
  await page.waitForFunction(
    () => {
      const animations = document.getAnimations();
      return animations.length === 0;
    },
    { timeout },
  );

  // Additional short wait to ensure layout has settled
  await page.waitForTimeout(100);
}

/**
 * Get the current state of a sidebar (open/closed/collapsed)
 * Checks both CSS classes and computed styles to determine actual state
 * @param page - Playwright page object
 * @param side - Which sidebar to check ("left" or "right")
 * @returns Object with sidebar state properties
 */
export async function getSidebarState(
  page: Page,
  side: "left" | "right" = "left",
): Promise<{
  isOpen: boolean;
  isCollapsed: boolean;
  isPermanent: boolean;
  isDrawer: boolean;
}> {
  const selector = side === "left" ? ".jun-edgeSidebar" : ".jun-edgeSidebarR";
  const sidebar = page.locator(selector).first();

  // Check if sidebar exists
  const exists = (await sidebar.count()) > 0;
  if (!exists) {
    return {
      isOpen: false,
      isCollapsed: false,
      isPermanent: false,
      isDrawer: false,
    };
  }

  // Get classes
  const className = (await sidebar.getAttribute("class")) || "";

  // Check drawer state from sidebar's data attribute, not body
  const drawerOpen = await sidebar.getAttribute("data-drawer-open");
  const isDrawerOpen = drawerOpen !== null;
  
  // Check collapsed state from data attribute
  const isCollapsed = await sidebar.getAttribute("data-edge-collapsed");
  const isCollapsedState = isCollapsed !== null;

  // Check if the sidebar content is actually visible
  const isVisible = await sidebar.evaluate((el) => {
    const rect = el.getBoundingClientRect();
    const style = window.getComputedStyle(el);

    // Check if element is visible
    return (
      rect.width > 0 &&
      rect.height > 0 &&
      style.display !== "none" &&
      style.visibility !== "hidden" &&
      style.opacity !== "0"
    );
  });

  // Check if sidebar is in permanent mode (considering responsive variants)
  const computedPosition = await sidebar.evaluate((el) => {
    return window.getComputedStyle(el).position;
  });

  // In permanent mode, sidebar has position: sticky or relative
  // In drawer mode, sidebar has position: fixed
  const isCurrentlyPermanent =
    computedPosition === "sticky" || computedPosition === "relative";

  // For sidebars with both classes, the active mode depends on viewport
  const hasDrawerClass = className.includes("drawer");
  const hasPermanentClass = className.includes("permanent");

  return {
    isOpen:
      isDrawerOpen ||
      (isCurrentlyPermanent &&
        isVisible &&
        !className.includes("permanent-hidden")),
    isCollapsed: isCollapsedState,
    isPermanent: hasPermanentClass,
    isDrawer: hasDrawerClass,
  };
}

/**
 * Trigger a specific breakpoint by resizing the viewport
 * Useful for testing responsive behavior
 * @param page - Playwright page object
 * @param breakpoint - Named breakpoint or "mobile"
 */
export async function triggerBreakpoint(
  page: Page,
  breakpoint: "sm" | "md" | "lg" | "xl" | "2xl" | "mobile",
) {
  const breakpoints = {
    mobile: { width: 375, height: 667 },
    sm: { width: 640, height: 900 },
    md: { width: 768, height: 1024 },
    lg: { width: 1024, height: 768 },
    xl: { width: 1280, height: 800 },
    "2xl": { width: 1536, height: 900 },
  };

  await page.setViewportSize(breakpoints[breakpoint]);
  await waitForLayoutStable(page);
}

/**
 * Validate the basic layout structure
 * Checks for presence of header, footer, sidebars, etc.
 * @param page - Playwright page object
 * @returns Object with boolean flags for each layout component
 */
export async function validateLayoutStructure(page: Page) {
  // Check for main layout container
  await expect(page.locator(".jun-layout")).toBeVisible();

  // Check for essential layout parts
  const header = page.locator(".jun-header");
  const content = page.locator(".jun-content");

  // At least content should be present
  await expect(content).toBeVisible();

  // Return structure info
  return {
    hasHeader: (await header.count()) > 0,
    hasFooter: (await page.locator(".jun-footer").count()) > 0,
    hasLeftSidebar: (await page.locator(".jun-edgeSidebar").count()) > 0,
    hasRightSidebar: (await page.locator(".jun-edgeSidebarR").count()) > 0,
    hasInsetSidebar:
      (await page.locator('[class*="jun-insetSidebar"]').count()) > 0,
  };
}

/**
 * Click on a sidebar trigger button
 * Handles both left and right sidebar triggers
 * @param page - Playwright page object
 * @param side - Which sidebar trigger to click ("left" or "right")
 */
export async function clickSidebarTrigger(
  page: Page,
  side: "left" | "right" = "left",
) {
  const triggerSelector =
    side === "left"
      ? '[data-trigger-edge-drawer="left"], [onclick*="triggerEdgeDrawer"]'
      : '[data-trigger-edge-drawer="right"], [onclick*="triggerEdgeDrawerRight"]';

  const trigger = page.locator(triggerSelector).first();
  await trigger.click();
  await waitForLayoutStable(page);
}

/**
 * Measure layout performance metrics
 * Captures timing data for animations and paint events
 * @param page - Playwright page object
 * @param action - Async function to measure
 * @returns Performance metrics object
 */
export async function measurePerformance(
  page: Page,
  action: () => Promise<void>,
) {
  // Mark start
  await page.evaluate(() => window.performance.mark("action-start"));

  // Perform action
  await action();

  // Mark end and measure
  const metrics = await page.evaluate(() => {
    window.performance.mark("action-end");
    window.performance.measure("action-duration", "action-start", "action-end");

    const measure = window.performance.getEntriesByName("action-duration")[0];
    const paintEntries = window.performance.getEntriesByType("paint");

    return {
      duration: measure ? measure.duration : 0,
      firstPaint:
        paintEntries.find((e) => e.name === "first-paint")?.startTime || 0,
      firstContentfulPaint:
        paintEntries.find((e) => e.name === "first-contentful-paint")
          ?.startTime || 0,
    };
  });

  return metrics;
}

/**
 * Check if an element is in viewport
 * Useful for testing sticky headers and scroll behavior
 * @param page - Playwright page object
 * @param selector - CSS selector for the element
 * @returns Boolean indicating if element is fully in viewport
 */
export async function isInViewport(
  page: Page,
  selector: string,
): Promise<boolean> {
  return await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= window.innerHeight &&
      rect.right <= window.innerWidth
    );
  }, selector);
}

/**
 * Get computed CSS variable value
 * Note: Prefer testing computed styles over CSS variables when possible
 * @param page - Playwright page object
 * @param varName - CSS variable name (e.g., "--jun-header-height")
 * @returns The computed value of the CSS variable
 */
export async function getCSSVariable(
  page: Page,
  varName: string,
): Promise<string> {
  return await page.evaluate((name) => {
    return getComputedStyle(document.documentElement).getPropertyValue(name);
  }, varName);
}

/**
 * Get the current state of the dock navigation
 * @param page - Playwright page object
 * @returns Object with dock state or null if no dock exists
 */
export async function getDockState(page: Page) {
  const dock = page.locator(".jun-dock");
  const exists = (await dock.count()) > 0;

  if (!exists) return null;

  const className = (await dock.getAttribute("class")) || "";

  return {
    isFloat: className.includes("jun-dock-float"),
    isVisible: await dock.isVisible(),
  };
}
