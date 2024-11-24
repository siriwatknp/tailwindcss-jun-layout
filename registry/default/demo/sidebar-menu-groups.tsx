import { triggerEdgeCollapse } from "@/packages/tailwindcss-jun-layout";
import {
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
  LucideIcon,
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
  {
    label: "Settings",
    items: [
      { icon: Settings, label: "General" },
      { icon: Users, label: "Members" },
      { icon: Database, label: "Integrations" },
    ],
  },
];

export default function SidebarMenuGroupsDemo() {
  return (
    <div className="w-full border-4 rounded bg-background max-w-[500px]">
      <div className="jun-layout jun-layout-h-[300px] jun-layout-standalone">
        <header className="jun-header">
          <div className="p-3">
            <div className="h-4 w-32 rounded bg-muted" />
          </div>
        </header>
        <aside
          id="sidebar-menu-groups-demo"
          className="jun-edgeSidebar jun-edgeSidebar-collapsed-w-[52px]"
        >
          <div className="jun-edgeContent bg-sidebar">
            <button
              className="jun-edgeCollapseTrigger p-4 hover:bg-neutral-200"
              onClick={(event) =>
                triggerEdgeCollapse({
                  event,
                  sidebarId: "sidebar-menu-groups-demo",
                })
              }
            >
              <PanelRightClose className="jun-edgeCollapsed-visible" />
              <PanelLeftClose className="jun-edgeUncollapsed-visible" />
            </button>

            {menuGroups.map((group, index) => (
              <div key={group.label} className="jun-sidebarGroup">
                <div className="jun-sidebarGroupLabel">{group.label}</div>
                <ul className="jun-sidebarMenu">
                  {group.items.map((item, itemIndex) => {
                    const Icon = item.icon;
                    return (
                      <li key={itemIndex} className="jun-sidebarMenuItem">
                        <button className="jun-sidebarMenuButton">
                          <Icon className="jun-sidebarIcon jun-sidebarIcon-shrink-size-5" />
                          <span className="jun-sidebarText">{item.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </aside>
        <main className="jun-content">
          <div className="p-4">
            <div className="h-4 w-48 rounded bg-muted" />
          </div>
        </main>
      </div>
    </div>
  );
}
