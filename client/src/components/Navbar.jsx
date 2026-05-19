import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>FinanceApp</h2>

      <div style={styles.links}>
        {token && (
          <>
            <Link to="/transactions" style={styles.link}>
              Transactions
            </Link>

            <button onClick={handleLogout} style={styles.button}>
              Logout
            </button>
          </>
        )}

        {!token && (
          <>
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            <Link to="/register" style={styles.link}>
              Register
            </Link>
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
    alignItems: "center",
    padding: "12px 20px",
    background: "#111",
    color: "white",
  },
  logo: {
    margin: 0,
  },
  links: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
  button: {
    padding: "6px 10px",
    cursor: "pointer",
  },
};