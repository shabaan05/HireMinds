import { NavLink, useNavigate } from "react-router-dom";
import ProfileAdmin from "../../pages/admin/ProfileAdmin";
function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

return (
  <nav className="bg-white border-b shadow-sm px-6 py-4 flex justify-between items-center">

    {/* LOGO */}
    <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
      Admin Panel
    </h2>

    {/* LINKS */}
    <div className="flex items-center gap-6">

      <NavLink
        to="/admin/dashboard"
        className={({ isActive }) =>
          `text-sm font-medium ${
            isActive
              ? "text-blue-600"
              : "text-gray-600 hover:text-blue-600"
          } transition`
        }
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/admin/interviews"
        className={({ isActive }) =>
          `text-sm font-medium ${
            isActive
              ? "text-blue-600"
              : "text-gray-600 hover:text-blue-600"
          } transition`
        }
      >
        Interviews
      </NavLink>
      <NavLink
        to="/admin/profile"
        className={({ isActive }) =>
          `text-sm font-medium ${
            isActive
              ? "text-blue-600"
              : "text-gray-600 hover:text-blue-600"
          } transition`
        }
      >
        Profile
      </NavLink>

      <NavLink
        to="/admin/questions"
        className={({ isActive }) =>
          `text-sm font-medium ${
            isActive
              ? "text-blue-600"
              : "text-gray-600 hover:text-blue-600"
          } transition`
        }
      >
        Questions
      </NavLink>

      <NavLink
        to="/admin/attempts"
        className={({ isActive }) =>
          `text-sm font-medium ${
            isActive
              ? "text-blue-600"
              : "text-gray-600 hover:text-blue-600"
          } transition`
        }
      >
        Attempts
      </NavLink>

      {/* LOGOUT BUTTON */}
      <button
        onClick={handleLogout}
        className="ml-4 px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
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