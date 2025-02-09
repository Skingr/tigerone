import SignInButton from "@/components/SignInButton"


export default function LoginPage() {
  return (
    <main className="flex flex-col items-center p-4 bg-white min-h-screen">

      <div className="max-w-lg w-full space-y-8 p-8 bg-white border-2 border-cc-gold rounded-lg justify-center flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h1 className={`text-6xl font-bold mb-4 text-cc-gold font-bebas mt-20`}>
        Welcome to Tiger One
      </h1>
      <p className="text-xl mb-8 text-center max-w-2xl text-opacity{10} text-cc-gold font-geist-mono">
        Meet Tiger One, your chatbot assistant. Whether you need
       dating advice, want to research new topics, or just have a
        friendly chat, Tiger One is here to assist you.
        {/* None of your private data 
        will be shared. All data is stored anonomously and all personal data is only used 
        for qualitative data.  */}
      </p>
        <div className="font-geist-sans text-cc-gold">
          <SignInButton />
        </div>
      </div>
    </main>
  )
}
