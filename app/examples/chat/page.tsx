"use client";
import {
  triggerEdgeDrawer,
  triggerEdgeDrawerRight,
  triggerEdgeCollapseRight,
} from "@/packages/tailwindcss-jun-layout";
import { Menu, MoreVertical, X, SidebarOpen } from "lucide-react";
import { useState } from "react";

export default function ChatExample() {
  const [selectedConversation, setSelectedConversation] = useState(1);

  return (
    <div className="jun-layout jun-layout-standalone">
      <header className="jun-header">
        <Header
          mobileNavTrigger={
            <button
              className="jun-edgeDrawerTrigger"
              onClick={() => triggerEdgeDrawer()}
            >
              <Menu />
            </button>
          }
        />
      </header>
      <main className="jun-content">
        <ChatArea
          moreButton={
            <>
              <button
                className="jun-edgeDrawerTrigger jun-edgeDrawerTriggerR rounded-full p-2"
                onClick={() => triggerEdgeDrawerRight()}
              >
                <MoreVertical />
              </button>
              <button
                className="jun-edgeCollapseTrigger jun-edgeCollapseTriggerR rounded-full p-2"
                onClick={(event) => triggerEdgeCollapseRight({ event })}
              >
                <MoreVertical className="jun-edgeCollapsed-visible" />
                <SidebarOpen className="jun-edgeUncollapsed-visible" />
              </button>
            </>
          }
        />
      </main>
      <div
        id="right-sidebar"
        className="jun-edgeSidebar jun-edgeSidebarR jun-edgeSidebarR-drawer jun-edgeSidebarR-w-[100%] md:jun-edgeSidebarR-permanent md:jun-edgeSidebarR-permanent-hidden md:jun-edgeSidebarR-w-[300px] xl:jun-edgeSidebarR-w-[400px] xl:jun-edgeSidebarR-permanent-visible jun-edgeSidebarR-permanent-autoCollapse-xl"
      >
        <div className="jun-edgeContent">
          <ChatSettings
            mobileClose={
              <button
                className="jun-edgeDrawerTrigger md:hidden"
                onClick={() => triggerEdgeDrawerRight()}
              >
                <X />
              </button>
            }
          />
        </div>
      </div>
      <div
        id="left-sidebar"
        className="jun-edgeSidebar jun-edgeSidebar-drawer jun-edgeSidebar-w-[370px] md:jun-edgeSidebar-permanent md:jun-edgeSidebar-collapsed-w-[88px] jun-edgeSidebar-permanent-autoCollapse-lg lg:jun-edgeSidebar-w-[288px] xl:jun-edgeSidebar-w-[360px]"
      >
        <div className="jun-edgeContent bg-white dark:bg-gray-900">
          <ConversationsList
            conversations={Array.from({ length: 100 }, (_, i) => ({
              id: i + 1,
              name: "",
              avatar: "",
              lastMessage: "",
              timestamp: "",
              unread: i % 5 === 0 ? Math.floor(i / 20) + 1 : undefined,
              isOnline: i % 3 === 0,
            }))}
            selectedId={selectedConversation}
            onSelect={setSelectedConversation}
          />
        </div>
      </div>
      <footer className="jun-footer">
        <div className="flex w-full gap-2 bg-white dark:bg-gray-900 p-4">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 rounded-lg border dark:border-gray-700 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
          />
          <button className="inline-flex items-center rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            <span className="inline-block h-4 w-10 rounded bg-white/20 dark:bg-white/30" />
          </button>
        </div>
      </footer>
    </div>
  );
}

interface Message {
  id: number;
  content: string;
  sender: string;
  timestamp: string;
}

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread?: number;
  isOnline: boolean;
}

const Header = ({
  mobileNavTrigger,
}: {
  mobileNavTrigger: React.ReactNode;
}) => (
  <div className="flex h-full items-center justify-between px-4">
    <div className="flex items-center space-x-3">
      {mobileNavTrigger}
      <div className="h-6 w-24 rounded bg-gray-200 dark:bg-gray-700" />
    </div>
  </div>
);

const ConversationItem = ({
  conversation,
  isSelected,
  onClick,
}: {
  conversation: Conversation;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`jun-sidebarMenuButton jun-sidebarMenuButton-h-[72px] relative flex w-full items-center rounded-lg p-3 ${
      isSelected ? "bg-gray-100 dark:bg-gray-800" : ""
    }`}
  >
    <div className="relative">
      <div className="jun-sidebarIcon h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700" />
      {conversation.isOnline && (
        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-gray-900 bg-green-500" />
      )}
    </div>
    <div className="jun-sidebarText">
      <div>
        <div className="flex justify-between">
          <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-12 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="mt-1 h-4 w-32 rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
    {conversation.unread && (
      <div className="absolute bottom-1 right-1 h-5 w-5 rounded-full bg-blue-500" />
    )}
  </button>
);

const ConversationsList = ({
  conversations,
  selectedId,
  onSelect,
}: {
  conversations: Conversation[];
  selectedId: number;
  onSelect: (id: number) => void;
}) => (
  <div className="flex h-full flex-col">
    <div className="p-4">
      <div className="h-10 w-full rounded-full bg-gray-200 dark:bg-gray-700" />
    </div>
    <div className="jun-sidebarMenu min-h-0 flex-1 space-y-2 overflow-y-auto p-2">
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          isSelected={selectedId === conversation.id}
          onClick={() => onSelect(conversation.id)}
        />
      ))}
    </div>
  </div>
);

const ChatMessage = ({ message }: { message: Message }) => (
  <div
    className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
  >
    <div
      className={`max-w-[70%] rounded-2xl px-4 py-2 ${
        message.sender === "me" ? "bg-blue-500" : "bg-gray-200 dark:bg-gray-700"
      }`}
    >
      <div
        className={`h-4 w-32 rounded ${message.sender === "me" ? "bg-blue-400/50" : "bg-gray-300 dark:bg-gray-600"}`}
      />
      <div
        className={`mt-1 h-3 w-16 rounded ${message.sender === "me" ? "bg-blue-400/50" : "bg-gray-300 dark:bg-gray-600"}`}
      />
    </div>
  </div>
);

const ChatArea = ({ moreButton }: { moreButton: React.ReactNode }) => {
  const messages = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    content: "",
    sender: i % 2 === 0 ? "me" : "other",
    timestamp: "",
  }));

  return (
    <div className="flex h-full flex-col">
      <div className="border-b dark:border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="space-y-1">
              <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-3 w-16 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
          {moreButton}
        </div>
      </div>
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
};

const ChatSettings = ({ mobileClose }: { mobileClose: React.ReactNode }) => {
  const sections = [
    {
      title: "Profile",
      content: (
        <div className="text-center">
          <div className="mx-auto h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="mt-2 h-6 w-32 mx-auto rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mt-1 h-4 w-24 mx-auto rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      ),
    },
    {
      title: "Quick Actions",
      content: (
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="flex flex-col items-center space-y-2">
              <div className="h-12 w-12 rounded-lg bg-gray-200 dark:bg-gray-700" />
              <div className="h-3 w-12 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Shared Media",
      content: (
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 9 }, (_, i) => (
            <div
              key={i}
              className="aspect-square rounded-lg bg-gray-200 dark:bg-gray-700"
            />
          ))}
        </div>
      ),
    },
    {
      title: "Settings",
      content: (
        <div className="space-y-3">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg bg-gray-200 dark:bg-gray-700 p-3"
            >
              <div className="h-5 w-24 rounded bg-gray-300 dark:bg-gray-600" />
              <div className="h-5 w-12 rounded bg-gray-300 dark:bg-gray-600" />
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="flex h-full flex-col bg-white dark:bg-gray-900">
      <div className="border-b dark:border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="h-6 w-24 rounded bg-gray-200 dark:bg-gray-700" />
          {mobileClose}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="space-y-4">
            <div className="h-5 w-32 rounded bg-gray-200 dark:bg-gray-700" />
            {section.content}
          </div>
        ))}
      </div>
    </div>
  );
};
