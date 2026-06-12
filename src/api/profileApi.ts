import { api } from "./client";

export interface ProfilePayload {
  uid: number;
  first_name: string;
  last_name: string;
  mail: string;
  phone: string;
  address: string;
}

export const profileApi = {
  getProfile: async () => {
    const { data } = await api.get<ProfilePayload>("/profile");
    return data;
  },

  updateProfile: async (payload: ProfilePayload) => {
    const { uid, ...body } = payload;

    const { data } = await api.patch(`/api/user/${uid}`, body);

    return data;
  },
};