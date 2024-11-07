import { fontSans } from "@/lib/fonts";
import { absoluteUrl, constructMetadata } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@/components/analytics";
import { ThemeProvider } from "@/components/theme-provider";

import "@/styles/globals.css";
import "@/styles/mdx.css";

import type { Viewport } from "next";
import { Metadata } from "next";

export const metadata: Metadata = constructMetadata({
  title: "Jun Layout - Tailwind CSS",
  description:
    "A powerful Tailwind CSS plugin for building dynamic layouts with ease",
  image: absoluteUrl("/og"),
});

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${fontSans.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider>
            {children}
            <Toaster />
            <Analytics />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
