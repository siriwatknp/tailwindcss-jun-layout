import { GripVertical, Home, Mail, Settings, Users } from "lucide-react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function StandardDockDemo() {
  const [isDragging, setIsDragging] = useState(false);
  return (
    <div className="w-full max-w-[500px] border-4 rounded bg-background">
      <ResizablePanelGroup
        direction="horizontal"
        className="relative"
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
      >
        <ResizablePanel defaultSize={100}>
          <div className="jun-layout jun-layout-h-[240px] jun-layout-standalone overflow-hidden">
            <nav className="jun-dock">
              <ul className="jun-dockMenu">
                <li className="jun-dockMenuItem">
                  <button className="jun-dockMenuButton">
                    <Home className="size-5" />
                    <span className="jun-dockMenuText">Home</span>
                  </button>
                </li>
                <li className="jun-dockMenuItem">
                  <button className="jun-dockMenuButton">
                    <Users className="size-5" />
                    <span className="jun-dockMenuText">Users</span>
                  </button>
                </li>
                <li className="jun-dockMenuItem">
                  <button className="jun-dockMenuButton">
                    <Mail className="size-5" />
                    <span className="jun-dockMenuText">Mail</span>
                  </button>
                </li>
                <li className="jun-dockMenuItem">
                  <button className="jun-dockMenuButton">
                    <Settings className="size-5" />
                    <span className="jun-dockMenuText">Settings</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
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
            isDragging && "after:bg-muted-foreground",
          )}
        >
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
            <GripVertical
              className={cn(
                "size-3 text-muted-foreground/50",
                "transition-colors",
                "hover:text-muted-foreground",
                isDragging && "text-muted-foreground",
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
