import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  if (!user) {
    return <div className="p-6">Loading profile...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">

      <h1 className="text-2xl font-bold">My Profile</h1>

      {/* Profile Card */}
      <div className="bg-white shadow rounded-lg p-6 space-y-4">

        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p className="text-lg font-medium">{user.name}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-lg font-medium">{user.email}</p>
        </div>

        {/* Optional fields */}
        {user.role && (
          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className="text-lg font-medium">{user.role}</p>
          </div>
        )}

        {user.createdAt && (
          <div>
            <p className="text-sm text-gray-500">Joined</p>
            <p className="text-lg font-medium">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}

      </div>

    </div>
  );
}

export default Profile;