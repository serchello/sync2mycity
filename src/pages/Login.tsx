import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {

  const navigate = useNavigate();

  const handleLogin = () => {
    // later: redirect to TAXISNET / auth endpoint
     navigate("/");
    console.log("Login with TAXISNET");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <img src="/login.png" alt="Sync2myCity" className="login-logo" />

        <button type="button" className="login-btn" onClick={handleLogin}>
          Σύνδεση με <strong>TAXISNET</strong>
        </button>
      </div>
    </div>
  );
}