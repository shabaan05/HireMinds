const Attempt = require("../models/Attempt");

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
