const Question = require("../models/Question");
const asyncWrapper = require("../utils/asyncWrapper");
const AppError = require("../utils/AppError");


exports.createQuestion = asyncWrapper(async (req, res) => {

  const question = await Question.create(req.body);

  res.status(201).json({
    success: true,
    data: question
  });

});


exports.getQuestions = asyncWrapper(async (req, res) => {

  const questions = await Question.find();

  res.json({
    success: true,
    count: questions.length,
    data: questions
  });

});


exports.updateQuestion = asyncWrapper(async (req, res) => {

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
    data: question
  });

});


exports.deleteQuestion = asyncWrapper(async (req, res) => {

  const question = await Question.findByIdAndDelete(req.params.id);

  if (!question) {
    throw new AppError("Question not found", 404);
  }

  res.json({
    success: true,
    message: "Question deleted"
  });

});