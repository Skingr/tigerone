// app/api/chat/route.ts
/**
 * SERVER SIDE ROUTE HABNDLER
 * Expects json body with 'messages' array
 * content: Actual text
 * start conversation w/ system message eg;"You're a helpful assistant"
 * end pt calls createChatCompletion from official openai library
 * response returned as json
 */
import { NextResponse } from 'next/server'
import { ChatMessage, ChatRequest } from '@/sharedTypes/types'
import OpenAI from 'openai'

// import { Configuration, OpenAIApi } from 'openai';

// 1 : configure openai using openai key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})
    
  export async function POST(req: Request) { // POST request: creating an HTTPS request of a special type
    try {
      const body = await req.json() as ChatRequest // body is payload of the request, i.e the users input in the req (ourcase)
      const { messages } = body // this line pulls messages from "body"
      console.log("***************************",body)
      if (!messages || !Array.isArray(messages)) {
        return NextResponse.json(
          { error: 'No valid messages array in request body.' },
          { status: 400 }
        )
      }
  
// 3. make call to OPEN AI 
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',  // or 'gpt-4' if you have access
        messages: messages,
    })
//4. Return llm inference response
return NextResponse.json(response)
  } catch (error: any) {
    console.error('Error calling OpenAI API:', error)
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    )
  }
}


