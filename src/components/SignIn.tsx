
import { signIn } from "@/app/auth"

 
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
