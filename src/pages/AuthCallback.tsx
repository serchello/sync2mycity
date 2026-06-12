import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useExchangeCodeForToken } from "../hooks/useAuth";

export default function OAuthCodeHandler() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const exchangeCode = useExchangeCodeForToken();
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;

    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (!code && !error) return;

    didRun.current = true;

    if (error) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("expires_in");
      localStorage.removeItem("login_at");

      navigate("/login", { replace: true });
      return;
    }

    if (!code) return;

    exchangeCode.mutate(code, {
      onSuccess: (data) => {
        localStorage.setItem("access_token", data.access_token);

        if (data.refresh_token) {
          localStorage.setItem("refresh_token", data.refresh_token);
        }

        if (data.expires_in) {
          localStorage.setItem("expires_in", String(data.expires_in));
        }

        localStorage.setItem("login_at", String(Date.now()));

        navigate("/", { replace: true });
      },
      onError: (error) => {
        console.error("OAuth code exchange failed:", error);

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("expires_in");
        localStorage.removeItem("login_at");

        navigate("/login", { replace: true });
      },
    });
  }, [searchParams, exchangeCode, navigate]);

  return null;
}