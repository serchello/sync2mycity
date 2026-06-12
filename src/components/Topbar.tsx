import { Menu, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import "./Topbar.css";
import { useLogout } from "../hooks/useAuth";
import { authApi } from "../api/authApi";


interface Props {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: Props) {
  const navigate = useNavigate();

  const { data: user } = useCurrentUser();


  const userName =
    user?.first_name || user?.last_name
      ? `${user?.first_name || ""} ${user?.last_name || ""}`.trim()
        : user?.name || user?.mail || "Χρήστης";
    
    
  const handleLogout = () => {

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("expires_in");
    localStorage.removeItem("login_at");

    window.location.href = authApi.getLogoutUrl();
  };

  const handleProfile = () => {
    //console.log("profile");
    navigate("/profile");
  };

  return (
    <div className="topbar">
      <img src="/logo.png" alt="Sync2myCity" className="topbar-logo" />

      <div className="topbar-right">
        <div className="desktop-user user-menu">
          <button type="button" className="user-menu__trigger">
            {userName}
            <span className="user-menu__arrow">▾</span>
          </button>

          <div className="user-menu__dropdown">
            <div className="user-menu__dropdown-inner">
              <button
                type="button"
                className="user-menu__item"
                onClick={handleProfile}
              >
                <User size={15} />
                Προφίλ
              </button>

              <button
                type="button"
                className="user-menu__item user-menu__item--danger"
                onClick={handleLogout}
              >
                <LogOut size={15} />
                Logout
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="hamburger"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu size={24} strokeWidth={2.2} />
        </button>
      </div>
    </div>
  );
}