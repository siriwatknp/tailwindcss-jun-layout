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
  InsetSidebarContent: "jun-insetContent",
  SidebarMenuItem: "jun-sidebarMenuItem",
  SidebarMenuButton: "jun-sidebarMenuButton",
  SidebarMenuAction: "jun-sidebarMenuAction",
  SidebarText: "jun-sidebarText",
  SidebarGroupText: "jun-sidebarGroupText",
  SidebarIcon: "jun-sidebarIcon",
  SidebarTooltip: "jun-sidebarTooltip",
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
    console.log("currentCollapsed", currentCollapsed);
    console.log("nextCollapsed", nextCollapsed);

    /* If true, the Sidebar has `autoCollapse` feature. */
    const autoCollapse =
      window
        .getComputedStyle(event.target as Element)
        .getPropertyValue("--_autoCollapse") === "1";
    console.log("autoCollapse", autoCollapse);

    /* If true, the Sidebar is in >= `autoCollapse` breakpoint. */
    const inAutoCollapse =
      window
        .getComputedStyle(event.target as Element)
        .getPropertyValue("--_in-autoCollapse") === "1";
    console.log("inAutoCollapse", inAutoCollapse);

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
      sidebar.style.setProperty("--EdgeSidebar-drawerOpen", "1");
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
      sidebar.style.setProperty("--EdgeSidebar-drawerOpen", "");
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
  let selector = `.${layoutClasses.EdgeSidebar}:not(.${layoutClasses.EdgeSidebarRight})`;
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
  let selector = `.${layoutClasses.EdgeSidebar}:not(.${layoutClasses.EdgeSidebarRight})`;
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

const LEFT_COLLAPSER = `.${layoutClasses.EdgeSidebarCollapser}:where(:not(.${layoutClasses.EdgeSidebarRightCollapser}))`;
const RIGHT_COLLAPSER = `.${layoutClasses.EdgeSidebarRightCollapser}`;
const LEFT_DRAWER_TRIGGER = `.${layoutClasses.DrawerEdgeSidebarTrigger}:where(:not(.${layoutClasses.DrawerEdgeSidebarRightTrigger}))`;
const RIGHT_DRAWER_TRIGGER = `.${layoutClasses.DrawerEdgeSidebarRightTrigger}`;
const NESTED_LAYOUT = `.${layoutClasses.Root} .${layoutClasses.Root}`;
const NESTED_COLLAPSER = `.${layoutClasses.Root} .${layoutClasses.Root} .${layoutClasses.EdgeSidebarCollapser}`;
const NESTED_RIGHT_COLLAPSER = `.${layoutClasses.Root} .${layoutClasses.Root} .${layoutClasses.EdgeSidebarRightCollapser}`;
const NESTED_DRAWER_TRIGGER = `.${layoutClasses.Root} .${layoutClasses.Root} .${layoutClasses.DrawerEdgeSidebarTrigger}`;
const NESTED_RIGHT_DRAWER_TRIGGER = `.${layoutClasses.Root} .${layoutClasses.Root} .${layoutClasses.DrawerEdgeSidebarRightTrigger}`;

export default plugin(function ({ matchComponents, matchUtilities, theme }) {
  const HEADER_HEIGHT = "3rem";

  /** Match Shadcn Sidebar */
  const SIDEBAR_WIDTH = "var(--sidebar-width, 16rem)";
  const SIDEBAR_WIDTH_MOBILE = "18rem";
  const SIDEBAR_WIDTH_ICON = "var(sidebar-width-icon, 3rem)";

  // Root
  matchUtilities(
    {
      [layoutClasses.Root]: () => ({
        "--Root-height": "100lvh",
        "--Header-height": "0px",
        "--Header-clipHeight": "0px",
        "--EdgeSidebar-sidelineWidth": "1px",
        "--EdgeSidebar-sidelineColor": theme("colors.border"),
        "--InsetSidebarL-width": "0px",
        "--InsetSidebarR-width": "0px",
        "--drawer-pos": "fixed",
        "--drawer-z": "999",
        minHeight: "var(--Root-height)",
        display: "grid",
        flex: "auto", // integrating with Shadcn sidebar
        position: "relative",
        transition: "grid-template-columns 0.3s",
        gridTemplateRows: "auto 1fr",
        gridTemplateColumns:
          "var(--_start-col, 0px) minmax(0, 1fr) var(--_end-col, 0px)", // minmax(0, 1fr) is used over `1fr` to prevent root horizontal overflow
        gridTemplateAreas: `
        "${layoutClasses.EdgeSidebar} ${layoutClasses.Header} ${layoutClasses.EdgeSidebarRight}"
        "${layoutClasses.EdgeSidebar} ${layoutClasses.Content} ${layoutClasses.EdgeSidebarRight}"
        "${layoutClasses.EdgeSidebar} ${layoutClasses.Footer} ${layoutClasses.EdgeSidebarRight}"
      `,
        [`&:where(:has(>.${layoutClasses.Header}))`]: {
          "--Header-height": HEADER_HEIGHT,
        },
        [`&:has(>.${layoutClasses.EdgeSidebar})`]: {
          "--_start-col": "max-content",
          "--EdgeSidebar-drawerOpen": "0",
        },
        [`&:has(>.${layoutClasses.EdgeSidebarRight})`]: {
          "--_end-col": "max-content",
          "--EdgeSidebar-drawerOpen": "0",
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
      [layoutClasses.Root]: () => ({
        "--drawer-pos": "absolute", // make edge sidebar (drawer) stay within the layout
        "--drawer-z": "5",
        "--content-overflow": "auto",
        maxHeight: "var(--Root-height)",
      }),
    },
    {
      values: {
        standalone: true,
      },
    }
  );
  matchUtilities(
    {
      [`${layoutClasses.Root}-h`]: (height) => ({
        "--Root-height": height,
        "--Inset-absolute-height":
          "calc(var(--Root-height) - var(--Header-height))",
      }),
    },
    {
      values: {
        DEFAULT: "100vh",
      },
    }
  );

  // Header
  matchUtilities(
    {
      [layoutClasses.Header]: () => ({
        gridArea: layoutClasses.Header,
        height: "var(--Header-height)", // better than `min-height` because user can set height to 0
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
              "--Header-clipHeight": "var(--Header-height)",
            }),
            ...(value === "left" && {
              gridTemplateAreas: `
                "${layoutClasses.Header} ${layoutClasses.Header} ${layoutClasses.EdgeSidebarRight}"
                "${layoutClasses.EdgeSidebar} ${layoutClasses.Content} ${layoutClasses.EdgeSidebarRight}"
                "${layoutClasses.EdgeSidebar} ${layoutClasses.Footer} ${layoutClasses.EdgeSidebarRight}"
              `,
              [`& .${layoutClasses.EdgeSidebar}:not(.${layoutClasses.EdgeSidebarRight})`]:
                {
                  "--Header-clipHeight": "var(--Header-height)",
                },
            }),
            ...(value === "right" && {
              gridTemplateAreas: `
                "${layoutClasses.EdgeSidebar} ${layoutClasses.Header} ${layoutClasses.Header}"
                "${layoutClasses.EdgeSidebar} ${layoutClasses.Content} ${layoutClasses.EdgeSidebarRight}"
                "${layoutClasses.EdgeSidebar} ${layoutClasses.Footer} ${layoutClasses.EdgeSidebarRight}"
              `,
              [`& .${layoutClasses.EdgeSidebarRight}`]: {
                "--Header-clipHeight": "var(--Header-height)",
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
          "--Header-height": height,
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
        transition: "all 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms, color 0s",
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

  // Shared EdgeSidebar
  matchUtilities(
    {
      [layoutClasses.EdgeSidebar]: () =>
        ({
          "--anchorLeft": "var(--EdgeSidebar-anchor,)",
          "--anchorRight": "var(--EdgeSidebar-anchor,)",
          "--drawer-h": "var(--Root-height)",
          transition: "width 0.3s",
          display: "flex",
          flexDirection: "column",
          padding: "0px", // prevent user from customizing it
          margin: "0px", // prevent user from customizing it
          // ==============================
          // To keep the EdgeSidebar fixed when the Content is scrollable
          position: "var(--_permanent, sticky)",
          top: "var(--_permanent, var(--Header-clipHeight))",
          zIndex: "var(--_drawer, 2) var(--_permanent, 1)",
          height:
            "var(--_permanent, calc(var(--Root-height) - var(--Header-clipHeight)))",
          // ==============================
          "&::before": {
            position: "absolute",
            content: '""',
            inset: "0",
            backgroundColor: "rgba(0, 0, 0, 0.48)",
            backdropFilter: "blur(4px)",
            zIndex: "1",
            transition: "opacity 0.4s, visibility 0.4s",
            visibility: "hidden",
            opacity: "var(--EdgeSidebar-drawerOpen, 0)",
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
            width: "var(--_permanent, var(--SidebarContent-width))",
            height: "var(--Header-clipHeight)",
            top: "calc(-1 * var(--Header-clipHeight))",
          },
          [`&:where(:not(.${layoutClasses.EdgeSidebarRight}))`]: {
            [`.${layoutClasses.Root}:has(>&)`]: {
              /** Root default settings */
              "--EdgeSidebar-variant": "var(--permanent)",
              "--EdgeSidebar-permanentWidth": SIDEBAR_WIDTH,
              "--EdgeSidebar-collapsible": "var(--uncollapsed)",
              "--EdgeSidebar-collapsedWidth": SIDEBAR_WIDTH_ICON,

              /** DO NOT OVERRIDE, internal variables */
              "--drawer": "var(--EdgeSidebar-variant,)",
              "--permanent": "var(--EdgeSidebar-variant,)",
              "--_permanentWidth": `var(--uncollapsed, var(--EdgeSidebar-permanentWidth))
                              var(--collapsed, var(--EdgeSidebar-collapsedWidth, 0px))`,
              "--collapsed": "var(--EdgeSidebar-collapsible,)",
              "--uncollapsed": "var(--EdgeSidebar-collapsible,)",

              /** Collapsible feature */
              [`&:is(${NESTED_LAYOUT}) ${LEFT_COLLAPSER}, ${LEFT_COLLAPSER}:not(${NESTED_COLLAPSER})`]:
                {
                  display: "var(--display, inline-flex)",
                  "--_sidebarCollapsed": "var(--collapsed, 1)",
                  [`.${layoutClasses.EdgeSidebarUncollapsedVisible}`]: {
                    display:
                      "var(--collapsed, none) var(--uncollapsed, inline-block)",
                  },
                  [`.${layoutClasses.EdgeSidebarCollapsedVisible}`]: {
                    display:
                      "var(--collapsed, inline-block) var(--uncollapsed, none)",
                  },
                },
            },

            /** Collapsible feature */
            [`.${layoutClasses.Root}:has(>&[${layoutAttrs.isEdgeSidebarCollapsed}])`]:
              {
                "--EdgeSidebar-collapsible": "var(--collapsed)",
              },
            /** Collapsible feature integration with Shadcn sidebar */
            [`.${layoutClasses.Root}:has(>& [data-state="collapsed"])`]: {
              "--EdgeSidebar-collapsible": "var(--collapsed)",
            },
            [`.${layoutClasses.Root}:has(>& [data-collapsible="icon"])`]: {
              "--EdgeSidebar-collapsedWidth": "var(--sidebar-width-icon)",
            },
            [`.${layoutClasses.Root}:has(>&:empty), .${layoutClasses.Root}:has(>& .${layoutClasses.EdgeSidebarContent}:empty)`]:
              {
                "--EdgeSidebar-permanentWidth": "0px",
              },

            /** EdgeSidebar default settings */
            "--EdgeSidebar-anchor": "var(--anchorLeft)",
            "--SidebarContent-width": "var(--_permanentWidth, 0px)",
            "--_drawer": "var(--drawer)",
            "--_permanent": "var(--permanent)",
            "--_collapsed": "var(--collapsed)",
            "--_uncollapsed": "var(--uncollapsed)",
            gridArea: layoutClasses.EdgeSidebar,
            width: `var(--drawer, 0)
                var(--permanent, var(--_permanentWidth))`,
            "&::after": {
              border: "inherit",
              left: "0",
            },
            "&::before": {
              display: `var(--drawer, block)
                    var(--permanent, none)`,
            },
            [`&:not([${layoutAttrs.isDrawerOpen}], [${layoutAttrs.isDrawerClosing}])`]:
              {
                overflow: "var(--drawer, hidden)",
              },
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
        borderRight:
          "var(--permanent, min(var(--EdgeSidebar-sidelineWidth), 1 * var(--SidebarContent-width)) solid)",
        borderColor: "var(--EdgeSidebar-sidelineColor)",
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
      [layoutClasses.EdgeSidebarContent]: () => ({
        background: theme("colors.sidebar.DEFAULT"),
        boxShadow:
          "var(--EdgeSidebarContent-shadow, var(--SidebarContent-shadow))", // --SidebarContent-shadow is internal.
        display: "flex",
        flexDirection: "column",
        flex: "1",
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
          "--SidebarContent-transitionDelay": "0s",
          opacity: `var(--_drawer, var(--EdgeSidebar-drawerOpen))
        var(--_permanent, 1)`,
          visibility: `var(--_drawer, hidden)
           var(--_permanent, visible)`,
          padding: "0px", // prevent user from customizing it
          margin: "0px", // prevent user from customizing it
          position:
            "var(--_drawer, var(--drawer-pos)) var(--_permanent, relative)",
          zIndex: "2",
          width:
            "var(--_drawer, var(--EdgeSidebar-drawerWidth)) var(--_permanent, calc(var(--SidebarContent-width) - var(--EdgeSidebar-sidelineWidth, 0px)))",
          height: "var(--_drawer, var(--drawer-h))",
          top: "var(--_drawer, calc(var(--Root-height) - var(--drawer-h)))",
          overflowY: "var(--_drawer, auto)",
          transition: `var(--_drawer, opacity 0.3s, transform 0.3s)
           var(--_permanent, opacity 0.4s, width 0.3s var(--SidebarContent-transitionDelay, 0s), transform 0.3s var(--SidebarContent-transitionDelay, 0s), box-shadow 0.3s var(--SidebarContent-transitionDelay, 0s))`,
          transform: `var(--_drawer, var(--anchorLeft, translateX(calc((1 - var(--EdgeSidebar-drawerOpen)) * -100%))) var(--anchorRight, translateX(calc(var(--EdgeSidebar-drawerOpen) * -100%))))
           var(--_permanent, translateX(var(--EdgeSidebar-permanentSlide, 0)))`,
          [`[${layoutAttrs.isEdgeSidebarContentHidden}] &`]: {
            visibility: "hidden",
            opacity: "0",
          },
          [`[${layoutAttrs.isDrawerOpen}] &, [${layoutAttrs.isDrawerClosing}] &`]:
            {
              visibility: "visible",
            },
          [`[${layoutAttrs.isDrawerClosing}] &`]: {
            transition: "transform 0.3s, visibility 0.3s, opacity 0.3s",
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
          "--EdgeSidebar-drawerWidth": "0px",
          [`.${layoutClasses.Root}:has(>&)`]: {
            "--EdgeSidebar-variant": "var(--drawer)",
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
              "--EdgeSidebar-drawerWidth": SIDEBAR_WIDTH_MOBILE,
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
      [`${layoutClasses.EdgeSidebar}-drawer-withoutOverlay`]: () => ({
        "--drawer-h": "calc(var(--Root-height) - var(--Header-clipHeight))",
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
              "--EdgeSidebar-drawerWidth": width,
            },
          [`.${layoutClasses.Root}:has(>&)`]: {
            "--EdgeSidebar-permanentWidth": width,
          },
        }) as CSSRuleObject,
      [`${layoutClasses.EdgeSidebar}-collapsed-w`]: (collapsedWidth) => ({
        [`.${layoutClasses.Root}:has(>&)`]: {
          "--EdgeSidebar-collapsedWidth": collapsedWidth,
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
            "--SidebarContent-shadow": "none",
            "--SidebarContent-width": "var(--_permanentWidth, 0px)",
            [`.${layoutClasses.Root}:has(>&)`]: {
              "--EdgeSidebar-variant": "var(--permanent)",
              [`&:is(${NESTED_LAYOUT}) ${LEFT_COLLAPSER}, ${LEFT_COLLAPSER}:not(${NESTED_COLLAPSER})`]:
                {
                  display: "var(--display, inline-flex)",
                },
              [`&:is(${NESTED_LAYOUT}) ${LEFT_DRAWER_TRIGGER}, ${LEFT_DRAWER_TRIGGER}:not(${NESTED_DRAWER_TRIGGER})`]:
                {
                  display: "none",
                },
            },
            [`.${layoutClasses.Root}:has(>&[${layoutAttrs.isEdgeSidebarUncollapsed}])`]:
              {
                "--EdgeSidebar-collapsible": "var(--uncollapsed)",
              },
          },
          "permanent-hidden": {
            [`.${layoutClasses.Root}:has(>&)`]: {
              "--EdgeSidebar-collapsedWidth": "0px",
              "--EdgeSidebar-collapsible": "var(--collapsed)",
            },
          },
          "permanent-visible": {
            [`.${layoutClasses.Root}:has(>&)`]: {
              "--EdgeSidebar-collapsible": "var(--uncollapsed)",
            },
          },
          "permanent-hoverExpand": {
            [`& .${layoutClasses.EdgeSidebarContent}:hover`]: {
              "--SidebarContent-width": "var(--EdgeSidebar-permanentWidth)",
              // TODO: make the `transitionDelay` and `shadow` configurable from theme
              "--SidebarContent-transitionDelay": "0.3s",
              "--SidebarContent-shadow": `var(--collapsed, 0 0 10px rgba(0,0,0,0.1), var(--EdgeSidebar-sidelineWidth) 0 var(--EdgeSidebar-sidelineColor))`,
            },
          },
        })[value] as CSSRuleObject,
    },
    {
      values: {
        permanent: "permanent",
        "permanent-hidden": "permanent-hidden",
        "permanent-visible": "permanent-visible",
        "permanent-hoverExpand": "permanent-hoverExpand",
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
              "--EdgeSidebar-collapsible": "var(--collapsed)",
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
              "--EdgeSidebar-collapsible": "var(--uncollapsed)",
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
      [layoutClasses.DrawerEdgeSidebarClose]: () => ({
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
      [layoutClasses.DrawerEdgeSidebarClose]: () =>
        ({
          display: "var(--_drawer, flex) var(--_permanent, none)",
          visibility: "hidden",
          opacity: "0",
          transition: "0.3s",
          top: "calc(0.875rem)",
          right: "var(--anchorLeft, 0.875rem)",
          left: "var(--anchorRight, 0.875rem)",
          zIndex: "2",
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
      [layoutClasses.EdgeSidebarCollapser]: () => ({
        boxSizing: "border-box",
      }),
      [layoutClasses.DrawerEdgeSidebarTrigger]: () => ({
        boxSizing: "border-box",
      }),
      [layoutClasses.EdgeSidebarRightCollapser]: () => ({
        boxSizing: "border-box",
      }),
      [layoutClasses.DrawerEdgeSidebarRightTrigger]: () => ({
        boxSizing: "border-box",
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );

  // SidebarMenuItem
  matchUtilities(
    {
      [layoutClasses.SidebarMenuItem]: () => ({
        "--action-size": "1.5rem",
        display: "flex",
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
        textAlign: "left",
        alignItems: "center",
        gap: "var(--_drawer, 0.5rem) var(--_permanent, var(--_collapsed, 0px) var(--_uncollapsed, 0.5rem))",
        width: "100%",
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
        paddingInline: "0.5rem",
        minHeight: "1.75rem",
        borderRadius: theme("borderRadius.sm"),
        color: theme("colors.sidebar.foreground"),
        cursor: "pointer",
        [`&:has(~.${layoutClasses.SidebarMenuAction})`]: {
          paddingRight:
            "var(--_drawer, 0.5rem) var(--_permanent, var(--_collapsed, 0.5rem) var(--_uncollapsed, calc(0.5rem + var(--action-size))))",
        },
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
  matchUtilities(
    {
      [layoutClasses.SidebarMenuButton]: () => ({
        display: "grid",
        gridTemplateColumns:
          "var(--_drawer, auto 1fr) var(--_permanent, var(--_collapsed, auto 0px) var(--_uncollapsed, auto 1fr))",
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  // SidebarText
  matchComponents(
    {
      [layoutClasses.SidebarText]: () => ({
        textOverflow: "ellipsis",
        transition: "opacity 0.6s",
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
        opacity:
          "var(--_drawer, 1) var(--_permanent, var(--_collapsed, 0) var(--_uncollapsed, 1))",
        whiteSpace: "nowrap",
        overflow: "hidden",
      }),
      [`${layoutClasses.SidebarText}-collapsedHeight`]: () => ({
        height:
          "var(--_drawer, 1lh) var(--_permanent, var(--_collapsed, 0) var(--_uncollapsed, 1lh))",
        transition: "height 0.3s",
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
        transition: "grid-template-rows 0.4s",
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
        gridTemplateRows:
          "var(--_drawer, 1fr) var(--permanent, var(--_collapsed, 0fr) var(--_uncollapsed, 1fr))",
        "& > *": {
          overflow: "hidden",
        },
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
        right:
          "var(--_drawer, 0px) var(--permanent, var(--_collapsed, -100%) var(--_uncollapsed, 0px))", // equal to the SidebarMenuButton padding
        width: "var(--action-size)",
        height: "var(--action-size)",
        display: "inline-flex",
        visibility:
          "var(--_drawer, visible) var(--_permanent, var(--_collapsed, hidden) var(--_uncollapsed, visible))",
        justifyContent: "center",
        alignItems: "center",
        top: "50%",
        transform: "translateY(-50%)",
        color: theme("colors.sidebar.foreground"),
        transition: "right 0.5s",
        borderRadius: theme("borderRadius.sm"),
        "&:hover": {
          background: theme("colors.sidebar.accent"),
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
      [`${layoutClasses.SidebarMenuAction}-hoverAppear`]: () => ({
        opacity: "0",
        "&:focus-visible": {
          opacity: "1",
        },
        [`.${layoutClasses.SidebarMenuItem}:hover &`]: {
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
  matchUtilities(
    {
      [layoutClasses.SidebarIcon]: () => ({
        "--size": "1rem",
        "--collapsed-size": "1.25rem",
        minWidth:
          "var(--_drawer, 1em) var(--_permanent, var(--_collapsed, 100%) var(--_uncollapsed, 1em))",
        height: "1em",
        fontSize:
          "var(--_drawer, var(--size)) var(--_permanent, var(--_collapsed, var(--collapsed-size)) var(--_uncollapsed, var(--size)))",
        transition:
          "var(--_drawer,) var(--_permanent, var(--_collapsed, min-width 0.6s 0.2s, font-size 0.2s) var(--_uncollapsed, font-size 0.3s))",
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
      [layoutClasses.SidebarTooltip]: () => ({
        display:
          "var(--_drawer, none) var(--_permanent, var(--_collapsed, block) var(--_uncollapsed, none))",
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
          [`.${layoutClasses.Root}:has(>&)`]: {
            /** Root default settings */
            "--EdgeSidebar-R-variant": "var(--permanent-R)",
            "--EdgeSidebar-R-permanentWidth": SIDEBAR_WIDTH,
            "--EdgeSidebar-R-collapsible": "var(--uncollapsed-R)",
            "--EdgeSidebar-R-collapsedWidth": SIDEBAR_WIDTH_ICON,

            /** DO NOT OVERRIDE, internal variables */
            "--drawer-R": "var(--EdgeSidebar-R-variant,)",
            "--permanent-R": "var(--EdgeSidebar-R-variant,)",
            "--_permanentWidth-R": `var(--uncollapsed-R, var(--EdgeSidebar-R-permanentWidth))
                            var(--collapsed-R, var(--EdgeSidebar-R-collapsedWidth, 0px))`,
            "--collapsed-R": "var(--EdgeSidebar-R-collapsible,)",
            "--uncollapsed-R": "var(--EdgeSidebar-R-collapsible,)",

            /** Collapsible feature */
            [`&:is(${NESTED_LAYOUT}) ${RIGHT_COLLAPSER}, ${RIGHT_COLLAPSER}:not(${NESTED_RIGHT_COLLAPSER})`]:
              {
                display: "var(--display, inline-flex)",
                "--_sidebarCollapsed": "var(--collapsed-R, 1)",
                [`.${layoutClasses.EdgeSidebarUncollapsedVisible}`]: {
                  display:
                    "var(--collapsed-R, none) var(--uncollapsed-R, inline-block)",
                },
                [`.${layoutClasses.EdgeSidebarCollapsedVisible}`]: {
                  display:
                    "var(--collapsed-R, inline-block) var(--uncollapsed-R, none)",
                },
              },
          },

          /** Collapsible feature */
          [`.${layoutClasses.Root}:has(>&[${layoutAttrs.isEdgeSidebarCollapsed}])`]:
            {
              "--EdgeSidebar-R-collapsible": "var(--collapsed-R)",
            },
          /** Collapsible feature integration with Shadcn sidebar */
          [`.${layoutClasses.Root}:has(>& [data-state="collapsed"])`]: {
            "--EdgeSidebar-R-collapsible": "var(--collapsed-R)",
          },
          [`.${layoutClasses.Root}:has(>& [data-collapsible="icon"])`]: {
            "--EdgeSidebar-R-collapsedWidth": "var(--sidebar-width-icon)",
          },
          [`.${layoutClasses.Root}:has(>&:empty), .${layoutClasses.Root}:has(>& .${layoutClasses.EdgeSidebarContent}:empty)`]:
            {
              "--EdgeSidebar-R-permanentWidth": "0px",
            },

          /** EdgeSidebar default settings */
          "--EdgeSidebar-anchor": "var(--anchorRight)",
          "--SidebarContent-width": "var(--_permanentWidth-R, 0px)",
          "--_drawer": "var(--drawer-R)",
          "--_permanent": "var(--permanent-R)",
          "--_collapsed": "var(--collapsed-R)",
          "--_uncollapsed": "var(--uncollapsed-R)",
          gridArea: layoutClasses.EdgeSidebarRight,
          width: `var(--drawer-R, 0)
              var(--permanent-R, var(--_permanentWidth-R))`,
          borderLeft:
            "var(--permanent, min(var(--EdgeSidebar-sidelineWidth), 1 * var(--SidebarContent-width)) solid)",
          borderColor: "var(--EdgeSidebar-sidelineColor)",
          "&::after": {
            border: "inherit",
            right: "0", // prevent Root overflow
          },
          "&::before": {
            display: `var(--drawer-R, block)
                  var(--permanent-R, none)`,
          },
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
  matchUtilities(
    {
      [`${layoutClasses.EdgeSidebarRight}-drawer`]: () =>
        ({
          zIndex: "var(--_drawer, var(--drawer-z)) var(--_permanent, 1)",
          "--EdgeSidebar-drawerWidth": "0px",
          [`.${layoutClasses.Root}:has(>&)`]: {
            "--EdgeSidebar-R-variant": "var(--drawer-R)",
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
              "--EdgeSidebar-drawerWidth": SIDEBAR_WIDTH_MOBILE,
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
      [`${layoutClasses.EdgeSidebarRight}-drawer-withoutOverlay`]: () => ({
        "--drawer-h": "calc(var(--Root-height) - var(--Header-clipHeight))",
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
              "--EdgeSidebar-drawerWidth": width,
            },
          [`.${layoutClasses.Root}:has(>&)`]: {
            "--EdgeSidebar-R-permanentWidth": width,
          },
        }) as CSSRuleObject,
      [`${layoutClasses.EdgeSidebarRight}-collapsed-w`]: (collapsedWidth) => ({
        [`.${layoutClasses.Root}:has(>&)`]: {
          "--EdgeSidebar-R-collapsedWidth": collapsedWidth,
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
            "--SidebarContent-shadow": "none",
            "--SidebarContent-width": "var(--_permanentWidth-R, 0px)",
            [`.${layoutClasses.Root}:has(>&)`]: {
              "--EdgeSidebar-R-variant": "var(--permanent-R)",
              [`&:is(${NESTED_LAYOUT}) ${RIGHT_COLLAPSER}, ${RIGHT_COLLAPSER}:not(${NESTED_RIGHT_COLLAPSER})`]:
                {
                  display: "var(--display, inline-flex)",
                },
              [`&:is(${NESTED_LAYOUT}) ${RIGHT_DRAWER_TRIGGER}, ${RIGHT_DRAWER_TRIGGER}:not(${NESTED_RIGHT_DRAWER_TRIGGER})`]:
                {
                  display: "none",
                },
            },
            [`.${layoutClasses.Root}:has(>&[${layoutAttrs.isEdgeSidebarUncollapsed}])`]:
              {
                "--EdgeSidebar-R-collapsible": "var(--uncollapsed-R)",
              },
          },
          "permanent-hidden": {
            [`.${layoutClasses.Root}:has(>&)`]: {
              "--EdgeSidebar-R-collapsedWidth": "0px",
              "--EdgeSidebar-R-collapsible": "var(--collapsed-R)",
            },
          },
          "permanent-visible": {
            [`.${layoutClasses.Root}:has(>&)`]: {
              "--EdgeSidebar-R-collapsible": "var(--uncollapsed-R)",
            },
          },
          "permanent-hoverExpand": {
            [`& .${layoutClasses.EdgeSidebarContent}:hover`]: {
              "--SidebarContent-width": "var(--EdgeSidebar-R-permanentWidth)",
              // TODO: make the `transitionDelay` and `shadow` configurable from theme
              "--SidebarContent-transitionDelay": "0.3s",
              "--SidebarContent-shadow": `var(--collapsed-R, 0 0 10px rgba(0,0,0,0.1), var(--EdgeSidebar-sidelineWidth) 0 var(--EdgeSidebar-R-sidelineColor))`,
            },
          },
        })[value] as CSSRuleObject,
    },
    {
      values: {
        permanent: "permanent",
        "permanent-hidden": "permanent-hidden",
        "permanent-visible": "permanent-visible",
        "permanent-hoverExpand": "permanent-hoverExpand",
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
              "--EdgeSidebar-R-collapsible": "var(--collapsed-R)",
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
              "--EdgeSidebar-R-collapsible": "var(--uncollapsed-R)",
            },
          },
        };
        return autoCollapseStyles;
      },
    },
    { values: theme("screens") }
  );

  // InsetSidebar
  matchUtilities(
    {
      [layoutClasses.InsetSidebarContent]: () => ({
        boxSizing: "var(--fixed, content-box) var(--absolute, border-box)",
        position: "var(--fixed, fixed) var(--absolute, absolute)",
        height:
          "var(--fixed, calc(100% - var(--Header-height, 0px))) var(--absolute, var(--Inset-absolute-height, 100%))",
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
        marginTop: "var(--fixed, var(--Header-height))",
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
      [layoutClasses.InsetSidebarContent]: () => ({
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
  matchUtilities(
    {
      [layoutClasses.InsetAvoidingView]: () => ({
        marginRight: "var(--InsetSidebarR-width)",
        marginLeft: "var(--InsetSidebarL-width)",
      }),
    },
    {
      values: {
        DEFAULT: true,
      },
    }
  );
  const insetSidebarSticky = {
    position: "sticky",
    height: "var(--sticky, calc(var(--Root-height) - var(--Header-height)))",
    overflow: "var(--sticky, auto)",
    top: "var(--sticky, var(--Header-height))",
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
          "--InsetSidebar-position": `var(--sticky,)`,
          /** DO NOT OVERRIDE, internal variables */
          "--fixed": "var(--InsetSidebar-position,)",
          "--absolute": "var(--InsetSidebar-position,)",
          "--sticky": "var(--InsetSidebar-position,)",
          "--anchor-right": "var(--InsetSidebar-anchor,)",
          "--anchor-left": "var(--InsetSidebar-anchor,)",
          ...insetSidebarSticky,
          flex: "none",
          "&:first-child": {
            "--InsetSidebar-anchor": "var(--anchor-left)",
          },
          "&:last-child": {
            "--InsetSidebar-anchor": "var(--anchor-right)",
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
          "--InsetSidebar-position": `var(--${value},)`,
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
            { "--InsetSidebarL-width": width },
          [`.${layoutClasses.Root}:has(> .${layoutClasses.Content} > * > &:first-child) > .${layoutClasses.Footer}`]:
            { "--InsetSidebarL-width": width },
          [`.${layoutClasses.Root}:has(> .${layoutClasses.Content} > &:last-child) > .${layoutClasses.Footer}`]:
            { "--InsetSidebarR-width": width },
          [`.${layoutClasses.Root}:has(> .${layoutClasses.Content} > * > &:last-child) > .${layoutClasses.Footer}`]:
            { "--InsetSidebarR-width": width },
        }) as CSSRuleObject,
    },
    {
      values: {
        DEFAULT: "220px",
      },
    }
  );
});
