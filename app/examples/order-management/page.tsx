"use client";

import {
  ChevronDown,
  CircleDollarSign,
  LogOut,
  Menu,
  Package,
  Plus,
  ShoppingCart,
  User,
  Users,
} from "lucide-react";
import { triggerEdgeDrawer } from "@/packages/tailwindcss-jun-layout";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

// Custom TooltipSidebar component
function TooltipSidebar({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [container, setContainer] = useState<Element | null>(null);

  useEffect(() => {
    setContainer(document.querySelector(".jun-edgeSidebar"));
  }, []);

  return (
    <TooltipPrimitive.Portal container={container}>
      <TooltipPrimitive.Content
        sideOffset={4}
        side="right"
        className={cn(
          "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95",
          className
        )}
      >
        {children}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export default function OrderManagementExample() {
  return (
    <TooltipPrimitive.Provider delayDuration={0}>
      <div className="jun-layout">
        {/* Header with user profile */}
        <header className="jun-header border-b">
          <div className="container flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                className="jun-edgeDrawerTrigger"
                onClick={() => triggerEdgeDrawer()}
              >
                <Menu className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-semibold">Order Management</h1>
            </div>

            {/* User profile section */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-3 rounded-full border bg-muted/50 px-3 py-1.5">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm">John Doe</span>
                </div>
                <button
                  className="flex items-center gap-1 rounded-sm text-sm text-muted-foreground hover:text-primary"
                  onClick={() => {
                    // Add logout logic here
                    console.log("Logout clicked");
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Edge Sidebar - drawer on mobile, permanent from sm up with auto-collapse */}
        <aside className="jun-edgeSidebar jun-edgeSidebar-drawer sm:jun-edgeSidebar-permanent jun-edgeSidebar-permanent-autoCollapse-lg jun-edgeSidebar-collapsed-w-[48px]">
          <div className="jun-edgeContent">
            <div className="jun-sidebarContainer">
              {/* Main navigation menu */}
              <div className="jun-sidebarGroup">
                <div className="jun-sidebarGroupLabel">Main Menu</div>
                <ul className="jun-sidebarMenu">
                  {/* Orders with collapsible nested menu */}
                  <li className="jun-sidebarMenuItem">
                    <TooltipPrimitive.Root>
                      <TooltipPrimitive.Trigger asChild>
                        <button className="jun-sidebarMenuButton">
                          <ShoppingCart className="jun-sidebarIcon" />
                          <span className="jun-sidebarText">Orders</span>
                        </button>
                      </TooltipPrimitive.Trigger>
                      <TooltipSidebar className="jun-sidebarTooltip">
                        <p>Orders</p>
                      </TooltipSidebar>
                    </TooltipPrimitive.Root>

                    {/* Collapsible trigger as secondary action */}
                    <label
                      htmlFor="menu-orders"
                      className="jun-sidebarMenuAction jun-collapsibleTrigger"
                    >
                      <ChevronDown className="size-4 jun-collapsibleIcon jun-collapsibleIcon-rotate-180" />
                      <input
                        type="checkbox"
                        className="sr-only"
                        id="menu-orders"
                        defaultChecked
                      />
                    </label>

                    {/* Nested menu wrapped in collapsible content */}
                    <div className="jun-collapsibleContent">
                      <div>
                        <div className="jun-sidebarGroupText">
                          <div>
                            <ul className="jun-sidebarMenu jun-sidebarMenu-nested">
                              <li className="jun-sidebarMenuItem">
                                <button className="jun-sidebarMenuButton">
                                  <span className="jun-sidebarText">
                                    All Orders
                                  </span>
                                </button>
                              </li>
                              <li className="jun-sidebarMenuItem">
                                <button className="jun-sidebarMenuButton">
                                  <span className="jun-sidebarText">
                                    Pending
                                  </span>
                                </button>
                              </li>
                              <li className="jun-sidebarMenuItem">
                                <button className="jun-sidebarMenuButton">
                                  <span className="jun-sidebarText">
                                    Processing
                                  </span>
                                </button>
                              </li>
                              <li className="jun-sidebarMenuItem">
                                <button className="jun-sidebarMenuButton">
                                  <span className="jun-sidebarText">
                                    Completed
                                  </span>
                                </button>
                              </li>
                              <li className="jun-sidebarMenuItem">
                                <button className="jun-sidebarMenuButton">
                                  <span className="jun-sidebarText">
                                    Cancelled
                                  </span>
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                  {/* Products with tooltip and actions */}
                  <li className="jun-sidebarMenuItem">
                    <TooltipPrimitive.Root>
                      <TooltipPrimitive.Trigger asChild>
                        <button className="jun-sidebarMenuButton">
                          <Package className="jun-sidebarIcon" />
                          <span className="jun-sidebarText">Products</span>
                        </button>
                      </TooltipPrimitive.Trigger>
                      <TooltipSidebar className="jun-sidebarTooltip">
                        <p>Products</p>
                      </TooltipSidebar>
                    </TooltipPrimitive.Root>

                    {/* New Product action */}
                    <button
                      className="jun-sidebarMenuAction"
                      onClick={() => {
                        console.log("Create new product");
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </button>

                    {/* Check Price action */}
                    <button
                      className="jun-sidebarMenuAction"
                      onClick={() => {
                        console.log("Check prices");
                      }}
                    >
                      <CircleDollarSign className="h-4 w-4" />
                    </button>
                  </li>

                  {/* Customers with tooltip */}
                  <li className="jun-sidebarMenuItem">
                    <TooltipPrimitive.Root>
                      <TooltipPrimitive.Trigger asChild>
                        <button className="jun-sidebarMenuButton">
                          <Users className="jun-sidebarIcon" />
                          <span className="jun-sidebarText">Customers</span>
                        </button>
                      </TooltipPrimitive.Trigger>
                      <TooltipSidebar className="jun-sidebarTooltip">
                        <p>Customers</p>
                      </TooltipSidebar>
                    </TooltipPrimitive.Root>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="jun-content">
          <div className="container p-6">
            <div className="rounded-lg border p-4">
              <h2 className="text-lg font-medium">
                Welcome to Order Management
              </h2>
              <p className="mt-2 text-gray-600">
                Select a menu item from the sidebar to get started.
              </p>
            </div>
          </div>
        </main>
      </div>
    </TooltipPrimitive.Provider>
  );
}
