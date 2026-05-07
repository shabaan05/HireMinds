import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

if (!user) {
  return (
    <div className="flex items-center justify-center h-[60vh] text-gray-400">
      Loading profile...
    </div>
  );
}

return (
  <div className="max-w-4xl mx-auto p-6 space-y-6 text-gray-100">

    {/* HEADER */}
    <div>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        My Profile
      </h1>
      <p className="text-gray-400 text-sm mt-1">
        Manage your personal information
      </p>
    </div>

    {/* PROFILE CARD */}
    <div className="bg-gray-900/70 backdrop-blur border border-gray-800 rounded-2xl p-6 space-y-5">

      {/* NAME */}
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-wide">
          Name
        </p>
        <p className="text-lg font-semibold text-blue-400">
          {user.name}
        </p>
      </div>

      {/* EMAIL */}
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-wide">
          Email
        </p>
        <p className="text-lg font-semibold text-gray-200">
          {user.email}
        </p>
      </div>

      {/* ROLE */}
      {user.role && (
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide">
            Role
          </p>
          <p className="text-sm px-3 py-1 inline-block rounded-full 
                        bg-purple-500/10 text-purple-400 border border-purple-500/20">
            {user.role}
          </p>
        </div>
      )}

      {/* JOINED */}
      {user.createdAt && (
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide">
            Joined
          </p>
          <p className="text-lg text-gray-300">
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      )}

    </div>

  </div>
);
}

export default Profile;