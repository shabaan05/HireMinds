import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
  <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6">

    <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">

      {/* TITLE */}
      <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Create Account
      </h2>

      <p className="text-gray-400 text-center mb-8">
        Start your interview preparation journey
      </p>

      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >

        {/* NAME */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Name
          </label>

          <input
            placeholder="Enter your name"
            {...register("name", {
              required: "Name is required",
            })}
            className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-700
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       text-gray-100 placeholder-gray-500 transition"
          />

          {errors.name && (
            <p className="text-red-400 text-sm mt-2">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
            })}
            className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-700
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       text-gray-100 placeholder-gray-500 transition"
          />

          {errors.email && (
            <p className="text-red-400 text-sm mt-2">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            {...register("password", {
              required: "Password is required",

              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            })}
            className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-700
                       focus:outline-none focus:ring-2 focus:ring-purple-500
                       text-gray-100 placeholder-gray-500 transition"
          />

          {errors.password && (
            <p className="text-red-400 text-sm mt-2">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-xl font-medium text-white
                     bg-gradient-to-r from-blue-500 to-purple-600
                     hover:scale-[1.02] transition disabled:opacity-50"
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>

      </form>

    </div>

  </div>
);
};

export default Register;
