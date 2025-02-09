import { ChatMessage, Message, User, Models, Model } from "@/sharedTypes/types";
import { DEFAULT_MESSAGES } from "@/utils/chatUtils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useConversations from "./useConversations";
import useUserStore from "./store/useUser";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const useMessages = (conversationId: string, model: Model) => {
  const [messages, setMessages] = useState<ChatMessage[]>(DEFAULT_MESSAGES);
  const [userInput, setUserInput] = useState("");
  const [sendMessageLoading, setSendMessageLoading] = useState(false);
  const { user } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { createConversation, selectedConversation } = useConversations();
  const queryClient = useQueryClient();

  const getMessages = async (): Promise<Message[]> => {
    const response = await fetch(
      `/api/getMessages?conversation_id=${conversationId}`
    );
    const data = await response.json();
    return data;
  };

  const createMessages = async (messages: Message[]) => {
    if (!user) throw new Error("User is not logged in");
    try {
      await fetch("/api/createMessages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messages),
      });
    } catch (err: any) {
      console.error(err);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    // what runs when you click button
    e.preventDefault(); //if you remove and you click send page will refresh

    //if no user input and no user return
    if (!userInput.trim()) return;
    if (!user) return;
    const userMessage: ChatMessage = {
      role: "user",
      content: userInput,
    };

    // ADD USER MSG TO LOCAL STATE
    const newMessages: ChatMessage[] = [...messages, userMessage];

    setMessages(newMessages);

    setUserInput(""); // clear user inpit on submit
    setSendMessageLoading(true); // start loading msg

    // CALL api route (api/chat/route.ts)
    try {
      const res = await fetch("api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, model }),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }
      // tempMessage function to give empty string to start STREAMING msgs - will help 4o feel as fast as on chatgpt.com
      const tempMessage: ChatMessage = {
        role: "assistant",
        content: "",
      };
      setMessages([...newMessages, tempMessage]);

      const reader = res.body?.getReader();
      if (!reader) return;

      //read assistant msg in stream from api route
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // decode uint array to readable string
        const text = new TextDecoder().decode(value);

        //update the tempMsg  w/ assistant payload
        tempMessage.content += text;
        setMessages([...newMessages, { ...tempMessage }]);
      }
      let conversationId;
      if (!selectedConversation) {
        const newConversation = await createConversation(user);
        conversationId = newConversation.conversation_id;
      } else {
        conversationId = selectedConversation.conversation_id;
      }

      const messagesToSave = [
        {
          ...userMessage,
          conversation_id: conversationId,
          user_id: user.user_id,
          message_id: crypto.randomUUID(),
          model,
        },
        {
          ...tempMessage,
          conversation_id: conversationId,
          user_id: user.user_id,
          model,
          message_id: crypto.randomUUID(),
        },
      ];

      // Store assistant message in the database
      await createMessages(messagesToSave);

      // Invalidate and refetch messages query
      queryClient.invalidateQueries({ queryKey: ["messages", conversationId] });

      // Update URL after messages are saved and cache is updated
      if (!selectedConversation) {
        const params = new URLSearchParams(searchParams);
        params.set("conversation_id", conversationId);
        setTimeout(() => {
          router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        }, 0);
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setSendMessageLoading(false);
    }
  };

  const { data, isLoading: retrieveMessagesLoading } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => getMessages(),
    enabled: !!conversationId,
  });

  useEffect(() => {
    if (data && conversationId) {
      console.log("data", data);
      setMessages([...DEFAULT_MESSAGES, ...data]);
    } else if (!conversationId) {
      setMessages([...DEFAULT_MESSAGES]);
    }
  }, [data, conversationId]);

  return {
    messages,
    retrieveMessagesLoading,
    sendMessageLoading,
    sendMessage,
    userInput,
    setUserInput,
  };
};

export default useMessages;
