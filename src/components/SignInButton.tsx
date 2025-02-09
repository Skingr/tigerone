"use client"
import { signIn } from "next-auth/react"
import { ArrowRightIcon } from "@heroicons/react/24/outline"

// sihn in button 
export default function SignInButton() {
  const handleSignIn = async () => {
    await signIn("google", {
      callbackUrl: '/',
      redirect: true
    })
  }

  return (
    <button
      onClick={handleSignIn}
      className="w-full flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-2xl font-medium shadow hover:bg-gray-50 disabled:opacity-50"
    >
      <img
        src="https://www.google.com/favicon.ico"
        alt="Google"
        className="h-4 w-4"
      />
      Sign in
      <ArrowRightIcon className="h-5 w-5" />
    </button>
  )
} 