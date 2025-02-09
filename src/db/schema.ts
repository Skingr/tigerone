// import { pgTable, varchar } from "drizzle-orm/pg-core"
// import { sql } from "drizzle-orm"
import {
  pgTable,
  varchar,
  bigserial,
  timestamp,
  text,
  inet,
  index,
  integer,
  uuid,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { Models } from "@/sharedTypes/types";

/*want conversations, messages, user_sessions schema
conv: user_id (aut req), conversation_id (aut + history page) , time stamp(CREATED_AT,UPDATED_AT), title of conversation
messages-msg_id , conversation id, user id, role: user, assistant, content = text payload, created_at timestamp, updated at timestamp
//user sessions (need auth to properly populate): session_id: unique number to id each new session , userid stores users unique id, 
// refresh_token: help keep users logged in over long period, needs extra security, store hashed/encrypt, ip_add : store IP for security, detect unusual activity, user_agent string pulled from browser for browser data-help debug issues, device_info stores device metadata 
//USERSESS: TIMESTAMPS: created_at : when user logs in create timestamp and expired at if too much time has passed require reauth // if project scales will need to clear out old session data etc 
//USER : user_id: store unique userid use in messages, conv, user_Ses - email : store email address of user- maybe abstracted and not cionnected to user_id | username / hasehd pass dpeending on canvas auth | could allow users to make their own usernames
*/

//USERS table
export const users = pgTable("users", {
  user_id: bigserial("user_id", { mode: "number" }).primaryKey(),
  email: varchar({ length: 255 }).unique().notNull(),
  class_name: varchar({ length: 255 }),
  major: varchar({ length: 255 }),
  year: varchar({ length: 255 }),
  sex: varchar({ length: 255 }),
  age: integer(),
  username: varchar({ length: 50 }).unique().notNull(),
  hashed_password: varchar({ length: 255 }).notNull(),
  role: varchar({ length: 20 }).notNull().default("USER"),
  created_at: timestamp({ precision: 6 })
    .notNull()
    .default(sql`NOW()`),
  updated_at: timestamp()
    .notNull()
    .default(sql`NOW()`),
});

//CONVERSATIONS
export const conversations = pgTable("conversations", {
  conversation_id: uuid("conversation_id").primaryKey().defaultRandom(),
  user_id: bigserial("user_id", { mode: "number" })
    .notNull()
    .references(() => users.user_id, { onDelete: "cascade" }),
  title: varchar({ length: 255 }),
  created_at: timestamp()
    .notNull()
    .default(sql`NOW()`),
  updated_at: timestamp()
    .notNull()
    .default(sql`NOW()`),
});
//MESSAGES
export const messages = pgTable(
  "messages",
  {
    message_id: uuid("message_id").primaryKey().defaultRandom(),
    conversation_id: uuid("conversation_id")
      .notNull()
      .references(() => conversations.conversation_id, { onDelete: "cascade" }),
    user_id: bigserial("user_id", { mode: "number" }).references(
      () => users.user_id,
      { onDelete: "set null" }
    ),
    role: varchar("role", { length: 20 }).notNull(),
    content: text("content").notNull(),
    model: varchar("model", { length: 20 }).notNull().default(Models.GPT_4O),
    created_at: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updated_at: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => {
    return {
      conversation_id_idx: index("idx_messages_conversation_id").on(
        table.conversation_id
      ),
    };
  }
);
//USER SESSIONS
export const user_sessions = pgTable("user_sessions", {
  session_id: bigserial("session_id", { mode: "number" }).primaryKey(),
  user_id: bigserial("user_id", { mode: "number" })
    .notNull()
    .references(() => users.user_id, { onDelete: "cascade" }),
  refresh_token: text(),
  ip_address: inet(),
  user_agent: text(),
  device_info: text(),
  created_at: timestamp()
    .notNull()
    .default(sql`NOW()`),
  expires_at: timestamp(),
});
// export const aidata = pgTable("aidata", {
// 	userquery: varchar({ length: 1000 }),
// 	airesponse: varchar({ length: 8000 }),
// 	userclass: varchar({ length: 255}),
// });
