import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { verifyOTP } from "../services/authService";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  // ✅ DEFINE onSubmit HERE (before return)
  const onSubmit = async (data) => {
    try {
      const res = await verifyOTP({
        email,
        otp: data.otp
      });

      const { accessToken, refreshToken, user } = res;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/candidate/dashboard");
      }

    } catch (error) {
      alert(error.response?.data?.message || "OTP verification failed");
    }
  };

  if (!email) {
    return <p>Invalid access. Please login again.</p>;
  }

  return (
    <div>
      <h2>Verify OTP</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Enter OTP"
          {...register("otp", { required: "OTP is required" })}
        />

        {errors.otp && (
          <p style={{ color: "red" }}>{errors.otp.message}</p>
        )}

        <br /><br />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;
