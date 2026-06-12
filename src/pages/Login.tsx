import { useState } from "react";
import { authApi } from "../api/authApi";
import { useRegister } from "../hooks/useAuth";
import "../styles/Login.css";

type AuthMode = "login" | "register";

export default function Login() {

  const registerMutation = useRegister();

  const [mode, setMode] = useState<AuthMode>("login");

  const [loginForm, setLoginForm] = useState({
    mail: "",
    pass: "",
  });

  const [registerForm, setRegisterForm] = useState({
    name: "",
    mail: "",
    pass: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
    address: "",
    phone: "",
  });

  const handleLogin = () => {
    window.location.href = authApi.getAuthorizeUrl();
  };

  const handleTaxisnetLogin = () => {
    window.location.href = authApi.getAuthorizeUrl();
  };

  const handleRegister = () => {
    if (!registerForm.name.trim()) {
      alert("Συμπληρώστε το username");
      return;
    }

    if (!registerForm.mail.trim()) {
      alert("Συμπληρώστε το email");
      return;
    }

    if (!registerForm.pass.trim()) {
      alert("Συμπληρώστε τον κωδικό");
      return;
    }

    if (registerForm.pass !== registerForm.confirmPassword) {
      alert("Οι κωδικοί δεν ταιριάζουν");
      return;
    }

    registerMutation.mutate(
      {
        name: registerForm.mail,
        mail: registerForm.mail,
        pass: registerForm.pass,
        first_name: registerForm.first_name,
        last_name: registerForm.last_name,
        address: registerForm.address,
        phone: registerForm.phone,
        is_blocked: 0,
        is_citizen: 1,
      },
      {
        onSuccess: () => {
          alert("Η εγγραφή ολοκληρώθηκε");

          setRegisterForm({
            name: "",
            mail: "",
            pass: "",
            confirmPassword: "",
            first_name: "",
            last_name: "",
            address: "",
            phone: "",
          });

          setMode("login");
        },
        onError: () => {
          alert("Δεν ήταν δυνατή η εγγραφή");
        },
      }
    );
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <img src="/login.png" alt="Sync2myCity" className="login-logo" />

        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab ${mode === "login" ? "auth-tab--active" : ""}`}
            onClick={() => setMode("login")}
          >
            Σύνδεση
          </button>

          <button
            type="button"
            className={`auth-tab ${
              mode === "register" ? "auth-tab--active" : ""
            }`}
            onClick={() => setMode("register")}
          >
            Εγγραφή
          </button>
        </div>

        {mode === "login" ? (
          <div className="auth-form">
            <div className="auth-field">
              <label>Email</label>
              <input
                type="email"
                placeholder="email@example.com"
                value={loginForm.mail}
                onChange={(event) =>
                  setLoginForm((prev) => ({
                    ...prev,
                    mail: event.target.value,
                  }))
                }
              />
            </div>

            <div className="auth-field">
              <label>Κωδικός</label>
              <input
                type="password"
                placeholder="••••••••"
                value={loginForm.pass}
                onChange={(event) =>
                  setLoginForm((prev) => ({
                    ...prev,
                    pass: event.target.value,
                  }))
                }
              />
            </div>

            <button type="button" className="login-btn" onClick={handleLogin}>
              Σύνδεση
            </button>

            <div className="auth-divider">
              <span>ή</span>
            </div>

            <button
              type="button"
              className="login-btn login-btn--taxisnet"
              onClick={handleTaxisnetLogin}
            >
              Σύνδεση με <strong>TAXISNET</strong>
            </button>

            <button
              type="button"
              className="auth-switch"
              onClick={() => setMode("register")}
            >
              Δεν έχετε λογαριασμό; Εγγραφή
            </button>
          </div>
        ) : (
          <div className="auth-form">
            <div className="auth-row">
              <div className="auth-field">
                <label>Όνομα</label>
                <input
                  type="text"
                  placeholder="First"
                  value={registerForm.first_name}
                  onChange={(event) =>
                    setRegisterForm((prev) => ({
                      ...prev,
                      first_name: event.target.value,
                    }))
                  }
                />
              </div>

              <div className="auth-field">
                <label>Επώνυμο</label>
                <input
                  type="text"
                  placeholder="Last"
                  value={registerForm.last_name}
                  onChange={(event) =>
                    setRegisterForm((prev) => ({
                      ...prev,
                      last_name: event.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="auth-field">
              <label>Username</label>
              <input
                type="text"
                placeholder="usertest"
                value={registerForm.name}
                onChange={(event) =>
                  setRegisterForm((prev) => ({
                    ...prev,
                    name: event.target.value,
                  }))
                }
              />
            </div>

            <div className="auth-field">
              <label>Email</label>
              <input
                type="email"
                placeholder="usertest@local.host"
                value={registerForm.mail}
                onChange={(event) =>
                  setRegisterForm((prev) => ({
                    ...prev,
                    mail: event.target.value,
                  }))
                }
              />
            </div>

            <div className="auth-field">
              <label>Διεύθυνση</label>
              <input
                type="text"
                placeholder="Address"
                value={registerForm.address}
                onChange={(event) =>
                  setRegisterForm((prev) => ({
                    ...prev,
                    address: event.target.value,
                  }))
                }
              />
            </div>

            <div className="auth-field">
              <label>Τηλέφωνο</label>
              <input
                type="text"
                placeholder="Phone"
                value={registerForm.phone}
                onChange={(event) =>
                  setRegisterForm((prev) => ({
                    ...prev,
                    phone: event.target.value,
                  }))
                }
              />
            </div>

            <div className="auth-field">
              <label>Κωδικός</label>
              <input
                type="password"
                placeholder="••••••••"
                value={registerForm.pass}
                onChange={(event) =>
                  setRegisterForm((prev) => ({
                    ...prev,
                    pass: event.target.value,
                  }))
                }
              />
            </div>

            <div className="auth-field">
              <label>Επιβεβαίωση κωδικού</label>
              <input
                type="password"
                placeholder="••••••••"
                value={registerForm.confirmPassword}
                onChange={(event) =>
                  setRegisterForm((prev) => ({
                    ...prev,
                    confirmPassword: event.target.value,
                  }))
                }
              />
            </div>

            <button
              type="button"
              className="login-btn"
              onClick={handleRegister}
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? "Εγγραφή..." : "Εγγραφή"}
            </button>

            <button
              type="button"
              className="auth-switch"
              onClick={() => setMode("login")}
            >
              Έχετε ήδη λογαριασμό; Σύνδεση
            </button>
          </div>
        )}
      </div>
    </div>
  );
}