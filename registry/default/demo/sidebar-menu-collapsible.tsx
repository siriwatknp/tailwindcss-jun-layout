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
  ChevronDown,
  Plus,
} from "lucide-react";

interface MenuGroup {
  label: string;
  items: {
    icon: LucideIcon;
    label: string;
    items: {
      icon: LucideIcon;
      label: string;
    }[];
  }[];
}

const menuGroups: MenuGroup[] = [
  {
    label: "Overview",
    items: [
      {
        icon: Home,
        label: "Dashboard",
        items: [
          { icon: Mail, label: "Inbox" },
          { icon: Calendar, label: "Calendar" },
          { icon: Database, label: "Projects" },
          { icon: Users, label: "Team" },
        ],
      },
      {
        icon: FileText,
        label: "Reports",
        items: [
          { icon: Settings, label: "General" },
          { icon: Users, label: "Members" },
          { icon: Database, label: "Integrations" },
        ],
      },
    ],
  },
];

export default function SidebarMenuCollapsibleDemo() {
  return (
    <div className="w-full border-4 rounded bg-background max-w-[500px]">
      <div className="jun-layout jun-layout-h-[300px] jun-layout-standalone">
        <header className="jun-header">
          <div className="p-3">
            <div className="h-4 w-32 rounded bg-muted" />
          </div>
        </header>
        <aside
          id="sidebar-menu-collapsible-demo"
          className="jun-edgeSidebar jun-edgeSidebar-collapsed-w-[52px]"
        >
          <div className="jun-edgeContent bg-sidebar">
            <button
              className="jun-edgeCollapseTrigger p-4 hover:bg-neutral-200"
              onClick={(event) =>
                triggerEdgeCollapse({
                  event,
                  sidebarId: "sidebar-menu-collapsible-demo",
                })
              }
            >
              <PanelRightClose className="jun-edgeCollapsed-visible" />
              <PanelLeftClose className="jun-edgeUncollapsed-visible" />
            </button>

            <div className="p-2 flex flex-col gap-4 min-h-0 overflow-auto">
              {menuGroups.map((group, index) => (
                <ul key={group.label} className="jun-sidebarMenu">
                  {group.items.map((item, itemIndex) => {
                    const Icon = item.icon;
                    return (
                      <li key={itemIndex} className="jun-sidebarMenuItem">
                        <label
                          htmlFor={`menu-${item.label}`}
                          className="jun-sidebarMenuButton jun-collapsibleTrigger"
                        >
                          <Icon className="jun-sidebarIcon jun-sidebarIcon-shrink-size-5" />
                          <span className="jun-sidebarText">{item.label}</span>
                          {itemIndex === 0 && (
                            <ChevronDown className="size-4 jun-collapsibleIcon jun-collapsibleIcon-rotate-180" />
                          )}
                          {itemIndex === 1 && (
                            <Plus className="size-4 jun-collapsibleIcon jun-collapsibleIcon-rotate-45" />
                          )}
                          <input
                            type="checkbox"
                            className="sr-only"
                            id={`menu-${item.label}`}
                            defaultChecked
                          />
                        </label>

                        <div className="jun-collapsibleContent">
                          <div>
                            <ul className="jun-sidebarMenu jun-sidebarMenu-nested">
                              {item.items.map((sub) => (
                                <li
                                  key={sub.label}
                                  className="jun-sidebarMenuItem"
                                >
                                  <button className="jun-sidebarMenuButton">
                                    <span className="jun-sidebarText">
                                      {sub.label}
                                    </span>
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ))}
            </div>
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
