
//..................
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
      enum: ["admin", "user"],
      default: "user", 
    },

    resumeUrl: {
      type: String,
      default: "",
      trim: true,
    },

    refreshToken: {
      type: String,
      default: "",
    },

    otp: {
      type: String,
      default: null,   
    },

    otpExpires: {
      type: Date,
    },

    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);


userSchema.index({ role: 1 });

userSchema.virtual("isAdmin").get(function () {
  return this.role === "admin";
});

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.refreshToken;
    return ret;
  },
});

module.exports = mongoose.model("User", userSchema);