import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export default function MetaBusinessExample() {
  return (
    // layout.tsx
    <div className="jun-layout jun-layout-standalone bg-neutral-100">
      <aside className="jun-edgeSidebar jun-edgeSidebar-collapsed-w-[80px] jun-edgeSidebar-permanent-autoCollapse-xl">
        <div className="jun-edgeContent bg-white">Edge content</div>
      </aside>

      {/* /latest/inbox */}
      <main className="jun-content bg-transparent">
        {/* Mini app */}
        <div className="jun-layout jun-layout-standalone bg-transparent">
          <div className="jun-header jun-header-h-[4rem] jun-header-clip-left bg-transparent border-none">
            <div className="p-2">
              <h2>Inbox</h2>
              <span className="text-sm">
                Respond to messages, set up automations and more.
              </span>
            </div>

            <Avatar>JN</Avatar>
          </div>

          <div
            id="chat-list"
            className="jun-edgeSidebar jun-edgeSidebar-collapsed-w-[80px] jun-edgeSidebar-permanent-autoCollapse-xl"
          >
            <div className="jun-edgeContent  bg-transparent">
              <div className="p-2">Chat programs</div>
            </div>
          </div>

          <div className="jun-content pb-4">
            <div className="jun-insetSidebar jun-insetSidebar-absolute jun-insetSidebar-w-[200px] bg-white">
              <div className="jun-insetContent border-r bg-transparent shadow-none">
                <div className="overflow-auto">
                  <div className="h-[2000px] p-2">ChatList</div>
                </div>
              </div>
            </div>
            <div className="bg-white">
              <div className="h-[2000px] p-2">Chat conversation</div>
            </div>
          </div>

          <div
            id="chat-setting"
            className="jun-edgeSidebarR jun-edgeSidebarR-drawer lg:jun-edgeSidebarR-permanent shadow-none"
          >
            <div className="jun-edgeContent bg-transparent">
              <div className="p-4 pb-0 h-full">
                <div className="bg-white h-full border rounded p-4">
                  Chat setting
                </div>
              </div>
            </div>
          </div>

          {/* <div className="jun-footer">
            <div className="jun-insetAvoidingView">
              <div className="p-2">
                <Input placeholder="Type a message" />
              </div>
            </div>
          </div> */}
        </div>
      </main>
    </div>
  );
}
