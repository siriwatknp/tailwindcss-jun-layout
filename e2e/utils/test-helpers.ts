import { Page, expect } from "@playwright/test";

/**
 * Wait for all CSS transitions and animations to complete
 */
export async function waitForLayoutStable(page: Page, timeout = 1000) {
  // Wait for any CSS transitions to complete
  await page.waitForTimeout(300); // Standard CSS transition time

  // Wait for no animations
  await page.waitForFunction(
    () => {
      const animations = document.getAnimations();
      return animations.length === 0;
    },
    { timeout },
  );
}

/**
 * Get the current state of a sidebar (open/closed/collapsed)
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
  const selector =
    side === "left"
      ? '.jun-edgeSidebar'
      : '.jun-edgeSidebarR';
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

  // Check drawer state from data attribute
  const drawerOpen = await page
    .locator("body")
    .getAttribute("data-drawer-open");
  const isDrawerOpen = drawerOpen === side || drawerOpen === "both";

  return {
    isOpen: isDrawerOpen || className.includes("permanent-visible"),
    isCollapsed: className.includes("collapsed"),
    isPermanent: className.includes("permanent"),
    isDrawer: className.includes("drawer"),
  };
}

/**
 * Trigger a specific breakpoint by resizing the viewport
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
    hasLeftSidebar:
      (await page.locator('.jun-edgeSidebar').count()) > 0,
    hasRightSidebar:
      (await page.locator('.jun-edgeSidebarR').count()) > 0,
    hasInsetSidebar:
      (await page.locator('[class*="jun-insetSidebar"]').count()) > 0,
  };
}

/**
 * Click on a sidebar trigger button
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
 * Test utilities for dock navigation
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
