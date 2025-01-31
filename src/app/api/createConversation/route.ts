import { createConversation } from "@/db/queries";
import { NextResponse } from "next/server";
import { Conversation } from "@/sharedTypes/types";

export async function POST(request: Request) {
  try {
    const conversationData: Conversation = await request.json();

    // Validate required fields
    if (!conversationData.title || !conversationData.user_id) {
      return NextResponse.json(
        { error: "Conversation title and user ID are required" },
        { status: 400 }
      );
    }

    const newConversation = await createConversation(conversationData);
    return NextResponse.json(newConversation, { status: 201 });
  } catch (error) {
    console.error("Error creating conversation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}