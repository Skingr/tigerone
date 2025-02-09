"use server"
import { auth } from "@/auth"
import Providers from "./Providers"


export default async function ServerProviderWrapper({ children }: { children: React.ReactNode }) {
  const session = await auth()
  return <Providers session={session}>{children}</Providers>
}