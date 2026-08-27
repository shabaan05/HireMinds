import { Link, NavLink } from "react-router-dom";

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition-all duration-150 px-4 py-2 rounded-lg ${
    isActive
      ? "text-white bg-blue-600/20 border border-blue-500/30"
      : "text-gray-400 hover:text-gray-100 hover:bg-white/5"
  }`;

const Navbar = () => {
  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="bg-gray-950/90 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
      <div className="w-[92%] max-w-[1400px] mx-auto h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
            H
          </div>
          <span className="text-base font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
            HireForge
          </span>
        </Link>

        {/* LINKS */}
        <div className="flex items-center gap-1">
          {token ? (
            <>
              <NavLink to="/user/dashboard" className={navLinkClass}>Dashboard</NavLink>
              <NavLink to="/user/profile" className={navLinkClass}>Profile</NavLink>
              <NavLink to="/user/attempts" className={navLinkClass}>My Attempts</NavLink>
              <NavLink to="/user/interviews" className={navLinkClass}>Interviews</NavLink>
              {user?.role === "admin" && (
                <NavLink to="/admin/dashboard" className={navLinkClass}>Admin</NavLink>
              )}
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass}>Login</NavLink>
              <Link
                to="/register"
                className="ml-2 px-4 py-2 rounded-lg text-sm font-semibold text-white
                           bg-gradient-to-r from-blue-500 to-purple-600
                           hover:from-blue-400 hover:to-purple-500
                           transition-all duration-150 shadow-lg shadow-blue-500/20"
              >
                Register
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
