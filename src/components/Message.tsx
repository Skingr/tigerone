import { ChatMessage } from "@/sharedTypes/types";
import MarkdownWithSyntaxHighlighter from "./MarkdownWithSyntaxHighliter";
export default function Message({
  msg,
  index,
}: {
  msg: ChatMessage;
  index: number;
}) {
  return (
    <div key={index} className="px-4 py-2">
      {" "}
      {msg.role === "user" ? (
        <div className="flex justify-end mb-4">
          <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-[85%]">
            <div className="font-medium text-gray-800 mb-1"></div>
            <div className="text-gray-800">
              <MarkdownWithSyntaxHighlighter content={msg.content} />
            </div>
          </div>
        </div>
      ) : (
        // else:
        // Assistant message : = msg.role === 'TIGER' ?
        <div className="mb-4 flex gap-4 items-start">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-cc-gold text-white flex-shrink-0">
            🐯
          </div>
          <div className="bg-white flex-1">
            <div className="text-gray-800">
              <MarkdownWithSyntaxHighlighter content={msg.content} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}