"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  triggerEdgeCollapse,
  triggerEdgeDrawer,
} from "@/packages/tailwindcss-jun-layout/dist";
import {
  Menu,
  Home,
  Users,
  FileText,
  BarChart2,
  Settings,
  Mail,
  Calendar,
  Database,
  PanelLeftClose,
  PanelRightClose,
  Building2,
  LucideIcon,
  MoreHorizontal,
} from "lucide-react";

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

export default function PlaygroundPage() {
  return (
    <div className="jun-layout">
      {/* Header */}
      <header className="jun-header border-b bg-background">
        <div className="container flex items-center gap-4">
          <button
            className="jun-edgeDrawerTrigger"
            onClick={() => triggerEdgeDrawer()}
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="font-semibold">Playground Dashboard</h1>
        </div>
      </header>

      {/* Sidebar */}
      <TooltipProvider delayDuration={0}>
        <aside className="jun-edgeSidebar jun-edgeSidebar-drawer md:jun-edgeSidebar-permanent md:jun-edgeSidebar-collapsed-w-[65px] md:jun-edgeSidebar-w-[280px] jun-edgeSidebar-permanent-autoCollapse-lg md:jun-edgeSidebar-permanent-hoverExpand">
          <div className="jun-edgeContent">
            <div className="flex flex-col gap-4 p-4 transition-all @container">
              {/* App Switcher */}
              <div className="jun-sidebarMenuButton gap-4 rounded-lg border p-3">
                <Building2 className="" />
                <div>
                  <div className="jun-sidebarText font-medium">Acme Corp</div>
                  <div className="jun-sidebarText text-sm text-muted-foreground">
                    Switch workspace
                  </div>
                </div>
                {/* <div className="jun-sidebarGroupText"></div> */}
              </div>

              {/* <div className="jun-sidebarCompensate-h-[16px]" /> */}

              {/* Collapse Button */}
              <button
                className="jun-edgeCollapseTrigger items-center justify-between rounded-lg border p-3 text-muted-foreground hover:text-foreground"
                onClick={(event) => triggerEdgeCollapse({ event })}
              >
                <PanelLeftClose className="jun-edgeUncollapsed-visible h-5 w-5" />
                <PanelRightClose className="jun-edgeCollapsed-visible h-5 w-5" />
              </button>

              {/* Menu Groups */}
              <div className="flex-1 space-y-6">
                {menuGroups.map((group, index) => (
                  <div key={index}>
                    <div className="jun-sidebarText text-xs text-muted-foreground ml-2 mb-2 uppercase tracking-widest">
                      {group.label}
                    </div>
                    <div className="jun-sidebarMenu">
                      {group.items.map((item, itemIndex) => {
                        const Icon = item.icon;
                        return (
                          <div key={itemIndex} className="jun-sidebarMenuItem">
                            <button className="jun-sidebarMenuButton">
                              <Icon className="jun-sidebarIcon" />
                              <span className="jun-sidebarText">
                                {item.label}
                              </span>
                            </button>
                            <button className="jun-sidebarMenuAction jun-sidebarMenuAction-hoverAppear">
                              <MoreHorizontal className="h-4 w-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Settings */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="jun-sidebarMenuButton">
                    <Settings className="jun-sidebarIcon" />
                    <span className="jun-sidebarText">Settings</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  align="center"
                  className="jun-sidebarTooltip"
                >
                  <p>Add to library</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </aside>
      </TooltipProvider>

      {/* Main Content */}
      <main className="jun-content container py-6">
        <div className="rounded-lg border p-8">
          <h2 className="text-2xl font-semibold mb-4">Welcome to Playground</h2>
          <p className="text-muted-foreground">
            This is an example dashboard layout built with Jun Layout. The
            sidebar is:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
            <li>Drawer mode on mobile (below md breakpoint)</li>
            <li>Permanent but collapsed on tablet (md to xl breakpoint)</li>
            <li>Permanent and expanded on desktop (xl and above)</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
