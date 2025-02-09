"use client";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  LogOut,
  Plus,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { signOut, useSession } from "next-auth/react";
import useConversations from "@/hooks/useConversations";
import Link from "next/link";

export function AppSidebar() {
  const { conversations, conversationsIsLoading, selectedConversation } =
    useConversations();
  const { data: session } = useSession();
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-between">
            <SidebarMenuButton>
              <span className="font-bold">Chat History</span>
            </SidebarMenuButton>
            <Link
              href="/"
              className="ml-auto bg-cc-gold text-white rounded-md p-2"
            >
              <Plus className="w-4 h-4 font-bold" />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Tiger One</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {conversationsIsLoading ? (
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <span>Loading...</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ) : conversations.length === 0 ? (
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <span>No conversations</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ) : (
                conversations.map((conversation) => (
                  <SidebarMenuItem
                    key={conversation.conversation_id}
                    className={`${
                      selectedConversation?.conversation_id ===
                      conversation.conversation_id
                        ? "bg-gray-200"
                        : ""
                    } hover:bg-gray-400 cursor-pointer rounded-md`}
                  >
                    <SidebarMenuButton asChild>
                      <Link
                        href={`?conversation_id=${conversation.conversation_id}`}
                      >
                        <Inbox />
                        <span>{conversation.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="h-20">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="flex items-center gap-3 h-12">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center p-4">
                    {/* You can replace this with an actual avatar image */}
                    <span className="text-sm font-medium">
                      {session?.user?.name?.charAt(0)}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {session?.user?.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {session?.user?.email}
                    </span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem asChild>
                  <a href="#settings" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <button
                    onClick={() =>
                      signOut({
                        callbackUrl: "/auth/login",
                        redirect: true,
                      })
                    }
                    className="flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign out</span>
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
