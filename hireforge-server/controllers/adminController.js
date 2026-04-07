const Attempt = require("../models/Attempt");
const User = require("../models/User");
const Interview = require("../models/Interview");
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