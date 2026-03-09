const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const { verifyOTP } = require("../controllers/otpController");
const authMiddleware = require("../middlewares/authMiddleware");

const {
  registerValidation,
  loginValidation,
  otpValidation,
  validate
} = require("../validations/authValidation");

// Register
router.post("/register", registerValidation, validate, register);

//  Login (sends OTP)
router.post("/login", loginValidation, validate, login);

//  Verify OTP (returns tokens)
router.post("/verify-otp", otpValidation, validate, verifyOTP);
// auth middleware
router.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user
  });
});

module.exports = router;
