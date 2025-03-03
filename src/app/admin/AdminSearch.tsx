export default function AdminSearch({
    userInput,
    setUserInput,
    loading,
  }: {
    userInput: string;
    setUserInput: (input: string) => void;
    loading: boolean;
  }) {
    return (
      <div className="w-full">
        <form
          className="flex gap-2 max-w-[48rem] mx-auto"
        >
          <div className="relative flex-1">
            <input
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-0 focus:border-transparent peer bg-white relative z-10"
              type="text"
              placeholder="Enter Search:"
              value={userInput}
              onChange={(e) => {
                console.log("Input value:", e.target.value); 
                setUserInput(e.target.value);
              }}
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
          
            
        </form>
      </div>
    );
  }