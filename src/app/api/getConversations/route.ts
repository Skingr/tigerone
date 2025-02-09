import { db } from "@/db/config";
import { conversations } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";
// route file to getConversations of users from db
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user_id");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    //get all conversations for the user
    const userConversations = await db
      .select()
      .from(conversations)
      .where(eq(conversations.user_id, Number(userId)))
      .orderBy(desc(conversations.created_at));

    return NextResponse.json(userConversations);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
