# How to use Jun Layout

Follow this document strictly when building layout. For customization, refer to the [styling rules](#styling-rules) to see which CSS properties/tailwindcss classes are allowed.

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

To create a right edge sidebar, use `jun-edgeSidebarR-*` with all the modifiers above to build a drawer and a permanent sidebar.
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

## Sidebar elements

To build menus and links for a sidebar, follow this guide:

### Structure

A sidebar is composed of the following structure:

- `SidebarContainer` - Controls the view of the sidebar based on its width.
  - `SidebarGroup` (optional) - For building group of menus
    - `SidebarGroupLabel` (optional) - The label of the group
    - `SidebarMenu` - A list of menus
      - `SidebarMenuItem` - A list item of a menu
        - `SidebarMenuButton` - A menu button or a menu link
          - `SidebarIcon` - An icon of the menu
          - `SidebarText` - A text of the menu (hidden when `SidebarContainer` is small)
  - `SidebarRail` - An element to collapse the edge sidebar

### Building a sidebar

A sidebar requires `.jun-sidebarContainer` to function properly:

```jsx
<div className="jun-sidebarContainer">...sidebar elements</div>
```

#### Menu button

For a single menu, wrap `button` or `a` with a class `.jun-sidebarMenuButton` within `.jun-sidebarMenu`:

```jsx
<button className="jun-sidebarMenuButton">
  <Icon className="jun-sidebarIcon" />
  <span className="jun-sidebarText">A menu text</span>
</button>
```

<Callout title="💡 Good to know">
  `.jun-sidebarText` will disappear when the sidebar container's width is small.
</Callout>

#### List of menus

Use `.jun-sidebarMenu` to create a list of menus, each menu button should be wrapped with `.jun-sidebarMenuItem`:

```jsx
<ul className="jun-sidebarMenu">
  <li className="jun-sidebarMenuItem">
    <button className="jun-sidebarMenuButton">
      <Icon className="jun-sidebarIcon" />
      <span className="jun-sidebarText">A menu text</span>
    </button>
  </li>
  ...
  <li className="jun-sidebarMenuItem">...</li>
</ul>
```

#### Menu Groups

Use `.jun-sidebarGroup` for a group of menu, each group can have a label using `.jun-sidebarGroupLabel`:

```jsx
<div className="jun-sidebarGroup">
  <div className="jun-sidebarGroupLabel">Group 1</div>
  <ul className="jun-sidebarMenu">...list of menus</ul>
</div>

<div className="jun-sidebarGroup">
  <div className="jun-sidebarGroupLabel">Group 2</div>
  <ul className="jun-sidebarMenu">...list of menus</ul>
</div>
```

<Callout title="💡 Good to know">
  `.jun-sidebarGroupLabel` will disappear when the sidebar container's width is
  small.
</Callout>

### Group of texts

If the menu has more than one text elements, wrap those texts with `.jun-sidebarGroupText`.
The layout will collapse the texts when EdgeSidebar is in collapsed state.

You can control the spacing of the menu button using a modifier `.jun-sidebarMenuButton-spacing-[*]`.

```jsx
<a className="jun-sidebarMenuButton jun-sidebarMenuButton-spacing-3.5">
  <svg className="jun-sidebarIcon" />
  <div className="jun-sidebarGroupText">
    <div>
      <span className="jun-sidebarText">Primary text</span>
      <span className="jun-sidebarText">Secondary text</span>
      <span className="jun-sidebarText">Tertiary text</span>
    </div>
  </div>
</a>
```

<Callout title="⚠️ Warning">
  The extra `div` under the `.jun-sidebarGroupText` is require to make the
  collapse working properly.
</Callout>

### Menu action

To add a secondary action to a menu, create a button with `.jun-sidebarMenuAction`:

```jsx
<li className="jun-sidebarMenuItem">
  <a className="jun-sidebarMenuButton">
    <svg className="jun-sidebarIcon" />
    <span className="jun-sidebarText">Dashboard</span>
  </a>
  <button className="jun-sidebarMenuAction">
    <MoreHorizontal />
  </button>
</li>
```

<Callout title="⚠️ Warning">
  The button **must** be a direct child of the `.jun-sidebarMenuItem`. **Do
  not** put the action inside `.jun-sidebarMenuButton`.
</Callout>

Append `.jun-sidebarMenuAction-hoverAppear`, if you want the action to appear when users hover on the item.
The action also appears on keyboard focus.

### Tooltip

To show a tooltip (using radix or shadcn) only when the permanent EdgeSidebar is collapsed, first wraps the layout with the `TooltipProvider`:

```jsx
<TooltipProvider delayDuration={0}>
  <div className="jun-layout">...</div>
</TooltipProvider>
```

Then, create a `TooltipSidebar` that wraps `TooltipPrimitive.Portal` and `TooltipPrimitive.Content` to custom the `container` prop to be the EdgeSidebar element:

```jsx
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

function TooltipSidebar({ children }) {
  const [container, setContainer] = React.useState(null);
  React.useEffect(() => {
    setContainer(document.querySelector(".jun-edgeSidebar"));
  }, []);
  return (
    <TooltipPrimitive.Portal container={container}>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={4}
        side="right"
        className={cn(
          "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95",
          className
        )}
      >
        {children}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}
```

Finally, create a tooltip for each menu and apply `.jun-sidebarTooltip` to the [TooltipContent](https://www.radix-ui.com/primitives/docs/components/tooltip#content):

```jsx
<li className="jun-sidebarMenuItem">
  <Tooltip>
    <TooltipTrigger>
      <a className="jun-sidebarMenuButton">
        <svg className="jun-sidebarIcon" />
        <span className="jun-sidebarText">Dashboard</span>
      </a>
    </TooltipTrigger>
    <TooltipContent side="right" align="center" className="jun-sidebarTooltip">
      <p>Dashboard</p>
    </TooltipContent>
  </Tooltip>
</li>
```

### Nested menu

The nested menu should be a direct child of `.jun-sidebarMenuItem` to follow semantic structure, then append `.jun-sidebarMenu-nested` to the menu.
The `.jun-sidebarGroupText` is used to hide the nested menu when the sidebar is collapsed.

```jsx {8-18}
<ul className="jun-sidebarMenu">
  <li key={itemIndex} className="jun-sidebarMenuItem">
    <button className="jun-sidebarMenuButton">
      <Icon className="jun-sidebarIcon jun-sidebarIcon-shrink-size-5" />
      <span className="jun-sidebarText">{item.label}</span>
    </button>

    <div className="jun-sidebarGroupText">
      <div>
        <ul className="jun-sidebarMenu jun-sidebarMenu-nested">
          <li className="jun-sidebarMenuItem">
            <button className="jun-sidebarMenuButton">
              <span className="jun-sidebarText">{sub.label}</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </li>
</ul>
```

### Collapsible menu

To create a collapsible menu, first change the menu button tag to `label` and add a hidden checkbox like this (`id` and `htmlFor` are required):

```diff
- <button className="jun-sidebarMenuButton">
+ <label
+  htmlFor={`menu-${item.label}`}
+  className="jun-sidebarMenuButton jun-collapsibleTrigger"
+ >
  <Icon className="jun-sidebarIcon jun-sidebarIcon-shrink-size-5" />
  <span className="jun-sidebarText">{item.label}</span>
+  <input
+    type="checkbox"
+    className="sr-only"
+    id={`menu-${item.label}`}
+  />
+ </label>
- </button>
```

Then, create a div with `.jun-collapsibleContent` as a direct child of menu item, add another div as a child and then the nested menu:

```jsx {9-10} {20-21}
<li key={itemIndex} className="jun-sidebarMenuItem">
  <label
    htmlFor={`menu-${item.label}`}
    className="jun-sidebarMenuButton jun-collapsibleTrigger"
  >
    ...
  </label>

  <div className="jun-collapsibleContent">
    <div>
      <ul className="jun-sidebarMenu jun-sidebarMenu-nested">
        {item.items.map((sub) => (
          <li className="jun-sidebarMenuItem">
            <button className="jun-sidebarMenuButton">
              <span className="jun-sidebarText">{sub.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
</li>
```

<Callout title="Warning">
  The extra `div` between `.jun-collapsibleContent` and `jun-sidebarMenu-nested`
  is required.
</Callout>

Finally, an optional `.jun-collapsibleIcon` can be used as an indicator.

```jsx {7}
<label
  htmlFor={`menu-${item.label}`}
  className="jun-sidebarMenuButton jun-collapsibleTrigger"
>
  <Icon className="jun-sidebarIcon jun-sidebarIcon-shrink-size-5" />
  <span className="jun-sidebarText">{item.label}</span>
  <ChevronDown className="size-4 jun-collapsibleIcon jun-collapsibleIcon-rotate-180" />
  <input
    type="checkbox"
    className="sr-only"
    id={`menu-${item.label}`}
    defaultChecked
  />
</label>
```

#### Collapsible menu action

If the menu is an anchor, moved the collapsible trigger to the menu action instead.

The order must strictly follow:

```jsx
<li className="jun-sidebarMenuItem">
  <button className="jun-sidebarMenuButton">...</button>

  {/* Collapsible trigger as secondary action */}
  <label
    htmlFor="menu-orders"
    className="jun-sidebarMenuAction jun-collapsibleTrigger"
  >
    <ChevronDown className="size-4 jun-collapsibleIcon jun-collapsibleIcon-rotate-180" />
    <input
      type="checkbox"
      className="sr-only"
      id="menu-orders"
      defaultChecked
    />
  </label>

  {/* Nested menu wrapped in collapsible content */}
  <div className="jun-collapsibleContent">...</div>
</li>
```

## Styling rules

Sizing refers to padding, margin, width, and height properties.

- `.jun-header` must not have position fixed.
- `.jun-edgeSidebar` can be customized only the box-shadow. Do not add borders, padding, margin, width, height, and background to this element.
- `.jun-edgeContent` can be customized only the background and padding. Do not add borders, margin, width, and height to this element.
- `.jun-content` can be customized only the background and padding. Do not add borders, margin, width, and height to this element.

### Customization examples

1. Make the sidebar looks like it's floating (detatch from the layout). To achieve this:

- remove box-shadow from the `.jun-edgeSidebar`
- add padding to the `.jun-edgeContent`
- add `min-h-0`, border, and box-shadow to the inner `.jun-sidebarContainer`.

```jsx
<div className="jun-edgeSidebar shadow-none">
  <div className="jun-edgeContent p-2 bg-transparent">
    <div className="jun-sidebarContainer flex-1 min-h-0 shadow border rounded">
      ...
    </div>
  </div>
</div>
```

2. Make the content looks like it's floating from the rest of the layout. To achieve this:

- add background to the `.jun-layout`
- remove background and border from the `.jun-header` (if existed)
- remove box-shadow from the `.jun-edgeSidebar`
- remove background from the `.jun-content` and add some padding to it.
- add `h-full`, padding, border, and box-shadow to the child of the `.jun-content`
- if the main content contains a sticky inset sidebar, set `max-h-full` to the inset sidebar.

```jsx
<div className="jun-layout bg-gray-100">
  <div className="jun-edgeSidebar shadow-none">...</div>
  <div className="jun-content bg-transparent p-4">
    <div className="h-full p-4 border rounded shadow-md bg-white">
      ...
      <div className="jun-insetSidebar max-h-full">...</div>
    </div>
  </div>
</div>
```
