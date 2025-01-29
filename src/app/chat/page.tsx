//first front end file
/**
 * USER INPUT
 * Making requests to a server side endpoint (Next.js api route)
 * Display conversation between user and AI on webpage
 * 
 * if PAGE.tsx getting too large break logic out into 
 * smaller client components in src/components
 */



'use client'//Next.js : tell nextjs that this file is client component (front end)



//useState<ChatMessage[]>(...) == makes sure type script knows its an arr of ChatMessage objects

import { useState } from 'react' // useState hook from React for state management
import { ChatMessage, ChatRequest } from '@/sharedTypes/types'
import MarkdownWithSyntaxHighlighter from '@/components/MarkdownWithSyntaxHighliter'


export default function ChatPage(){
    const [messages, setMessages] = useState<ChatMessage[]>([


        {
          role: 'assistant',

          //give perfect context to set math and code rules

          content: 'You are a helpful assistant. Always format your responses following these rules:\n\n' +
          
          '1. ALL mathematical expressions MUST be written in LaTeX notation\n' +
          
          '2. For inline math, use single dollar signs: $x^2$\n' +
          
          '3. For display/block math, use double dollar signs:\n' +
          
          '$$\n' +
          
          'y = mx + b\n' +
          
          '$$\n' +
          
          '4. For vectors, always use proper LaTeX notation: $\\vec{v}$ or $\\mathbf{v}$\n' +
          
          '5. For matrices, always use proper LaTeX environments:\n' +
          
          '$$\n' +
          
          '\\begin{bmatrix}\n' +
          
          'a & b \\\\\n' +
          
          'c & d\n' +
          
          '\\end{bmatrix}\n' +
          
          '$$\n' +
          
          '6. NEVER, EVER, use plain text for mathematical expressions\n' +
          
          '7. Format code using triple backticks with language specification\n' +
          
          '8. Use proper LaTeX commands for all mathematical symbols (×, ·, ≠, ≥, etc.)',
          
          class: "N/A"
        }, 

    ])

    const [userInput, setUserInput] = useState('')
    const [loading, setLoading] = useState(false)
    const[userClass, setUserClass] = useState<string>('N/A')
    const [modelDropdown, setModelDropdown] = useState('gpt-4o') // default to 4o when website loads

    const pickModel = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setModelDropdown(e.target.value)
        console.log(modelDropdown) // logs selected model in console
    }

    const selectClass = async(e:React.FormEvent) =>{
      e.preventDefault(); 
      setUserClass((e.currentTarget.querySelector('select') as HTMLSelectElement)?.value)
    }

    const handleSubmit = async(e: React.FormEvent) => { // what runs when you click button 
        e.preventDefault() //if you remove and you click send page will refresh 
        
        if(!userInput.trim()) return

        // ADD USER MSG TO LOCAL STATE
        const newMessages: ChatMessage[] = [ // creating a new constant called newMessages - colon is defining type of new constant as a Array:Chatmessage, this can be a shared type can move later
            ...messages,                    //{grab attribute from object} -- spread operator is similar. spreading all values in that array (chatMessage[]) out, not copying array itself but copying individual items in array ,
            //saving all msgs you send and adding to new array! 

            {  role: 'user', content: userInput, class:userClass }

          ];

            setMessages(newMessages)
            setUserInput('')
        setLoading(true)
          console.log(newMessages) // https://gyazo.com/a6871d300ffa3e777248cf954d486b85, shows up on website console because next separating frontand backend, 
        // CALL NEXTJS API ROUTE (api/chat/route.ts)
        try{
            const res = await fetch('api/chat', {
                method: 'POST',
                headers: {'Content-Type' : 'Application/json'},
                body: JSON.stringify({messages: newMessages, model: modelDropdown}), //tell api modeltype 

                })
            if (!res.ok){
                throw new Error (`Req failed with statu ${res.status}`)
            }
            const data = await res.json()
            // data.choices[0].message.content is the assistant response
            const assistantResponse = data.choices?.[0]?.message?.content || ''
            const updatedMessages: ChatMessage[] = [
        ...newMessages, // SPREAD OPERATOR 
        { role: 'assistant', content: assistantResponse, class: 'n/a' },
            ]
            setMessages(updatedMessages)
        } catch (err: any) {
      console.error(err)
        } finally {
            setLoading(false)
        }
    }
//RETURN HTLM (X) 
    return (
        <main className="font-crimsonPro flex flex-col items-center p-4 bg-white min-h-screen">
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
            <div className="absolute top-4 left-4 z-10">
                <select 
                    value={modelDropdown}
                    onChange={pickModel}
                    className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-cc-gold focus:border-transparent"
                >
                    <option value="gpt-4o">GPT-4o</option>
                    {/* 3.5? */}
                    {/* <option value="gpt-3.5-turbo">gpt-3.5</option> */}
                    <option value="o1-preview">o1 Preview</option>
                    <option value="o1-mini">o1 Mini</option>
                </select>
            </div>

            <h1 className="text-4xl font-bold text-center my-4">Tiger One Chat</h1>
            <div className="flex-1 overflow-auto">
              <div className="max-w-[48rem] mx-auto"> 
                {messages 
              .filter((m) => m.role !== 'system') // optional :::(hides system in the ui)//bg-cc-gold/20
                  .map((msg, index) => (
                  //#/*justify-start moves chat buble left , justify end justifys to the right*/
                //justify-start moves chat buble left , justify end justifys to the right*/
               // user query chat bubble, justify right, clean gray bg, rounded like proffesional llms
                  <div key={index} className="px-4 py-2"> {msg.role === 'user' ? (
                      <div className="flex justify-end mb-4">
                        <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-[85%]">
                          <div className="font-medium text-gray-800 mb-1"></div>
                          <div className="text-gray-800">
                            <MarkdownWithSyntaxHighlighter content={msg.content} />
                          </div>
                        </div>
                      </div>
                    ) : ( // else: 
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
                ))}
            </div>
        </div>
            {/*user chat box */}
            <div className="border-t p-4 w-full max-w-[48rem] mx-auto">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                  className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cc-gold"
                        type="text"
                  placeholder="Ask tiger. . ."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        disabled={loading}
                    />
                    <button
              className=" bg-cc-gold text-white px-4 py-2 rounded hover:opacity-80" // text-black px-4 py-2 rounded"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Thinking...' : 'Send'}
                    </button>
                </form>
            </div>
        </main>
    )
}