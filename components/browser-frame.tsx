"use client";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useState } from "react";

interface BrowserFrameProps {
  url: React.ReactNode;
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function BrowserFrame({
  url,
  title,
  children,
  className,
}: BrowserFrameProps) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className={cn("rounded-lg border bg-background shadow-md", className)}>
      <div className="border-b px-4 py-3">
        <div className="flex items-center">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <div className="size-3 rounded-full bg-red-500" />
              <div className="size-3 rounded-full bg-yellow-500" />
              <div className="size-3 rounded-full bg-green-500" />
            </div>
            {title}
          </div>
          <div className="ml-auto flex items-center rounded-md bg-muted px-3 py-1 text-sm text-muted-foreground hover:bg-muted/80">
            {url}
          </div>
        </div>
      </div>

      <ResizablePanelGroup
        direction="horizontal"
        className="relative"
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
      >
        <ResizablePanel defaultSize={100} minSize={30} maxSize={100}>
          <div className="h-[calc(70vh-3.25rem)] min-h-[500px]">{children}</div>
        </ResizablePanel>
        <ResizableHandle
          className={cn(
            "relative w-8 transition-colors",
            "bg-muted/20 hover:bg-muted/40",
            isDragging && "bg-muted/60",
            isDragging && "ring-2 ring-primary/20",
            "after:absolute after:right-2 after:top-1/2 after:-translate-y-1/2",
            "after:h-20 after:w-1 after:rounded-full",
            "after:bg-muted-foreground/30",
            "hover:after:bg-muted-foreground/50",
            isDragging && "after:bg-muted-foreground"
          )}
        >
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
            <GripVertical
              className={cn(
                "size-3 text-muted-foreground/50",
                "transition-colors",
                "hover:text-muted-foreground",
                isDragging && "text-muted-foreground"
              )}
            />
          </div>
        </ResizableHandle>
        <ResizablePanel defaultSize={0}>
          <div className="invisible h-full w-full" />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
