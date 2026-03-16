const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },

    role: {
      type: String,
      enum: ["admin", "candidate"],
      default: "candidate",
    },

    resumeUrl: {
      type: String,
      default: "",
    },

    refreshToken: {
      type: String,
      default: "",
    },
    otp: String,
otpExpires: Date,
twoFactorEnabled: {
  type: Boolean,
  default: true 
}

  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
