import { api } from "./client";

export interface ProfilePayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

export const profileApi = {
  getProfile: async () => {
    const { data } = await api.get<ProfilePayload>("/profile");
    return data;
  },

  updateProfile: async (payload: ProfilePayload) => {
    const { data } = await api.put<ProfilePayload>("/profile", payload);
    return data;
  },
};