import { api } from "./client";

export interface CurrentUser {
  uid: number;
  name: string;
  mail: string;
  roles_target_id: string;
  internal_worker: 0 | 1;
  department: number | null;
  first_name: string;
  last_name: string;
  address: string;
  phone: string | number;
  user_picture: string | null;
  department_categories_responsible: string | null;
}

export const userApi = {
  getCurrentUser: async () => {
    const { data } = await api.get<CurrentUser[]>("/api/user");
    return data?.[0] ?? null;
  },
};