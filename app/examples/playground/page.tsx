"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  triggerEdgeCollapse,
  triggerEdgeDrawer,
} from "@/packages/tailwindcss-jun-layout";
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
  AudioWaveform,
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  ChevronRight,
  ChevronsUpDown,
  Command,
  CreditCard,
  Folder,
  Forward,
  Frame,
  GalleryVerticalEnd,
  LogOut,
  Map,
  PieChart,
  Plus,
  Settings2,
  Sparkles,
  SquareTerminal,
  Trash2,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface MenuGroup {
  label: string;
  items: {
    icon: LucideIcon;
    label: string;
  }[];
}

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
};

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

const subMenus = [
  {
    title: "History",
    url: "#",
  },
  {
    title: "Starred",
    url: "#",
  },
  {
    title: "Settings",
    url: "#",
  },
];

export default function PlaygroundPage() {
  const [activeTeam, setActiveTeam] = React.useState(data.teams[0]);
  return (
    <TooltipProvider delayDuration={0}>
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
        <aside className="jun-edgeSidebar jun-edgeSidebar-drawer md:jun-edgeSidebar-permanent md:jun-edgeSidebar-collapsed-w-[3rem] md:jun-edgeSidebar-w-[280px] jun-edgeSidebar-permanent-autoCollapse-lg">
          <div className="jun-edgeContent jun-sidebarContainer">
            <div className="flex flex-col p-2">
              {/* App Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="jun-sidebarMenuButton jun-sidebarMenuButton-spacing-2 jun-sidebarMenuButton-shrink-spacing-0">
                    <div className="jun-sidebarIcon flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      <activeTeam.logo className="size-4" />
                    </div>
                    <div className="jun-sidebarText text-left text-sm leading-tight flex items-center">
                      <div className="flex-1">
                        <div className="truncate font-semibold">
                          {activeTeam.name}
                        </div>
                        <div className="truncate text-xs">
                          {activeTeam.plan}
                        </div>
                      </div>
                      <ChevronsUpDown className="ml-auto size-4 " />
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  align="start"
                  side="bottom"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    Teams
                  </DropdownMenuLabel>
                  {data.teams.map((team, index) => (
                    <DropdownMenuItem
                      key={team.name}
                      onClick={() => setActiveTeam(team)}
                      className="gap-2 p-2"
                    >
                      <div className="flex size-6 items-center justify-center rounded-sm border">
                        <team.logo className="size-4 shrink-0" />
                      </div>
                      {team.name}
                      <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-2 p-2">
                    <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                      <Plus className="size-4" />
                    </div>
                    <div className="font-medium text-muted-foreground">
                      Add team
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex-1 min-h-0 overflow-auto">
              {/* Menu Groups */}
              {menuGroups.map((group, index) => (
                <div key={index} className="jun-sidebarGroup relative p-2">
                  <div className="jun-sidebarGroupLabel text-muted-foreground tracking-wide">
                    {group.label}
                    <button
                      className="jun-sidebarMenuAction"
                      title="Add Project"
                    >
                      <Plus /> <span className="sr-only">Add Project</span>
                    </button>
                  </div>
                  <ul className="jun-sidebarMenu">
                    {group.items.map((item, itemIndex) => {
                      const Icon = item.icon;
                      return (
                        <li key={itemIndex} className="jun-sidebarMenuItem">
                          <label
                            className="jun-collapsibleTrigger jun-sidebarMenuButton"
                            htmlFor={`menu-${item.label}`}
                          >
                            <Icon className="jun-sidebarIcon" />
                            <span className="jun-sidebarText">
                              {item.label}
                            </span>
                            <ChevronDown className="size-4 jun-collapsibleIcon jun-collapsibleIcon-rotate-180" />
                            {/* <Plus className="size-4 jun-collapsibleIcon jun-collapsibleIcon-rotate-45" /> */}
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
                                {subMenus.map((item, subIndex) => (
                                  <li
                                    key={subIndex}
                                    className="jun-sidebarMenuItem"
                                  >
                                    <button className="jun-sidebarMenuButton">
                                      <span className="jun-sidebarText">
                                        {item.title}
                                      </span>
                                    </button>
                                    <button className="jun-sidebarMenuAction jun-sidebarMenuAction-hoverAppear">
                                      <MoreHorizontal />
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
                </div>
              ))}

              <div className="jun-sidebarGroup">
                <div className="jun-sidebarMenu">
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
            </div>
            <div className="p-2">
              <ul className="jun-sidebarMenu">
                <li className="jun-sidebarMenuItem">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="jun-sidebarMenuButton jun-sidebarMenuButton-spacing-2 jun-sidebarMenuButton-shrink-spacing-0">
                        <Avatar className="jun-sidebarIcon h-8 w-8 rounded-lg">
                          <AvatarImage
                            src={data.user.avatar}
                            alt={data.user.name}
                          />
                          <AvatarFallback className="rounded-lg">
                            CN
                          </AvatarFallback>
                        </Avatar>
                        <div className="jun-sidebarText flex items-center flex-1 text-left text-sm leading-tight">
                          <div className="flex-1">
                            <div className="truncate font-semibold">
                              {data.user.name}
                            </div>
                            <div className="truncate text-xs">
                              {data.user.email}
                            </div>
                          </div>
                          <ChevronsUpDown className="ml-auto size-4" />
                        </div>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                      side="bottom"
                      align="end"
                      sideOffset={4}
                    >
                      <DropdownMenuLabel className="p-0 font-normal">
                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                          <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage
                              src={data.user.avatar}
                              alt={data.user.name}
                            />
                            <AvatarFallback className="rounded-lg">
                              CN
                            </AvatarFallback>
                          </Avatar>
                          <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">
                              {data.user.name}
                            </span>
                            <span className="truncate text-xs">
                              {data.user.email}
                            </span>
                          </div>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <Sparkles />
                          Upgrade to Pro
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <BadgeCheck />
                          Account
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CreditCard />
                          Billing
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Bell />
                          Notifications
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <LogOut />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              </ul>
            </div>
          </div>
          <button
            className="jun-sidebarRail jun-edgeCollapseTrigger"
            aria-label="Toggle Sidebar"
            tabIndex={-1}
            onClick={(event) => triggerEdgeCollapse({ event })}
            title="Toggle Sidebar"
          />
        </aside>

        {/* Main Content */}
        <main className="jun-content container py-6">
          <div className="rounded-lg border p-8">
            <h2 className="text-2xl font-semibold mb-4">
              Welcome to Playground
            </h2>
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
          <div className="jun-insetSidebar jun-insetSidebar-w-[120px]">
            <div className="jun-insetContent jun-sidebarContainer">
              <div className="flex flex-col p-2">
                {/* App Switcher */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="jun-sidebarMenuButton jun-sidebarMenuButton-spacing-2 jun-sidebarMenuButton-shrink-spacing-0">
                      <div className="jun-sidebarIcon flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                        <activeTeam.logo className="size-4" />
                      </div>
                      <div className="jun-sidebarText text-left text-sm leading-tight flex items-center">
                        <div className="flex-1">
                          <div className="truncate font-semibold">
                            {activeTeam.name}
                          </div>
                          <div className="truncate text-xs">
                            {activeTeam.plan}
                          </div>
                        </div>
                        <ChevronsUpDown className="ml-auto size-4 " />
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                    align="start"
                    side="bottom"
                    sideOffset={4}
                  >
                    <DropdownMenuLabel className="text-xs text-muted-foreground">
                      Teams
                    </DropdownMenuLabel>
                    {data.teams.map((team, index) => (
                      <DropdownMenuItem
                        key={team.name}
                        onClick={() => setActiveTeam(team)}
                        className="gap-2 p-2"
                      >
                        <div className="flex size-6 items-center justify-center rounded-sm border">
                          <team.logo className="size-4 shrink-0" />
                        </div>
                        {team.name}
                        <DropdownMenuShortcut>
                          ⌘{index + 1}
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2 p-2">
                      <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                        <Plus className="size-4" />
                      </div>
                      <div className="font-medium text-muted-foreground">
                        Add team
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
                        return (
                          <div key={itemIndex} className="jun-sidebarMenuItem">
                            <button className="jun-sidebarMenuButton">
                              {item.label}
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

                <div className="jun-sidebarGroup">
                  <div className="jun-sidebarMenu">
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
              </div>
              <div className="p-2">
                <ul className="jun-sidebarMenu">
                  <li className="jun-sidebarMenuItem">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="jun-sidebarMenuButton jun-sidebarMenuButton-spacing-2 jun-sidebarMenuButton-shrink-spacing-0">
                          <Avatar className="jun-sidebarIcon h-8 w-8 rounded-lg">
                            <AvatarImage
                              src={data.user.avatar}
                              alt={data.user.name}
                            />
                            <AvatarFallback className="rounded-lg">
                              CN
                            </AvatarFallback>
                          </Avatar>
                          <div className="jun-sidebarText flex items-center flex-1 text-left text-sm leading-tight">
                            <div className="flex-1">
                              <div className="truncate font-semibold">
                                {data.user.name}
                              </div>
                              <div className="truncate text-xs">
                                {data.user.email}
                              </div>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                          </div>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side="bottom"
                        align="end"
                        sideOffset={4}
                      >
                        <DropdownMenuLabel className="p-0 font-normal">
                          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                            <Avatar className="h-8 w-8 rounded-lg">
                              <AvatarImage
                                src={data.user.avatar}
                                alt={data.user.name}
                              />
                              <AvatarFallback className="rounded-lg">
                                CN
                              </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                              <span className="truncate font-semibold">
                                {data.user.name}
                              </span>
                              <span className="truncate text-xs">
                                {data.user.email}
                              </span>
                            </div>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            <Sparkles />
                            Upgrade to Pro
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            <BadgeCheck />
                            Account
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CreditCard />
                            Billing
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Bell />
                            Notifications
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <LogOut />
                          Log out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>

        <aside
          className={`
          jun-edgeSidebarR 
          jun-edgeSidebarR-drawer
          md:jun-edgeSidebarR-permanent
          md:jun-edgeSidebarR-collapsed-w-[80px]
          jun-edgeSidebarR-permanent-autoCollapse-xl`}
        >
          <div className="jun-edgeContent">
            <button>A</button>
            <button>A</button>
            <button>A</button>
            <button>A</button>
            <button>A</button>
          </div>
        </aside>
      </div>
    </TooltipProvider>
  );
}
