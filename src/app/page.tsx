"use client";
import Image from "next/image";
import Link from "next/link";
import { Bebas_Neue } from "next/font/google";

// Use the font
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white text-cc-gold">
      <h1 className={`text-6xl font-bold mb-4 ${bebasNeue.className}`}>
        Welcome to Tigris
      </h1>
      <p className="text-xl mb-8 text-center max-w-2xl text-opacity{10} text-cc-gold">
        Meet Tigris, your chatbot assistant. Whether you need
       dating advice, want to research new topics, or just have a
        friendly chat, Tigris is here to assist you.
        {/* None of your private data 
        will be shared. All data is stored anonomously and all personal data is only used 
        for qualitative data.  */}
      </p>
      <Link
        href="/chat"
        className="bg-cc-gold text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-cc-faint transition"
      >
        Start Chatting
      </Link>
    </main>
  );}