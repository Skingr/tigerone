//src/sharedTypes/chat.ts
//file for shared types
//syntax to use shared types: "export default func {sharedTypeName}"
export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

// global for types of models we are offering TODO: add claude, add deepseek, add 3.5 for costless queries?
export type ModelType = "gpt-4o" | "o1-preview" | "o1-mini";

export interface ChatRequest {
  messages: ChatMessage[];
  model: ModelType; // modelTYPES -- 4o,o1,o1mini -- Claude1, claude sonnet? Deeep seek 650b para,m,
}
export interface User {
  user_id: number;
  email: string;
  class_name: string | null;
  major: string | null;
  year: string | null;
  sex: string | null;
  age: number | null;
  username: string;
  hashed_password: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserStore {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export type Email = `${string}@coloradocollege.edu`;

export interface Conversation {
  conversation_id: string;
  user_id: number;
  title: string;
  created_at: string;
  updated_at: string;
}
export type MessageRole = "system" | "user" | "assistant";

export interface Message {
  message_id: string;
  content: string;
  conversation_id: string;
  user_id: number;
  role: MessageRole;
  model: Model;
  created_at?: string; // ? optional | ideally have typoe for pulling and pushing data to db, timestamps stored by pg
  updated_at?: string;
}
// //new type for
// export type

export enum Models {
  GPT_4O = "gpt-4o",
  O1_PREVIEW = "o1-preview",
  O1_MINI = "o1-mini",
}

export type Model = (typeof Models)[keyof typeof Models];
