// validations/authValidation.js

const { body, validationResult } = require("express-validator");

/* =========================
   REGISTER VALIDATION
========================= */

exports.registerValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
];

/* =========================
   LOGIN VALIDATION
========================= */

exports.loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
];

/* =========================
   OTP VALIDATION
========================= */

exports.otpValidation = [
  body("email")
    .isEmail()
    .withMessage("Valid email is required"),

  body("otp")
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP must be 6 digits")
];

/* =========================
   HANDLE VALIDATION ERRORS
========================= */

exports.validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  next();
};
