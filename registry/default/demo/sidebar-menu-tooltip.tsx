import { triggerEdgeCollapse } from "@/packages/tailwindcss-jun-layout";
import {
  Home,
  Users,
  FileText,
  BarChart2,
  Mail,
  Calendar,
  Database,
  PanelLeftClose,
  PanelRightClose,
  LucideIcon,
  MoreHorizontal,
} from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import React from "react";

interface MenuGroup {
  label: string;
  items: {
    icon: LucideIcon;
    label: string;
  }[];
}

const menuGroups: MenuGroup[] = [
  {
    label: "Overview",
    items: [
      { icon: Home, label: "Dashboard" },
      { icon: BarChart2, label: "Analytics" },
      { icon: FileText, label: "Reports" },
    ],
  },
  {
    label: "Workspace",
    items: [
      { icon: Mail, label: "Inbox" },
      { icon: Calendar, label: "Calendar" },
      { icon: Database, label: "Projects" },
      { icon: Users, label: "Team" },
    ],
  },
];

export default function SidebarMenuTooltipDemo() {
  const container = React.useRef(
    typeof document !== "undefined"
      ? document.querySelector("#sidebar-menu-tooltip-demo")
      : null,
  );
  return (
    <div className="w-full border-4 rounded bg-background max-w-[500px]">
      <div className="jun-layout jun-layout-h-[300px] jun-layout-standalone">
        <header className="jun-header">
          <div className="p-3">
            <div className="h-4 w-32 rounded bg-muted" />
          </div>
        </header>
        <Tooltip.Provider delayDuration={0}>
          <aside
            id="sidebar-menu-tooltip-demo"
            className="jun-edgeSidebar jun-edgeSidebar-collapsed-w-[53px] jun-edgeSidebar-permanent-autoCollapse-2xl"
          >
            <div className="jun-edgeContent bg-sidebar">
              <button
                className="jun-edgeCollapseTrigger p-4 hover:bg-neutral-200"
                onClick={(event) =>
                  triggerEdgeCollapse({
                    event,
                    sidebarId: "sidebar-menu-tooltip-demo",
                  })
                }
              >
                <PanelRightClose className="jun-edgeCollapsed-visible" />
                <PanelLeftClose className="jun-edgeUncollapsed-visible" />
              </button>

              <div className="p-2 flex flex-col gap-4 min-h-0 overflow-auto">
                {menuGroups.map((group, index) => (
                  <ul className="jun-sidebarMenu">
                    {group.items.map((item, itemIndex) => {
                      const Icon = item.icon;
                      return (
                        <li key={itemIndex} className="jun-sidebarMenuItem">
                          <Tooltip.Tooltip>
                            <Tooltip.Trigger asChild>
                              <button className="jun-sidebarMenuButton">
                                <Icon className="jun-sidebarIcon" />
                                <span className="jun-sidebarText">
                                  {item.label}
                                </span>
                              </button>
                            </Tooltip.Trigger>
                            <Tooltip.Portal container={container.current}>
                              <Tooltip.Content
                                sideOffset={4}
                                side="right"
                                className="jun-sidebarTooltip z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                              >
                                {item.label}
                              </Tooltip.Content>
                            </Tooltip.Portal>
                          </Tooltip.Tooltip>
                          <button
                            className={`jun-sidebarMenuAction ${index !== 0 && "jun-sidebarMenuAction-hoverAppear"}`}
                          >
                            <MoreHorizontal />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                ))}
              </div>
            </div>
          </aside>
        </Tooltip.Provider>
        <main className="jun-content">
          <div className="p-4">
            <div className="h-4 w-48 rounded bg-muted" />
          </div>
        </main>
      </div>
    </div>
  );
}
