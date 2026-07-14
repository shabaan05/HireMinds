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
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center justify-between text-gray-100">

      {/* LOGO */}
      <Link
        to="/"
        className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
      >
        HireForge
      </Link>

      {/* LINKS */}
      <div className="flex items-center gap-6 text-sm">

        {token ? (
          <>
            <Link to="/user/dashboard" className="hover:text-blue-400 transition">
              Dashboard
            </Link>

            <Link to="/user/profile" className="hover:text-blue-400 transition">
              Profile
            </Link>

            <Link to="/user/attempts" className="hover:text-blue-400 transition">
              My Attempts
            </Link>

            <Link to="/user/interviews" className="hover:text-blue-400 transition">
              Interviews
            </Link>

            {user?.role === "admin" && (
              <Link to="/admin" className="hover:text-purple-400 transition">
                Admin
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg text-sm
                         bg-red-500/10 text-red-400 border border-red-500/20
                         hover:bg-red-500/20 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-400 transition">
              Login
            </Link>

            <Link
              to="/register"
              className="px-4 py-1.5 rounded-lg text-sm font-medium text-white
                         bg-gradient-to-r from-blue-500 to-purple-600
                         hover:shadow-[0_0_10px_rgba(139,92,246,0.5)]
                         transition"
            >
              Register
            </Link>
          </>
        )}

      </div>

    </nav>
  );
};

export default Navbar;
