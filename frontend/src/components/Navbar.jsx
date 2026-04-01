import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Pro-Tasker</h2>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Dashboard</Link>

        {user ? (
          <>
            <span style={styles.user}>Hi, {user?.name || "User"}</span>
            <button onClick={handleLogout} style={styles.btn}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 25px",
    background: "#9cac3f",
    color: "#fff",
    alignItems: "center"
  },
  logo: { margin: 0 },
  links: {
    display: "flex",
    gap: "15px",
    alignItems: "center"
  },
  link: {
    color: "#fff",
    textDecoration: "none"
  },
  btn: {
    background: "#ef4444",
    border: "none",
    padding: "6px 10px",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer"
  },
  user: {
    color: "#9ca3af"
  }
};