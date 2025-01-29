//src/sharedTypes/chat.ts
//file for shared types 
//syntax to use shared types: "export default func {sharedTypeName}"
export type ChatMessage = {
    role: 'system' | 'user' | 'assistant'
    content: string
    class: string
}

// global for types of models we are offering TODO: add claude, add deepseek, add 3.5 for costless queries? 
export type ModelType = 'gpt-4o' | 'o1-preview' | 'o1-mini';

export interface ChatRequest {
    messages: ChatMessage[]
    model: ModelType  // modelTYPES -- 4o,o1,o1mini -- Claude1, claude sonnet? Deeep seek 650b para,m
}