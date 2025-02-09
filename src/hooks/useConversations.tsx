"use client";
import { Conversation, User } from "@/sharedTypes/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useUserStore from "./store/useUser";
import { useSearchParams } from "next/navigation";

export default function useConversations() {
  const searchParams = useSearchParams();
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const { user } = useUserStore();

  const getConversations = async () => {
    const response = await fetch(
      `/api/getConversations?user_id=${user?.user_id}`
    );
    const data = await response.json();
    return data;
  };

  const createConversation = async (user: User) => {
    try {
      const res = await fetch("api/createConversation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.user_id,
          title: `Conversation_${Date.now()}`,
        }),
      });
      const data = await res.json();
      refetch();
      return data;
    } catch (err: any) {
      console.error(err);
    }
  };

  const {
    data: conversationData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => getConversations(),
    enabled: !!user?.user_id,
  });

  useEffect(() => {
    if (conversationData) {
      setConversations(conversationData);
    }
  }, [conversationData]);

  useEffect(() => {
    const conversationId = searchParams.get("conversation_id");
    if (conversationId && conversations.length > 0) {
      const conversation = conversations.find(
        (conv: Conversation) => conv.conversation_id === conversationId
      );
      console.log(conversation);
      setSelectedConversation(conversation || null);
    } else if (!conversationId && conversations.length > 0) {
      setSelectedConversation(null);
    }
  }, [searchParams, conversations]);

  return {
    conversationsIsLoading: isLoading,
    conversations,
    selectedConversation,
    refetchConversations: refetch,
    createConversation,
  };
}
