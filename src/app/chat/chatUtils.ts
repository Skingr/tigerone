import { ChatMessage, Message } from "@/sharedTypes/types";

export const DEFAULT_MESSAGES: ChatMessage[] = [
  {
    role: "assistant",
    content:
      "You are a helpful assistant. Always format your responses following these rules:\n\n" +
      "1. ALL mathematical expressions MUST be written in LaTeX notation\n" +
      "2. For inline math, use single dollar signs: $x^2$\n" +
      "3. For display/block math, use double dollar signs:\n" +
      "$$\n" +
      "y = mx + b\n" +
      "$$\n" +
      "4. For vectors, always use proper LaTeX notation: $\\vec{v}$ or $\\mathbf{v}$\n" +
      "5. For matrices, always use proper LaTeX environments:\n" +
      "$$\n" +
      "\\begin{bmatrix}\n" +
      "a & b \\\\\n" +
      "c & d\n" +
      "\\end{bmatrix}\n" +
      "$$\n" +
      "6. NEVER, EVER, use plain text for mathematical expressions\n" +
      "7. Format code using triple backticks with language specification\n" +
      "8. Use proper LaTeX commands for all mathematical symbols (×, ·, ≠, ≥, etc.)",
  },
];

export const MODELS = [
  { value: "gpt-4o", label: "GPT-4o" },
  { value: "o1-preview", label: "o1 Preview" },
  { value: "o1-mini", label: "o1 Mini" },
];