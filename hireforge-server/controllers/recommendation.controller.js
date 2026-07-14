const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const {
  calculateTopicAccuracy,
  findWeakTopics,
  generateRecommendationSummary,
} = require("../services/recommendation.service");


exports.getRecommendations = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  // Authorization: user can only see their own data
  if (
    req.user.role !== "admin" &&
    req.user._id.toString() !== userId.toString()
  ) {
    throw new AppError("Not authorized to view these recommendations", 403);
  }

  const [topicAccuracy, weakTopics, summary] = await Promise.all([
    calculateTopicAccuracy(userId),
    findWeakTopics(userId),
    generateRecommendationSummary(userId),
  ]);
console.log("res is",topicAccuracy)
  res.json({
    success: true,
    data: {
      topicAccuracy,
      weakTopics,
      summary,
    },
  });
});
