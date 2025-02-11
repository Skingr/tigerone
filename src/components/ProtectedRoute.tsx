"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useUser from "@/hooks/store/useUser";
//wrap evyerthing in context that checks auth state , if it checks auth and youre not fully auth you gret pushed to start page
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const session = useSession();
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (session.status === "authenticated" && !user && !isLoading) {
      router.push("/start");
    }
  }, [user, router, isLoading]);

  if (session.status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-5xl font-bold text-cc-gold font-bebas mb-4">
          TIGERONE
        </h1>
        <div className="w-12 h-12 border-4 border-gray-300 border-t-cc-gold rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
