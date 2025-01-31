DROP INDEX "idx_messages_conversation_id";--> statement-breakpoint
ALTER TABLE "conversations" ALTER COLUMN "created_at" SET DEFAULT NOW();--> statement-breakpoint
ALTER TABLE "conversations" ALTER COLUMN "updated_at" SET DEFAULT NOW();--> statement-breakpoint
ALTER TABLE "user_sessions" ALTER COLUMN "created_at" SET DEFAULT NOW();--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT NOW();--> statement-breakpoint
CREATE INDEX "idx_messages_conversation_id" ON "messages" USING btree ("conversation_id");