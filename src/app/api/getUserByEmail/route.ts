import { getUser, getUserByEmail } from "@/db/queries";
import { Email, User } from "@/sharedTypes/types";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      console.log("No email");
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await getUserByEmail(email as Email);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
