# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

```bash
# Start development server (port 4444)
pnpm dev

# Build the application
pnpm build

# Start production server
pnpm start
```

### Plugin Development

```bash
# Watch mode for plugin development
pnpm layout:dev

# Build the plugin
pnpm layout:build

# Build and publish the plugin
pnpm layout:release
```

### Code Quality

```bash
# Type checking
pnpm typecheck

# Linting
pnpm lint
pnpm lint:fix

# Code formatting
pnpm format:write
pnpm format:check
```

### E2E Testing

```bash
# Run all E2E tests
pnpm test:e2e

# Run specific test file
pnpm test:e2e e2e/core-layout.spec.ts

# Run tests in UI mode
pnpm test:e2e:ui

# Run tests in debug mode
pnpm test:e2e:debug
```

### Content & Registry

```bash
# Build documentation content
pnpm build:docs

# Build component registry
pnpm build:registry
```

## Architecture

### Project Structure

This is a monorepo containing:

- **Main site**: Next.js 14 documentation site with App Router
- **Plugin package**: `/packages/tailwindcss-jun-layout/` - Core Tailwind CSS plugin
- **Registry**: `/registry/` - Reusable component examples served as JSON

### Jun Layout Plugin

The core plugin provides a comprehensive CSS Grid-based layout system with these main components:

- `.jun-layout` - Root container using CSS Grid
- `.jun-header` - Sticky header with configurable height
- `.jun-content` - Main content area
- `.jun-footer` - Footer with safe area insets
- `.jun-edgeSidebar` / `.jun-edgeSidebarR` - Edge sidebars (left/right) with drawer/permanent modes
- `.jun-insetSidebar-{left|right}` - Content-internal sidebars
- `.jun-dock` - Mobile bottom navigation

Key features:

- Responsive drawer/permanent sidebar switching
- Collapsible sidebars with hover expand
- Nested layout support
- JavaScript API for imperative control
- Mobile-first responsive design

### Important Files

- `/instructions/ai-layout.md` - Comprehensive guide for using Jun Layout components
- `/packages/tailwindcss-jun-layout/index.ts` - Core plugin implementation
- `/content/` - MDX documentation files
- `/registry/default/` - Component examples and templates

### Development Notes

- Uses pnpm as package manager (enforced via preinstall)
- TypeScript with strict mode and path aliases configured
- Content Collections for type-safe MDX processing
- Shadcn/ui component library integration
- E2E tests using Playwright

## E2E Testing Workflow

When writing E2E tests for Jun Layout components, follow [Playwright Best Practices](https://playwright.dev/docs/best-practices):

### 1. Read Documentation First

**IMPORTANT**: Always read the relevant documentation in `/content/docs/` before writing tests:

- `/content/docs/layout.mdx` - Layout component API and modifiers
- `/content/docs/header.mdx` - Header component and clipping behavior
- `/content/docs/edge-sidebar.mdx` - Edge sidebar API (left: `jun-edgeSidebar`, right: `jun-edgeSidebarR`)
- `/content/docs/inset-sidebar.mdx` - Inset sidebar positioning
- `/content/docs/dock.mdx` - Dock navigation component
- `/content/docs/sidebar-elements.mdx` - Sidebar menu structure

### 2. Create Test Pages

Create dedicated test pages in `/app/e2e/[feature-name]/page.tsx` that:

- Use the actual Jun Layout classes as documented
- Include proper component structure (e.g., `jun-edgeContent` wrapper for sidebars)
- Add `data-testid` attributes for test selectors
- Provide interactive controls when testing variants/states

### 3. Write E2E Tests

Create test files in `/e2e/[feature-name].spec.ts` following these best practices:

#### Testing Philosophy

- **Test user-visible behavior**: Focus on what end users see and interact with
- **Test isolation**: Each test must be completely independent
- **No implementation details**: Test behavior, not internal workings
- **Control test data**: Tests should be deterministic and repeatable

#### Locator Best Practices

```typescript
// ✅ GOOD - User-facing attributes
page.getByRole("button", { name: "Submit" });
page.getByTestId("sidebar-trigger");
page.getByText("Welcome");

// ❌ BAD - CSS/XPath selectors
page.locator(".btn-primary");
page.locator('xpath=//button[@class="submit"]');
```

#### Assertions

```typescript
// ✅ GOOD - Web-first assertions (auto-wait and retry)
await expect(page.getByTestId("sidebar")).toBeVisible();
await expect(page.getByRole("button")).toBeEnabled();

// ❌ BAD - Manual assertions without waiting
const isVisible = await page.getByTestId("sidebar").isVisible();
expect(isVisible).toBe(true);
```

#### Test Structure

```typescript
test.describe("Feature Name", () => {
  test.beforeEach(async ({ page }) => {
    // Common setup
    await page.goto("/test-page");
  });

  test("should perform user action", async ({ page }) => {
    // Arrange
    const button = page.getByRole("button", { name: "Open" });

    // Act
    await button.click();

    // Assert
    await expect(page.getByTestId("modal")).toBeVisible();
  });
});
```

#### Responsive Testing

```typescript
// Use multiple viewport configurations
test.describe("Mobile", () => {
  test.use({ viewport: { width: 375, height: 667 } });
  // Mobile-specific tests
});

// Or use custom viewport helper
await triggerBreakpoint(page, "mobile");
```

#### Avoid Common Pitfalls

- **No hard waits**: Use `waitForLayoutStable()` instead of `page.waitForTimeout()`
- **No CSS variables**: Test computed styles, not `--jun-header-height`
- **No brittle selectors**: Use semantic locators over CSS paths
- **No external dependencies**: Mock or control all external data

### 4. Test Organization

- `/e2e/core-layout.spec.ts` - Basic layout structure and variants
- `/e2e/edge-sidebar.spec.ts` - Edge sidebar behaviors (permanent/drawer modes)
- `/e2e/edge-sidebar-collapse.spec.ts` - Collapse/expand behaviors
- `/e2e/responsive.spec.ts` - Breakpoint transitions
- `/e2e/interactions.spec.ts` - User interaction handlers
- `/e2e/accessibility.spec.ts` - Keyboard navigation and ARIA attributes

### 5. Helper Functions

Use and extend `/e2e/utils/test-helpers.ts` for common operations:

```typescript
// Layout validation
validateLayoutStructure(page);

// Sidebar state checks
getSidebarState(page, "left" | "right");

// Responsive testing
triggerBreakpoint(page, "mobile" | "tablet" | "desktop");

// Animation stability
waitForLayoutStable(page);
```

## Git Commit Guidelines

### Commit Message Format

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks
- `perf:` - Performance improvements

Keep commit messages:

- **Concise** - One line summary (50-72 chars)
- **Direct** - Start with verb in imperative mood
- **Clear** - Easy to understand the change
- **No body** - Just the summary line, no additional content

Examples:

- `feat: add edge sidebar drawer mode`
- `fix: correct header clipping behavior`
- `test: add edge sidebar E2E tests with Playwright best practices`
- `docs: update CLAUDE.md with testing guidelines`

Note: Do not include commit body, co-author attribution, or any additional details.

### When to Commit

**Always ask the user as a prompt whether to commit or skip** when it's a good time to commit, such as:

- After completing a feature or significant functionality
- After fixing a bug
- After adding comprehensive tests
- After updating documentation
- When switching context to a different task
- Before making breaking changes
- After code passes linting and type checking

Example prompt: "Ready to commit the changes. Would you like to commit now or skip?"
