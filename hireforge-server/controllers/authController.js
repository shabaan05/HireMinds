// controllers/authController.js
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateTokens");
const { generateOTP } = require("../utils/generateOTP");
const { sendOTPEmail } = require("../utils/sendEmail");
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, email: user.email }
    });

  } catch (error) {
  console.log("REGISTER ERROR:", error);
  res.status(500).json({ message: "Server1 error" });
  }
};



exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });
    //,..
console.log("Password:", password);
console.log("User hashed  password:", user.password);
//.........

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // 🔐 If 2FA enabled → generate OTP
    if (user.twoFactorEnabled) {
      const otp = generateOTP();
      // const otp = generateOTP().toString();

console.log("Generated OTP:", otp);   // 👈 ADD THIS

const hashedOtp = await bcrypt.hash(otp, 10);
user.otp = hashedOtp;
      user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 mins
      await user.save();
//...
console.log("Saved OTP hash:", user.otp);
//....
      await sendOTPEmail(user.email, otp);

      return res.json({
        message: "OTP sent to email",
        requiresOTP: true
      });
    }

  } catch (error) {
      console.log(" FULL ERROR:", error);

    res.status(500).json({ message: "Server error" });
  }
};

