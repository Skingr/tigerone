"use client"; 

import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

//import { signIn } from "@/app/auth";

export default function SignIn() {
  const handleSignIn = async () => {
    const result = await signIn("canvas", {redirect: false})
    console.log("TEST:")
    console.log(result)
  };

  return (
    <div>
      <button
        onClick={handleSignIn}
        className="bg-cc-gold text-white px-4 py-2 rounded-md hover:opacity-80"
      >
        Sign in with Canvas
      </button>
    </div>
  );
}