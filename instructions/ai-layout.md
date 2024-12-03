# How to use Jun Layout

## Structure

Jun Layout defines elements of the layout like this:

- Root Layout is a `div` with class `.jun-layout`
- Header is a `header` with class `.jun-header`
- Content is a `main` with class `.jun-content`
- Footer is a `footer` with class `.jun-footer`
- Edge sidebar is an `aside` with class `.jun-edgeSidebar`
- Inset sidebar is an `div` with class `.jun-insetSidebar`

### Basic app

Most apps have header, content and footer. The navigation is in header but when the viewport shrink to mobile, the navigation is render in edge sidebar (drawer) instead. The drawer can be triggered by a button in the header.

```
|--------------------|
|       Header       |
|--------------------|
|                    |
|   Content (main)   |
|                    |
|--------------------|
|       Footer       |
|--------------------|
```

### Simple Dashboard app

A simple dashboard app has the basic layout with edge sidebar on the left side.

```
|------------|------------------------|
|            |        Header          |
|            |------------------------|
|   Edge     |                        |
|   Side     |    Content (main)      |
|   bar      |                        |
|            |------------------------|
|            |        Footer          |
|------------|------------------------|
```

### Simple blog/documentation

This kind of layout usually has sidebar within a content (inset sidebars). But the sidebar is hidden in mobile viewport, the edge sidebar (drawer) will be used instead.

```
|-------------------------------------------|
|                Header                     |
|-------------------------------------------|
|              Content (main)               |
|   |  Inset   |              |  Inset  |   |
|   |  Side    |              |  Side   |   |
|   |  bar     |              |  bar    |   |
|-------------------------------------------|
|                Footer                     |
|-------------------------------------------|
```

Let's learn how to use layout and its modifiers.

## Root layout

Every layout must have a root layout at the top.

### Usage

A required class to set up a layout system.

```js
<div className="jun-layout">
```

### Modifiers

#### Controlling height

Use `jun-layout-h-[*]` to change the height of the layout (default as `100lvh`).

```js
<div className="jun-layout jun-layout-h-[500px] lg:jun-layout-h-[800px]">
```

<Callout title="⚠️ Warning">
  Don't use `h-[*]` directly because the layout uses CSS variables to control
  other parts of the layout.
</Callout>

#### Standalone app

Use `jun-layout-standalone` to create apps like POS (Point of Sale) or chat applications where the layout fits to the screen.

```js
<div className="jun-layout jun-layout-standalone">
```

### API

| Class                   | Description                                                                                      |
| ----------------------- | ------------------------------------------------------------------------------------------------ |
| `jun-layout`            | Set as root layout `(Required)`                                                                  |
| `jun-layout-h-[*]`      | Custom the height of the layout                                                                  |
| `jun-layout-standalone` | Make the layout fixed to its height, useful for building standalone app like a POS or a chat app |

## Header

The header must be a direct child of the [root layout](#root-layout) due to CSS grid implementation.

### Usage

By applying `jun-header`, the element become [sticky](https://developer.mozilla.org/en-US/docs/Web/CSS/position#sticky) by default.
The header is a `flex items-center` by default.

```js
<header className="jun-header">...</header>
```

<Callout title="⚠️ Warning">
  **DON'T** change the position of the header to `fixed`.
</Callout>

### Controlling height

Use `jun-header-h-[*]` to customize the height of the header:

```jsx
<header classname="jun-header jun-header-h-[3.5rem] lg:jun-header-h-[4rem]">
```

### Clipping

Use these classes to make the header stay on top of the edge sidebars:

- `jun-header-clip`: clip both left and right edge sidebars.
- `jun-header-clip-left`: clip left edge sidebar.
- `jun-header-clip-right`: clip right edge sidebar.

```jsx
<header className="jun-header jun-header-clip">
```

### Modifiers

| Modifier                | Default | Description                                           |
| ----------------------- | ------- | ----------------------------------------------------- |
| `jun-header` \*         |         | Set as header                                         |
| `jun-header-h-[*]`      | `3rem`  | The height of the header                              |
| `jun-header-clip`       |         | Make the header stay on top of both edge sidebars     |
| `jun-header-clip-left`  |         | Make the header stay on top of the left edge sidebar  |
| `jun-header-clip-right` |         | Make the header stay on top of the right edge sidebar |

\* = required

## Content (main)

The content must be a direct child of the [root layout](#root-layout) due to CSS grid implementation.

### Usage

```jsx
<main className="jun-content">
```

### Container

Use `container` (built-in Tailwind class) to limit the max width of the content.

```jsx
<main className="jun-content container"></main>
```

### Secondary sidebar

To render a sidebar within the Content, use [`jun-insetSidebar`](#inset-sidebar).
The inset sidebar must be either first child (left) or last child (right) of the Content to function properly.

```jsx
<div className="jun-content">
  <div className="jun-insetSidebar">
    <div className="jun-insetContent">...</div>
  </div>

  <div>...main content</div>

  {/* The inset sidebar could be placed here too */}
</div>
```

<Callout title="Important!">
  The sibling of the inset sidebar should be a valid DOM element, not a string
  or undefined. The code below won't work:

```js
// ❌ the sibling of inset sidebar should be an element, e.g. <div>
<div className="jun-content">
  <div className="jun-insetSidebar">
    <div className="jun-insetContent">...</div>
  </div>

  main content
</div>

// ❌ When show is false, the element will disappear. The sibling must always exist.
<div className="jun-content">
  <div className="jun-insetSidebar">
    <div className="jun-insetContent">...</div>
  </div>

  {show && (
    <div>...</div>
  )}
</div>
```

</Callout>

## Footer

The footer must be a direct child of the [root layout](#root-layout) due to CSS grid implementation.

### Usage

```jsx
<footer className="jun-footer">
```

### Container

Insert a `container` (built-in Tailwind class) as a child of the footer to limit the max width of the content.

```jsx
<footer className="jun-footer">
  <div className="container">...</div>
</footer>
```

### Inset Sidebar void space

If the [inset sidebar](#inset-sidebar) is `fixed` or `absolute`, it will cover the footer.

To make the content of the footer avoid the cut, place `jun-insetAvoidingView` inside the Footer:

```jsx
<footer className="jun-footer">
  <div className="jun-insetAvoidingView">footer content...</div>
</footer>
```

## Edge Sidebar

The edge sidebar must be a direct child of the [root layout](#root-layout) due to CSS grid implementation.

### Usage

An edge sidebar requires a structure of:

- `jun-edgeSidebar`: the sidebar container
  - `jun-edgeContent`: the sidebar body.
    - `div`: wrapper of the content

```jsx
<aside className="jun-edgeSidebar">
  <div className="jun-edgeContent">
    <div className="flex flex-col gap-2 p-2">navigation...</div>
  </div>
</aside>
```

**DO NOT** add `padding`, `margin` or changing the display of `jun-edgeSidebar` and `jun-edgeContent`.

### Controlling width

Use `jun-edgeSidebar-w-[*]` to change the width of the sidebar:

```jsx
<aside className="jun-edgeSidebar jun-edgeSidebar-w-[200px] lg:jun-edgeSidebar-w-[300px]">
  <div className="jun-edgeContent">
    <div className="flex flex-col gap-2 p-2">navigation...</div>
  </div>
</aside>
```

### Permanent mode

This is the default mode of the edge sidebar unless switched to [drawer mode](#drawer-mode).

<br />

<Callout title="🧠 Note">
  The modifiers with `jun-edgeSidebar-permanent-*` does **NOT** take effect in
  [drawer mode](#drawer-mode).
</Callout>

#### Hidden/Visible

To hide the sidebar initially, use `jun-edgeSidebar-permanent-hidden` and then use `[breakpoint]:jun-edgeSidebar-permanent-visible` to make the sidebar visible.

```js
<aside className="jun-edgeSidebar jun-edgeSidebar-permanent-hidden md:jun-edgeSidebar-permanent-visible">
  <div className="jun-edgeContent">
    <div className="flex flex-col gap-2 p-2">navigation...</div>
  </div>
</aside>
```

#### Collapsible

Create a button with class `jun-edgeCollapseTrigger` and then call the `triggerEdgeCollapse({ event })` on click:

```jsx
import { toggleEdgeCollapse } from "tailwindcss-jun-layout";

<div className="jun-edgeSidebar">
  <div className="jun-edgeContent">
    <button
      className="jun-edgeCollapseTrigger"
      onClick={(event) => triggerEdgeCollapse({ event })}
    >
      Toggle
    </button>
  </div>
</div>;
```

The visibility of the trigger will be handled by Jun Layout. **Do not** need to specify `hidden` with responsive classes.

Next, to customize the width of the sidebar in **collapsed** state, use `jun-edgeSidebar-collapsed-w-[*]`:

```jsx
<div className="jun-edgeSidebar jun-edgeSidebar-collapsed-w-[80px]">
  <div className="jun-edgeContent">
    <div className="flex flex-col gap-2 p-2">navigation...</div>
  </div>
</div>
```

#### Collapsed Icon

To display icon between collapsed/uncollapsed state:

- Use `jun-edgeCollapsed-visible` to show the icon when the sidebar is **collapsed**.
- Use `jun-edgeUncollapsed-visible` to show the icon when the sidebar is in **normal state**.

```jsx
<button
  className="jun-edgeCollapseTrigger"
  onClick={(event) => triggerEdgeCollapse({ event })}
>
  <MoreVertical className="jun-edgeCollapsed-visible" />
  <SidebarOpen className="jun-edgeUncollapsed-visible" />
</button>
```

#### Hover to expand

To make the collapsed sidebar expand when hover, use `jun-edgeSidebar-hoverUncollapse`:

```jsx
<div className="jun-edgeSidebar jun-edgeSidebar-permanent-hoverUncollapse">
  <div className="jun-edgeContent">
    <div className="flex flex-col gap-2 p-2">navigation...</div>
  </div>
</div>
```

#### Auto Collapse

Use `jun-edgeSidebar-permanent-autoCollapse-[breakpoint]` to make the sidebar collapsed automatically when the viewport is below the specified breakpoint:

```jsx
<div className="jun-edgeSidebar jun-edgeSidebar-permanent-autoCollapse-lg">
  <div className="jun-edgeContent">
    <div className="flex flex-col gap-2 p-2">navigation...</div>
  </div>
</div>
```

With the snippet above, when the viewport is below [`lg`](https://tailwindcss.com/docs/responsive-design) (1024px), the sidebar will collapsed automatically.

The breakpoint has to be the end of the modifier. **DO NOT** use responsive classes like `lg:jun-edgeSidebar-permanent-autoCollapse`.

### Drawer mode

Use `jun-edgeSidebar-drawer` to turn the sidebar from permanent to drawer mode:

- The sidebar is hidden by default and can be visible by calling `triggerEdgeDrawer` function.
- When the sidebar is visibile, the overlay of the sidebar will cover the whole screen. Clicking on the overlay will close the drawer.

```js
<div className="jun-edgeSidebar jun-edgeSidebar-drawer">
  <div className="jun-edgeContent">
    <div className="flex flex-col gap-2 p-2">navigation...</div>
  </div>
</div>
```

#### Triggering drawer

Create a button with class `jun-edgeCollapseTrigger` and then call the `triggerEdgeDrawer()` on click:

```jsx
import { triggerEdgeDrawer } from "tailwindcss-jun-layout";

<div className="jun-layout">
  <header>
    <button
      className="jun-edgeCollapseTrigger"
      onClick={() => triggerEdgeDrawer()}
    >
      Toggle
    </button>
  </header>
  <div className="jun-edgeSidebar jun-edgeSidebar-drawer">
    <div className="jun-edgeContent">
      <div className="flex flex-col gap-2 p-2">navigation...</div>
    </div>
  </div>
</div>;
```

The visibility of the trigger will be handled by Jun Layout. **Do not** need to specify `hidden` with responsive classes.

#### Open/closed icon

To display icon between open/closed state:

- Use `jun-edgeDrawerOpen-visible` to show the icon when the drawer is **open**.
- Use `jun-edgeDrawerClosed-visible` to show the icon when the drawer is **closed**.

```jsx
<button className="jun-edgeDrawerTrigger" onClick={() => triggerEdgeDrawer()}>
  <PanelLeftClose className="jun-edgeDrawerOpen-visible" />
  <PanelRightClose className="jun-edgeDrawerClosed-visible" />
</button>
```

`jun-edgeDrawerOpen-visible` and `jun-edgeDrawerClosed-visible` require a parent with `jun-edgeDrawerTrigger` to work properly.

#### Without overlay

Use `jun-edgeSidebar-drawer-withoutOverlay` to remove the overlay when the drawer sidebar is visible:

```js
<div className="jun-edgeSidebar jun-edgeSidebar-drawer-withoutOverlay">
  <div className="jun-edgeContent">
    <div className="flex flex-col gap-2 p-2">navigation...</div>
  </div>
</div>
```

### Responsive sidebar

Use Tailwind CSS responsive variants to create a drawer sidebar on mobile and switch to permanent sidebar on desktop:

```js
<div className="jun-edgeSidebar jun-edgeSidebar-drawer md:jun-edgeSidebar-permanent">
  <div className="jun-edgeContent">
    <div className="flex flex-col gap-2 p-2">navigation...</div>
  </div>
</div>
```

### Right sidebar

To create a right edge sidebar, use `jun-edgeSidebarR-&lsqb;*&rsqb;` with all the modifiers above to build a drawer and a permanent sidebar.
The `jun-edgeSidebar` is still required to function properly.

```js
<div className="jun-edgeSidebarR">
  <div className="jun-edgeContent">
    <div className="flex flex-col gap-2 p-2">navigation...</div>
  </div>
</div>
```

### API

| Class                                                  | Description                                                                           |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| `jun-edgeSidebar`                                      | The root container for the edge sidebar (Required)                                    |
| `jun-edgeContent`                                      | The content container of the sidebar (Required) (works within left & right sidebars)  |
| `jun-edgeSidebar-w-[*]`                                | Sets the width of the sidebar                                                         |
| `jun-edgeSidebar-collapsed-w-[*]`                      | Sets the width of the sidebar when **collapsed**                                      |
| `jun-edgeSidebar-permanent-hidden`                     | Hides the sidebar in permanent mode                                                   |
| `jun-edgeSidebar-permanent-visible`                    | Shows the sidebar in permanent mode                                                   |
| `jun-edgeSidebar-permanent-hoverUncollapse`            | Makes the collapsed sidebar expand on hover                                           |
| `jun-edgeSidebar-permanent-autoCollapse-[breakpoint]`  | Auto collapses the sidebar below specified breakpoint                                 |
| `jun-edgeSidebar-drawer`                               | Enables drawer mode for the sidebar                                                   |
| `jun-edgeSidebar-drawer-withoutOverlay`                | Removes the overlay in drawer mode                                                    |
| `jun-edgeSidebarR`                                     | Creates a right-aligned sidebar                                                       |
| `jun-edgeSidebarR-w-[*]`                               | Sets the width of the right sidebar                                                   |
| `jun-edgeSidebarR-collapsed-w-[*]`                     | Sets the width of the right sidebar when **collapsed**                                |
| `jun-edgeSidebarR-drawer`                              | Enables drawer mode for the right sidebar                                             |
| `jun-edgeSidebarR-permanent`                           | Enables permanent mode for the right sidebar                                          |
| `jun-edgeSidebarR-permanent-hidden`                    | Hides the right sidebar in permanent mode                                             |
| `jun-edgeSidebarR-permanent-visible`                   | Shows the right sidebar in permanent mode                                             |
| `jun-edgeSidebarR-permanent-autoCollapse-[breakpoint]` | Auto collapses the right sidebar below specified breakpoint                           |
| `jun-edgeCollapseTrigger`                              | Button class to trigger sidebar collapse                                              |
| `jun-edgeDrawerTrigger`                                | Button class to trigger drawer open/close                                             |
| `jun-edgeDrawerTriggerR`                               | Button class to trigger right drawer open/close                                       |
| `jun-edgeCollapseTriggerR`                             | Button class to trigger right sidebar collapse                                        |
| `jun-edgeCollapsed-visible`                            | Shows the element only when sidebar is collapsed (works within left & right sidebars) |
| `jun-edgeUncollapsed-visible`                          | Shows the element only when sidebar is expanded (works within left & right sidebars)  |

## Inset sidebar

The inset sidebar must be a direct child of the [content](#content-main) or a child of the [content](#content-main)'s child.

### Usage

An inset sidebar is a complimentary sidebar within the [Content](#content-main) of the layout. It requires a structure of:

- `jun-insetSidebar`: the sidebar container
  - `jun-insetContent`: the sidebar body

```jsx
<aside className="jun-insetSidebar">
  <div className="jun-insetContent">Table of contents...</div>
</aside>
```

The default inset sidebar will stick to the page when scrolling the content until reached the end of the content.

<br />

<Callout title="⚠️ Important">
  Inset sidebar need a valid sibling element and Inset sidebar must be a first
  child or a last child.
</Callout>

### Controlling width

Use `jun-insetSidebar-w-[*]` to customize the width of the sidebar:

```jsx
<aside className="jun-insetSidebar jun-insetSidebar-w-[220px] lg:jun-insetSidebar-w-[240px]">
  <div className="jun-insetContent">Table of contents...</div>
</aside>
```

### Standalone sidebar

If you are building a [standalone](/docs/layout#standalone-app) app like a chat app and need a sidebar within the [Content](/docs/content), use `jun-insetSidebar-absolute`:

```jsx
<aside className="jun-insetSidebar jun-insetSidebar-absolute">
  <div className="jun-insetContent">Table of contents...</div>
</aside>
```

The height of the sidebar span below header to the bottom of the page (overlap the footer), so if the Footer is used you need to add `jun-insetAvoidingView` as a child of the footer.

```jsx
<div className="jun-layout jun-layout-standalone">
  <main className="jun-content">
    <div>...</div>
    <aside className="jun-insetSidebar jun-insetSidebar-absolute">
      <div className="jun-insetContent">Table of contents...</div>
    </aside>
  </main>
  <footer className="jun-footer">
    <div className="jun-insetAvoidingView">...</div>
  </footer>
</div>
```

### API

| Class                       | Description                                                                                                                                     |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `jun-insetSidebar`          | The root container for the inset sidebar (Required)                                                                                             |
| `jun-insetContent`          | The content container of the inset sidebar (Required)                                                                                           |
| `jun-insetSidebar-w-[*]`    | Sets the width of the inset sidebar                                                                                                             |
| `jun-insetSidebar-sticky`   | The default behavior of the inset sidebar. The content stick under the header when scroll until it reached the end of the content               |
| `jun-insetSidebar-fixed`    | Similar to the sticky behavior but the fixed inset sidebar will never flow when it reached the end of the content. It always stick to the page. |
| `jun-insetSidebar-absolute` | Makes the sidebar span from header to bottom of the page, useful for standalone apps                                                            |
| `jun-insetAvoidingView`     | Used within footer to prevent overlap with absolute inset sidebar                                                                               |
