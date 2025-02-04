import { signIn } from "next-auth/react";

export default function SignIn() {
  const handleSignIn = async () => {
    try {
      // First get the authentication URL from our API
      const response = await fetch('/api/auth/canvas');
      const data = await response.json();
      
      if (data.error) {
        console.error('Error:', data.error);
        return;
      }

// navigate to url 

      window.location.href = data.url;
    } catch (error) {
      console.error('Error during sign in:', error);
    }
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