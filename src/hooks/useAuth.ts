import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi, type RegisterPayload } from "../api/authApi";

export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
  });
}

export function useExchangeCodeForToken() {
  return useMutation({
    mutationFn: (code: string) => authApi.exchangeCodeForToken(code),
  });
}


export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("expires_in");
      localStorage.removeItem("login_at");

      queryClient.clear();
    },
  });
}