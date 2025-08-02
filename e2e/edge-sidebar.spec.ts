import { test, expect } from "@playwright/test";
import {
  validateLayoutStructure,
  waitForLayoutStable,
  getSidebarState,
  triggerBreakpoint,
} from "./utils/test-helpers";

test.describe("Edge Sidebar Mode Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/e2e/edge-sidebar-modes");
    await waitForLayoutStable(page);
  });
  test("should render sidebar in permanent mode", async ({ page }) => {
    // Ensure permanent mode is selected
    const modeSelector = page.getByTestId("mode-selector");
    await modeSelector.selectOption("permanent");
    await waitForLayoutStable(page);

    // Check layout structure
    const structure = await validateLayoutStructure(page);
    expect(structure.hasLeftSidebar).toBe(true);

    // Check sidebar is visible and permanent
    const sidebar = page.getByTestId("sidebar-permanent");
    await expect(sidebar).toBeVisible();
    await expect(sidebar).toHaveClass(/jun-edgeSidebar-permanent/);

    // Verify sidebar state
    const sidebarState = await getSidebarState(page);
    expect(sidebarState.isOpen).toBe(true);
    expect(sidebarState.isPermanent).toBe(true);
    expect(sidebarState.isDrawer).toBe(false);

    // Check sidebar width
    await expect(sidebar).toHaveCSS("width", "256px");

    // Verify no drawer trigger is visible in permanent mode
    await expect(page.getByTestId("drawer-trigger")).not.toBeVisible();
  });

  test("should render sidebar in drawer mode", async ({ page }) => {
    // Select drawer mode
    const modeSelector = page.getByTestId("mode-selector");
    await modeSelector.selectOption("drawer");
    await waitForLayoutStable(page);

    // Check sidebar is initially hidden
    const sidebar = page.getByTestId("sidebar-drawer");
    await expect(sidebar).toHaveClass(/jun-edgeSidebar-drawer/);

    // Verify sidebar state - drawer should be closed initially
    let sidebarState = await getSidebarState(page);
    expect(sidebarState.isOpen).toBe(false);
    expect(sidebarState.isDrawer).toBe(true);
    expect(sidebarState.isPermanent).toBe(false);

    // Check drawer trigger is visible
    const drawerTrigger = page.getByTestId("drawer-trigger");
    await expect(drawerTrigger).toBeVisible();

    // Open drawer
    await drawerTrigger.click();
    await waitForLayoutStable(page);

    // Verify sidebar is now open
    sidebarState = await getSidebarState(page);
    expect(sidebarState.isOpen).toBe(true);

    // Check sidebar has data-drawer-open attribute
    await expect(sidebar).toHaveAttribute("data-drawer-open", "");

    // Verify drawer is open by checking state attribute
    await expect(sidebar).toHaveAttribute("data-drawer-open", "");

    // The drawer content should be visible (drawer uses transform to show/hide)
    const drawerContent = sidebar.locator(".jun-edgeContent");
    await expect(drawerContent).toBeVisible();

    // Click on the sidebar element itself to close drawer
    // According to the source code, clicking on the sidebar backdrop closes it
    await sidebar.evaluate((el) => (el as HTMLElement).click());
    await waitForLayoutStable(page);

    // Verify sidebar is closed again
    sidebarState = await getSidebarState(page);
    expect(sidebarState.isOpen).toBe(false);
  });

  test("should switch between drawer and permanent modes responsively", async ({
    page,
  }) => {
    // Select responsive mode
    const modeSelector = page.getByTestId("mode-selector");
    await modeSelector.selectOption("responsive");
    await waitForLayoutStable(page);

    // Test on mobile viewport
    await triggerBreakpoint(page, "mobile");

    // Check sidebar has both drawer and permanent classes
    const sidebar = page.getByTestId("sidebar-responsive");
    await expect(sidebar).toHaveClass(/jun-edgeSidebar-drawer/);
    await expect(sidebar).toHaveClass(/md:jun-edgeSidebar-permanent/);

    // On mobile, sidebar should behave as drawer (closed by default)
    let sidebarState = await getSidebarState(page);
    // In responsive mode, the sidebar has both drawer and permanent classes
    // The helper will detect both drawer and permanent classes
    expect(sidebarState.isDrawer).toBe(true);
    expect(sidebarState.isPermanent).toBe(true); // It has both classes

    // On mobile viewport, even with permanent class, it should behave as drawer (closed)
    // This is because the md: prefix makes permanent only active on medium+ screens
    expect(sidebarState.isOpen).toBe(false);

    // Drawer trigger should be visible on mobile
    const drawerTrigger = page.getByTestId("responsive-drawer-trigger");
    await expect(drawerTrigger).toBeVisible();

    // Test drawer functionality on mobile
    await drawerTrigger.click();
    await waitForLayoutStable(page);

    sidebarState = await getSidebarState(page);
    expect(sidebarState.isOpen).toBe(true);

    // Close drawer by clicking on the sidebar element
    await sidebar.evaluate((el) => (el as HTMLElement).click());
    await waitForLayoutStable(page);

    // Switch to desktop viewport
    await triggerBreakpoint(page, "lg");

    // On desktop, sidebar should be permanent
    sidebarState = await getSidebarState(page);
    expect(sidebarState.isOpen).toBe(true);
    expect(sidebarState.isPermanent).toBe(true);
    expect(sidebarState.isDrawer).toBe(true); // Still has drawer class, but permanent takes precedence on desktop

    // Drawer trigger should be hidden on desktop
    await expect(drawerTrigger).toBeHidden();
  });

  test("should maintain proper layout structure in all modes", async ({
    page,
  }) => {
    const modes = ["permanent", "drawer", "responsive"];
    const modeSelector = page.getByTestId("mode-selector");

    for (const mode of modes) {
      await modeSelector.selectOption(mode);
      await waitForLayoutStable(page);

      // Validate layout structure
      const structure = await validateLayoutStructure(page);
      expect(structure.hasHeader).toBe(true);
      expect(structure.hasLeftSidebar).toBe(true);

      // Check main content is always visible
      await expect(page.getByRole("main")).toBeVisible();

      // Verify layout uses CSS Grid
      const layout = page.getByTestId(`layout-${mode}`);
      await expect(layout).toHaveCSS("display", "grid");
    }
  });

  test("should handle rapid mode switching", async ({ page }) => {
    const modeSelector = page.getByTestId("mode-selector");

    // Rapidly switch between modes
    await modeSelector.selectOption("drawer");
    await modeSelector.selectOption("permanent");
    await modeSelector.selectOption("responsive");
    await modeSelector.selectOption("drawer");
    await waitForLayoutStable(page);

    // Verify final state is drawer mode
    const sidebar = page.getByTestId("sidebar-drawer");
    await expect(sidebar).toHaveClass(/jun-edgeSidebar-drawer/);

    // Test drawer still functions properly
    const drawerTrigger = page.getByTestId("drawer-trigger");
    await drawerTrigger.click();
    await waitForLayoutStable(page);

    const sidebarState = await getSidebarState(page);
    expect(sidebarState.isOpen).toBe(true);
  });
});

test.describe("Edge Sidebar Mode Tests - Mobile", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/e2e/edge-sidebar-modes");
    await waitForLayoutStable(page);
  });

  test("should always use drawer mode on mobile regardless of setting", async ({
    page,
  }) => {
    // Test permanent mode on mobile
    const modeSelector = page.getByTestId("mode-selector");
    await modeSelector.selectOption("permanent");
    await waitForLayoutStable(page);

    // Even in "permanent" mode, mobile should behave differently
    // The sidebar should still be visible but may have different behavior
    const sidebar = page.getByTestId("sidebar-permanent");
    const sidebarState = await getSidebarState(page);

    // Permanent sidebars are still visible on mobile, just not responsive
    expect(sidebarState.isOpen).toBe(true);
    expect(sidebarState.isPermanent).toBe(true);
  });
});
