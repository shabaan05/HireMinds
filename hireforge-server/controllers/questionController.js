const Question = require("../models/Question");
const asyncWrapper = require("../utils/asyncWrapper");
const AppError = require("../utils/AppError");



exports.createQuestion = async (req, res) => {
  try {
    console.log("BODY:", req.body); // 👈 MUST PRINT

    const question = await Question.create(req.body);

    res.status(201).json({
      success: true,
      data: question,
    });

  } catch (error) {
    console.error("CREATE QUESTION ERROR:", error); // 👈 THIS IS KEY
    res.status(500).json({ message: error.message });
  }
};

exports.getQuestions = asyncWrapper(async (req, res) => {

  const questions = await Question.find();

  res.json({
    success: true,
    count: questions.length,
    data: questions
  });

});
//...
exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.json({ success: true, data: question });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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