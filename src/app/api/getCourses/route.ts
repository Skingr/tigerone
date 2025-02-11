import { users } from "@/db/schema";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { NextResponse } from "next/server";
import { Client } from "pg";

export async function GET() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    const db = drizzle(client)
    //console.log('drizzle connected')
    const courseNames = await db.select({userClass: users.class_name}).from(users).where(sql`${users.class_name} IS NOT NULL`).groupBy(users.class_name).execute()
   // console.log(courseNames)  
    return NextResponse.json(courseNames);
    
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
