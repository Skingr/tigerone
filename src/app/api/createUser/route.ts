import { NextResponse } from "next/server";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";
import { sql } from "drizzle-orm";
import { db } from "@/db/config";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, email, class_name, major, year, sex, age } = body;

    //validate required fields
    if (!username || !email) {
      return NextResponse.json(
        { error: "Username and email are required" },
        { status: 400 }
      );
    }

    //check if username or email already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(sql`username = ${username} OR email = ${email}`);
    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "Username or email already exists" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(email, salt);

    const newUser = await db
      .insert(users)
      .values({
        username,
        email,
        hashed_password: hashedPassword,
        class_name: class_name || null,
        major: major || null,
        year: year || null,
        sex: sex || null,
        age: age || null,
        role: "USER",
      })
      .returning();

    const { hashed_password: _, ...userWithoutPassword } = newUser[0];

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
