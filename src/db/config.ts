import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { users, conversations, messages } from "./schema";

//postgres pool for db connection
const pool= new Pool ({
    connectionString:process.env.DATABASE_URL
});
// init drizzle w/ pool
export const db = drizzle(pool, {schema:
    {users,
    conversations,
    messages,
    },
})