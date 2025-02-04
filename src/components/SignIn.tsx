
//import { signIn } from "@/app/auth"
import { signIn } from "next-auth/react";
import {firstGetRequest} from "@/app/auth"
 
export default function SignIn() {
  return (
    <div>
    <form
      action={async () => {
        
        //await signIn("canvas")
        window.location.href = firstGetRequest()
        //alert("TEST")
      }}
    >
      <button type="submit">Signin with canvas</button>
    </form>
    </div>
  )
} 
