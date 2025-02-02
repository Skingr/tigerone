
//import { signIn } from "@/app/auth"
import { signIn } from "next-auth/react";

 
export default function SignIn() {
  return (
    <div>
    <form
      action={async () => {
        
        await signIn("canvas")
      }}
    >
      <button type="submit">Signin with canvas</button>
    </form>
    </div>
  )
} 
