

'use client'
import { useState } from 'react'
import { ChatMessage, ChatRequest } from '@/sharedTypes/types'


export default function ChatPage(){
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role : 'system', content: 'You are a helpful assistant', class: 'n/a'}, 

    ])

    const [userInput, setUserInput] = useState('')
    const [loading, setLoading] = useState(false)
    const[userClass, setUserClass] = useState<string>('N/A')

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
                body: JSON.stringify({messages: newMessages}),

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
    <main className="font-crimsonPro flex flex-col items-center p-4 bg-cc-gold-faint min-h-screen bg-cc-gold-faint"> 
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200..900;1,200..900&family=Funnel+Display:wght@300..800&display=swap');
      </style> 
    <h1 className="text-3xl font-bold mb-4 text-cc-charcoal">Choose your class</h1>
      <form onSubmit={selectClass} className=" max-w-xl space-x-2">
        <select className= "items-center border border-4 border-double border-cc-gold w-60">
          <option value="Linear Algebra">Linear Algebra</option>
          <option value="Cultural Anthropology">Cultural Anthropology</option>
          <option value="meat">Meat</option>
        </select>
        <button
          className="bg-cc-gold text-white px-4 py-2 mb-40 rounded hover:opacity-80"
          type="submit"
          disabled={loading}
        >   
          {loading ? 'Purring...' : 'Submit'}
        </button>
        </form>
      <h1 className="text-3xl font-bold mb-4 text-cc-charcoal">Tiger One Chat</h1> 
      <div className="w-full max-w-xl border rounded p-4 mb-4 space-y-2 border-cc-charcoal">
        {messages
          .filter((m) => m.role !== 'system')
          .map((msg, index) => (
            <div key={index} className="p-2">
              <strong className="text-cc-charcoal">
                {msg.role === 'assistant' ? 'AI' : 'You'}:
                </strong>{' '}
                {msg.content}
            </div>
          ))}
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-xl flex space-x-2">
        <input
          className="flex-1 border border-cc-charcoal p-2 rounded"
          type="text"
          placeholder="Message Tiger One"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={loading}
        />
        <button
          className="bg-cc-gold text-white px-4 py-2 rounded hover:opacity-80"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Purring...' : 'Send'}
        </button>
      </form>
    </main>
  )
}