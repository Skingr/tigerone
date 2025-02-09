"use client"
import { ProtectedRoute } from "@/components/ProtectedRoute"
// provider allows us to use the query client and session provider in the app
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"

const queryClient = new QueryClient()

type Props = {
  children: React.ReactNode;
  session: any; // You can type this more strictly based on your session structure
}

export default function Providers({ children, session }: Props) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ProtectedRoute>
          {children}
        </ProtectedRoute>
      </QueryClientProvider>
    </SessionProvider>
  )
}
// store stuff in context state to keep state through pages, wrap all components in providers
// pass state of session everywhere so pass user login state through all components