import { Menu, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Topbar.css";

interface Props {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: Props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // localStorage.removeItem("token");
    navigate("/login");
  };

  const handleProfile = () => {
    console.log("profile");
    // navigate("/profile");
  };

  return (
    <div className="topbar">
      <img src="/logo.png" alt="Sync2myCity" className="topbar-logo" />

      <div className="topbar-right">
        <div className="desktop-user user-menu">
          <button type="button" className="user-menu__trigger">
            ΠΕΤΡΟΣ ΠΑΠΑΔΟΠΟΥΛΟΣ
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