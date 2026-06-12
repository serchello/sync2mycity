import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/userApi";

export const currentUserKeys = {
  all: ["current-user"] as const,
};

export function useCurrentUser() {
  return useQuery({
    queryKey: currentUserKeys.all,
    queryFn: userApi.getCurrentUser,
    enabled: Boolean(localStorage.getItem("access_token")),
    retry: 1,
  });
}