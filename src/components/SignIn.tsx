
import { signIn } from "next-auth/react";
 
export default function SignIn() {
  return (
    <div>
    <form
      action={async () => {
        
        await signIn("canvas")
        //window.location.href = firstGetRequest()
        //alert(firstGetRequest())
      }}
    >
      <button type="submit">Signin with canvas</button>
    </form>
    </div>
  )
} 
