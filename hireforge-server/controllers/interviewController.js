const Interview = require("../models/Interview");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

// Interview = the exam/template created by the admin.
// Attempt = one candidate’s try of that interview.

exports.createInterview = asyncHandler(async (req, res) => {
  const interview = await Interview.create({
    ...req.body,
    createdBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    data: interview,
  });
});

exports.getInterviews = asyncHandler(async (req, res) => {
  const interviews = await Interview.find();

  res.json({
    success: true,
    count: interviews.length,
    data: interviews,
  });
});

exports.updateInterview = asyncHandler(async (req, res) => {
  const interview = await Interview.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!interview) {
    throw new AppError("Interview not found", 404);
  }

  res.json({
    success: true,
    data: interview,
  });
});

exports.deleteInterview = asyncHandler(async (req, res) => {
  const interview = await Interview.findByIdAndDelete(req.params.id);

  if (!interview) {
    throw new AppError("Interview not found", 404);
  }

  res.json({
    success: true,
    message: "Interview deleted",
  });
});

exports.toggleInterviewStatus = asyncHandler(async (req, res) => {
  const interview = await Interview.findById(req.params.id);

  if (!interview) {
    throw new AppError("Interview not found", 404);
  }

  interview.isActive = !interview.isActive;

  await interview.save();

  res.json({
    success: true,
    data: interview,
  });
});

exports.getInterviewById = asyncHandler(async (req, res) => {
  const interview = await Interview.findById(req.params.id).populate(
    "questions"
  );

  if (!interview) {
    throw new AppError("Interview not found", 404);
  }

  res.json(interview);
});

exports.attachQuestions = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { questions } = req.body;

  const interview = await Interview.findById(id);

  if (!interview) {
    throw new AppError("Interview not found", 404);
  }

  interview.questions.push(...questions);

  await interview.save();

  res.json({ message: "Questions added", interview });
});
