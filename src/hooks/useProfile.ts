import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { profileApi, type ProfilePayload } from "../api/profileApi";

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
    mutationFn: (payload: ProfilePayload) => profileApi.updateProfile(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(profileKeys.all, data);
    },
  });
}