import {
  ArrowRightCircleIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/24/outline";

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
    <div className="w-full sm:w-[720px] min-w-[300px] max-h-full fixed bottom-0 mb-10 bg-white border border-gray-200 shadow-lg py-4 px-2 rounded-lg ml-8">
      <div className="w-[calc(100%-2rem)] max-w-[48rem] mx-auto transition-all duration-300">
        <form onSubmit={handleSubmit} className="flex gap-2 w-full">
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
            className="bg-cc-gold text-white px-4 py-2 rounded-full hover:opacity-80"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              "Thinking..."
            ) : (
              <ArrowRightCircleIcon className="w-6 h-6" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
