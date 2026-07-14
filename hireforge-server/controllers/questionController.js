const Question = require("../models/Question");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

exports.createQuestion = asyncHandler(async (req, res) => {
  const question = await Question.create(req.body);

  res.status(201).json({
    success: true,
    data: question,
  });
});

exports.getQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find();

  res.json({
    success: true,
    count: questions.length,
    data: questions,
  });
});

exports.getQuestionById = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);

  if (!question) {
    throw new AppError("Question not found", 404);
  }

  res.json({ success: true, data: question });
});

exports.updateQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!question) {
    throw new AppError("Question not found", 404);
  }

  res.json({
    success: true,
    data: question,
  });
});

exports.deleteQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findByIdAndDelete(req.params.id);

  if (!question) {
    throw new AppError("Question not found", 404);
  }

  res.json({
    success: true,
    message: "Question deleted",
  });
});
