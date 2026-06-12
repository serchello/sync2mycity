import { api } from "./client";

export interface RegisterPayload {
  name: string;
  mail: string;
  pass: string;
  first_name: string;
  last_name: string;
  address: string;
  phone: string;
  is_blocked: 0 | 1;
  is_citizen: 0 | 1;
}

export interface OAuthTokenResponse {
  access_token: string;
  refresh_token?: string;
  token_type?: string;
  expires_in?: number;
  scope?: string;
}

const url = import.meta.env.VITE_API_URL;
const clientId = import.meta.env.VITE_DRUPAL_CLIENT_ID;
const clientSecret = import.meta.env.VITE_DRUPAL_CLIENT_SECRET;
const redirectUri = import.meta.env.VITE_DRUPAL_REDIRECT_URI;

export const authApi = {
  getAuthorizeUrl: () => {
    const params = new URLSearchParams({
      response_type: "code",
      scope: "user",
      client_id: clientId,
      redirect_uri: redirectUri,
    });

    return `${url}/oauth/authorize?${params.toString()}`;
  },

  exchangeCodeForToken: async (code: string) => {
    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
    });

    const { data } = await api.post<OAuthTokenResponse>("/oauth/token", body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return data;
  },

  register: async (payload: RegisterPayload) => {
    const { data } = await api.post("/api/user/register", payload, {
      params: {
        client_id: clientId,
        client_secret: clientSecret,
      },
    });

    return data;
  },


    logout: async () => {
    const { data } = await api.get("/api/user/logout", {
      params: {
        redirectUri: `${window.location.origin}/login`,
      },
    });

    return data;
  },

  getLogoutUrl: () => {
    const params = new URLSearchParams({
      redirectUri: `${window.location.origin}/login`,
    });

    return `${url}/api/user/logout?${params.toString()}`;
  },


};