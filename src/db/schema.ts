import { pgTable, varchar } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const aidata = pgTable("aidata", {
	userquery: varchar({ length: 1000 }),
	airesponse: varchar({ length: 8000 }),
});
