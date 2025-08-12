# E2E Test Implementation Plan for Jun Layout

## Todo List

### Phase 1: Setup & Configuration

- [x] Create Playwright configuration with multiple viewports and browsers
- [x] Set up test directory structure
- [x] Create test utilities and helper functions
- [x] Set up test fixtures and example pages

### Phase 2: Core Layout Tests

- [x] Test basic layout rendering (header, content, footer)
- [x] Test height variants and standalone mode
- [x] Test no transition mode
- [x] Test container integration
- [x] Validate layout DOM structure

### Phase 3: Edge Sidebar Tests

- [x] Test permanent vs drawer mode switching
- [x] Test collapse/expand behaviors
- [x] Test auto-collapse at breakpoints
- [x] Test hover uncollapse functionality
- [x] Test width customization
- [x] Test multiple sidebars (left + right)

### Phase 4: Inset Sidebar Tests

- [x] Test sticky/fixed/absolute positioning
- [x] Test integration with content area
- [x] Test width variants
- [x] Test visibility at different breakpoints

### Phase 5: Nested Layouts

- [ ] Test nested layout scenarios
- [ ] Test isolated app containers (standalone layouts)
