import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { Link } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser({ email, password });

      console.log("Login response:", res);
localStorage.setItem("email", email);

      // 🔐 If OTP is required
      if (res.requiresOTP) {
        navigate("/verify-otp", {
          state: { email }
        });
        return;
      }

      // ✅ If login successful without OTP
      if (res.accessToken && res.refreshToken) {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        localStorage.setItem("user", JSON.stringify(res.user));
//.
        // Redirect based on role
        if (res.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/candidate/dashboard");
        }
      }

    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6">

    <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">

      {/* TITLE */}
      <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Welcome Back
      </h2>

      <p className="text-gray-400 text-center mb-8">
        Login to continue your interview journey
      </p>

      {/* ERROR */}
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* EMAIL */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-700
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       text-gray-100 placeholder-gray-500 transition"
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-700
                       focus:outline-none focus:ring-2 focus:ring-purple-500
                       text-gray-100 placeholder-gray-500 transition"
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl font-medium text-white
                     bg-gradient-to-r from-blue-500 to-purple-600
                     hover:scale-[1.02] transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
<p className="text-sm text-gray-400 text-center mt-5">
  Not registered yet?{" "}

  <Link
    to="/register"
    className="text-blue-400 hover:text-purple-400 transition font-medium"
  >
    Create an account
  </Link>
</p>
      </form>

    </div>

  </div>
);
};

export default Login;
