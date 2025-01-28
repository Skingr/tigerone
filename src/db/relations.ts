import { relations } from "drizzle-orm/relations";
import { users, conversations, messages } from "./schema";

export const conversationsRelations = relations(conversations, ({one, many}) => ({
	user: one(users, {
		fields: [conversations.userId],
		references: [users.userId]
	}),
	messages: many(messages),
}));

export const usersRelations = relations(users, ({many}) => ({
	conversations: many(conversations),
	messages: many(messages),
}));

export const messagesRelations = relations(messages, ({one}) => ({
	conversation: one(conversations, {
		fields: [messages.conversationId],
		references: [conversations.conversationId]
	}),
	user: one(users, {
		fields: [messages.userId],
		references: [users.userId]
	}),
}));