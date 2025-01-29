import React, { useState } from 'react';


export default function SubmitFeedback() {
    const [userInput, setUserInput] = useState('')
    const [emojiSelected, setEmojiSelected] = useState(false) // tracks if an emoji is pressed
    const [emoji, setEmoji] = useState<string>('')
    
    const EmojiClicked = (selectedEmoji: string) => {
        setEmojiSelected(true); // Set to true when an emoji is clicked
        setEmoji(selectedEmoji)
        
    }

    const handleSubmit = async(e: React.FormEvent) => { // what runs when you click button 
        e.preventDefault() //if you remove and you click send page will refresh 
        if (!userInput.trim()) return; // Prevent empty submissions
        const output = `${emoji} ${userInput}`
        
        setUserInput('')
        
        
        try{
            const res = await fetch('api/feedback', {
                method: 'POST',
                headers: {'Content-Type' : 'Application/json'},
                body: JSON.stringify({feedback: output}),

            })
            if (res.ok){
                
            } else {
                alert('Feedback fail')
            }
      
    } catch (err: any) {
      console.error(err)
    } 


    }
        return (
            
        <div className=" border-t p-4 w-full max-w-[48rem] mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 fixed top-12 left-2">
            <div>
            
            <button
          className="text-5xl px-2 py-2 rounded hover:opacity-80" // text-black px-4 py-2 rounded"
              type="button"
              onClick={() => EmojiClicked('🥳')}
              

              
            >
              🥳
            </button>
            <button
          className="text-5xl px-2 py-2 rounded hover:opacity-80" // text-black px-4 py-2 rounded"
              type="button"
              onClick={() => EmojiClicked('😐')}
            >
              😐
            </button>
            <button
          className="text-5xl px-2 py-2 rounded hover:opacity-80" // text-black px-4 py-2 rounded"
              type="button"
              onClick={() => EmojiClicked('😭')}
            >
              😭
            </button>
            </div>
            <div>
            {emojiSelected && (
            <input
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cc-gold"
              type="text"
              placeholder="Enter any feedback here!"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              
            />
            )}
            {emojiSelected && (
            <button
            className=" ml-2 bg-cc-gold text-white px-4 py-2 rounded hover:opacity-80" // text-black px-4 py-2 rounded"
                type="submit"
              >
                {'Send'}
              </button>
            )}
            </div>
          </form>
          
        </div>
    
    )
}