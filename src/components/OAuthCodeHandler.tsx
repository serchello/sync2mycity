import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authApi } from "../api/authApi";

export default function OAuthCodeHandler() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("expires_in");
      localStorage.removeItem("login_at");

      navigate("/login", { replace: true });
      return;
    }

    if (!code) return;

    const processingKey = `oauth_code_processing_${code}`;

    if (sessionStorage.getItem(processingKey)) {
      console.log("OAuth code already processing");
      return;
    }

    sessionStorage.setItem(processingKey, "1");

    const exchangeCode = async () => {
      try {

        const data = await authApi.exchangeCodeForToken(code);

        console.log("OAuth token response:", data);

        localStorage.setItem("access_token", data.access_token);

        if (data.refresh_token) {
          localStorage.setItem("refresh_token", data.refresh_token);
        }

        if (data.expires_in) {
          localStorage.setItem("expires_in", String(data.expires_in));
        }

        localStorage.setItem("login_at", String(Date.now()));

        sessionStorage.removeItem(processingKey);

        navigate("/", { replace: true });
      } catch (err) {
        console.error("OAuth token exchange failed:", err);

        sessionStorage.removeItem(processingKey);

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("expires_in");
        localStorage.removeItem("login_at");

        navigate("/login", { replace: true });
      }
    };

    exchangeCode();
  }, [searchParams, navigate]);

  return null;
}