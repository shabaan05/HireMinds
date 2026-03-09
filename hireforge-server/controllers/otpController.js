const User = require("../models/User");
const bcrypt = require("bcryptjs");

const { generateAccessToken, generateRefreshToken } = require("../utils/generateTokens");

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
console.log("Request body:", req.body);

    const user = await User.findOne({ email });

    // ✅ Check if user exists first
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // ✅ Check if OTP exists
    if (!user.otp) {
      return res.status(400).json({ message: "No OTP found" });
    }

    // ✅ Compare OTP safely
const isOtpValid = await bcrypt.compare(String(otp), user.otp);

    if (!isOtpValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // ✅ Check expiration
    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // Clear OTP
    user.otp = null;
    user.otpExpires = null;

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();
console.log("OTP VERIFIED SUCCESSFULLY");

    res.json({
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.log("FULL ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
