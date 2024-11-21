import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Home,
  Users,
  FileText,
  BarChart2,
  Mail,
  Calendar,
  Database,
  MoreHorizontal,
  ChevronsUpDown,
  GalleryVerticalEnd,
} from "lucide-react";

const menuGroups = [
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

export default function SidebarElementsDemo() {
  return (
    <div className="w-[240px]">
      <ResizablePanelGroup
        direction="horizontal"
        className="bg-sidebar relative [--anchorLeft:var(--\_)] [--anchorRight:_]"
      >
        <ResizablePanel
          defaultSize={80}
          minSize={20}
          maxSize={90}
          className="jun-sidebarContainer"
        >
          <div className="flex flex-col p-2">
            <button className="jun-sidebarMenuButton jun-sidebarMenuButton-spacing-2 jun-sidebarMenuButton-shrink-spacing-0">
              <div className="jun-sidebarIcon flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>
              <div className="jun-sidebarText text-left text-sm leading-tight flex items-center">
                <div className="flex-1">
                  <div className="truncate font-semibold">Acme Inc</div>
                  <div className="truncate text-xs">Enterprise</div>
                </div>
                <ChevronsUpDown className="ml-auto size-4 " />
              </div>
            </button>
          </div>
          <div className="flex-1 min-h-0 overflow-auto">
            {/* Menu Groups */}
            {menuGroups.map((group, index) => (
              <div key={index} className="jun-sidebarGroup p-2">
                <div className="jun-sidebarGroupLabel text-muted-foreground tracking-wide">
                  {group.label}
                </div>
                <div className="jun-sidebarMenu">
                  {group.items.map((item, itemIndex) => {
                    const Icon = item.icon;
                    return (
                      <div key={itemIndex} className="jun-sidebarMenuItem">
                        <button className="jun-sidebarMenuButton">
                          <Icon className="jun-sidebarIcon" />
                          <span className="jun-sidebarText">{item.label}</span>
                        </button>
                        <button className="jun-sidebarMenuAction jun-sidebarMenuAction-hoverAppear">
                          <MoreHorizontal />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="p-2">
            <ul className="jun-sidebarMenu">
              <li className="jun-sidebarMenuItem">
                <button className="jun-sidebarMenuButton jun-sidebarMenuButton-spacing-2 jun-sidebarMenuButton-shrink-spacing-0">
                  <Avatar className="jun-sidebarIcon h-8 w-8 rounded-lg">
                    <AvatarImage src="/avatars/unknown.jpg" alt="unknown" />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="jun-sidebarText flex items-center flex-1 text-left text-sm leading-tight">
                    <div className="flex-1 min-w-0">
                      <div className="truncate font-semibold">Unknown</div>
                      <div className="truncate text-xs">
                        unknown@example.com
                      </div>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </div>
                </button>
              </li>
            </ul>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={0}>
          <div className="invisible h-full w-full" />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
