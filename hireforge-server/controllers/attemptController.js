const Attempt = require("../models/Attempt");
const Interview = require("../models/Interview");
const Question = require("../models/Question");
const TestResult = require("../models/TestResult");
const { evaluateCode } = require("../services/evaluationService");
const { evaluateMCQ } = require("../services/mcqEvaluationService");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

// ─── Start Interview ──────────────────────────────────────────────────────────
exports.startInterview = asyncHandler(async (req, res) => {
  const interview = await Interview.findById(req.params.interviewId);

  if (!interview || !interview.isActive) {
    throw new AppError("Interview not available", 404);
  }

  const attempt = await Attempt.create({
    userId: req.user._id,
    interviewId: interview._id,
    totalMarks: interview.totalMarks || 0,
    status: "in-progress",
  });

  res.json({ success: true, data: attempt });
});

// ─── Get Attempt By ID ────────────────────────────────────────────────────────
exports.getAttemptById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const attempt = await Attempt.findById(id)
    .populate("userId", "name email")
    .populate("interviewId", "title duration")
    .populate("answers.questionId");

  if (!attempt) {
    throw new AppError("Attempt not found", 404);
  }

  res.json(attempt);
});

// ─── Submit Attempt ───────────────────────────────────────────────────────────
exports.submitAttempt = asyncHandler(async (req, res) => {
  const { attemptId } = req.params;
  const { timings = {} } = req.body;

  const attempt = await Attempt.findById(attemptId);

  if (!attempt) {
    throw new AppError("Attempt not found", 404);
  }

  console.log("===== SUBMIT ATTEMPT =====");
  console.log("Attempt ID:", attemptId);
  console.log("Answers in DB:", JSON.stringify(attempt.answers, null, 2));

  const questions = await Question.find({
    _id: { $in: attempt.answers.map((a) => a.questionId) },
  });

  let totalMarks = 0;
  let score = 0;
  let correctCount = 0;
  let totalMCQ = 0;

  const testResultDocs = [];

  const updatedAnswers = await Promise.all(
    attempt.answers.map(async (ans) => {
      const question = questions.find(
        (q) => q._id.toString() === ans.questionId.toString()
      );

      if (!question) return ans;

      console.log("===== EVALUATING QUESTION =====");
      console.log("Question ID:", question._id);
      console.log("Question:", question.questionText);
      console.log("Type:", question.type);
      console.log("Marks:", question.marks);
      if (question.type === "coding") {
        console.log("CODE SUBMITTED:", ans.codeSubmitted);
        const allTC = [
          ...(question.sampleTestCases || []),
          ...(question.hiddenTestCases || []),
        ];
        console.log("TEST CASES:", JSON.stringify(allTC, null, 2));
      }

      if (question.type === "mcq") {
        totalMCQ++;
        const result = evaluateMCQ(ans, question);
        ans.isCorrect = result.isCorrect;
        ans.obtainedMarks = result.obtainedMarks;
        totalMarks += result.totalMarks;
        score += result.obtainedMarks;
        if (result.isCorrect) correctCount++;
      }

      if (question.type === "coding") {
        const allTestCases = [
          ...(question.sampleTestCases || []),
          ...(question.hiddenTestCases || []),
        ];

        const evaluationResult = await evaluateCode({
          code: ans.codeSubmitted,
          language: "javascript",
          testCases: allTestCases,
          totalMarks: question.marks,
        });

        console.log("===== EVALUATION RESULT =====");
        console.log(JSON.stringify(evaluationResult, null, 2));

        ans.obtainedMarks = evaluationResult.obtainedMarks;
        ans.isCorrect = evaluationResult.status === "accepted";
        ans.status = evaluationResult.status;
        ans.passedTestCases = evaluationResult.passedCount;
        ans.totalTestCases = evaluationResult.totalCount;

        totalMarks += question.marks;
        score += evaluationResult.obtainedMarks || 0;
      }

      console.log({
        topic: question.topic,
        subtopic: question.subtopic,
        difficulty: question.difficulty,
      });

      if (question.topic && question.subtopic && question.difficulty) {
        const timeTaken =
          timings[ans.questionId.toString()] ||
          timings[String(ans.questionId)] ||
          0;

        testResultDocs.push({
          userId: attempt.userId,
          questionId: question._id,
          topic: question.topic,
          subtopic: question.subtopic,
          difficulty: question.difficulty,
          isCorrect: ans.isCorrect || false,
          timeTaken,
        });
      }

      return ans;
    })
  );

  const accuracy = totalMCQ > 0 ? (correctCount / totalMCQ) * 100 : 0;

  attempt.answers = updatedAnswers;
  attempt.score = score;
  attempt.totalMarks = totalMarks;
  attempt.accuracy = accuracy;
  attempt.status = "evaluated";
  attempt.completedAt = new Date();

  await Promise.all([
    attempt.save(),
    testResultDocs.length > 0
      ? TestResult.insertMany(testResultDocs, { ordered: false })
      : Promise.resolve(),
  ]);

  res.json({
    message: "Submitted successfully",
    score,
    totalMarks,
    accuracy,
  });
});

exports.saveAnswer = asyncHandler(async (req, res) => {
  const { questionId, selectedAnswer, codeSubmitted, subjectiveAnswer } =
    req.body;
  const attemptId = req.params.attemptId;

  if (!questionId) {
    throw new AppError("questionId is required", 400);
  }

  const attempt = await Attempt.findById(attemptId);

  if (!attempt) {
    throw new AppError("Attempt not found", 404);
  }

  const existing = attempt.answers.find(
    (ans) => ans.questionId.toString() === questionId.toString()
  );

  if (existing) {
    existing.selectedAnswer = selectedAnswer ?? existing.selectedAnswer;
    existing.codeSubmitted = codeSubmitted ?? existing.codeSubmitted;
    existing.subjectiveAnswer = subjectiveAnswer ?? existing.subjectiveAnswer;
  } else {
    attempt.answers.push({
      questionId,
      selectedAnswer: selectedAnswer || "",
      codeSubmitted: codeSubmitted || "",
      subjectiveAnswer: subjectiveAnswer || "",
    });
  }

  await attempt.save();

  res.json({ success: true, message: "Answer saved" });
});

exports.getUserAttempts = asyncHandler(async (req, res) => {
  const attempts = await Attempt.find({ userId: req.user._id })
    .populate("interviewId", "title")
    .sort({ createdAt: -1 });

  const activeAttempt = attempts.find((a) => a.status === "in_progress");

  const completedAttempts = attempts.filter(
    (a) => a.status === "completed" || a.status === "evaluated"
  );

  res.json({
    success: true,
    activeAttempt,
    completedAttempts,
  });
});

exports.getResult = asyncHandler(async (req, res) => {
  const attempt = await Attempt.findById(req.params.attemptId).populate(
    "answers.questionId",
    "questionText marks"
  );

  if (!attempt) {
    throw new AppError("Attempt not found", 404);
  }

  res.json({ success: true, data: attempt });
});



exports.getUserAttemptsgetUserStats = asyncHandler(async (req, res) => {

  const userId = req.user._id;

  const attempts = await Attempt.find({ userId })
    .select("score accuracy timeSpent");

  const totalAttempts = attempts.length;

  const bestScore =
    totalAttempts > 0
      ? Math.max(...attempts.map((a) => a.score))
      : 0;

  const averageScore =
    totalAttempts > 0
      ? (
          attempts.reduce((sum, a) => sum + a.score, 0) /
          totalAttempts
        ).toFixed(1)
      : 0;

  const averageAccuracy =
    totalAttempts > 0
      ? (
          attempts.reduce((sum, a) => sum + a.accuracy, 0) /
          totalAttempts
        ).toFixed(1)
      : 0;

  const totalTimeSpent = attempts.reduce(
    (sum, a) => sum + (a.timeSpent || 0),
    0
  );

  res.status(200).json({
    success: true,
    data: {
      totalAttempts,
      bestScore,
      averageScore,
      averageAccuracy,
      totalTimeSpent,
    },
  });

});

