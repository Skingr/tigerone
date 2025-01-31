// write sql queries for DB here
import { eq } from "drizzle-orm";
import { db } from "./config";
import { conversations, messages, users } from "./schema";
import { User, Conversation, Message } from "@/sharedTypes/types";
//CRUD FORMAT
//CREATE, READ, UPDATE, DEALATE
//create USER, createConversation, createMessage

//  CREATEQUERIES
export const createUser = async (user: User) => {
      console.log("Creating new user", user);
      const newUser = await db.insert(users).values(user).returning();
      console.log("New user created", newUser);
      return newUser;
  };
  
  export const createConversation = async (conversation: Conversation) => {
    console.log("Creating conversation", conversation);
    const [newConversation] = await db
      .insert(conversations)
      .values({
        title: conversation.title,
        user_id: conversation.user_id,
      })
      .returning();
    console.log("New conversation created", newConversation);
    return newConversation;
  };
  export const createMessages = async (messagesToCreate: Message[]) => {
    console.log("Creating messages", messagesToCreate);
    const newMessages = await db
      .insert(messages)
      .values(
        messagesToCreate.map((message) => ({
          content: message.content,
          conversation_id: message.conversation_id,
          user_id: message.user_id,
          role: message.role,
          message_id: message.message_id,
        }))
      )
      .returning();
    return newMessages;
  };
  
  //READ QUERIES (GET)
  export const getUser = async (id: number) => {
    const [user] = await db.select().from(users).where(eq(users.user_id, id));
    return user;
  };
  
  export const getConversation = async (id: string) => {
    const conversation = await db
      .select()
      .from(conversations)
      .where(eq(conversations.conversation_id, id));
    return conversation;
  };
  
  export const getMessage = async (id: string) => {
    const message = await db
      .select()
      .from(messages)
      .where(eq(messages.message_id, id));
    return message;
  };
  
  //UPDATE QUERIES
  export const updateUser = async (id: number, user: User) => {
    const updatedUser = await db
      .update(users)
      .set(user)
      .where(eq(users.user_id, id))
      .returning();
    return updatedUser;
  };
  
  export const updateConversation = async (
    id: string,
    conversation: Conversation
  ) => {
    const updatedConversation = await db
      .update(conversations)
      .set({
        ...conversation,
        created_at: new Date(conversation.created_at),
        updated_at: new Date(conversation.updated_at),
      })
      .where(eq(conversations.conversation_id, id))
      .returning();
    return updatedConversation;
  };
  
  export const updateMessage = async (id: string, message: Message) => {
    const updatedMessage = await db
      .update(messages)
      .set({
        content: message.content,
        conversation_id: message.conversation_id,
        user_id: message.user_id,
        role: message.role,
        message_id: message.message_id,
      })
      .where(eq(messages.message_id, id))
      .returning();
    return updatedMessage;
  };
//DELETE QUERIES CRUD
export const deleteUser = async (id: number) => {};

export const deleteConversation = async (id: number) => {};

export const deleteMessage = async (id: number) => {};