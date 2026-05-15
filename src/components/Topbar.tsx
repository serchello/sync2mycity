export default function Topbar() {
  return (
    <div
      style={{
        background: "linear-gradient(90deg, #0077A2 0%, #0077A2 100%)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        height: 67,
        boxShadow: "0 2px 8px rgba(21,101,192,0.18)",
        flexShrink: 0,
        zIndex: 10,
      }}
    >
      {/* Logo */}
      <img
        src="/logo.png"
        alt="Sync2myCity"
        style={{ height: 36, width: "auto", objectFit: "contain" }}
      />

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div className="desktop-user" style={{ fontWeight: 600, fontSize: 14, cursor: "pointer", padding: "6px 12px", borderRadius: 6, letterSpacing: 0.4 }}>
          ΠΕΤΡΟΣ ΠΑΠΑΔΟΠΟΥΛΟΣ ▾
        </div>
        <button className="hamburger"
          style={{
            background: "rgba(255,255,255,0.15)", border: "none",
            borderRadius: 6, color: "#fff", fontSize: 22,
            width: 38, height: 38, cursor: "pointer",
            alignItems: "center", justifyContent: "center"
          }}
        >
          ☰
        </button>
      </div>
    </div>
  );
}