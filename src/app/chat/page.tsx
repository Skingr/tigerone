//first front end file
/**
 * USER INPUT
 * Making requests to a server side endpoint (Next.js api route)
 * Display conversation between user and AI on webpage
 *
 * if PAGE.tsx getting too large break logic out into
 * smaller client components in src/components
 */

"use client"; //Next.js : tell nextjs that this file is client component (front end)

//useState<ChatMessage[]>(...) == makes sure type script knows its an arr of ChatMessage objects

import { useEffect, useState } from "react"; // useState hook from React for state management
import { ChatMessage, User, Conversation, Message } from "@/sharedTypes/types";
import { DEFAULT_MESSAGES, MODELS } from "./chatUtils";
import ChatInput from "@/components/ChatInput";
import Dropdown from "@/components/Dropdown";
import MessageList from "@/components/MessageList";
import { Bebas_Neue } from "next/font/google";

//try fonts 
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400", // weight is font thicknes, 
});

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(DEFAULT_MESSAGES);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [modelDropdown, setModelDropdown] = useState("gpt-4o"); // default to 4o when website loads
  //TODO: move state to context (global state)
  const [user, setUser] = useState<User | null>(null);
  const [conversation, setConversation] = useState<Conversation | null>(null);


// create conversation to store messages in db - post req to db
  const createConversation = async (user: User) => { // track user id and connect to conversation in db
    console.log(user)
    try{// try catch
      
      const res = await fetch("api/createConversation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
        user_id: user.user_id,  
        title : `Conversation_$(Date.now())`, //
        }),
        
      });
      const data = await res.json()
      console.log(data)
      return data;
    } catch (err: any) {
      console.error(err)
    }
  }
  // postreq -> db -> populate db with message - called when user submits query ` 
  const createMessages = async (messages: Message[]) => { 
    if (!user) throw new Error("User is not logged in");
    try {
      await fetch("/api/createMessages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messages),
      });
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // what runs when you click button
    e.preventDefault(); //if you remove and you click send page will refresh

    //if no user input and no user return 
    if (!userInput.trim()) return; 
    if (!user) return;
    const userMessage: ChatMessage = {
      role: "user",
      content: userInput,
      
    };

    // ADD USER MSG TO LOCAL STATE
    const newMessages: ChatMessage[] = [
      ...messages, 
      userMessage, ];

    setUserInput(""); // clear user inpit on submit
    setLoading(true); // start loading msg

    // CALL api route (api/chat/route.ts)
    try {
      const res = await fetch("api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, model: modelDropdown }), 
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }
      // tempMessage function to give empty string to start STREAMING msgs - will help 4o feel as fast as on chatgpt.com 
      const tempMessage: ChatMessage = {
        role: "assistant",
        content: "",
   
      };
      setMessages([...newMessages, tempMessage]);

      const reader = res.body?.getReader();
      if (!reader) return;



      //read assistant msg in stream from api route
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // decode uint array to readable string
        const text = new TextDecoder().decode(value);

        //update the tempMsg  w/ assistant payload 
        tempMessage.content += text;
        setMessages([...newMessages, { ...tempMessage }]);
      }
      let conversationId;
      if (!conversation) {
        const newConversation = await createConversation(user);
        setConversation(newConversation);
        conversationId = newConversation.conversation_id;
      } else {
        conversationId = conversation.conversation_id;
      }

      const messagesToStore = [
        {
          ...userMessage,
          conversation_id: conversationId,
          user_id: user.user_id,
          message_id: crypto.randomUUID(),
        },
        {
          ...tempMessage,
          conversation_id: conversationId,
          user_id: user.user_id,
          message_id: crypto.randomUUID(),
        },
      ];

      // Store assistant message in the database
      await createMessages(messagesToStore);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const getUser = async () => {
    try {
      const res = await fetch("api/getUser?id=12345") // leaving this hard coded for testing but normally user ?id= would be dynamic
      const data = await res.json()
      setUser(data)
      console.log(data)
    } catch (err: any) {
      console.error(err)
    }
  };
  useEffect(() => { // runs everytime page renders / loads
    //https://gyazo.com/120c03b585852cb267fd8cbd8d5e4555
    console.log("page loaded")
    console.log(userInput)
    //test in console-if userinput updates this funciton runs everytime, keystrokes tracked
  }, [userInput]);

  useEffect(() => { // runs everytime page renders / loads / some action occurs
    // call get user api route getUser/route.ts
    if (!user) {
      getUser() //default to user 12345 for as its hardcoded
    }
  }, [user]);
// once we get the user we want to edit handleSubmit 

  //RETURN HTLM (X)
  return (
    <main className="flex flex-col items-center p-4 bg-white min-h-screen">
      {/* <style>
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200..900;1,200..900&family=Funnel+Display:wght@300..800&display=swap');
      </style>  */}
      {/* <h1 className="text-3xl font-bold mb-4 text-cc-charcoal">Choose your class</h1>
      <form onSubmit={selectClass} className=" max-w-xl space-x-2">
      <select className="items-center border border-cc-gold rounded-md p-2 w-60">
              <option value="Linear Algebra">Linear Algebra</option>
              <option value="Cultural Anthropology">Cultural Anthropology</option>
              <option value="meat">Meat</option>
                </select>
            <button
              className="bg-cc-gold text-white px-4 py-2 rounded-md hover:opacity-80"
              type="submit"
              disabled={loading}
            >   
              {loading ? 'Purring...' : 'Submit'}
            </button> */}
      {/* </form> */}
      {/* Model Selector Dropdown */}
      <Dropdown
        selectedModel={modelDropdown}
        updateSelectedModel={(model) => setModelDropdown(model)}
        models={MODELS}
      />

      <h1
        className={`text-5xl font-bold text-center my-4 text-cc-gold ${bebasNeue.className}`}
      >
        Tiger One
      </h1>

      {/*user chat box */}
      <MessageList messages={messages} />
      {/* every keystroke setws user input (onchange ) */}
      <ChatInput
        userInput={userInput} 
        setUserInput={setUserInput}
        loading={loading}
        handleSubmit={handleSubmit}
        disabled={!user}
      />
    </main>
  );
}