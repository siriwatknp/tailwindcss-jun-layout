import { MainNavItem, SidebarNavItem } from "@/types";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
      lucide: "book-open-text",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      lucide: "pencil-line",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],
        },
        {
          title: "Installation",
          href: "/docs/installation",
          items: [],
        },
        {
          title: "Basic Usage",
          href: "/docs/basic-usage",
          items: [],
        },
      ],
    },
    {
      title: "Configuration",
      lucide: "code",
      items: [
        {
          title: "Layout",
          href: "/docs/layout",
        },
        {
          title: "Header",
          href: "/docs/header",
        },
        {
          title: "Content",
          href: "/docs/content",
        },
        {
          title: "Footer",
          href: "/docs/footer",
        },
        {
          title: "Edge Sidebar",
          href: "/docs/edge-sidebar",
        },
        {
          title: "Inset Sidebar",
          href: "/docs/inset-sidebar",
        },
        {
          title: "Sidebar elements",
          href: "/docs/sidebar-elements",
        },
      ],
    },
    {
      title: "Integration",
      lucide: "blocks",
      items: [
        {
          title: "Shadcn Sidebar",
          href: "/docs/shadcn-sidebar",
        },
      ],
    },
    {
      title: "Examples",
      lucide: "panels-top-left",
      items: [
        {
          title: "Blog",
          href: "/examples/blog",
        },
        {
          title: "Chat",
          href: "/examples/chat",
        },
        {
          title: "Ecommerce",
          href: "/examples/ecommerce",
        },
        {
          title: "Shadcn Sidebar",
          href: "/examples/shadcn-sidebar",
        },
        {
          title: "AI Propmt",
          href: "/examples/ai-prompt",
          label: "Soon",
          disabled: true,
        },
        {
          title: "Calendar",
          href: "/examples/calendar",
          label: "Soon",
          disabled: true,
        },
        {
          title: "Chat application",
          href: "/examples/chat-application",
          label: "Soon",
          disabled: true,
        },
        {
          title: "Dashboard",
          href: "/examples/dashboard",
          label: "Soon",
          disabled: true,
        },
        {
          title: "Documentation",
          href: "/examples/documentation",
          label: "Soon",
          disabled: true,
        },
      ],
    },
  ],
};
