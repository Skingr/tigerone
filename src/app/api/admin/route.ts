
import { Client } from 'pg'
import { NextResponse } from 'next/server'
import { drizzle } from 'drizzle-orm/node-postgres';
import { messages, users } from '@/db/schema';
import { eq } from "drizzle-orm";


export async function GET(req: Request){
  const { searchParams } = new URL(req.url);
  const selectedClass = searchParams.get('selectedClass');
  //console.log(selectedClass)
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  if(selectedClass){
    try {
      await client.connect();
      const db = drizzle(client);
      const allData = await db.select({
        role: messages.role,
        messageContent: messages.content,
        userClass: users.class_name,
        createdAt: messages.created_at,
        userYear: users.year,
        userMajor: users.major,
      }).from(messages)
      .innerJoin(users, eq(messages.user_id, users.user_id))
      .where(eq(users.class_name, selectedClass)) 
      .orderBy(messages.created_at) 
      .execute();

    

      //console.log(allData)
      return NextResponse.json(allData)
    }catch(error){
      console.error('error pulling data');
    } finally {
      await client.end();
    }
  }
}






    
   

    




