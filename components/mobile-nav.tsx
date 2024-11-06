"use client";
import * as React from "react";
import Link from "next/link";

import { docsConfig } from "@/config/docs";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { triggerEdgeDrawer } from "packages/tailwindcss-jun-layout";

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
    <div className="bg-background p-4">
      <Link href="/" className="flex items-center">
        <span className="font-bold">{siteConfig.name}</span>
      </Link>
      <div className="flex flex-col space-y-3">
        {docsConfig.mainNav?.map(
          (item) =>
            item.href && (
              <Link key={item.href} href={item.href}>
                {item.title}
              </Link>
            )
        )}
      </div>
      <div className="flex flex-col space-y-2">
        {docsConfig.sidebarNav.map((item, index) => (
          <div key={index} className="flex flex-col space-y-3 pt-6">
            <h4 className="font-medium">{item.title}</h4>
            {item.items?.map((item, itemIndex) =>
              !item.disabled && item.href ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-muted-foreground",
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
              ) : (
                <span
                  key={itemIndex}
                  className={cn(
                    "text-muted-foreground",
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
          </div>
        ))}
      </div>
    </div>
  );
}
