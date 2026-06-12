import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userApi, type UpdateCurrentUserPayload, } from "../api/userApi";


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

export function useUpdateCurrentUser() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: (payload: UpdateCurrentUserPayload) => userApi.updateCurrentUser(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: currentUserKeys.all });
    },
  });
}