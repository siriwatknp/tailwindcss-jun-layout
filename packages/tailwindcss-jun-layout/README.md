# Tailwind Jun Layout

A powerful Tailwind CSS plugin for building dynamic layouts with ease. This plugin provides utility classes to create flexible and responsive layouts in your web applications.

## Installation

```bash
npm install tailwindcss-jun-layout
```

Then add the plugin to your tailwind.config.js file:

```js
// tailwind.config.*
{
  ...
  plugins: [
    // ...other plugins
    require("tailwindcss-jun-layout")
  ]
}
```

That's it. You will be able to just `jun-*` as Tailwind classes.

## Structure

![image](https://github.com/user-attachments/assets/24eef22a-4edb-427a-9ec0-db4da5eeaf98)

- `jun-layout` **(required)**: The root container that establishes the layout grid. It creates a flexible layout structure with support for header, footer, edge sidebars, and main content areas.

- `jun-header`: The header of the layout.

- `jun-edgeSidebar`: A sidebar component that can be placed on either edge of the layout. Supports multiple modes:

  - Drawer mode for mobile (toggleable)
  - Permanent mode for desktop
  - Collapsible functionality
  - Auto-collapse at specified breakpoints
  - Customizable widths for different states

- `jun-content`: The main content area of the layout. Automatically adjusts its width and position based on the presence and state of edge sidebars. Provides proper spacing and padding while maintaining content flow.

- `jun-insetSidebar`: A secondary sidebar that lives within the content area rather than at the layout edges. Useful for secondary navigation, filters, or table of contents.

- `jun-footer`: The header of the layout.

```jsx
<div className="jun-layout">
  <header className="jun-header">{/* Header content */}</header>

  <aside className="jun-edgeSidebar">
    <div className="jun-edgeContent">{/* Sidebar content */}</div>
  </aside>

  <main className="jun-content">
    <aside className="jun-insetSidebar">
      <div className="jun-insetContent">{/* Inset sidebar content */}</div>
    </aside>
    {/* Main content */}
  </main>

  <footer className="jun-footer">{/* Footer content */}</footer>
</div>
```

## Layout patterns

### Dashboard app

A dashboard app layout with a collapsible sidebar that adapts across different screen sizes:

- On mobile: Sidebar becomes a drawer that can be toggled with the drawer trigger button
- On medium screens (md):
  - Sidebar is permanently visible
  - Collapses to 48px width when collapsed
  - Expands to 200px width when expanded
- On large screens (lg):
  - Sidebar width increases to 256px when expanded
  - Auto-collapses when the breakpoint is lower than `lg`

The header spans full width and contains controls for toggling the drawer on mobile and collapsing the sidebar on desktop. The main content area automatically adjusts its width based on the sidebar state.

```jsx
import { triggerEdgeDrawer, triggerEdgeCollapse } from "tailwindcss-jun-layout";

<div className="jun-layout">
  <header className="jun-header jun-header-clip">
    <button
      className="jun-edgeDrawerTrigger"
      onClick={() => triggerEdgeDrawer()}
    />
    <button
      className="jun-edgeCollapseTrigger"
      onClick={(event) => triggerEdgeCollapse({ event })}
    />
    {/* ... other header content ... */}
  </header>

  <div
    className="jun-edgeSidebar jun-edgeSidebar-drawer 
    md:jun-edgeSidebar-permanent 
    md:jun-edgeSidebar-permanent-collapsed-w-[48px] 
    md:jun-edgeSidebar-w-[200px] 
    lg:jun-edgeSidebar-w-[256px] 
    jun-edgeSidebar-permanent-autoCollapse-lg"
  >
    <div className="jun-edgeContent">{/* ... sidebar content ... */}</div>
  </div>

  <main className="jun-content">{/* ... main content ... */}</main>
</div>;
```

### Blog/Documentation

A blog/documentation layout with a responsive sidebar navigation:

- On mobile: Navigation is in a drawer that can be toggled with the drawer trigger button
- On medium screens (md) and up:
  - Left sidebar becomes permanently visible
- On extra large screens (xl):
  - The sidebar width increases to 240px

The header spans full width and contains the drawer trigger for mobile. The main content area has a right inset sidebar for navigation/table of contents on desktop. The footer spans full width below the content.

```jsx
import { triggerEdgeDrawer } from "tailwindcss-jun-layout";

<div className="jun-layout">
  <header className="jun-header">
    <button
      className="jun-edgeDrawerTrigger"
      onClick={() => triggerEdgeDrawer()}
    />
    {/* ... header content ... */}
  </header>

  <div
    className="jun-edgeSidebar jun-edgeSidebar-drawer 
    md:jun-edgeSidebar-permanent md:jun-edgeSidebar-permanent-hidden"
  >
    <div className="jun-edgeContent">{/* ... sidebar content ... */}</div>
  </div>

  <main className="jun-content">
    <aside
      className="hidden md:block jun-insetSidebar 
      jun-insetSidebar-w-[200px] 
      xl:jun-insetSidebar-w-[240px]"
    >
      {/* ... sidebar content ... */}
    </aside>
    <div>{/* ... main content ... */}</div>
  </main>

  <footer className="jun-footer">{/* ... footer content ... */}</footer>
</div>;
```
