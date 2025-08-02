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

When writing E2E tests for Jun Layout components:

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
Create test files in `/e2e/[feature-name].spec.ts` that:
- Import helper functions from `/e2e/utils/test-helpers.ts`
- Test actual behavior, not implementation details
- Verify responsive behavior across viewports
- Check CSS properties and computed styles (but NOT CSS variables)
- Test user interactions (clicks, hovers, etc.)

**IMPORTANT**: Do NOT test CSS variables directly. CSS variables are implementation details. Instead, test the actual behavior and computed styles that result from those variables.

### 4. Test Organization
- `/e2e/core-layout.spec.ts` - Basic layout structure and variants
- `/e2e/edge-sidebar.spec.ts` - Edge sidebar behaviors (permanent/drawer modes)
- `/e2e/responsive.spec.ts` - Breakpoint transitions
- `/e2e/interactions.spec.ts` - User interaction handlers
- `/e2e/accessibility.spec.ts` - Keyboard navigation and ARIA attributes

