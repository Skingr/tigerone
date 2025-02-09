import { Email } from "@/sharedTypes/types";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const session = useSession();

  const getUser = async (email: Email) => {
    try {
      const response = await fetch(`/api/getUserByEmail?email=${email}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", session.data?.user?.email],
    queryFn: () => getUser(session.data?.user?.email as Email),
    enabled: session.status === "authenticated",
  });

  return { user, isLoading, isError };
};

export default useUser;
