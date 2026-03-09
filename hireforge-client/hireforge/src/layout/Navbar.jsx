import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: "15px" }}>
        <strong>HireForge</strong>
      </Link>

      {token && (
        <>
          <Link to="/dashboard" style={{ marginRight: "15px" }}>
            Dashboard
          </Link>

          {user?.role === "admin" && (
            <Link to="/admin" style={{ marginRight: "15px" }}>
              Admin
            </Link>
          )}

          <button onClick={handleLogout}>
            Logout
          </button>
        </>
      )}

      {!token && (
        <>
          <Link to="/login" style={{ marginRight: "15px" }}>
            Login
          </Link>

          <Link to="/register">
            Register
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
