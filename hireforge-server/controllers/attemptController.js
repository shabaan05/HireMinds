
//......................................
const Attempt = require("../models/Attempt");
const Interview = require("../models/Interview");
const Question = require("../models/Question");
const { evaluateInterview } = require("../services/evaluationService");

// 🚀 Start Interview
exports.startInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.interviewId);

    if (!interview || !interview.isActive) {
      return res.status(404).json({ message: "Interview not available" });
    }

    const attempt = await Attempt.create({
      userId: req.user._id, // ✅ FIXED
      interviewId: interview._id,
      totalMarks: interview.totalMarks || 0,
      status: "in-progress",
    });

    res.json({ success: true, data: attempt });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//
const getAttemptById = async (req, res) => {
  try {
    const { attemptId } = req.params;

    const attempt = await Attempt.findById(attemptId)
      .populate("questions");

    if (!attempt) {
      return res.status(404).json({ message: "Attempt not found" });
    }

    res.json(attempt);

  } catch (error) {
    console.error("getAttemptById error:", error);
    res.status(500).json({ message: "Error fetching attempt" });
  }
};
//..
const startAttempt = async (req, res) => {
  try {
    const { interviewId } = req.body;
    const userId = req.user.id;

    const attempt = await Attempt.create({
      user: userId,
      interview: interviewId,
      status: "in_progress",
      startedAt: new Date(),
    });

    res.json({ attemptId: attempt._id });

  } catch (error) {
    console.error("startAttempt error:", error);
    res.status(500).json({ message: "Failed to start attempt" });
  }
};
//..

//..
const submitAttempt = async (req, res) => {
  try {
    const { attemptId, answers } = req.body;

    const attempt = await Attempt.findById(attemptId);

    if (!attempt) {
      return res.status(404).json({ message: "Attempt not found" });
    }

    attempt.answers = answers;
    attempt.status = "completed";

    await attempt.save();

    res.json({ message: "Submitted successfully" });

  } catch (error) {
    console.error("submitAttempt error:", error);
    res.status(500).json({ message: "Submission failed" });
  }
};
// 💾 Save Answer
exports.saveAnswer = async (req, res) => {
  try {
    const { attemptId, questionId, selectedAnswer, codeSubmitted, subjectiveAnswer } = req.body;

    const attempt = await Attempt.findById(req.params.attemptId);

    if (!attempt) {
      return res.status(404).json({ message: "Attempt not found" });
    }

    // find existing answer
    const existing = attempt.answers.find(
      (ans) => ans.questionId.toString() === questionId
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

  } catch (error) {
    console.error("saveAnswer error:", error);
    res.status(500).json({ message: "Failed to save answer" });
  }
};

// 📊 Get User Attempts
exports.getUserAttempts = async (req, res) => {
  try {
    const attempts = await Attempt
      .find({ userId: req.user._id }) // ✅ FIXED
      .populate("interviewId", "title");

    res.json({ success: true, data: attempts });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🧠 Submit Interview
exports.submitInterview = async (req, res) => {
  try {
    const attempt = await Attempt.findById(req.params.attemptId)
      .populate("answers.questionId");

    if (!attempt) {
      return res.status(404).json({ message: "Attempt not found" });
    }

    const result = await evaluateInterview(attempt);

    attempt.score = result.score;
    attempt.accuracy = result.accuracy;
    attempt.status = "submitted";
    attempt.submittedAt = new Date();

    await attempt.save();

    res.json({ success: true, data: result });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📄 Get Result
exports.getResult = async (req, res) => {
  try {
    const attempt = await Attempt.findById(req.params.attemptId)
      .populate("answers.questionId", "questionText marks");

    if (!attempt) {
      return res.status(404).json({ message: "Attempt not found" });
    }

    res.json({ success: true, data: attempt });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};