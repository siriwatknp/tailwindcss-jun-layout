"use client";

import {
  triggerEdgeCollapse,
  triggerEdgeDrawer,
} from "@/packages/tailwindcss-jun-layout";
import {
  Home,
  Lightbulb,
  Globe,
  PieChart,
  Shield,
  Network,
  ShieldCheck,
  CircleCheck,
  MapPin,
  ShieldAlert,
  Mail,
  Code,
  Box,
  Database,
  HardDrive,
  Sparkles,
  Cloud,
  Image as ImageIcon,
  Phone,
  Settings,
  Bell,
  Filter,
  ChevronLeft,
  ChevronRight,
  ArrowDown,
  ChevronDown,
} from "lucide-react";

const menus = [
  {
    id: "account-home",
    title: "Account Home",
    icon: Home,
  },
  {
    id: "discover",
    title: "Discover",
    icon: Lightbulb,
  },
  {
    id: "domain-registration",
    title: "Domain Registration",
    icon: Globe,
    hasSubmenu: true,
    submenu: [
      {
        id: "manage-domains",
        title: "Manage Domains",
      },
      {
        id: "transfer-domains",
        title: "Transfer Domains",
      },
      {
        id: "register-domains",
        title: "Register Domains",
      },
    ],
  },
  {
    id: "analytics",
    title: "Analytics & Logs",
    icon: PieChart,
    hasSubmenu: true,
    submenu: [
      {
        id: "account-analytics",
        title: "Account Analytics",
        badge: "Beta",
      },
      {
        id: "web-analytics",
        title: "Web Analytics",
      },
      {
        id: "carbon-impact",
        title: "Carbon Impact Report",
      },
      {
        id: "magic-monitoring",
        title: "Magic Monitoring",
      },
    ],
  },
  {
    id: "security",
    title: "Security Center",
    icon: Shield,
    hasSubmenu: true,
    submenu: [
      {
        id: "security-insights",
        title: "Security Insights",
      },
      {
        id: "infrastructure",
        title: "Infrastructure",
      },
      {
        id: "investigate",
        title: "Investigate",
      },
      {
        id: "blocked-content",
        title: "Blocked Content",
        badge: "New",
      },
    ],
  },
  {
    id: "trace",
    title: "Trace",
    icon: Network,
    badge: "Beta",
  },
  {
    id: "waf",
    title: "WAF",
    icon: ShieldCheck,
  },
  {
    id: "turnstile",
    title: "Turnstile",
    icon: CircleCheck,
  },
  {
    id: "ip-addresses",
    title: "IP Addresses",
    icon: MapPin,
    hasSubmenu: true,
    submenu: [
      {
        id: "address-maps",
        title: "Address Maps",
      },
    ],
  },
  {
    id: "zero-trust",
    title: "Zero Trust",
    icon: ShieldAlert,
  },
  {
    id: "email-security",
    title: "Email Security",
    icon: Mail,
    hasSubmenu: true,
    submenu: [
      {
        id: "email-overview",
        title: "Overview",
      },
      {
        id: "zero-trust-email",
        title: "Zero Trust Email Security",
        external: true,
      },
      {
        id: "retro-scan",
        title: "Retro Scan",
      },
    ],
  },
  {
    id: "workers-pages",
    title: "Workers & Pages",
    icon: Code,
    hasSubmenu: true,
    submenu: [
      {
        id: "durable-objects",
        title: "Durable Objects",
      },
      {
        id: "workflows",
        title: "Workflows",
        badge: "Beta",
      },
      {
        id: "browser-rendering",
        title: "Browser Rendering",
      },
      {
        id: "plans",
        title: "Plans",
      },
    ],
  },
  {
    id: "workers-platforms",
    title: "Workers for Platforms",
    icon: Box,
  },
  {
    id: "storage-databases",
    title: "Storage & Databases",
    icon: Database,
    hasSubmenu: true,
    submenu: [
      {
        id: "kv",
        title: "KV",
      },
      {
        id: "d1-sql",
        title: "D1 SQL Database",
      },
      {
        id: "hyperdrive",
        title: "Hyperdrive",
      },
      {
        id: "queues",
        title: "Queues",
      },
    ],
  },
  {
    id: "r2-object-storage",
    title: "R2 Object Storage",
    icon: HardDrive,
    hasSubmenu: true,
    submenu: [
      {
        id: "r2-overview",
        title: "Overview",
      },
      {
        id: "data-migration",
        title: "Data Migration",
      },
    ],
  },
  {
    id: "ai",
    title: "AI",
    icon: Sparkles,
    hasSubmenu: true,
    submenu: [
      {
        id: "workers-ai",
        title: "Workers AI",
      },
      {
        id: "vectorize",
        title: "Vectorize",
      },
      {
        id: "ai-gateway",
        title: "AI Gateway",
      },
    ],
  },
  {
    id: "stream",
    title: "Stream",
    icon: Cloud,
    hasSubmenu: true,
    submenu: [
      {
        id: "stream-plans",
        title: "Plans",
      },
    ],
  },
  {
    id: "images",
    title: "Images",
    icon: ImageIcon,
    hasSubmenu: true,
    submenu: [
      {
        id: "images-overview",
        title: "Overview",
      },
      {
        id: "transformations",
        title: "Transformations",
      },
      {
        id: "images-plans",
        title: "Plans",
      },
    ],
  },
  {
    id: "calls",
    title: "Calls",
    icon: Phone,
    badge: "Beta",
  },
  {
    id: "manage-account",
    title: "Manage Account",
    icon: Settings,
    hasSubmenu: true,
    submenu: [
      {
        id: "members",
        title: "Members",
      },
      {
        id: "account-api-tokens",
        title: "Account API Tokens",
      },
      {
        id: "audit-log",
        title: "Audit Log",
      },
      {
        id: "billing",
        title: "Billing",
      },
      {
        id: "configurations",
        title: "Configurations",
      },
    ],
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: Bell,
  },
];

export default function Dashboard() {
  return (
    <div className="jun-layout jun-layout-noTransition">
      <div className="jun-header jun-header-h-[64px] jun-header-clip-left md:px-4">
        <button
          className="jun-edgeDrawerTrigger w-[57px] grid place-items-center self-stretch border-r mr-4"
          onClick={() =>
            triggerEdgeDrawer({ sidebarId: "examples-dashboard-sidebar" })
          }
        >
          <svg
            className="jun-edgeDrawerClosed-visible w-6 h-6"
            role="presentation"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M14 3.5H2v1h12v-1zM14 7.5H2v1h12v-1zM14 11.5H2v1h12v-1z"></path>
          </svg>
          <svg
            className="jun-edgeDrawerOpen-visible w-6 h-6"
            role="presentation"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M14.34 13.605L8.696 8.023l5.582-5.645-.71-.703-5.583 5.644L2.34 1.737l-.703.711L7.282 8.03 1.7 13.675l.71.703 5.583-5.645 5.644 5.583.703-.711z"></path>
          </svg>
        </button>
        <svg
          fill="none"
          height="48"
          viewBox="0 0 152 48"
          width="152"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="m34.5868 8.40061-9.6868-2.59556c-.6687-.17919-1.2108.23679-1.2108.92911v10.02854c0 .6923.5421 1.3988 1.2108 1.578l9.6868 2.5955c.6687.1792 1.2109-.2368 1.2109-.9291v-10.02848c0-.69232-.5422-1.39882-1.2109-1.57801zm-9.6868-6.35625c-2.6749-.71674-4.8434.94718-4.8434 3.71647v10.02847c0 2.7693 2.1685 5.5953 4.8434 6.312l9.6868 2.5956c2.6749.7168 4.8434-.9472 4.8434-3.7165v-10.0284c0-2.76934-2.1685-5.59533-4.8434-6.31207z"
            fill="#8098f9"
            fillRule="evenodd"
          />
          <path
            clipRule="evenodd"
            d="m26.9812 16.5707-12.1085-3.2444c-.6687-.1792-1.2109.2368-1.2109.9291v12.5356c0 .6923.5422 1.3988 1.2109 1.578l12.1085 3.2445c.6687.1792 1.2108-.2368 1.2108-.9291v-12.5356c0-.6924-.5421-1.3989-1.2108-1.5781zm-12.1085-7.0051c-2.6749-.71674-4.8434.9472-4.8434 3.7165v12.5356c0 2.7693 2.1685 5.5953 4.8434 6.312l12.1085 3.2445c2.6749.7167 4.8433-.9472 4.8433-3.7165v-12.5356c0-2.7693-2.1684-5.5953-4.8433-6.312z"
            fill="#6172f3"
            fillRule="evenodd"
          />
          <path
            clipRule="evenodd"
            d="m19.3736 24.7409-14.53021-3.8934c-.66873-.1792-1.21085.2368-1.21085.9291v15.0428c0 .6923.54212 1.3988 1.21085 1.578l14.53021 3.8933c.6687.1792 1.2108-.2368 1.2108-.9291v-15.0427c0-.6923-.5421-1.3988-1.2108-1.578zm-14.53021-7.6541c-2.67493-.7167-4.84339.9472-4.84339 3.7165v15.0427c0 2.7693 2.16846 5.5953 4.84339 6.3121l14.53021 3.8933c2.6749.7168 4.8433-.9472 4.8433-3.7164v-15.0428c0-2.7693-2.1684-5.5953-4.8433-6.312z"
            fill="#444ce7"
            fillRule="evenodd"
          />
          <g fill="#0A0D12">
            <path d="m53.64 32.6079c1.1387.5227 2.4453.784 3.92.784s2.7627-.252 3.864-.756c1.12-.5227 1.988-1.2507 2.604-2.184.616-.952.924-2.0627.924-3.332v-.336c0-1.176-.2707-2.128-.812-2.856-.5413-.7467-1.232-1.2973-2.072-1.652-.8213-.3547-1.6707-.532-2.548-.532h-1.036v-.448l5.908-3.136v-4.76h-13.888v3.192h9.912v.448l-6.328 3.36v3.92h3.92c.6347 0 1.204.0933 1.708.28.504.168.9053.4387 1.204.812s.448.8587.448 1.456v.28c0 .8773-.336 1.6053-1.008 2.184-.6533.5787-1.5867.868-2.8.868-1.1947 0-2.156-.308-2.884-.924-.728-.6347-1.092-1.4747-1.092-2.52v-.392h-3.584v.504c0 1.344.3173 2.5107.952 3.5.6533.9707 1.5493 1.7173 2.688 2.24z" />
            <path
              clipRule="evenodd"
              d="m77.8432 14.1559c-.9334-.504-2.016-.756-3.248-.756h-8.064v19.6h3.696v-7.168h4.368c1.1946 0 2.2586-.2427 3.192-.728.952-.504 1.6986-1.204 2.24-2.1.56-.9147.84-1.9787.84-3.192v-.392c0-1.232-.2707-2.296-.812-3.192-.5227-.896-1.26-1.5867-2.212-2.072zm-1.484 7.588c-.5414.4853-1.2507.728-2.128.728h-4.004v-5.712h4.004c.8773 0 1.5866.2427 2.128.728.5413.4853.812 1.148.812 1.988v.28c0 .84-.2707 1.5027-.812 1.988z"
              fillRule="evenodd"
            />
            <path
              clipRule="evenodd"
              d="m88.4215 33.3919c-1.3814 0-2.6227-.28-3.724-.84-1.1014-.56-1.9694-1.372-2.604-2.436-.6347-1.064-.952-2.3427-.952-3.836v-.448c0-1.4933.3173-2.772.952-3.836.6346-1.064 1.5026-1.876 2.604-2.436 1.1013-.56 2.3426-.84 3.724-.84 1.3813 0 2.6226.28 3.724.84 1.1013.56 1.9693 1.372 2.604 2.436.6346 1.064.952 2.3427.952 3.836v.448c0 1.4933-.3174 2.772-.952 3.836-.6347 1.064-1.5027 1.876-2.604 2.436-1.1014.56-2.3427.84-3.724.84zm0-3.136c1.0826 0 1.9786-.3453 2.688-1.036.7093-.7093 1.064-1.7173 1.064-3.024v-.28c0-1.3067-.3547-2.3053-1.064-2.996-.6907-.7093-1.5867-1.064-2.688-1.064-1.0827 0-1.9787.3547-2.688 1.064-.7094.6907-1.064 1.6893-1.064 2.996v.28c0 1.3067.3546 2.3147 1.064 3.024.7093.6907 1.6053 1.036 2.688 1.036z"
              fillRule="evenodd"
            />
            <path d="m102.542 19.4479c-.467.2613-.803.672-1.008 1.232h-.504v-1.568h-3.472v13.888h3.528v-7.896c0-.9893.289-1.7173.868-2.184.579-.4853 1.316-.728 2.212-.728h1.736v-.002h3.598v7.674c0 .952.28 1.7173.84 2.296.578.56 1.325.84 2.24.84h3.92v-2.912h-2.688c-.523 0-.784-.28-.784-.84v-7.058h3.808v-3.13h-3.808v-4.26h-3.528v4.26h-3.598v-.004h-1.68c-.635 0-1.195.1307-1.68.392z" />
            <path
              clipRule="evenodd"
              d="m120.281 32.8879c.784.336 1.671.504 2.66.504.971 0 1.736-.14 2.296-.42s.971-.5973 1.232-.952c.261-.3733.429-.672.504-.896h.532v.028c0 .56.224 1.008.672 1.344s1.017.504 1.708.504h2.352v-2.912h-1.12c-.523 0-.784-.28-.784-.84v-5.18c0-1.736-.532-3.0613-1.596-3.976s-2.511-1.372-4.34-1.372c-1.195 0-2.212.1867-3.052.56-.821.3547-1.484.8307-1.988 1.428-.485.5787-.84 1.2227-1.064 1.932l3.248 1.092c.131-.6347.411-1.148.84-1.54.429-.4107 1.083-.616 1.96-.616.896 0 1.549.2147 1.96.644.411.4107.616.9427.616 1.596v.784h-3.808c-1.045 0-1.979.168-2.8.504-.803.3173-1.437.8027-1.904 1.456-.448.6347-.672 1.428-.672 2.38s.224 1.764.672 2.436c.467.6533 1.092 1.1573 1.876 1.512zm5.684-3.164c-.616.5413-1.419.812-2.408.812-.747 0-1.316-.1587-1.708-.476s-.588-.728-.588-1.232.187-.896.56-1.176.887-.42 1.54-.42h3.556v.28c0 .9147-.317 1.652-.952 2.212z"
              fillRule="evenodd"
            />
            <path d="m140.77 32.2159c1.157.784 2.641 1.176 4.452 1.176 1.773 0 3.183-.392 4.228-1.176 1.064-.8027 1.596-1.932 1.596-3.388 0-.9707-.252-1.736-.756-2.296-.485-.5787-1.157-1.0173-2.016-1.316-.84-.3173-1.783-.5693-2.828-.756l-.784-.14c-.635-.112-1.139-.2707-1.512-.476-.373-.224-.56-.56-.56-1.008 0-.4107.177-.728.532-.952.355-.2427.868-.364 1.54-.364s1.232.1493 1.68.448c.467.2987.775.8027.924 1.512l3.276-1.008c-.317-1.12-.989-2.0253-2.016-2.716s-2.315-1.036-3.864-1.036c-1.643 0-2.968.3733-3.976 1.12-1.008.728-1.512 1.7827-1.512 3.164 0 .9147.243 1.6613.728 2.24s1.129 1.036 1.932 1.372c.803.3173 1.689.5693 2.66.756l.784.14c.821.1493 1.419.3453 1.792.588.373.224.56.5507.56.98s-.196.7933-.588 1.092c-.392.28-.999.42-1.82.42-.541 0-1.045-.0747-1.512-.224-.448-.168-.831-.4387-1.148-.812-.299-.3733-.513-.8867-.644-1.54l-3.248.84c.243 1.456.943 2.576 2.1 3.36z" />
            <path d="m133.417 32.9999v-19.6h3.528v19.6z" />
          </g>
        </svg>
      </div>
      <div
        id="examples-dashboard-sidebar"
        className="jun-edgeSidebar jun-edgeSidebar-w-[260px] jun-edgeSidebar-drawer jun-edgeSidebar-drawer-showHeader md:jun-edgeSidebar-permanent md:jun-edgeSidebar-collapsed-w-[55px] jun-edgeSidebar-permanent-hoverUncollapse"
      >
        <div className="jun-edgeContent">
          <div className="min-h-[60px] border-b border-sidebar-border flex items-center justify-center @container">
            <h1 className="text-md font-medium hidden @[60px]:block">
              someone@gmail.com
            </h1>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex @[60px]:hidden items-center justify-center text-white font-medium">
              SK
            </div>
          </div>
          <div className="jun-sidebarContainer flex-auto min-h-0 overflow-auto">
            <ul className="jun-sidebarMenu">
              {menus.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id} className="jun-sidebarMenuItem">
                    <button className="jun-sidebarMenuButton jun-sidebarMenuButton-spacing-0 jun-sidebarMenuButton-h-[40px]">
                      <Icon className="jun-sidebarIcon jun-sidebarIcon-min-w-[55px] " />
                      <span className="jun-sidebarText">{item.title}</span>
                    </button>

                    {item.submenu && (
                      <>
                        <label
                          htmlFor={`menu-${item.id}`}
                          className="jun-sidebarMenuAction jun-sidebarMenuAction-size-[32px] jun-collapsibleTrigger"
                        >
                          <ChevronDown />
                          <input
                            type="checkbox"
                            className="sr-only"
                            id={`menu-${item.id}`}
                          />
                        </label>
                        <div className="jun-collapsibleContent">
                          <div>
                            <ul className="jun-sidebarMenu jun-sidebarMenu-nested jun-sidebarMenu-nested-noLine">
                              {item.submenu.map((sub) => (
                                <li
                                  key={sub.id}
                                  className="jun-sidebarMenuItem"
                                >
                                  <button className="jun-sidebarMenuButton jun-sidebarMenuButton-offset-.5">
                                    <span className="jun-sidebarText">
                                      {sub.title}
                                    </span>
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <button
            className="jun-edgeCollapseTrigger jun-sidebarMenuButton min-h-[60px] jun-sidebarMenuButton-spacing-0 flex items-center border-t border-sidebar-border"
            onClick={(event) => {
              triggerEdgeCollapse({ event });
            }}
          >
            <span className="jun-edgeCollapsed-visible flex-1 ">
              <span className="flex items-center">
                <ChevronRight className="jun-sidebarIcon w-[55px]" />
                <span className="jun-sidebarText">Expand sidebar</span>
              </span>
            </span>
            <span className="jun-edgeUncollapsed-visible flex-1 ">
              <span className="flex items-center">
                <ChevronLeft className="jun-sidebarIcon w-[55px]" />
                <span className="jun-sidebarText">Collapse sidebar</span>
              </span>
            </span>
          </button>
        </div>
      </div>
      <main className="jun-content">
        <div className="container py-5">
          <h2 className="text-3xl font-medium">
            Boost your site&apos;s speed and security
          </h2>
        </div>
      </main>
    </div>
  );
}
