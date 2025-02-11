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
import { ChatRequest } from '@/sharedTypes/types'
import OpenAI from 'openai'
// import { aidata } from '@/db/schema';



// import { Configuration, OpenAIApi } from 'openai';

// 1 : configure openai using openai key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})
    
  export async function POST(req: Request) { // POST request: creating an HTTPS request of a special type
    try {
      const body = (await req.json()) as ChatRequest // body is payload of the request, i.e the users input in the req (ourcase)
      const { messages, model } = body // this line pulls messages from "body"
      console.log("***************************",body)
      console.log("Selected model:", model)
      if (!messages || !Array.isArray(messages)) {
        return NextResponse.json(
          { error: 'No valid messages array in request body.' },
          { status: 400 }
        )
      }
    //get user query
      const userquery = messages[messages.length - 1].content;
      // const userclass = messages[messages.length - 1].class;
      

      //n3ed to figure out correct params for each model, add claude w.; claude api key and deep seek w deep seek api key , o1 preview is expensive 
      //
      const modelChoices = [
        {
          model: "gpt-4o",
          max_tokens: 10000,
        },
        {
          model: "gpt-4o-turbo",
          max_tokens: 10000,
        },
        {
          model: "o1-preview",
          max_completion_tokens: 10000, // very expensive use wisely
        },
        {
          model: "o1-mini",
          max_completion_tokens: 10000, // need to test price
        },
      ];
// make text stream so it doesnt feel like it takes forever
const stream = await openai.chat.completions.create({
      // || defaults to gpt-4o , curModelChoice is the user selected model
        model: modelChoices.find((m) => m.model ===model)?.model || "gpt-4o",
        messages: messages.map(msg => ({ // messages.map is neccesary to convert messages arr (all user messages) to an arr with properties (role and content) api req role and content obj 
          role: msg.role, // user or assistant
          content: msg.content // userInput
        })),
        ...(model.startsWith("o1")
        ? {
          max_completion_tokens:
            modelChoices.find((m) => m.model === model)
              ?.max_completion_tokens || 5000,
        }
      : {
          max_tokens:
            modelChoices.find((m) => m.model === model)?.max_tokens || 3000,
        }),
    stream: true,
  });
const textEncoder = new TextEncoder();
const readableStream = new ReadableStream({
  async start(controller){
    try{
      for await (const chunk of stream){
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) {
          controller.enqueue(textEncoder.encode(content));
        }
      }
      controller.close();
    } catch (error) {
      controller.error(error);
    }
  },
});

return new Response(readableStream, {
  headers: {
    "Content-Type": "text/plain; charset=utf-8",
    "Transfer-Encoding": "chunked",
  },
});
  } catch (error: any) {
    console.error('Error calling OpenAI API:', error)
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    )
  }
}


