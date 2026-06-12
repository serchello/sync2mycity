import { api } from "./client";

export interface ProfilePayload {
  uid: number;
  first_name: string;
  last_name: string;
  mail: string;
  phone: string;
  address: string;
}


export interface UpdateProfilePayload {
  first_name?: string;
  last_name?: string;
  address?: string;
  phone?: string;
  // user_picture_clear?: boolean;
  // user_picture?: string;
}



export const profileApi = {
  getProfile: async () => {
    const { data } = await api.get<ProfilePayload>("/profile");
    return data;
  },

  updateProfile: async (payload: UpdateProfilePayload) => {
    const { data } = await api.patch("/api/user/update", payload);
    return data;
  },
};