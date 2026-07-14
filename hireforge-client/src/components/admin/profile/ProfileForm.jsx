import { useState } from "react";
import { updateAdminProfile } from "../../../services/adminService";

function ProfileForm({ admin, onRefresh }) {
  const [form, setForm] = useState({
    name: admin?.name || "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await updateAdminProfile(form);
      alert("Profile updated successfully");
      onRefresh();
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <h3 className="text-lg font-semibold text-gray-800">
        Update Profile
      </h3>

      {/* NAME */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* PASSWORD */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          New Password
        </label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter new password"
          className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg hover:opacity-90 transition"
      >
        {loading ? "Updating..." : "Update Profile"}
      </button>

    </form>
  );
}

export default ProfileForm;