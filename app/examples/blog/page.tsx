"use client";
import { triggerEdgeDrawer } from "@/packages/tailwindcss-jun-layout";
import { MenuIcon } from "lucide-react";

export default function BlogExample() {
  return (
    <div className="jun-layout">
      <header className="jun-header jun-header-h-[3.5rem] lg:jun-header-h-[4rem] border-b px-4">
        <button
          className="jun-edgeDrawerTrigger"
          onClick={() => triggerEdgeDrawer()}
        >
          <MenuIcon />
        </button>
        <Header />
      </header>
      <aside className="jun-edgeSidebar jun-edgeSidebar-drawer md:jun-edgeSidebar-permanent md:jun-edgeSidebar-permanent-hidden">
        <div className="jun-edgeContent">
          <div className="p-4">
            <InsetSidebar />
          </div>
        </div>
      </aside>
      <main className="jun-content container md:gap-2 lg:gap-4 xl:gap-5">
        <aside className="jun-insetSidebar jun-insetSidebar-w-[220px] lg:jun-insetSidebar-w-[256px] xl:jun-insetSidebar-w-[300px] hidden md:block">
          <div className="jun-insetContent space-y-6 py-8">
            <div className="pr-4">
              <InsetSidebar />
            </div>
          </div>
        </aside>

        <Content />

        <aside className="jun-insetSidebar hidden xl:block jun-insetSidebar-w-[200px] jun-insetSidebar-fixed">
          <div className="jun-insetContent">
            <div className="space-y-8 py-8 pl-4">
              {/* Table of Contents */}
              <div className="space-y-4">
                <div className="h-4 w-32 rounded-md bg-gray-300 dark:bg-gray-700" />
                <div className="space-y-2">
                  <div className="h-3 w-full rounded-md bg-gray-200 dark:bg-gray-800" />
                  <div className="ml-2 h-3 w-11/12 rounded-md bg-gray-200 dark:bg-gray-800" />
                  <div className="ml-2 h-3 w-10/12 rounded-md bg-gray-200 dark:bg-gray-800" />
                  <div className="h-3 w-full rounded-md bg-gray-200 dark:bg-gray-800" />
                  <div className="ml-2 h-3 w-9/12 rounded-md bg-gray-200 dark:bg-gray-800" />
                </div>
              </div>

              {/* Marketing Ads */}
              <div className="space-y-4">
                <div className="h-40 w-full rounded-lg bg-gray-300 dark:bg-gray-700 p-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="h-4 w-3/4 rounded bg-gray-400 dark:bg-gray-600" />
                    <div className="h-3 w-11/12 rounded bg-gray-400 dark:bg-gray-600" />
                    <div className="h-3 w-5/6 rounded bg-gray-400 dark:bg-gray-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="h-8 w-20 rounded bg-gray-400 dark:bg-gray-600" />
                    <div className="h-6 w-6 rounded bg-gray-400 dark:bg-gray-600" />
                  </div>
                </div>
                <div className="h-40 w-full rounded-lg bg-gray-300 dark:bg-gray-700 p-4">
                  <div className="h-full rounded bg-gray-400 dark:bg-gray-600 flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-gray-500 dark:bg-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>
      <footer className="jun-footer border-t">
        <div className="container py-8">
          <Footer />
        </div>
      </footer>
    </div>
  );
}

function Header() {
  return (
    <div className="container flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="h-6 w-24 rounded-md bg-gray-300 dark:bg-gray-700" />
        <div className="hidden items-center gap-4 sm:flex">
          <div className="h-4 w-16 rounded-md bg-gray-300 dark:bg-gray-700" />
          <div className="h-4 w-16 rounded-md bg-gray-300 dark:bg-gray-700" />
          <div className="h-4 w-16 rounded-md bg-gray-300 dark:bg-gray-700" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700" />
        <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700" />
      </div>
    </div>
  );
}

function InsetSidebar() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="h-4 w-32 rounded-md bg-gray-300 dark:bg-gray-700" />
        <div className="space-y-3">
          <div className="h-3 w-full rounded-md bg-gray-200 dark:bg-gray-800" />
          <div className="h-3 w-full rounded-md bg-gray-200 dark:bg-gray-800" />
          <div className="h-3 w-full rounded-md bg-gray-200 dark:bg-gray-800" />
          <div className="h-3 w-3/4 rounded-md bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-4 w-32 rounded-md bg-gray-300 dark:bg-gray-700" />
        <div className="space-y-3">
          <div className="h-3 w-full rounded-md bg-gray-200 dark:bg-gray-800" />
          <div className="h-3 w-full rounded-md bg-gray-200 dark:bg-gray-800" />
          <div className="h-3 w-full rounded-md bg-gray-200 dark:bg-gray-800" />
          <div className="h-3 w-2/3 rounded-md bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-4 w-32 rounded-md bg-gray-300 dark:bg-gray-700" />
        <div className="space-y-3">
          <div className="h-3 w-full rounded-md bg-gray-200 dark:bg-gray-800" />
          <div className="h-3 w-full rounded-md bg-gray-200 dark:bg-gray-800" />
          <div className="h-3 w-4/5 rounded-md bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="space-y-8 py-8">
      <div className="space-y-4">
        <div className="h-8 w-3/4 rounded-lg bg-gray-300 dark:bg-gray-700" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded-md bg-gray-200 dark:bg-gray-800" />
          <div className="h-4 w-full rounded-md bg-gray-200 dark:bg-gray-800" />
          <div className="h-4 w-2/3 rounded-md bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="space-y-3 rounded-lg border p-4">
            <div className="h-32 rounded-md bg-gray-200 dark:bg-gray-800" />
            <div className="h-4 w-3/4 rounded-md bg-gray-300 dark:bg-gray-700" />
            <div className="space-y-2">
              <div className="h-3 w-full rounded-md bg-gray-200 dark:bg-gray-800" />
              <div className="h-3 w-full rounded-md bg-gray-200 dark:bg-gray-800" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div>
      <div className="grid gap-8 md:grid-cols-4">
        <div className="md:col-span-2 space-y-4">
          <div className="h-6 w-32 rounded-md bg-gray-300 dark:bg-gray-700" />
          <div className="space-y-2">
            <div className="h-4 w-3/4 rounded-md bg-gray-200 dark:bg-gray-800" />
            <div className="h-4 w-2/3 rounded-md bg-gray-200 dark:bg-gray-800" />
          </div>
          <div className="flex gap-3">
            <div className="h-10 flex-1 rounded-md bg-gray-200 dark:bg-gray-800" />
            <div className="h-10 w-24 rounded-md bg-gray-300 dark:bg-gray-700" />
          </div>
          <div className="h-3 w-48 rounded-md bg-gray-200 dark:bg-gray-800" />
        </div>
        <div className="space-y-4">
          <div className="h-5 w-28 rounded-md bg-gray-300 dark:bg-gray-700" />
          <div className="space-y-3">
            <div className="h-4 w-24 rounded-md bg-gray-200 dark:bg-gray-800" />
            <div className="h-4 w-20 rounded-md bg-gray-200 dark:bg-gray-800" />
            <div className="h-4 w-28 rounded-md bg-gray-200 dark:bg-gray-800" />
            <div className="h-4 w-16 rounded-md bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-5 w-24 rounded-md bg-gray-300 dark:bg-gray-700" />
          <div className="space-y-3">
            <div className="h-4 w-16 rounded-md bg-gray-200 dark:bg-gray-800" />
            <div className="h-4 w-20 rounded-md bg-gray-200 dark:bg-gray-800" />
            <div className="h-4 w-24 rounded-md bg-gray-200 dark:bg-gray-800" />
            <div className="h-4 w-20 rounded-md bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>
      </div>
      <div className="mt-8 flex items-center justify-between pt-8 border-t">
        <div className="space-y-2">
          <div className="h-4 w-32 rounded-md bg-gray-300 dark:bg-gray-700" />
          <div className="h-3 w-48 rounded-md bg-gray-200 dark:bg-gray-800" />
        </div>
        <div className="flex gap-4">
          <div className="h-5 w-5 rounded-md bg-gray-300 dark:bg-gray-700" />
          <div className="h-5 w-5 rounded-md bg-gray-300 dark:bg-gray-700" />
          <div className="h-5 w-5 rounded-md bg-gray-300 dark:bg-gray-700" />
          <div className="h-5 w-5 rounded-md bg-gray-300 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}
