//first front end file
/**
 * USER INPUT
 * Making requests to a server side endpoint (Next.js api route)
 * Display conversation between user and AI on webpage
 *
 * if PAGE.tsx getting too large break logic out into
 * smaller client components in src/components
 */

"use client"; //Next.js : tell nextjs that this file is client component (front end)

import { MODELS } from "@/utils/chatUtils";
import ChatInput from "@/components/ChatInput";
import Dropdown from "@/components/Dropdown";
import MessageList from "@/components/MessageList";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import useMessages from "@/hooks/useMessages";
import useConversations from "@/hooks/useConversations";
import useUserStore from "@/hooks/store/useUser";
import useDropdown from "@/hooks/useDropdown";

export default function ChatPage() {
  const { selectedConversation } = useConversations();
  const { selectedModel, updateSelectedModel } = useDropdown();
  const {
    messages,
    retrieveMessagesLoading,
    sendMessageLoading,
    sendMessage,
    userInput,
    setUserInput,
  } = useMessages(selectedConversation?.conversation_id || "", selectedModel);
  const { user } = useUserStore();

  return (
    <>
      <AppSidebar />
      <main className="flex flex-col w-full">
        <div className="fixed top-0 flex items-center p-4 bg-background z-50 transition-[margin-left] duration-300 ease-in-out ml-0 data-[sidebar-open=true]:ml-[300px]">
          <SidebarTrigger />
          <Dropdown
            selectedModel={selectedModel}
            updateSelectedModel={updateSelectedModel}
            models={MODELS}
          />
        </div>

        <div className="min-h-screen w-full bg-white pb-24">
          <div className="w-[calc(100%-2rem)] max-w-[48rem] mx-auto lg:w-[calc(100%-280px-2rem)] transition-all duration-300">
            <h1
              className={`text-5xl font-bold text-center my-4 text-cc-gold font-bebas`}
            >
              Tiger One
            </h1>

            <MessageList
              messages={messages}
              isLoading={retrieveMessagesLoading}
            />
            <ChatInput
              userInput={userInput}
              setUserInput={setUserInput}
              loading={sendMessageLoading}
              handleSubmit={sendMessage}
              disabled={!user}
            />
          </div>
        </div>
      </main>
    </>
  );
}
