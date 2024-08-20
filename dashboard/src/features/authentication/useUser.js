import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  return { isLoading, user, isAuthenticated: user };
}
