import { useEffect, useState, useCallback } from "react";
import ProfileCard from "../../components/admin/profile/ProfileCard";
import ProfileForm from "../../components/admin/profile/ProfileForm";
import { getAdminProfile } from "../../services/adminService";

function ProfileAdmin() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getAdminProfile();
      setAdmin(res);
    } catch (err) {
      console.error(err);
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // ✅ LOADING UI
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading profile...
        </p>
      </div>
    );
  }

  // ✅ ERROR UI (IMPORTANT)
  if (error) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-red-500 text-lg font-medium">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Admin Profile
        </h2>
        <p className="text-gray-500 mt-1">
          Manage your account details
        </p>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* PROFILE CARD */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <ProfileCard admin={admin} />
        </div>

        {/* PROFILE FORM */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <ProfileForm admin={admin} onRefresh={fetchProfile} />
        </div>

      </div>

    </div>
  );
}

export default ProfileAdmin;