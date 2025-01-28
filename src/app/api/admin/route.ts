
import { Client } from 'pg'
import 'tsconfig-paths/register.js';

import { drizzle } from 'drizzle-orm/node-postgres';
import { aidata } from '@/db/schema';

async function retrieve(){
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  try {
    await client.connect();
    const db = drizzle(client);
    const allData = await db.select().from(aidata).execute();
    console.log('All Data:', allData);
  }catch(error){
    console.error('error');
  } finally {
    await client.end();
  }
  
}

retrieve();



    
   

    




