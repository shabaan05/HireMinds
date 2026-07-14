const User = require("../models/User");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateTokens");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

exports.verifyOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  console.log(`[verifyOTP] Request — email: ${email}, otp: ${otp}`);

  const user = await User.findOne({ email });

  if (!user) {
    console.warn(`[verifyOTP] No user found for email: ${email}`);
    throw new AppError("User not found", 400);
  }

  console.log(`[verifyOTP] User found. Stored otp: "${user.otp}", expires: ${user.otpExpires}`);

  if (!user.otp) {
    console.warn(`[verifyOTP] user.otp is empty/null — OTP was never saved or was already cleared`);
    throw new AppError("No OTP found. Please request a new one.", 400);
  }

  // ── 3. Check expiry FIRST (fail fast) ────────────────────────────────────
  if (!user.otpExpires || user.otpExpires < Date.now()) {
    console.warn(`[verifyOTP] OTP expired. expires: ${user.otpExpires}, now: ${new Date()}`);
    // Clear the stale OTP
    user.otp = null;
    user.otpExpires = null;
    await user.save();
    throw new AppError("OTP has expired. Please login again to get a new one.", 400);
  }

  // ── 4. Compare OTP (plain string comparison) ──────────────────────────────
  const isMatch = String(user.otp).trim() === String(otp).trim();
  console.log(`[verifyOTP] OTP match: ${isMatch} (stored: "${user.otp}", received: "${otp}")`);

  if (!isMatch) {
    throw new AppError("Invalid OTP", 400);
  }

  // ── 5. OTP valid — clear it and issue tokens ──────────────────────────────
  user.otp = null;
  user.otpExpires = null;

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  console.log(`[verifyOTP] ✅ OTP verified for ${email}. Tokens issued.`);

  res.json({
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      name: user.name,   // was missing — frontend stores this in localStorage
      email: user.email,
      role: user.role,
    },
  });
});
