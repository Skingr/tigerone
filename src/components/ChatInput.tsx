export default function ChatInput({
  userInput,
  setUserInput,
  loading,
  handleSubmit,
  disabled,
}: {
  userInput: string;
  setUserInput: (input: string) => void;
  loading: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  disabled: boolean;
}) {
  return (
    <div className="border-t p-4 w-full mx-auto fixed bottom-0 left-0 right-0 bg-white">
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 max-w-[48rem] mx-auto"
      >
        <div className="relative flex-1">
          <input
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-0 focus:border-transparent peer bg-white relative z-10"
            type="text"
            placeholder="Ask tiger. . ."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={loading || disabled}
          />
          <div
            className="absolute inset-0 rounded-lg bg-gradient-to-r from-cc-gold via-yellow-400 to-cc-gold opacity-0 peer-focus:opacity-60 transition-opacity duration-300 -z-10 blur-[1px] peer-focus:animate-gradient-once"
            style={{ padding: "2px", backgroundSize: "200% 200%" }}
          >
            <div className="h-full w-full bg-white rounded-lg" />
          </div>
          <div
            className="absolute inset-0 rounded-lg bg-gradient-to-r from-cc-gold via-yellow-400 to-cc-gold opacity-0 peer-focus:opacity-40 transition-opacity duration-300 -z-20 blur-[4px] peer-focus:animate-gradient-once"
            style={{ padding: "3px", backgroundSize: "200% 200%" }}
          >
            <div className="h-full w-full bg-white rounded-lg" />
          </div>
        </div>
        <button
          className=" bg-cc-gold text-white px-4 py-2 rounded hover:opacity-80" // text-black px-4 py-2 rounded"
          type="submit"
          disabled={loading}
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </form>
    </div>
  );
}

//   return (
//     <div className="border-t p-4 w-full mx-auto fixed bottom-0 left-0 right-0 bg-white">
//       <form
//         onSubmit={handleSubmit}
//         className="flex gap-2 max-w-[48rem] mx-auto"
//       >
//         <input
//           className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cc-gold"
//           type="text"
//           placeholder="Ask tiger. . ."
//           value={userInput}
//           onChange={(e) => setUserInput(e.target.value)}
//           disabled={loading || loading}
//         />
//         <button
//           className=" bg-cc-gold text-white px-4 py-2 rounded hover:opacity-80" // text-black px-4 py-2 rounded"
//           type="submit"
//           disabled={loading}
//         >
//           {loading ? "Thinking..." : "Send"}
//         </button>
//       </form>
//     </div>
//   );
// }