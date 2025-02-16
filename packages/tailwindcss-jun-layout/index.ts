import plugin from "tailwindcss/plugin";
import type { CSSRuleObject } from "tailwindcss/types/config";

const layoutAttrs = {
  isDrawerOpen: "data-drawer-open",
  isDrawerClosing: "data-mobile-closing",
  isEdgeSidebarUncollapsed: "data-edge-uncollapsed",
  isEdgeSidebarCollapsed: "data-edge-collapsed",
  isEdgeSidebarContentHidden: "data-sidebar-hidden",
};

const layoutClasses = {
  Root: "jun-layout",
  Header: "jun-header",
  Content: "jun-content",
  Footer: "jun-footer",
  EdgeSidebar: "jun-edgeSidebar", // shared
  EdgeSidebarContent: "jun-edgeContent",
  EdgeSidebarCollapser: "jun-edgeCollapseTrigger",
  DrawerEdgeSidebarTrigger: "jun-edgeDrawerTrigger",
  DrawerEdgeSidebarClose: "jun-edgeDrawerClose",
  DrawerWithoutOverlay: "jun-edgeSidebar-drawer-withoutOverlay",
  DrawerOpenVisible: "jun-edgeDrawerOpen-visible",
  DrawerClosedVisible: "jun-edgeDrawerClosed-visible",
  EdgeSidebarCollapsedVisible: "jun-edgeCollapsed-visible",
  EdgeSidebarUncollapsedVisible: "jun-edgeUncollapsed-visible",
  EdgeSidebarRight: "jun-edgeSidebarR",
  EdgeSidebarRightCollapser: "jun-edgeCollapseTriggerR",
  DrawerEdgeSidebarRightTrigger: "jun-edgeDrawerTriggerR",
  InsetSidebar: "jun-insetSidebar",
  InsetAvoidingView: "jun-insetAvoidingView",
  InsetContent: "jun-insetContent",
  SidebarContainer: "jun-sidebarContainer",
  SidebarGroup: "jun-sidebarGroup",
  SidebarGroupLabel: "jun-sidebarGroupLabel",
  SidebarMenuItem: "jun-sidebarMenuItem",
  SidebarMenu: "jun-sidebarMenu",
  SidebarMenuButton: "jun-sidebarMenuButton",
  SidebarMenuAction: "jun-sidebarMenuAction",
  SidebarText: "jun-sidebarText",
  SidebarGroupText: "jun-sidebarGroupText",
  SidebarIcon: "jun-sidebarIcon",
  SidebarTooltip: "jun-sidebarTooltip",
  SidebarRail: "jun-sidebarRail",
  CollapsibleTrigger: "jun-collapsibleTrigger",
  CollapsibleContent: "jun-collapsibleContent",
  CollapsibleIcon: "jun-collapsibleIcon",
  Dock: "jun-dock",
  DockMenu: "jun-dockMenu",
  DockMenuItem: "jun-dockMenuItem",
  DockMenuButton: "jun-dockMenuButton",
  DockIndicator: "jun-dockIndicator",
  DockTooltip: "jun-dockTooltip",
};

function internalCollapseSidebar(options: {
  event: { target: EventTarget };
  selector: string;
  state?: boolean;
  document?: Document | null;
}) {
  const { state, document: d, selector, event } = options || {};
  const doc = d ?? document;
  const sidebar = doc.querySelector(selector) as HTMLElement;
  if (sidebar) {
    const currentCollapsed =
      window
        .getComputedStyle(event.target as Element)
        .getPropertyValue("--_sidebarCollapsed") === "1";
    const nextCollapsed = state === undefined ? !currentCollapsed : state;

    /* If true, the Sidebar has `autoCollapse` feature. */
    const autoCollapse =
      window
        .getComputedStyle(event.target as Element)
        .getPropertyValue("--_autoCollapse") === "1";

    /* If true, the Sidebar is in >= `autoCollapse` breakpoint. */
    const inAutoCollapse =
      window
        .getComputedStyle(event.target as Element)
        .getPropertyValue("--_in-autoCollapse") === "1";

    if (nextCollapsed) {
      sidebar.removeAttribute(layoutAttrs.isEdgeSidebarUncollapsed);
      if (!autoCollapse || inAutoCollapse) {
        sidebar.setAttribute(layoutAttrs.isEdgeSidebarCollapsed, "");
      }
    } else {
      sidebar.removeAttribute(layoutAttrs.isEdgeSidebarCollapsed);
      if (!inAutoCollapse) {
        sidebar.setAttribute(layoutAttrs.isEdgeSidebarUncollapsed, "");
      }
    }
  }
}

function internalToggleSidebar(options: {
  selector: string;
  state?: boolean;
  document?: Document | null;
}) {
  const { state, document: d, selector } = options || {};
  const doc = d ?? document;
  const sidebar = doc.querySelector(selector) as HTMLDivElement | null;
  if (sidebar) {
    const currentOpen = sidebar.getAttribute(layoutAttrs.isDrawerOpen) !== null;
    const nextOpen = state === undefined ? !currentOpen : state;
    if (nextOpen) {
      sidebar.setAttribute(layoutAttrs.isDrawerOpen, "");
      sidebar.style.setProperty("--jun-ES-drawerOpen", "1");
      function handleOutsideClick(event: MouseEvent) {
        const closer = doc.querySelector(
          `.${layoutClasses.DrawerEdgeSidebarClose}`
        ) as HTMLButtonElement;
        if (
          // clicking on the backdrop (psuedo element of sidebar) will close the sidebar
          event.target === sidebar ||
          // clicking on the closer button will close the sidebar
          (closer && closer.contains(event.target as Node))
        ) {
          internalToggleSidebar({
            ...options,
            state: false,
          });
          doc.removeEventListener?.("click", handleOutsideClick);
        }
      }
      setTimeout(() => {
        // prevent the `handleOutsideClick` to be called immediately
        doc.addEventListener?.("click", handleOutsideClick);
      }, 0);

      // TODO: add a way to close the sidebar by swiping
      // TODO: add a way to close the sidebar by pressing ESC
    } else {
      sidebar.removeAttribute(layoutAttrs.isDrawerOpen);
      sidebar.setAttribute(layoutAttrs.isDrawerClosing, "");
      setTimeout(() => {
        sidebar.removeAttribute(layoutAttrs.isDrawerClosing);
      }, 300);
      sidebar.style.setProperty("--jun-ES-drawerOpen", "");
    }
  }
}

export function triggerEdgeCollapse(options: {
  event: { target: EventTarget };
  sidebarId?: string;
  state?: boolean;
  document?: Document | null;
}) {
  const { sidebarId } = options || {};
  let selector = `.${layoutClasses.EdgeSidebar}`;
  if (sidebarId) {
    selector = `#${sidebarId}`;
  }
  internalCollapseSidebar({ ...options, selector });
}

export function triggerEdgeDrawer(options?: {
  sidebarId?: string;
  state?: boolean;
  document?: Document | null;
}) {
  const { sidebarId } = options || {};
  let selector = `.${layoutClasses.EdgeSidebar}`;
  if (sidebarId) {
    selector = `#${sidebarId}`;
  }
  internalToggleSidebar({ ...options, selector });
}

export function triggerEdgeCollapseRight(options: {
  event: { target: EventTarget };
  sidebarId?: string;
  state?: boolean;
  document?: Document | null;
}) {
  const { sidebarId } = options || {};
  let selector = `.${layoutClasses.EdgeSidebarRight}`;
  if (sidebarId) {
    selector = `#${sidebarId}`;
  }
  internalCollapseSidebar({ ...options, selector });
}

export function triggerEdgeDrawerRight(options?: {
  sidebarId?: string;
  state?: boolean;
  document?: Document | null;
}) {
  const { sidebarId } = options || {};
  let selector = `.${layoutClasses.EdgeSidebarRight}`;
  if (sidebarId) {
    selector = `#${sidebarId}`;
  }
  internalToggleSidebar({ ...options, selector });
}

const LEFT_EDGE_SIDEBAR = `.${layoutClasses.EdgeSidebar}`;
const NESTED_LEFT_EDGE_SIDEBAR = `.${layoutClasses.Root} .${layoutClasses.Root} .${layoutClasses.EdgeSidebar}`;
const RIGHT_EDGE_SIDEBAR = `.${layoutClasses.EdgeSidebarRight}`;
const NESTED_RIGHT_EDGE_SIDEBAR = `.${layoutClasses.Root} .${layoutClasses.Root} .${layoutClasses.EdgeSidebarRight}`;
const LEFT_COLLAPSER = `.${layoutClasses.EdgeSidebarCollapser}`;
const RIGHT_COLLAPSER = `.${layoutClasses.EdgeSidebarRightCollapser}`;
const LEFT_DRAWER_TRIGGER = `.${layoutClasses.DrawerEdgeSidebarTrigger}`;
const RIGHT_DRAWER_TRIGGER = `.${layoutClasses.DrawerEdgeSidebarRightTrigger}`;
const NESTED_LAYOUT = `.${layoutClasses.Root} .${layoutClasses.Root}`;
const NESTED_COLLAPSER = `.${layoutClasses.Root} .${layoutClasses.Root} .${layoutClasses.EdgeSidebarCollapser}`;
const NESTED_RIGHT_COLLAPSER = `.${layoutClasses.Root} .${layoutClasses.Root} .${layoutClasses.EdgeSidebarRightCollapser}`;
const NESTED_DRAWER_TRIGGER = `.${layoutClasses.Root} .${layoutClasses.Root} .${layoutClasses.DrawerEdgeSidebarTrigger}`;
const NESTED_RIGHT_DRAWER_TRIGGER = `.${layoutClasses.Root} .${layoutClasses.Root} .${layoutClasses.DrawerEdgeSidebarRightTrigger}`;

export default plugin(function ({
  addComponents,
  matchComponents,
  matchUtilities,
  theme,
}) {
  const HEADER_HEIGHT = "3rem";

  /** Match Shadcn Sidebar */
  const SIDEBAR_WIDTH = "var(--sidebar-width, 16rem)";
  const SIDEBAR_WIDTH_MOBILE = "18rem";

  addComponents({
    ".custom-component-hey": {
      color: "red",
    },
  });

  // Root
  matchUtilities(
    {
      [layoutClasses.Root]: () => ({
        "--jun-h": "calc(100svh - env(safe-area-inset-bottom))",
        [`:where(.${layoutClasses.Root}) &`]: {
          "--jun-h": "100%",
        },
        "--jun-H-h": "0px",
        "--jun-H-clip-h": "0px",
        "--jun-ES-line-w": "1px",
        "--jun-ES-line-color": theme("colors.border") || "transparent",
        "--jun-ISL-w": "0px",
        "--jun-ISR-w": "0px",
        "--drawer-pos": "fixed",
        "--drawer-z": "999",
        minHeight: "var(--jun-h)",
        display: "grid",
        flex: "auto", // integrating with Shadcn sidebar
        position: "relative",
        transition: "var(--tsn, grid-template-columns 0.3s)",
        gridTemplateRows: "auto 1fr",
        gridTemplateColumns:
          "var(--_start-col, 0px) minmax(0, 1fr) var(--_end-col, 0px)", // minmax(0, 1fr) is used over `1fr` to prevent root horizontal overflow
        gridTemplateAreas: `
        "${layoutClasses.EdgeSidebar} ${layoutClasses.Header} ${layoutClasses.EdgeSidebarRight}"
        "${layoutClasses.EdgeSidebar} ${layoutClasses.Content} ${layoutClasses.EdgeSidebarRight}"
        "${layoutClasses.EdgeSidebar} ${layoutClasses.Footer} ${layoutClasses.EdgeSidebarRight}"
      `,
        [`&:where(:has(>.${layoutClasses.Header}))`]: {
          "--jun-H-h": HEADER_HEIGHT,
        },
        [`&:has(>.${layoutClasses.EdgeSidebar})`]: {
          "--_start-col": "max-content",
          "--jun-ES-drawerOpen": "0",
        },
        [`&:has(>.${layoutClasses.EdgeSidebarRight})`]: {
          "--_end-col": "max-content",
          "--jun-ES-drawerOpen": "0",
        },
      }),
    },
    { values: { DEFAULT: true } }
  );
  matchComponents(
    {
      [layoutClasses.Root]: () => ({
        backgroundColor: theme("colors.background"),
      }),
    },
    {
      values: { DEFAULT: true },
    }
  );
  matchUtilities(
    {
      [`${layoutClasses.Root}-standalone`]: () => ({
        "--drawer-pos": "absolute", // make edge sidebar (drawer) stay within the layout
        "--drawer-z": "5",
        "--content-overflow": "auto",
        "--jun-IC-absolute-h": "calc(var(--jun-h) - var(--jun-H-h))",
        maxHeight: "var(--jun-h)",
      }),
      [`${layoutClasses.Root}-safeArea`]: () =>
        ({
          paddingInline: "env(safe-area-inset-left) env(safe-area-inset-right)",
          paddingBottom: "env(safe-area-inset-bottom)",
          [`:where(.${layoutClasses.Root}) &`]: {
            paddingInline: "initial",
            paddingBottom: "initial",
          },
        }) as CSSRuleObject,
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  matchUtilities(
    {
      [`${layoutClasses.Root}-h`]: (height) => ({
        "--jun-h": height,
      }),
    },
    {
      values: {
        DEFAULT: "100vh",
      },
    }
  );
  matchUtilities(
    {
      [`${layoutClasses.Root}-noTransition`]: () => ({
        "--tsn": "none",
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );

  // Header
  matchUtilities(
    {
      [layoutClasses.Header]: () => ({
        gridArea: layoutClasses.Header,
        height: "var(--jun-H-h)", // better than `min-height` because user can set height to 0
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  matchComponents(
    {
      [layoutClasses.Header]: () => ({
        alignContent: "center",
        display: "flex",
        alignItems: "center",
        zIndex: "1", // to stay on top of the Content, e.g. InsetSidebar
        top: "0", // for position sticky to work
        position: "sticky",
        background: theme("colors.background"),
        borderBottom: `1px solid ${theme("colors.border")}`,
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  matchUtilities(
    {
      [`${layoutClasses.Header}-clip`]: (value) =>
        ({
          zIndex: "3",
          [`.${layoutClasses.Root}:has(>&)`]: {
            ...(value === "both" && {
              gridTemplateAreas: `
                "${layoutClasses.Header} ${layoutClasses.Header} ${layoutClasses.Header}"
                "${layoutClasses.EdgeSidebar} ${layoutClasses.Content} ${layoutClasses.EdgeSidebarRight}"
                "${layoutClasses.EdgeSidebar} ${layoutClasses.Footer} ${layoutClasses.EdgeSidebarRight}"
              `,
              "--jun-H-clip-h": "var(--jun-H-h)",
            }),
            ...(value === "left" && {
              gridTemplateAreas: `
                "${layoutClasses.Header} ${layoutClasses.Header} ${layoutClasses.EdgeSidebarRight}"
                "${layoutClasses.EdgeSidebar} ${layoutClasses.Content} ${layoutClasses.EdgeSidebarRight}"
                "${layoutClasses.EdgeSidebar} ${layoutClasses.Footer} ${layoutClasses.EdgeSidebarRight}"
              `,
              [`& .${layoutClasses.EdgeSidebar}`]: {
                "--jun-H-clip-h": "var(--jun-H-h)",
              },
            }),
            ...(value === "right" && {
              gridTemplateAreas: `
                "${layoutClasses.EdgeSidebar} ${layoutClasses.Header} ${layoutClasses.Header}"
                "${layoutClasses.EdgeSidebar} ${layoutClasses.Content} ${layoutClasses.EdgeSidebarRight}"
                "${layoutClasses.EdgeSidebar} ${layoutClasses.Footer} ${layoutClasses.EdgeSidebarRight}"
              `,
              [`& .${layoutClasses.EdgeSidebarRight}`]: {
                "--jun-H-clip-h": "var(--jun-H-h)",
              },
            }),
          },
        }) as CSSRuleObject,
    },
    {
      values: {
        DEFAULT: "both",
        left: "left",
        right: "right",
      },
    }
  );
  matchUtilities(
    {
      [`${layoutClasses.Header}-h`]: (height) => ({
        height,
        [`.${layoutClasses.Root}:has(>&)`]: {
          "--jun-H-h": height,
        },
      }),
    },
    {
      values: {
        DEFAULT: HEADER_HEIGHT,
      },
    }
  );

  // Content
  matchComponents(
    {
      [layoutClasses.Content]: () => ({
        "--_overflow": "var(--content-overflow)",
        overflow: "var(--_overflow)",
        [`&:has(.${layoutClasses.InsetSidebar}-absolute)`]: {
          "--_overflow": "unset",
        },
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  matchUtilities(
    {
      [layoutClasses.Content]: () => ({
        gridArea: layoutClasses.Content,
        minHeight: "0px",
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );

  // Footer
  matchUtilities(
    {
      [layoutClasses.Footer]: () => ({
        gridArea: layoutClasses.Footer,
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  matchComponents(
    {
      [layoutClasses.Footer]: () => ({
        transition:
          "var(--tsn, all 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms, color 0s)",
        background: theme("colors.background"),
        borderTop: `1px solid ${theme("colors.border")}`,
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );

  const sharedSidebarStyles = {
    "--anchorLeft": "var(--jun-ES-anchor,)",
    "--anchorRight": "var(--jun-ES-anchor,)",
    "--drawer-h": "var(--jun-h)",
    transition: "var(--tsn, width 0.3s)",
    display: "flex",
    flexDirection: "column",
    padding: "0px", // prevent user from customizing it
    margin: "0px", // prevent user from customizing it
    // ==============================
    // To keep the EdgeSidebar fixed when the Content is scrollable
    position: "var(--_permanent, sticky)",
    top: "var(--_permanent, var(--jun-H-clip-h))",
    zIndex: "var(--_drawer, 2) var(--_permanent, 1)",
    height: "var(--_permanent, calc(var(--jun-h) - var(--jun-H-clip-h)))",
    // ==============================
    "&::before": {
      display: `var(--_drawer, block)
                var(--_permanent, none)`,
      position: "absolute",
      content: '""',
      inset: "0",
      backgroundColor: "rgba(0, 0, 0, 0.48)",
      backdropFilter: "blur(4px)",
      zIndex: "1",
      transition: "var(--tsn, opacity 0.4s, visibility 0.4s)",
      visibility: "hidden",
      opacity: "var(--jun-ES-drawerOpen, 0)",
    },
    [`&[${layoutAttrs.isDrawerOpen}]`]: {
      "&::before": {
        visibility: "visible",
      },
    },
    [`html:has([${layoutAttrs.isDrawerOpen}]:not(.${layoutClasses.DrawerWithoutOverlay}):not(.${layoutClasses.Content} &))`]:
      {
        overflow: "hidden",
      },
    "&::after": {
      position: "absolute",
      content: '""',
      display: "block",
      width: "var(--_permanent, var(--jun-EC-width))",
      height: "var(--jun-H-clip-h)",
      top: "calc(-1 * var(--jun-H-clip-h))",
      left: "var(--anchorLeft, 0px) var(--anchorRight, unset)",
      right: "var(--anchorLeft, unset) var(--anchorRight, 0px)",
      border: "inherit",
    },
  };
  // Left EdgeSidebar
  matchUtilities(
    {
      [layoutClasses.EdgeSidebar]: () =>
        ({
          ...sharedSidebarStyles,
          [`.${layoutClasses.Root}:has(>&)`]: {
            /** Root default settings */
            "--jun-ES-variant": "var(--permanent)",
            "--jun-ES-permanentWidth": SIDEBAR_WIDTH,
            "--jun-ES-collapsible": "var(--uncollapsed)",
            "--jun-ES-collapsedWidth": "0px",

            /** DO NOT OVERRIDE, internal variables */
            "--drawer": "var(--jun-ES-variant,)",
            "--permanent": "var(--jun-ES-variant,)",
            "--_permanentWidth": `var(--uncollapsed, var(--jun-ES-permanentWidth))
                            var(--collapsed, var(--jun-ES-collapsedWidth, 0px))`,
            "--collapsed": "var(--jun-ES-collapsible,)",
            "--uncollapsed": "var(--jun-ES-collapsible,)",

            /** Collapsible feature */
            [`&:is(${NESTED_LAYOUT}) ${LEFT_COLLAPSER}, ${LEFT_COLLAPSER}:not(${NESTED_COLLAPSER})`]:
              {
                display: "var(--display, inline-flex)",
                "--_sidebarCollapsed": "var(--collapsed, 1)",
              },
            [`&:is(${NESTED_LAYOUT}) ${LEFT_EDGE_SIDEBAR}, ${LEFT_EDGE_SIDEBAR}:not(${NESTED_LEFT_EDGE_SIDEBAR})`]:
              // `.jun-edgeCollapsed/edgeUncollapsed-visible can be used anywhere inside EdgeSidebar
              {
                [`.${layoutClasses.EdgeSidebarUncollapsedVisible}`]: {
                  display:
                    "var(--collapsed, none) var(--uncollapsed, inline-flex)",
                },
                [`.${layoutClasses.EdgeSidebarCollapsedVisible}`]: {
                  display:
                    "var(--collapsed, inline-flex) var(--uncollapsed, none)",
                },
              },
          },

          /** Collapsible feature */
          [`.${layoutClasses.Root}:has(>&[${layoutAttrs.isEdgeSidebarCollapsed}])`]:
            {
              "--jun-ES-collapsible": "var(--collapsed)",
            },
          [`.${layoutClasses.Root}:has(>&[${layoutAttrs.isEdgeSidebarUncollapsed}])`]:
            {
              "--jun-ES-collapsible": "var(--uncollapsed)",
            },
          /** Collapsible feature integration with Shadcn sidebar */
          [`.${layoutClasses.Root}:has(>& [data-state="collapsed"])`]: {
            "--jun-ES-collapsible": "var(--collapsed)",
          },
          [`.${layoutClasses.Root}:has(>& [data-collapsible="icon"])`]: {
            "--jun-ES-collapsedWidth": "var(--sidebar-width-icon)",
          },
          [`.${layoutClasses.Root}:has(>& [data-collapsible="offcanvas"])`]: {
            "--jun-ES-collapsedWidth": "0px",
          },
          [`.${layoutClasses.Root}:has(>&:empty), .${layoutClasses.Root}:has(>& .${layoutClasses.EdgeSidebarContent}:empty)`]:
            {
              "--jun-ES-permanentWidth": "0px",
            },

          /** EdgeSidebar default settings */
          "--jun-ES-anchor": "var(--anchorLeft)",
          "--jun-EC-width": "var(--_permanentWidth, 0px)",
          "--_drawer": "var(--drawer)",
          "--_permanent": "var(--permanent)",
          "--_collapsed": "var(--collapsed)",
          "--_uncollapsed": "var(--uncollapsed)",
          gridArea: layoutClasses.EdgeSidebar,
          width: `var(--drawer, 0)
              var(--permanent, var(--_permanentWidth))`,
          [`&:not([${layoutAttrs.isDrawerOpen}], [${layoutAttrs.isDrawerClosing}])`]:
            {
              overflow: "var(--drawer, hidden)",
            },
        }) as CSSRuleObject,
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  matchComponents(
    {
      [layoutClasses.EdgeSidebar]: () => ({
        boxShadow: "var(--jun-ES-line-w) 0px var(--jun-ES-line-color)",
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  const SHRINK_WIDTH = "100px";
  matchComponents(
    {
      [layoutClasses.EdgeSidebarContent]: () => ({
        background: theme("colors.sidebar.DEFAULT"),
        boxShadow: "var(--jun-EC-shadow)",
        display: "flex",
        flexDirection: "column",
        flex: "1",
        padding: "0px",
        overflowX: "auto", // prevent horizontal content overflow
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  matchUtilities(
    {
      [layoutClasses.EdgeSidebarContent]: () =>
        ({
          "--jun-EC-delay": "0s",
          opacity: `var(--_drawer, var(--jun-ES-drawerOpen))
        var(--_permanent, 1)`,
          visibility: `var(--_drawer, hidden) var(--_permanent, visible)`,
          margin: "0px", // prevent user from customizing it
          position:
            "var(--_drawer, var(--drawer-pos)) var(--_permanent, relative)",
          zIndex: "2",
          width:
            "var(--_drawer, var(--jun-ES-drawerWidth)) var(--_permanent, var(--jun-EC-width))",
          height: "var(--_drawer, var(--drawer-h))",
          top: "var(--_drawer, calc(var(--jun-h) - var(--drawer-h)))",
          overflowY: "var(--_drawer, auto)",
          transition: `var(--tsn, var(--_drawer, opacity 0.3s, transform 0.3s)
           var(--_permanent, opacity 0.4s, width 0.3s var(--jun-EC-delay, 0s), transform 0.3s var(--jun-EC-delay, 0s), box-shadow 0.3s var(--jun-EC-delay, 0s)))`,
          transform: `var(--_drawer, var(--anchorLeft, translateX(calc((1 - var(--jun-ES-drawerOpen)) * -100%))) var(--anchorRight, translateX(calc(var(--jun-ES-drawerOpen) * -100%))))
           var(--_permanent, translateX(var(--jun-ES-permanentSlide, 0)))`,
          [`[${layoutAttrs.isEdgeSidebarContentHidden}] &`]: {
            visibility: "hidden",
            opacity: "0",
          },
          [`[${layoutAttrs.isDrawerOpen}] &, [${layoutAttrs.isDrawerClosing}] &`]:
            {
              visibility: "visible",
            },
          [`[${layoutAttrs.isDrawerClosing}] &`]: {
            transition:
              "var(--tsn, transform 0.3s, visibility 0.3s, opacity 0.3s)",
          },
        }) as CSSRuleObject,
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  matchUtilities(
    {
      [layoutClasses.EdgeSidebarCollapsedVisible]: () => ({
        boxSizing: "border-box",
      }),
      [layoutClasses.EdgeSidebarUncollapsedVisible]: () => ({
        boxSizing: "border-box",
      }),
      [layoutClasses.DrawerOpenVisible]: () => ({
        boxSizing: "border-box",
      }),
      [layoutClasses.DrawerClosedVisible]: () => ({
        boxSizing: "border-box",
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );

  // Left EdgeSidebar
  matchUtilities(
    {
      [`${layoutClasses.EdgeSidebar}-drawer`]: () =>
        ({
          zIndex: "var(--_drawer, var(--drawer-z)) var(--_permanent, 1)",
          "--jun-ES-drawerWidth": "0px",
          "--_collapsed": "",
          "--_uncollapsed": "var(--_)",
          [`.${layoutClasses.Root}:has(>&)`]: {
            "--jun-ES-variant": "var(--drawer)",
            [`&:is(${NESTED_LAYOUT}) ${LEFT_COLLAPSER}, ${LEFT_COLLAPSER}:not(${NESTED_COLLAPSER})`]:
              {
                display: "none",
              },
          },
          [`.${layoutClasses.Root}:has(>&[${layoutAttrs.isDrawerOpen}])`]: {
            [`&:is(${NESTED_LAYOUT}) ${LEFT_DRAWER_TRIGGER}, ${LEFT_DRAWER_TRIGGER}:not(${NESTED_DRAWER_TRIGGER})`]:
              {
                [`.${layoutClasses.DrawerClosedVisible}`]: {
                  display: "none",
                },
              },
          },
          [`.${layoutClasses.Root}:has(>&:not([${layoutAttrs.isDrawerOpen}]))`]:
            {
              [`&:is(${NESTED_LAYOUT}) ${LEFT_DRAWER_TRIGGER}, ${LEFT_DRAWER_TRIGGER}:not(${NESTED_DRAWER_TRIGGER})`]:
                {
                  [`.${layoutClasses.DrawerOpenVisible}`]: {
                    display: "none",
                  },
                },
            },
          [`&[${layoutAttrs.isDrawerOpen}], &[${layoutAttrs.isDrawerClosing}]`]:
            {
              "--jun-ES-drawerWidth": SIDEBAR_WIDTH_MOBILE,
            },
        }) as CSSRuleObject,
      [`${layoutClasses.EdgeSidebar}-drawer-showHeader`]: () => ({
        "--drawer-h": "calc(var(--jun-h) - var(--jun-H-h))",
        "&::before": {
          top: "var(--jun-H-h)",
        },
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  matchUtilities(
    {
      [`${layoutClasses.EdgeSidebar}-drawer-withoutOverlay`]: () => ({
        "--drawer-h": "calc(var(--jun-h) - var(--jun-H-clip-h))",
        "&::before": {
          display: "none",
        },
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  matchUtilities(
    {
      [`${layoutClasses.EdgeSidebar}-w`]: (width) =>
        ({
          [`&[${layoutAttrs.isDrawerOpen}], &[${layoutAttrs.isDrawerClosing}]`]:
            {
              "--jun-ES-drawerWidth": width,
            },
          [`.${layoutClasses.Root}:has(>&)`]: {
            "--jun-ES-permanentWidth": width,
          },
        }) as CSSRuleObject,
      [`${layoutClasses.EdgeSidebar}-collapsed-w`]: (collapsedWidth) => ({
        [`.${layoutClasses.Root}:has(>&)`]: {
          "--jun-ES-collapsedWidth": collapsedWidth,
        },
      }),
    },
    {
      values: {
        DEFAULT: SIDEBAR_WIDTH_MOBILE,
      },
    }
  );
  matchUtilities(
    {
      [layoutClasses.EdgeSidebar]: (value) =>
        ({
          permanent: {
            "--jun-EC-shadow": "none",
            "--jun-EC-width": "var(--_permanentWidth, 0px)",
            "--_collapsed": "var(--collapsed)",
            "--_uncollapsed": "var(--uncollapsed)",
            [`.${layoutClasses.Root}:has(>&)`]: {
              "--jun-ES-variant": "var(--permanent)",
              [`&:is(${NESTED_LAYOUT}) ${LEFT_COLLAPSER}, ${LEFT_COLLAPSER}:not(${NESTED_COLLAPSER})`]:
                {
                  display: "var(--display, inline-flex)",
                },
              [`&:is(${NESTED_LAYOUT}) ${LEFT_DRAWER_TRIGGER}, ${LEFT_DRAWER_TRIGGER}:not(${NESTED_DRAWER_TRIGGER})`]:
                {
                  display: "none",
                },
            },
          },
          "permanent-hidden": {
            [`.${layoutClasses.Root}:has(>&)`]: {
              "--_permanentWidth": "0px",
            },
            [`& .${layoutClasses.EdgeSidebarContent}`]: {
              visibility: "hidden",
            },
          },
          "permanent-visible": {
            [`.${layoutClasses.Root}:has(>&)`]: {
              "--_permanentWidth": `var(--uncollapsed, var(--jun-ES-permanentWidth))
                                    var(--collapsed, var(--jun-ES-collapsedWidth, 0px))`,
            },
            [`& .${layoutClasses.EdgeSidebarContent}`]: {
              visibility: `var(--_drawer, hidden) var(--_permanent, visible)`,
            },
          },
          "permanent-hoverUncollapse": {
            [`&:has(.${layoutClasses.EdgeSidebarContent}:hover)`]: {
              "--_collapsed": "",
              "--_uncollapsed": "var(--_)",
            },
            [`& .${layoutClasses.EdgeSidebarContent}:hover`]: {
              "--jun-EC-width": "var(--jun-ES-permanentWidth)",
              // TODO: make the `shadow` configurable from theme
              "--jun-EC-delay": "0s",
              "--jun-EC-shadow": `var(--_permanent, var(--collapsed, 0 0 10px rgba(0,0,0,0.1), var(--jun-ES-line-w) 0 var(--jun-ES-line-color)))`,
            },
          },
        })[value] as CSSRuleObject,
    },
    {
      values: {
        permanent: "permanent",
        "permanent-hidden": "permanent-hidden",
        "permanent-visible": "permanent-visible",
        "permanent-hoverUncollapse": "permanent-hoverUncollapse",
      },
    }
  );
  matchUtilities(
    {
      [`${layoutClasses.EdgeSidebar}-permanent-hoverUncollapse-delay`]: (
        delay
      ) => ({
        [`& .${layoutClasses.EdgeSidebarContent}:hover`]: {
          "--jun-EC-delay": delay,
        },
      }),
    },
    {
      values: {
        DEFAULT: "0.3s",
      },
    }
  );
  matchUtilities(
    {
      [`${layoutClasses.EdgeSidebar}-permanent-autoCollapse`]: (
        autoCollapse
      ) => {
        let autoCollapseStyles = {};
        autoCollapseStyles = {
          [`.${layoutClasses.Root}:has(>&)`]: {
            [`&:is(${NESTED_LAYOUT}) ${LEFT_COLLAPSER}, ${LEFT_COLLAPSER}:not(${NESTED_COLLAPSER})`]:
              {
                "--_autoCollapse": "1",
              },
          },
          [`@media (max-width:${autoCollapse})`]: {
            [`.${layoutClasses.Root}:has(>&)`]: {
              "--jun-ES-collapsible": "var(--collapsed)",
            },
          },
          [`@media (min-width:${autoCollapse})`]: {
            // need to split to work with media query
            [`.${layoutClasses.Root}:has(>&):is(${NESTED_LAYOUT}) ${LEFT_COLLAPSER}`]:
              {
                "--_in-autoCollapse": "1",
              },
            [`.${layoutClasses.Root}:has(>&) ${LEFT_COLLAPSER}:not(${NESTED_COLLAPSER})`]:
              {
                "--_in-autoCollapse": "1",
              },
            [`.${layoutClasses.Root}:has(>&)`]: {
              "--jun-ES-collapsible": "var(--uncollapsed)",
            },
          },
        };
        return autoCollapseStyles;
      },
    },
    { values: theme("screens") }
  );

  // DrawerClose
  matchComponents(
    {
      [layoutClasses.DrawerEdgeSidebarClose]: () =>
        ({
          display: "var(--_drawer, flex) var(--_permanent, none)",
          visibility: "hidden",
          opacity: "0",
          transition: "var(--tsn, 0.3s)",
          top: "calc(0.875rem)",
          right: "var(--anchorLeft, 0.875rem)",
          left: "var(--anchorRight, 0.875rem)",
          zIndex: "2",
          position: "fixed",
          width: "40px",
          height: "40px",
          color: "white",
          cursor: "pointer",
          backgroundColor: "#999",
          borderRadius: "40px",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          "& svg": {
            width: "1.5em",
            height: "1.5em",
          },
          [`[${layoutAttrs.isDrawerOpen}] &`]: {
            visibility: "visible",
            opacity: "1",
          },
        }) as CSSRuleObject,
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );

  // EdgeSidebarCollapser & Trigger
  matchUtilities(
    {
      // no meaning, just for intellisense
      [layoutClasses.EdgeSidebarCollapser]: () => ({
        "--collapser": "1",
      }),
      [layoutClasses.DrawerEdgeSidebarTrigger]: () => ({
        "--drawer-trigger": "1",
      }),
      [layoutClasses.EdgeSidebarRightCollapser]: () => ({
        "--collapserR": "1",
      }),
      [layoutClasses.DrawerEdgeSidebarRightTrigger]: () => ({
        "--drawer-triggerR": "1",
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );

  // Right EdgeSidebar
  matchUtilities(
    {
      [layoutClasses.EdgeSidebarRight]: () =>
        ({
          ...sharedSidebarStyles,
          [`.${layoutClasses.Root}:has(>&)`]: {
            /** Root default settings */
            "--jun-ESR-variant": "var(--permanent-R)",
            "--jun-ESR-permanentWidth": SIDEBAR_WIDTH,
            "--jun-ESR-collapsible": "var(--uncollapsed-R)",
            "--jun-ESR-collapsedWidth": "0px",

            /** DO NOT OVERRIDE, internal variables */
            "--drawer-R": "var(--jun-ESR-variant,)",
            "--permanent-R": "var(--jun-ESR-variant,)",
            "--_permanentWidth-R": `var(--uncollapsed-R, var(--jun-ESR-permanentWidth))
                            var(--collapsed-R, var(--jun-ESR-collapsedWidth, 0px))`,
            "--collapsed-R": "var(--jun-ESR-collapsible,)",
            "--uncollapsed-R": "var(--jun-ESR-collapsible,)",

            /** Collapsible feature */
            [`&:is(${NESTED_LAYOUT}) ${RIGHT_COLLAPSER}, ${RIGHT_COLLAPSER}:not(${NESTED_RIGHT_COLLAPSER})`]:
              {
                display: "var(--display, inline-flex)",
                "--_sidebarCollapsed": "var(--collapsed-R, 1)",
              },
            [`&:is(${NESTED_LAYOUT}) ${RIGHT_EDGE_SIDEBAR}, ${RIGHT_EDGE_SIDEBAR}:not(${NESTED_RIGHT_EDGE_SIDEBAR})`]:
              // `.jun-edgeCollapsed/edgeUncollapsed-visible can be used anywhere inside EdgeSidebar-R
              {
                [`.${layoutClasses.EdgeSidebarUncollapsedVisible}`]: {
                  display:
                    "var(--collapsed-R, none) var(--uncollapsed-R, inline-flex)",
                },
                [`.${layoutClasses.EdgeSidebarCollapsedVisible}`]: {
                  display:
                    "var(--collapsed-R, inline-flex) var(--uncollapsed-R, none)",
                },
              },
          },

          /** Collapsible feature */
          [`.${layoutClasses.Root}:has(>&[${layoutAttrs.isEdgeSidebarCollapsed}])`]:
            {
              "--jun-ESR-collapsible": "var(--collapsed-R)",
            },
          [`.${layoutClasses.Root}:has(>&[${layoutAttrs.isEdgeSidebarUncollapsed}])`]:
            {
              "--jun-ESR-collapsible": "var(--uncollapsed-R)",
            },
          /** Collapsible feature integration with Shadcn sidebar */
          [`.${layoutClasses.Root}:has(>& [data-state="collapsed"])`]: {
            "--jun-ESR-collapsible": "var(--collapsed-R)",
          },
          [`.${layoutClasses.Root}:has(>& [data-collapsible="icon"])`]: {
            "--jun-ESR-collapsedWidth": "var(--sidebar-width-icon)",
          },
          [`.${layoutClasses.Root}:has(>& [data-collapsible="offcanvas"])`]: {
            "--jun-ESR-collapsedWidth": "0px",
          },
          [`.${layoutClasses.Root}:has(>&:empty), .${layoutClasses.Root}:has(>& .${layoutClasses.EdgeSidebarContent}:empty)`]:
            {
              "--jun-ESR-permanentWidth": "0px",
            },

          /** EdgeSidebar default settings */
          "--jun-ES-anchor": "var(--anchorRight)",
          "--jun-EC-width": "var(--_permanentWidth-R, 0px)",
          "--_drawer": "var(--drawer-R)",
          "--_permanent": "var(--permanent-R)",
          "--_collapsed": "var(--collapsed-R)",
          "--_uncollapsed": "var(--uncollapsed-R)",
          gridArea: layoutClasses.EdgeSidebarRight,
          width: `var(--drawer-R, 0)
              var(--permanent-R, var(--_permanentWidth-R))`,
          [`&:not([${layoutAttrs.isDrawerOpen}], [${layoutAttrs.isDrawerClosing}])`]:
            {
              overflow: "var(--drawer-R, hidden)",
            },
        }) as CSSRuleObject,
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  matchComponents(
    {
      [layoutClasses.EdgeSidebarRight]: () => ({
        boxShadow:
          "calc(-1 * var(--jun-ES-line-w)) 0px var(--jun-ES-line-color)",
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  matchUtilities(
    {
      [`${layoutClasses.EdgeSidebarRight}-drawer`]: () =>
        ({
          zIndex: "var(--_drawer, var(--drawer-z)) var(--_permanent, 1)",
          "--jun-ES-drawerWidth": "0px",
          "--_collapsed": "",
          "--_uncollapsed": "var(--_)",
          [`.${layoutClasses.Root}:has(>&)`]: {
            "--jun-ESR-variant": "var(--drawer-R)",
            [`&:is(${NESTED_LAYOUT}) ${RIGHT_COLLAPSER}, ${RIGHT_COLLAPSER}:not(${NESTED_RIGHT_COLLAPSER})`]:
              {
                display: "none",
              },
          },
          [`.${layoutClasses.Root}:has(>&[${layoutAttrs.isDrawerOpen}])`]: {
            [`&:is(${NESTED_LAYOUT}) ${RIGHT_DRAWER_TRIGGER}, ${RIGHT_DRAWER_TRIGGER}:not(${NESTED_RIGHT_DRAWER_TRIGGER})`]:
              {
                [`.${layoutClasses.DrawerClosedVisible}`]: {
                  display: "none",
                },
              },
          },
          [`.${layoutClasses.Root}:has(>&:not([${layoutAttrs.isDrawerOpen}]))`]:
            {
              [`&:is(${NESTED_LAYOUT}) ${RIGHT_DRAWER_TRIGGER}, ${RIGHT_DRAWER_TRIGGER}:not(${NESTED_RIGHT_DRAWER_TRIGGER})`]:
                {
                  [`.${layoutClasses.DrawerOpenVisible}`]: {
                    display: "none",
                  },
                },
            },
          [`&[${layoutAttrs.isDrawerOpen}], &[${layoutAttrs.isDrawerClosing}]`]:
            {
              "--jun-ES-drawerWidth": SIDEBAR_WIDTH_MOBILE,
            },
        }) as CSSRuleObject,
      [`${layoutClasses.EdgeSidebarRight}-drawer-showHeader`]: () => ({
        "--drawer-h": "calc(var(--jun-h) - var(--jun-H-h))",
        "&::before": {
          top: "var(--jun-H-h)",
        },
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  matchUtilities(
    {
      [`${layoutClasses.EdgeSidebarRight}-drawer-withoutOverlay`]: () => ({
        "--drawer-h": "calc(var(--jun-h) - var(--jun-H-clip-h))",
        "&::before": {
          display: "none",
        },
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  matchUtilities(
    {
      [`${layoutClasses.EdgeSidebarRight}-w`]: (width) =>
        ({
          [`&[${layoutAttrs.isDrawerOpen}], &[${layoutAttrs.isDrawerClosing}]`]:
            {
              "--jun-ES-drawerWidth": width,
            },
          [`.${layoutClasses.Root}:has(>&)`]: {
            "--jun-ESR-permanentWidth": width,
          },
        }) as CSSRuleObject,
      [`${layoutClasses.EdgeSidebarRight}-collapsed-w`]: (collapsedWidth) => ({
        [`.${layoutClasses.Root}:has(>&)`]: {
          "--jun-ESR-collapsedWidth": collapsedWidth,
        },
      }),
    },
    {
      values: {
        DEFAULT: SIDEBAR_WIDTH_MOBILE,
      },
    }
  );
  matchUtilities(
    {
      [layoutClasses.EdgeSidebarRight]: (value) =>
        ({
          permanent: {
            "--jun-EC-shadow": "none",
            "--jun-EC-width": "var(--_permanentWidth-R, 0px)",
            "--_collapsed": "var(--collapsed-R)",
            "--_uncollapsed": "var(--uncollapsed-R)",
            [`.${layoutClasses.Root}:has(>&)`]: {
              "--jun-ESR-variant": "var(--permanent-R)",
              [`&:is(${NESTED_LAYOUT}) ${RIGHT_COLLAPSER}, ${RIGHT_COLLAPSER}:not(${NESTED_RIGHT_COLLAPSER})`]:
                {
                  display: "var(--display, inline-flex)",
                },
              [`&:is(${NESTED_LAYOUT}) ${RIGHT_DRAWER_TRIGGER}, ${RIGHT_DRAWER_TRIGGER}:not(${NESTED_RIGHT_DRAWER_TRIGGER})`]:
                {
                  display: "none",
                },
            },
          },
          "permanent-hidden": {
            [`.${layoutClasses.Root}:has(>&)`]: {
              "--_permanentWidth-R": "0px",
            },
            [`& .${layoutClasses.EdgeSidebarContent}`]: {
              visibility: "hidden",
            },
          },
          "permanent-visible": {
            [`.${layoutClasses.Root}:has(>&)`]: {
              "--_permanentWidth-R": `var(--uncollapsed-R, var(--jun-ESR-permanentWidth))
                            var(--collapsed-R, var(--jun-ESR-collapsedWidth, 0px))`,
            },
            [`& .${layoutClasses.EdgeSidebarContent}`]: {
              visibility: `var(--_drawer, hidden) var(--_permanent, visible)`,
            },
          },
          "permanent-hoverUncollapse": {
            [`&:has(.${layoutClasses.EdgeSidebarContent}:hover)`]: {
              "--_collapsed": "",
              "--_uncollapsed": "var(--_)",
            },
            [`& .${layoutClasses.EdgeSidebarContent}:hover`]: {
              "--jun-EC-width": "var(--jun-ESR-permanentWidth)",
              // TODO: make the `shadow` configurable from theme
              "--jun-EC-delay": "0s",
              "--jun-EC-shadow": `var(--collapsed-R, 0 0 10px rgba(0,0,0,0.1), var(--jun-ES-line-w) 0 var(--jun-ESR-sidelineColor))`,
            },
          },
        })[value] as CSSRuleObject,
    },
    {
      values: {
        permanent: "permanent",
        "permanent-hidden": "permanent-hidden",
        "permanent-visible": "permanent-visible",
        "permanent-hoverUncollapse": "permanent-hoverUncollapse",
      },
    }
  );
  matchUtilities(
    {
      [`${layoutClasses.EdgeSidebarRight}-permanent-hoverUncollapse-delay`]: (
        delay
      ) => ({
        [`& .${layoutClasses.EdgeSidebarContent}:hover`]: {
          "--jun-EC-delay": delay,
        },
      }),
    },
    {
      values: {
        DEFAULT: "0.3s",
      },
    }
  );
  matchUtilities(
    {
      [`${layoutClasses.EdgeSidebarRight}-permanent-autoCollapse`]: (
        autoCollapse
      ) => {
        let autoCollapseStyles = {};
        autoCollapseStyles = {
          [`.${layoutClasses.Root}:has(>&)`]: {
            [`&:is(${NESTED_LAYOUT}) ${RIGHT_COLLAPSER}, ${RIGHT_COLLAPSER}:not(${NESTED_RIGHT_COLLAPSER})`]:
              {
                "--_autoCollapse": "1",
              },
          },
          [`@media (max-width:${autoCollapse})`]: {
            [`.${layoutClasses.Root}:has(>&)`]: {
              "--jun-ESR-collapsible": "var(--collapsed-R)",
            },
          },
          [`@media (min-width:${autoCollapse})`]: {
            // need to split to work with media query
            [`.${layoutClasses.Root}:has(>&):is(${NESTED_LAYOUT}) ${RIGHT_COLLAPSER}`]:
              {
                "--_in-autoCollapse": "1",
              },
            [`.${layoutClasses.Root}:has(>&) ${RIGHT_COLLAPSER}:not(${NESTED_RIGHT_COLLAPSER})`]:
              {
                "--_in-autoCollapse": "1",
              },
            [`.${layoutClasses.Root}:has(>&)`]: {
              "--jun-ESR-collapsible": "var(--uncollapsed-R)",
            },
          },
        };
        return autoCollapseStyles;
      },
    },
    { values: theme("screens") }
  );

  // InsetContent
  matchUtilities(
    {
      [layoutClasses.InsetContent]: () => ({
        boxSizing: "var(--fixed, content-box) var(--absolute, border-box)",
        position: "var(--fixed, fixed) var(--absolute, absolute)",
        height:
          "var(--fixed, calc(100% - var(--jun-H-h, 0px))) var(--absolute, var(--jun-IC-absolute-h, 100%))",
        width: "var(--fixed, inherit) var(--absolute, 100%)",
        top: "0px",
        marginLeft:
          "var(--fixed, var(--anchor-left, -9999px)) var(--absolute, initial)",
        paddingLeft:
          "var(--fixed, var(--anchor-left, 9999px)) var(--absolute, initial)",
        marginRight:
          "var(--fixed, var(--anchor-right, -9999px)) var(--absolute, initial)",
        paddingRight:
          "var(--fixed, var(--anchor-right, 9999px)) var(--absolute, initial)",
        marginTop: "var(--fixed, var(--jun-H-h))",
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  matchComponents(
    {
      [layoutClasses.InsetContent]: () => ({
        display: "flex",
        flexDirection: "column",
        backgroundColor: "inherit",
        overflow: "auto",
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  // InsetAvoidingView
  matchUtilities(
    {
      [layoutClasses.InsetAvoidingView]: () => ({
        marginRight: "var(--jun-ISR-w)",
        marginLeft: "var(--jun-ISL-w)",
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  // InsetSidebar
  const insetSidebarSticky = {
    position: "sticky",
    height: "var(--sticky, calc(var(--jun-h) - var(--jun-H-h)))",
    overflow: "var(--sticky, auto)",
    top: "var(--sticky, var(--jun-H-h))",
  };
  matchUtilities(
    {
      [layoutClasses.InsetSidebar]: () =>
        ({
          "*:has(>&)": {
            display: "flex",
            flexFlow: "row nowrap !important",
            flexGrow: "1 !important",
            [`&:not(.${layoutClasses.Content})`]: {
              height: "100%",
            },
          },
          [`*:has(>&) > :where(:not([class*="${layoutClasses.InsetSidebar}"]))`]:
            {
              flexGrow: "1 !important",
              overflow: "auto",
            },
          "--jun-IS-position": `var(--sticky,)`,
          /** DO NOT OVERRIDE, internal variables */
          "--fixed": "var(--jun-IS-position,)",
          "--absolute": "var(--jun-IS-position,)",
          "--sticky": "var(--jun-IS-position,)",
          "--anchor-right": "var(--jun-IS-anchor,)",
          "--anchor-left": "var(--jun-IS-anchor,)",
          ...insetSidebarSticky,
          flex: "none",
          "&:first-child": {
            "--jun-IS-anchor": "var(--anchor-left)",
          },
          "&:last-child": {
            "--jun-IS-anchor": "var(--anchor-right)",
          },
        }) as CSSRuleObject,
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  matchUtilities(
    {
      [layoutClasses.InsetSidebar]: (value): CSSRuleObject => {
        return {
          "--jun-IS-position": `var(--${value},)`,
          ...(value === "sticky" && insetSidebarSticky),
          ...((value === "absolute" || value === "fixed") && {
            position: "relative",
            flexShrink: "0",
            zIndex: "1",
          }),
        };
      },
    },
    {
      values: {
        fixed: "fixed",
        absolute: "absolute",
        sticky: "sticky",
      },
    }
  );
  matchUtilities(
    {
      [`${layoutClasses.InsetSidebar}-w`]: (width) =>
        ({
          width,
          [`.${layoutClasses.Root}:has(> .${layoutClasses.Content} > &:first-child) > .${layoutClasses.Footer}`]:
            { "--jun-ISL-w": width },
          [`.${layoutClasses.Root}:has(> .${layoutClasses.Content} > * > &:first-child) > .${layoutClasses.Footer}`]:
            { "--jun-ISL-w": width },
          [`.${layoutClasses.Root}:has(> .${layoutClasses.Content} > &:last-child) > .${layoutClasses.Footer}`]:
            { "--jun-ISR-w": width },
          [`.${layoutClasses.Root}:has(> .${layoutClasses.Content} > * > &:last-child) > .${layoutClasses.Footer}`]:
            { "--jun-ISR-w": width },
        }) as CSSRuleObject,
    },
    {
      values: {
        DEFAULT: "220px",
      },
    }
  );

  // SidebarContainer
  matchUtilities(
    {
      [`${layoutClasses.SidebarContainer}`]: () => ({
        containerType: "inline-size",
        display: "flex",
        flexDirection: "column",
        [`&:not([class*=${layoutClasses.SidebarContainer}-shrink])`]: {
          "--_collapsed": "var(--_)",
          "--_uncollapsed": "",
          "& > *": {
            [`@container (min-width: ${SHRINK_WIDTH})`]: {
              "--_collapsed": "",
              "--_uncollapsed": "var(--_)",
            },
          },
        },
      }),
      [`${layoutClasses.SidebarContainer}-shrink`]: (shrink) => ({
        "--_collapsed": "var(--_)",
        "--_uncollapsed": "",
        "& > *": {
          [`@container (min-width: ${shrink})`]: {
            "--_collapsed": "",
            "--_uncollapsed": "var(--_)",
          },
        },
      }),
    },
    {
      values: {
        DEFAULT: SHRINK_WIDTH,
      },
    }
  );
  // SidebarRail
  matchComponents(
    {
      [layoutClasses.SidebarRail]: () => ({
        "--indicator-w": "2px",
        "--touch-size": "20px",
        "--offset": "calc(-1 * (var(--indicator-w)/2 + var(--touch-size)/2))",
        position: "absolute",
        top: "0",
        bottom: "0",
        right: "var(--anchorLeft, var(--offset)) var(--anchorRight, unset)",
        left: "var(--anchorLeft, unset) var(--anchorRight, var(--offset))",
        zIndex: "20",
        width: "var(--touch-size)",
        textAlign: "center",
        cursor: "var(--_collapsed, e-resize) var(--_uncollapsed, w-resize)",
        display: "inline-flex",
        justifyContent: "center",
        "&::after": {
          content: '""',
          width: "var(--indicator-w)",
          height: "100%",
          display: "block",
        },
        "&:hover": {
          "&::after": {
            background: theme("colors.sidebar.border"), // TODO: use theme token
          },
        },
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  // SidebarGroup
  matchComponents(
    {
      [layoutClasses.SidebarGroup]: () => ({
        display: "flex",
        flexDirection: "column",
        padding: theme("spacing.2"),
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  // SidebarGroupLabel
  matchComponents(
    {
      [layoutClasses.SidebarGroupLabel]: () => ({
        position: "relative",
        textOverflow: "ellipsis",
        transition: "var(--tsn, var(--_uncollapsed, opacity 0.4s))",
        opacity: "var(--_collapsed, 0) var(--_uncollapsed, 1)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        fontSize: "var(--item-fs, 0.75rem)",
        lineHeight: "var(--item-lh, 1.25rem)",
        minHeight: "var(--item-h, 2rem)",
        display: "flex",
        alignItems: "center",
        color: theme("colors.sidebar.foreground"),
        paddingInline: "var(--item-px, 0.5rem)",
        paddingBlock: "var(--item-py, 0.25rem)",
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  // SidebarMenu
  matchComponents(
    {
      [layoutClasses.SidebarMenu]: () => ({
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
      }),
      [`${layoutClasses.SidebarMenu}-relaxed`]: () => ({
        gap: "0.5rem",
        "--item-gap": "0.75rem",
        "--item-h": "2.5rem",
        "--item-fs": "1rem",
        "--item-lh": "1.5rem",
        "--item-px": "0.75rem",
        "--item-py": "0.5rem",
        "--action-size": "2rem",
        "--icon-size": "1.25rem",
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  matchComponents(
    {
      [`${layoutClasses.SidebarMenu}-nested`]: () => ({
        "--item-py": "0px",
        "--item-h": "calc(var(--item-lh, 1.25rem) + 0.5rem)",
        paddingBlock: "0.25rem",
        position: "relative",
        marginLeft:
          "calc(var(--icon-w, 1rem) + 2*var(--item-gap, 0.5rem) - 0.5rem)", // last 0.5rem is the child menu item default `pl`
        "&::before": {
          content: '""',
          display: "block",
          position: "absolute",
          width: "1px",
          top: "2px",
          bottom: "2px",
          left: "calc(var(--icon-w, 1rem)/-2 - var(--item-gap, 0.5rem) + 0.5rem)", // last 0.5rem is the child menu item default `pl`
          background: theme("colors.sidebar.border"),
        },
      }),
      [`${layoutClasses.SidebarMenu}-nested-noLine`]: () => ({
        "&::before": {
          display: "none",
        },
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  // SidebarMenuItem
  matchComponents(
    {
      [layoutClasses.SidebarMenuItem]: () => ({
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  // SidebarMenuButton
  matchComponents(
    {
      [layoutClasses.SidebarMenuButton]: () => ({
        minWidth: "0",
        textAlign: "left",
        alignItems: "center",
        flex: "1",
        fontSize: "var(--item-fs, 0.875rem)",
        lineHeight: "var(--item-lh, 1.25rem)",
        minHeight: "var(--item-h, 2rem)",
        borderRadius: theme("borderRadius.sm"),
        color: theme("colors.sidebar.foreground"),
        cursor: "pointer",
        transition:
          "var(--tsn, min-height var(--_collapsed, 0.2s) var(--_uncollapsed, 0.3s), padding var(--_collapsed, 0.2s) var(--_uncollapsed, 0.3s), gap var(--_collapsed, 0s 0.4s) var(--_uncollapsed, 0s))",
        "&:hover": {
          color: theme("colors.sidebar.accent-foreground"),
          background: theme("colors.sidebar.accent"), // TODO: use theme token
        },
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  matchComponents(
    {
      [`${layoutClasses.SidebarMenuButton}-active`]: () => ({
        color: theme("colors.sidebar.accent-foreground"),
        background: theme("colors.sidebar.accent"), // TODO: use theme token
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  matchUtilities(
    {
      [layoutClasses.SidebarMenuButton]: () => ({
        "--item-gap": `var(--_collapsed, 0px) var(--_uncollapsed, 0.5rem)`,
        display: "flex",
        gap: "var(--item-gap)",
        paddingInline:
          "var(--_collapsed, var(--shrink-px, var(--item-px, 0.5rem))) var(--_uncollapsed, var(--item-px, 0.5rem))",
        paddingBlock: `var(--_collapsed, var(--shrink-py, var(--item-py, 0.375rem))) var(--_uncollapsed, var(--item-py, 0.375rem))`,
        [`&:has(> .${layoutClasses.SidebarIcon})`]: {
          gridTemplateColumns:
            "var(--_collapsed, auto 0px) var(--_uncollapsed, auto 1fr)",
        },
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  matchUtilities(
    {
      [`${layoutClasses.SidebarMenuButton}-spacing`]: (spacing) => ({
        "--item-gap": `var(--_collapsed, 0px) var(--_uncollapsed, ${spacing})`,
        "--item-px": spacing,
        "--item-py": spacing,
        [`.${layoutClasses.SidebarMenuItem}:has(> &)`]: {
          "--item-gap": `var(--_collapsed, 0px) var(--_uncollapsed, ${spacing})`,
        },
      }),
    },
    {
      values: theme("spacing"),
    }
  );
  matchUtilities(
    {
      [`${layoutClasses.SidebarMenuButton}-shrink-spacing`]: (spacing) => ({
        "--shrink-px": spacing,
        "--shrink-py": spacing,
      }),
    },
    {
      values: theme("spacing"),
    }
  );
  matchUtilities(
    {
      [`${layoutClasses.SidebarMenuButton}-h`]: (size) => ({
        "--item-h": size,
        [`.${layoutClasses.SidebarMenuItem}:has(> &)`]: {
          "--item-h": size,
        },
      }),
    },
    {
      values: theme("spacing"),
    }
  );
  matchUtilities(
    {
      [`${layoutClasses.SidebarMenuButton}-gap`]: (size) => ({
        "--item-gap": size,
        [`.${layoutClasses.SidebarMenuItem}:has(> &)`]: {
          "--item-gap": size,
        },
      }),
    },
    {
      values: theme("spacing"),
    }
  );
  matchUtilities(
    {
      [`${layoutClasses.SidebarMenuButton}-shrink-h`]: (size) => ({
        minHeight: `var(--_collapsed, ${size}) var(--_uncollapsed, var(--item-h, 2rem))`,
      }),
    },
    {
      values: theme("spacing"),
    }
  );
  matchUtilities(
    {
      [`${layoutClasses.SidebarMenuButton}-offset`]: (ratio) => ({
        marginLeft: `calc(-${ratio} * var(--icon-w, 1rem) + var(--item-gap))`,
        paddingLeft: `calc(${ratio} * var(--icon-w, 1rem))`,
      }),
    },
    {
      values: {
        ".25": ".25",
        ".5": ".5",
        ".75": ".75",
        "1": "1",
      },
    }
  );
  // SidebarText
  matchComponents(
    {
      [layoutClasses.SidebarText]: () => ({
        textOverflow: "ellipsis",
        transition: "var(--tsn, var(--_uncollapsed, opacity 0.3s))",
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  matchUtilities(
    {
      [layoutClasses.SidebarText]: () => ({
        flex: "var(--_collapsed, 0) var(--_uncollapsed, 1)",
        opacity: "var(--_collapsed, 0) var(--_uncollapsed, 1)",
        whiteSpace: "nowrap",
        overflow: "hidden",
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  // SidebarGroupText
  matchComponents(
    {
      [layoutClasses.SidebarGroupText]: () => ({
        transition:
          "var(--tsn, grid-template-rows 0.4s, opacity 0.4s var(--_uncollapsed, 0.2s))",
        opacity: "var(--_collapsed, 0) var(--_uncollapsed, 1)",
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  matchUtilities(
    {
      [layoutClasses.SidebarGroupText]: () => ({
        display: "grid",
        whiteSpace: "nowrap",
        gridTemplateRows: "var(--_collapsed, 0fr) var(--_uncollapsed, 1fr)",
        "& > *": {
          overflow: "hidden",
        },
      }),
      [`${layoutClasses.SidebarGroupText}-hidden`]: () => ({
        gridTemplateRows: "0fr",
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  // SidebarMenuAction
  matchComponents(
    {
      [layoutClasses.SidebarMenuAction]: () => ({
        position: "absolute",
        right: "var(--_collapsed, -100%) var(--_uncollapsed, 0.25rem)", // equal to the SidebarMenuButton padding
        width: "var(--action-size, 1.5rem)",
        height: "var(--action-size, 1.5rem)",
        display: "inline-flex",
        visibility: "var(--_collapsed, hidden) var(--_uncollapsed, visible)",
        justifyContent: "center",
        alignItems: "center",
        top: "calc(var(--item-h, 2rem)/2 - var(--action-size, 1.5rem)/2)",
        color: theme("colors.sidebar.foreground"),
        transition: "var(--tsn, right 0.4s)",
        borderRadius: theme("borderRadius.sm"),
        "&:hover": {
          background: theme("colors.sidebar.accent"),
        },
        "& svg": {
          width: "var(--icon-size, 1rem)",
          height: "var(--icon-size, 1rem)",
        },
        "&:has(+ &)": {
          right:
            "var(--_collapsed, -100%) var(--_uncollapsed, calc(var(--action-size, 1.5rem) + 0.25rem))",
        },
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  matchComponents(
    {
      [`${layoutClasses.SidebarMenuAction}-size`]: (size) => ({
        "--action-size": size,
      }),
    },
    {
      values: theme("spacing"),
    }
  );
  matchComponents(
    {
      [`${layoutClasses.SidebarMenuAction}-hoverAppear`]: () => ({
        opacity: "0",
        "&:hover, &:focus-visible": {
          opacity: "1",
        },
        [`.${layoutClasses.SidebarMenuButton}:hover ~ &, .${layoutClasses.SidebarGroupLabel} > &`]:
          {
            opacity: "1",
          },
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  // SidebarIcon
  matchComponents(
    {
      [layoutClasses.SidebarIcon]: () => ({
        height: "var(--icon-size, 1rem)",
        width: "var(--icon-size, 1rem)",
        transition: "var(--tsn, cubic-bezier(0.4, 0, 0.2, 1) 0.15s)",
        flex: "none",
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  matchUtilities(
    {
      [`${layoutClasses.SidebarIcon}-size`]: (size) => ({
        "--icon-size": size,
        height: size,
        width: size,
        [`.${layoutClasses.SidebarMenuItem}:has(&)`]: {
          "--icon-w": size,
        },
      }),
    },
    {
      values: theme("spacing"),
    }
  );
  matchUtilities(
    // split to another matcher to override the above
    {
      [`${layoutClasses.SidebarIcon}-min-w`]: (size) => ({
        minWidth: size,
        [`.${layoutClasses.SidebarMenuItem}:has(&)`]: {
          "--icon-w": size,
        },
      }),
    },
    {
      values: theme("spacing"),
    }
  );
  matchUtilities(
    {
      [`${layoutClasses.SidebarIcon}-shrink-size`]: (size) => ({
        width: `var(--_collapsed, ${size}) var(--_uncollapsed, var(--icon-size, 1rem))`,
        height: `var(--_collapsed, ${size}) var(--_uncollapsed, var(--icon-size, 1rem))`,
      }),
    },
    {
      values: theme("spacing"),
    }
  );
  // SidebarTooltip
  matchUtilities(
    {
      [layoutClasses.SidebarTooltip]: () => ({
        display: "var(--_collapsed, block) var(--_uncollapsed, none)",
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );

  // CollapsibleTrigger
  matchComponents(
    {
      [layoutClasses.CollapsibleTrigger]: () => ({
        userSelect: "none", // prevent text highlight
        "&:has(input:focus-visible)": {
          outline: `2px solid ${theme("colors.sidebar.ring")}`,
        },
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  // CollapsibleContent
  matchComponents(
    {
      [layoutClasses.CollapsibleContent]: () => ({
        display: "grid",
        "& > *": {
          overflow: "hidden",
        },
        ":has(:checked) ~ &": {
          // open
          transition:
            "var(--tsn, grid-template-rows 0.4s, visibility 0.4s, opacity 0.4s 0.2s)",
          gridTemplateRows: "var(--_collapsed, 0fr) var(--_uncollapsed, 1fr)",
          [`& .${layoutClasses.SidebarMenuButton}`]: {
            visibility: "var(--_collapsed, hidden)",
          },
        },
        "label:not(:has(:checked)) ~ &": {
          // closed
          gridTemplateRows: "0fr",
          visibility: "hidden",
          opacity: "0",
          transition:
            "var(--tsn, grid-template-rows 0.4s, visibility 0.4s, opacity 0.2s)",
          [`& .${layoutClasses.SidebarMenuAction}`]: {
            visibility: "hidden",
          },
        },
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  // CollapsibleIcon
  matchComponents(
    {
      [layoutClasses.CollapsibleIcon]: () => ({
        flex: "none",
        position: "absolute",
        right: "var(--item-px, 0.5rem)",
        transition:
          "var(--tsn, transform cubic-bezier(0.4, 0, 0.2, 1) 0.15s, visibility 0s var(--_uncollapsed, 0.1s))",
        visibility: "var(--_collapsed, hidden)",
        [`:where(.${layoutClasses.SidebarMenuAction}) &`]: {
          position: "unset",
          right: "unset",
        },
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  matchComponents(
    {
      [`${layoutClasses.CollapsibleIcon}-rotate`]: (rotate) => ({
        "label:has(:checked) &": {
          transform: `rotate(-${rotate})`,
        },
      }),
    },
    {
      values: {
        "45": "45deg",
        "180": "180deg",
      },
    }
  );

  // Dock
  matchComponents(
    {
      [layoutClasses.Dock]: () => ({
        position: "fixed",
        bottom: "0",
        width: "100%",
        zIndex: "999",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: theme("colors.background"),
        borderTop: "1px solid",
        borderColor: theme("colors.border"),
        boxShadow: theme("boxShadow.md"),
        paddingBottom: "env(safe-area-inset-bottom)",
        [`:where(.${layoutClasses.Root}-standalone) &`]: {
          position: "absolute",
        },
      }),
      [`${layoutClasses.Dock}-float`]: () => ({
        width: "fit-content",
        maxWidth: `calc(100vw - ${theme("spacing.2")})`,
        left: "50%",
        borderRadius: theme("borderRadius.xl"),
        borderWidth: "1px",
        borderStyle: "solid",
        transform: `translate(-50%, calc(-1 * max(env(safe-area-inset-bottom), ${theme("spacing.3")})))`,
        paddingBottom: "0px", // override the default safe-area-inset-bottom because `transform` already handle it
      }),
      [layoutClasses.DockMenu]: () => ({
        display: "flex",
        flex: "1",
        paddingInline: theme("spacing.2"),
      }),
      [layoutClasses.DockMenuItem]: () => ({
        flex: "1",
        display: "flex",
      }),
      [layoutClasses.DockMenuButton]: () => ({
        flex: "1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        color: theme("colors.sidebar.foreground"),
        padding: theme("spacing.2"),
        rowGap: "2px",
        fontSize: theme("fontSize.xs"),
        lineHeight: theme("lineHeight.xs"),
        transition: "var(--tsn, 0.15s cubic-bezier(0.4, 0, 0.2, 1))",
        userSelect: "none",
        "&:where(:hover)": {
          color: theme("colors.sidebar.accent-foreground"),
        },
        [`&:where(.${layoutClasses.DockMenuButton}-row)`]: {
          fontSize: theme("fontSize.sm"),
          lineHeight: theme("lineHeight.sm"),
        },
        [`&:where(:has(.${layoutClasses.DockIndicator}))`]: {
          paddingBlock: "6px 10px",
        },
      }),
      [`${layoutClasses.DockMenuButton}-row`]: () => ({
        flexDirection: "row",
        columnGap: theme("spacing.1"),
      }),
      [layoutClasses.DockIndicator]: () => ({
        "--size": "4px",
        width: "var(--size)",
        height: "var(--size)",
        borderRadius: "var(--size)",
        position: "absolute",
        bottom: "7%",
        left: "calc(50% - var(--size)/2)",
        background: theme("colors.muted.foreground"),
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );

  // DockTooltip
  const tooltipStyles = {
    pointerEvents: "none",
    position: "absolute",
    zIndex: "50",
    overflow: "hidden",
    borderRadius: theme("borderRadius.md"),
    background: theme("colors.primary.DEFAULT"),
    paddingInline: theme("spacing.2"),
    paddingBlock: theme("spacing.1"),
    fontSize: theme("fontSize.xs"),
    lineHeight: theme("lineHeight.xs"),
    color: theme("colors.primary.foreground"),
    transform: "translateY(-100%)",
    top: `calc(-1 * ${theme("spacing.1")})`,
    opacity: "var(--active, 0)",
  };
  matchComponents(
    {
      [layoutClasses.DockTooltip]: () =>
        ({
          ...tooltipStyles,
          "@media (hover: hover)": {
            [`:where(.${layoutClasses.DockMenuButton}:hover) &`]: {
              "--active": "1",
            },
          },
          [`:where(.${layoutClasses.DockMenuButton}:focus-visible) &`]: {
            "--active": "1",
          },
        }) as CSSRuleObject,
      [`${layoutClasses.DockTooltip}-noIndicator`]: () =>
        ({
          [`.${layoutClasses.DockMenuButton}:has(.${layoutClasses.DockIndicator}) &`]:
            {
              display: "contents",
              color: "inherit",
              fontSize: "inherit",
              lineHeight: "inherit",
            },
        }) as CSSRuleObject,
      [`${layoutClasses.DockTooltip}-hasIndicator`]: () =>
        ({
          [`.${layoutClasses.DockMenuButton}:not(:has(.${layoutClasses.DockIndicator})) &`]:
            {
              display: "contents",
              color: "inherit",
              fontSize: "inherit",
              lineHeight: "inherit",
            },
        }) as CSSRuleObject,
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
});
