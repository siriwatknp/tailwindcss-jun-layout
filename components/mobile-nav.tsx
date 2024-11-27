"use client";
import * as React from "react";
import Link from "next/link";

import { docsConfig } from "@/config/docs";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { triggerEdgeDrawer } from "packages/tailwindcss-jun-layout";
import IconMapping from "@/config/IconMapping";

export function MobileNavTrigger() {
  return (
    <Button
      variant="ghost"
      className="jun-edgeDrawerTrigger mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
      onClick={() => triggerEdgeDrawer()}
    >
      <svg
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-5"
      >
        <path
          d="M3 5H11"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M3 12H16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M3 19H21"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
      <span className="sr-only">Toggle Menu</span>
    </Button>
  );
}

export function MobileNav() {
  return (
    <div className="bg-background min-h-0 flex-1">
      <div className="jun-sidebarGroup">
        <Link href="/" className="jun-sidebarGroupLabel">
          <span className="font-bold text-lg">{siteConfig.name}</span>
        </Link>
        <div className="jun-sidebarMenu">
          {docsConfig.mainNav?.map((item) => {
            const Icon = IconMapping[item.lucide!];
            return (
              item.href && (
                <Link
                  className="jun-sidebarMenuButton"
                  key={item.href}
                  href={item.href}
                >
                  {Icon && <Icon className="jun-sidebarIcon" />}
                  <span className="jun-sidebarText">{item.title}</span>
                </Link>
              )
            );
          })}
        </div>
      </div>
      {docsConfig.sidebarNav.map((item, index) => {
        const Icon = IconMapping[item.lucide!];
        return (
          <div key={index} className="jun-sidebarGroup">
            <h4 className="jun-sidebarGroupLabel gap-2 text-muted-foreground">
              {Icon && <Icon className="size-4" />} {item.title}
            </h4>
            <ul className="jun-sidebarMenu">
              {item.items?.map((item, itemIndex) =>
                !item.disabled && item.href ? (
                  <li key={item.title} className="jun-sidebarMenuItem">
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "jun-sidebarMenuButton",
                        item.disabled && "cursor-not-allowed opacity-60"
                      )}
                    >
                      {item.title}
                      {item.label && (
                        <span className="ml-2 rounded-md bg-[#FFBD7A] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                          {item.label}
                        </span>
                      )}
                    </Link>
                  </li>
                ) : (
                  <span
                    key={itemIndex}
                    className={cn(
                      "jun-sidebarMenuButton",
                      item.disabled && "cursor-not-allowed opacity-60"
                    )}
                  >
                    {item.title}
                    {item.label && (
                      <span className="ml-2 rounded-md bg-muted px-1.5 py-0.5 text-xs leading-none text-muted-foreground no-underline group-hover:no-underline">
                        {item.label}
                      </span>
                    )}
                  </span>
                )
              )}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
