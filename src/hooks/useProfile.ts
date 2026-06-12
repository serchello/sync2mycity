import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { profileApi, type UpdateProfilePayload  } from "../api/profileApi";
import { currentUserKeys } from "./useCurrentUser";

export const profileKeys = {
  all: ["profile"] as const,
};

export function useProfile() {
  return useQuery({
    queryKey: profileKeys.all,
    queryFn: profileApi.getProfile,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => profileApi.updateProfile(payload),
    onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: currentUserKeys.all,
    });
  },
  });
}