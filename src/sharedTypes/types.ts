//src/sharedTypes/chat.ts
//file for shared types 
//syntax to use shared types: "export default func {sharedTypeName}"
export type ChatMessage = {
    role: 'system' | 'user' | 'assistant'
    content: string
    class: string
}
export interface ChatRequest {
    messages: ChatMessage[]
  }