import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearAuthData } from "../../utils/authStorage";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    clearAuthData();
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-400">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6 text-gray-100">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          My Profile
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Your account information
        </p>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-gray-900/70 backdrop-blur border border-gray-800 rounded-2xl p-6 space-y-5">

        {/* AVATAR */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white select-none">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-100">{user.name}</p>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        </div>

        <div className="border-t border-gray-800" />

        {/* ROLE */}
        {user.role && (
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
              Role
            </p>
            <span className="text-sm px-3 py-1 rounded-full
                              bg-purple-500/10 text-purple-400 border border-purple-500/20">
              {user.role}
            </span>
          </div>
        )}

        {/* EMAIL */}
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
            Email
          </p>
          <p className="text-gray-200">{user.email}</p>
        </div>

        {/* JOINED */}
        {user.createdAt && (
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
              Member Since
            </p>
            <p className="text-gray-200">
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        )}

      </div>

      {/* LOGOUT */}
      <div>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full py-2.5 rounded-xl text-sm font-medium
                     bg-red-500/10 text-red-400 border border-red-500/20
                     hover:bg-red-500/20 transition"
        >
          Logout
        </button>
      </div>

    </div>
  );
}

export default Profile;
