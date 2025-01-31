import { createMessages } from "@/db/queries";
import { NextResponse } from "next/server";
import { Message } from "@/sharedTypes/types";

export async function POST(request: Request) {
  try {
    const messageData: Message[] = await request.json();
    console.log("databbbbb", messageData);

    if (!Array.isArray(messageData)) {
      return NextResponse.json(
        { error: "Request body must be an array of messages" },
        { status: 400 }
      );
    }

    for (const message of messageData) {
      if (
        !message.content ||
        !message.conversation_id ||
        !message.user_id ||
        !message.role
      ) {
        return NextResponse.json(
          {
            error:
              "Each message must have content, conversation ID, user ID and role",
          },
          { status: 400 }
        );
      }
    }

    const newMessages = await createMessages(messageData);
    return NextResponse.json(newMessages, { status: 201 });
  } catch (error) {
    console.error("Error creating messages:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}