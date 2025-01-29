
import { Client } from 'pg'
import { NextResponse } from 'next/server'
import { drizzle } from 'drizzle-orm/node-postgres';
import { aidata } from '@/db/schema';




export async function GET(req: Request){
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    const db = drizzle(client);
    const allData = await db.select().from(aidata).execute();
    return NextResponse.json(allData)
  }catch(error){
    console.error('error');
  } finally {
    await client.end();
  }
  
}






    
   

    




