import { useState } from "react";
import { Menu, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Topbar.css";

interface Props {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: Props) {

  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    // localStorage.removeItem("token");
    navigate("/login");
  };


  const handleProfile = () => {
    console.log("profile");
    // later:
    // navigate("/profile");
  }


 return (
    <div
      style={{
        background: "#0077A2",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        height: 67,
        boxShadow: "0 2px 8px rgba(21,101,192,0.18)",
        flexShrink: 0,
        position: "relative",
        zIndex: 10,
      }}
    >
      <img
        src="/logo.png"
        alt="Sync2myCity"
        style={{
          height: 36,
          width: "auto",
          objectFit: "contain",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div className="desktop-user user-menu">
          <button
            type="button"
            className="user-menu__trigger"
            onClick={() => setUserMenuOpen((open) => !open)}
          >
            ΠΕΤΡΟΣ ΠΑΠΑΔΟΠΟΥΛΟΣ ▾
          </button>

          {userMenuOpen && (
            <div className="user-menu__dropdown">
              <button type="button" className="user-menu__item"  onClick={handleProfile}>
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
          )}
        </div>

        <button
          type="button"
          className="hamburger"
          onClick={onMenuClick}
          aria-label="Open menu"
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "none",
            borderRadius: 6,
            color: "#fff",
            width: 38,
            height: 38,
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Menu size={24} strokeWidth={2.2} />
        </button>
      </div>
    </div>
  );
}
