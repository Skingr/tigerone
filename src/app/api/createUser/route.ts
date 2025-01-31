import { createUser } from "@/db/queries";
import { NextResponse } from "next/server";
import { User } from "@/sharedTypes/types";

export async function POST(request: Request) {
  try {
    const userData: User = await request.json();

    if (!userData) {
      return NextResponse.json(
        { error: "User data is required" },
        { status: 400 }
      );
    }

    const newUser = await createUser(userData);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}