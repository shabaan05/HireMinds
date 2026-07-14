const bcrypt = require("bcryptjs");
const Attempt = require("../models/Attempt");
const User = require("../models/User");
const Interview = require("../models/Interview");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

exports.getAdminProfile = asyncHandler(async (req, res) => {
  const adminId = req.user.id;

  const admin = await User.findById(adminId).select("-password");

  if (!admin) {
    throw new AppError("Admin not found", 404);
  }

  res.status(200).json(admin);
});

exports.updateAdminProfile = asyncHandler(async (req, res) => {
  const adminId = req.user.id;
  const { name, password } = req.body;

  const admin = await User.findById(adminId);

  if (!admin) {
    throw new AppError("Admin not found", 404);
  }

  if (name) admin.name = name;

  if (password) {
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);
  }

  await admin.save();

  res.status(200).json({
    message: "Profile updated successfully",
    admin,
  });
});

exports.getAllAttempts = asyncHandler(async (req, res) => {
  const { interviewId } = req.query;

  let filter = {};

  if (interviewId) {
    filter.interviewId = interviewId;
  }

  const attempts = await Attempt.find(filter)
    .populate("userId", "name email")
    .populate("interviewId", "title")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: attempts.length,
    data: attempts,
  });
});

exports.getAdminStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();

  const totalInterviews = await Interview.countDocuments();

  const activeInterviews = await Interview.countDocuments({
    isActive: true,
  });

  const totalAttempts = await Attempt.countDocuments();

  res.json({
    data: {
      totalUsers,
      totalInterviews,
      activeInterviews,
      totalAttempts,
    },
  });
});
