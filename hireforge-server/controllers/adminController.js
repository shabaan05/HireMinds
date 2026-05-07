const Attempt = require("../models/Attempt");
const User = require("../models/User");
const Interview = require("../models/Interview");


// GET ADMIN PROFILE
exports.getAdminProfile = async (req, res) => {
  try {
    // assuming auth middleware sets req.user
    const adminId = req.user.id;

    const admin = await User.findById(adminId).select("-password");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json(admin);
  } catch (error) {
    console.error("Get Admin Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE ADMIN PROFILE
exports.updateAdminProfile = async (req, res) => {
  try {
    const adminId = req.user.id;
    const { name, password } = req.body;

    const admin = await User.findById(adminId);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (name) admin.name = name;

    if (password) {
      const bcrypt = require("bcryptjs");
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
    }

    await admin.save();

    res.status(200).json({
      message: "Profile updated successfully",
      admin,
    });
  } catch (error) {
    console.error("Update Admin Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getAllAttempts = async (req, res) => {
  try {
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

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAdminStats = async (req, res, next) => {
  try {

    const totalUsers = await User.countDocuments();

    const totalInterviews = await Interview.countDocuments();

    const activeInterviews = await Interview.countDocuments({
      isActive: true
    });

    const totalAttempts = await Attempt.countDocuments();

    res.json({
      data: {
        totalUsers,
        totalInterviews,
        activeInterviews,
        totalAttempts
      }
    });
      } catch (error) {
    next(error);
  }
};