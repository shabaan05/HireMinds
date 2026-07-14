import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { verifyOTP } from "../services/authService";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();

const email = localStorage.getItem("email");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await verifyOTP({
        email,
        otp: data.otp
      });

      console.log("[VerifyOTP] Response:", res);

      const { accessToken, refreshToken, user } = res;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") {
        navigate("/admin/dashboard");
      }
     

    } catch (error) {
      alert(error.response?.data?.message || "OTP verification failed");
    }
  };

  if (!email) {
    return <p>Invalid access. Please login again.</p>;
  }

return (
  <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6">

    <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">

      {/* TITLE */}
      <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Verify OTP
      </h2>

      <p className="text-gray-400 text-center mb-8">
        Enter the verification code sent to your email
      </p>

      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >

        {/* OTP INPUT */}
        <div>

          <label className="block text-sm text-gray-400 mb-2">
            OTP Code
          </label>

          <input
            type="text"
            placeholder="Enter OTP"
            {...register("otp", {
              required: "OTP is required",
            })}
            className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-700
                       focus:outline-none focus:ring-2 focus:ring-purple-500
                       text-gray-100 placeholder-gray-500 transition text-center tracking-[0.3em]"
          />

          {errors.otp && (
            <p className="text-red-400 text-sm mt-2">
              {errors.otp.message}
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
          {isSubmitting ? "Verifying..." : "Verify OTP"}
        </button>

      </form>

    </div>

  </div>
);
};

export default VerifyOTP;
