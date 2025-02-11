import { ChatMessage } from "@/sharedTypes/types";
import Message from "./Message";
import { Loader2 } from "lucide-react";
export default function MessageList({
  messages,
  isLoading,
}: {
  messages: ChatMessage[];
  isLoading: boolean;
}) {
  return (
    <div className="w-full sm:w-[720px] min-w-[300px] mx-auto overflow-y-auto max-h-full mb-20">
      {isLoading ? (
        <div className="flex justify-center items-center h-full mt-40">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-cc-gold rounded-full animate-spin" />
        </div>
      ) : (
        messages
          .filter((m) => m.role !== "system")
          .slice(1)
          .map((msg, index) => <Message key={index} msg={msg} index={index} />)
      )}
    </div>
  );
}
