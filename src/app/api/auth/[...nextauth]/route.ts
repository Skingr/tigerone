import { NextResponse } from 'next/server';

export async function GET() {
  const CLIENT_ID = process.env.NEXT_PUBLIC_CANVAS_CLIENT_ID;
  const SECRET_ID = process.env.CANVAS_CLIENT_SECRET;
  const STATE = "RANDOMSTATE";
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const REDIRECT = encodeURIComponent(`${baseUrl}/api/auth/callback/canvas`);
  
  // Add logging to debug
  console.log('Environment variables:', {
    CLIENT_ID,
    SECRET_ID,
    baseUrl,
    REDIRECT
  });

  if (!CLIENT_ID || !SECRET_ID) {
    return NextResponse.json(
      { error: "Missing Canvas credentials", 
        CLIENT_ID: !!CLIENT_ID, 
        SECRET_ID: !!SECRET_ID 
      },
      { status: 500 }
    );
  }

  const url = `https://coloradocollege.instructure.com/login/oauth2/auth?client_id=${CLIENT_ID}&response_type=code&state=${STATE}&redirect_uri=${REDIRECT}`;
  
  return NextResponse.json({ url });
}
