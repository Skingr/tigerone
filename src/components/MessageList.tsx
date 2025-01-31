import { ChatMessage } from "@/sharedTypes/types";
import Message from "./Message";
export default function MessageList({ messages }: { messages: ChatMessage[] }) {
  return (
    <div className="w-full sm:w-[720px] min-w-[300px] mx-auto overflow-y-auto max-h-full mb-20">
      {messages
        .filter((m) => m.role !== "system") // optional :::(hides system in the ui)//bg-cc-gold/20
        .slice(1) // optional :::(hides system in the ui)//bg-cc-gold/20
        .map((msg, index) => (
          <Message key={index} msg={msg} index={index} />
        ))}
    </div>
  );
}