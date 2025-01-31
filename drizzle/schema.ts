import { pgTable, unique, bigserial, varchar, timestamp, integer, foreignKey, text, inet, uuid, index } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	userId: bigserial("user_id", { mode: "bigint" }).primaryKey().notNull(),
	email: varchar({ length: 255 }).notNull(),
	username: varchar({ length: 50 }).notNull(),
	hashedPassword: varchar("hashed_password", { length: 255 }).notNull(),
	role: varchar({ length: 20 }).default('USER').notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	className: varchar("class_name", { length: 255 }),
	major: varchar({ length: 255 }),
	year: varchar({ length: 255 }),
	sex: varchar({ length: 255 }),
	age: integer(),
}, (table) => [
	unique("users_email_unique").on(table.email),
	unique("users_username_unique").on(table.username),
]);

export const userSessions = pgTable("user_sessions", {
	sessionId: bigserial("session_id", { mode: "bigint" }).primaryKey().notNull(),
	userId: bigserial("user_id", { mode: "bigint" }).notNull(),
	refreshToken: text("refresh_token"),
	ipAddress: inet("ip_address"),
	userAgent: text("user_agent"),
	deviceInfo: text("device_info"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.userId],
			name: "user_sessions_user_id_users_user_id_fk"
		}).onDelete("cascade"),
]);

export const conversations = pgTable("conversations", {
	conversationId: uuid("conversation_id").defaultRandom().primaryKey().notNull(),
	userId: bigserial("user_id", { mode: "bigint" }).notNull(),
	title: varchar({ length: 255 }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.userId],
			name: "conversations_user_id_users_user_id_fk"
		}).onDelete("cascade"),
]);

export const messages = pgTable("messages", {
	messageId: uuid("message_id").defaultRandom().primaryKey().notNull(),
	conversationId: uuid("conversation_id").notNull(),
	userId: bigserial("user_id", { mode: "bigint" }).notNull(),
	role: varchar({ length: 20 }).notNull(),
	content: text().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_messages_conversation_id").using("btree", table.conversationId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.conversationId],
			foreignColumns: [conversations.conversationId],
			name: "messages_conversation_id_conversations_conversation_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.userId],
			name: "messages_user_id_users_user_id_fk"
		}).onDelete("set null"),
]);
