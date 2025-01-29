import { NextResponse } from 'next/server'

export async function POST(req: Request) { // POST request: creating an HTTPS request of a special type
    try {
      const feedback = await req.json() // body is payload of the request, i.e the users input in the req (ourcase)
      console.log(feedback)
      return NextResponse.json(
        { status: 200 } // recieved
      )
    }
 catch (err: any) {
    console.error(err)
    return NextResponse.json(
        { status: 400 } 
    )

  } 
}