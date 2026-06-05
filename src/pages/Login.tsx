// import { useNavigate } from "react-router-dom";
// import "../styles/Login.css";

// export default function Login() {

//   const navigate = useNavigate();

//   const handleLogin = () => {
//     // later: redirect to TAXISNET / auth endpoint
//      navigate("/");
//     console.log("Login with TAXISNET");
//   };

//   return (
//     <div className="login-page">
//       <div className="login-card">
//         <img src="/login.png" alt="Sync2myCity" className="login-logo" />

//         <button type="button" className="login-btn" onClick={handleLogin}>
//           Σύνδεση με <strong>TAXISNET</strong>
//         </button>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

type AuthMode = "login" | "register";

export default function Login() {
  const navigate = useNavigate();

  const [mode, setMode] = useState<AuthMode>("login");

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = () => {
    console.log("Login:", loginForm);
    navigate("/");
  };

  const handleTaxisnetLogin = () => {
    console.log("Login with TAXISNET");
    navigate("/");
  };

  const handleRegister = () => {
    if (registerForm.password !== registerForm.confirmPassword) {
      alert("Οι κωδικοί δεν ταιριάζουν");
      return;
    }

    console.log("Register:", registerForm);

    // later: call register API
    setMode("login");
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
                value={loginForm.email}
                onChange={(event) =>
                  setLoginForm((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }))
                }
              />
            </div>

            <div className="auth-field">
              <label>Κωδικός</label>
              <input
                type="password"
                placeholder="••••••••"
                value={loginForm.password}
                onChange={(event) =>
                  setLoginForm((prev) => ({
                    ...prev,
                    password: event.target.value,
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
                  placeholder="Πέτρος"
                  value={registerForm.firstName}
                  onChange={(event) =>
                    setRegisterForm((prev) => ({
                      ...prev,
                      firstName: event.target.value,
                    }))
                  }
                />
              </div>

              <div className="auth-field">
                <label>Επώνυμο</label>
                <input
                  type="text"
                  placeholder="Παπαδόπουλος"
                  value={registerForm.lastName}
                  onChange={(event) =>
                    setRegisterForm((prev) => ({
                      ...prev,
                      lastName: event.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="auth-field">
              <label>Email</label>
              <input
                type="email"
                placeholder="email@example.com"
                value={registerForm.email}
                onChange={(event) =>
                  setRegisterForm((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }))
                }
              />
            </div>

            <div className="auth-field">
              <label>Κωδικός</label>
              <input
                type="password"
                placeholder="••••••••"
                value={registerForm.password}
                onChange={(event) =>
                  setRegisterForm((prev) => ({
                    ...prev,
                    password: event.target.value,
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
            >
              Εγγραφή
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