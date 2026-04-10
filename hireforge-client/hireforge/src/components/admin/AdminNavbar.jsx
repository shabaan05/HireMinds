import { NavLink, useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Admin Panel</h2>

      <div style={styles.links}>
        <NavLink to="/admin/dashboard" style={styles.link}>
          Dashboard
        </NavLink>

        <NavLink to="/admin/interviews" style={styles.link}>
          Interviews
        </NavLink>

        <NavLink to="/admin/questions" style={styles.link}>
          Questions
        </NavLink>

        <NavLink to="/admin/attempts" style={styles.link}>
          Attempts
        </NavLink>

        <button onClick={handleLogout} style={styles.logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    background: "#1e293b",
    color: "white",
  },
  logo: {
    margin: 0,
  },
  links: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
  logout: {
    background: "red",
    color: "white",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer",
  },
};

export default AdminNavbar;