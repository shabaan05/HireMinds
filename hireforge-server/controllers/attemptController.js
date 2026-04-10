
//......................................
const Attempt = require("../models/Attempt");
const Interview = require("../models/Interview");
const Question = require("../models/Question");
const { evaluateInterview } = require("../services/evaluationService");
const { evaluateCode } = require("../services/evaluationService");
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


exports.getAttemptById = async (req, res) => {
  try {
    console.log("CONTROLLER HIT"); // 🔥 ADD THIS

    const { id } = req.params;

    const attempt = await Attempt.findById(id)
      .populate("userId", "name email")
      .populate("interviewId", "title")
      .populate("answers.questionId")
      .populate("interviewId", "title duration");

    if (!attempt) {
      return res.status(404).json({ message: "Attempt not found" });
    }

    res.json(attempt);

  } catch (error) {
    console.error("ERROR IN CONTROLLER:", error); // 🔥 THIS WILL SHOW
    res.status(500).json({ message: "Error fetching attempt" });
  }
};
//..
const startAttempt = async (req, res) => {
  try {
    const { interviewId } = req.body; 
    const userId = req.user.id;

    const existingAttempt = await Attempt.findOne({
      user: userId,
      interview: interviewId,
    });
 //  2. If attempt is in progress → RESUME
    if (existingAttempt && existingAttempt.status === "in_progress") {
      return res.json({ attemptId: existingAttempt._id });
    }

    // 3. If attempt already completed → BLOCK
    if (existingAttempt && existingAttempt.status === "completed") {
      return res.status(400).json({
        message: "You have already completed this interview",
      });
    }
   
// else create attempt
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
exports.submitAttempt = async (req, res) => {
  try {
    const { attemptId } = req.params;

    const attempt = await Attempt.findById(attemptId);
    if (!attempt) {
      return res.status(404).json({ message: "Attempt not found" });
    }

    const questions = await Question.find({
      _id: { $in: attempt.answers.map(a => a.questionId) },
    });

    let totalMarks = 0;
    let score = 0;
    let correctCount = 0;
    let totalMCQ = 0;

    const updatedAnswers = await Promise.all(
      attempt.answers.map(async (ans) => {
        const question = questions.find(
          (q) => q._id.toString() === ans.questionId.toString()
        );

        if (!question) return ans;

        // ✅ MCQ Evaluation
        if (question.type === "mcq") {
          totalMCQ++;
          totalMarks += 1;

          if (ans.selectedAnswer === question.correctAnswer) {
            ans.isCorrect = true;
            ans.obtainedMarks = 1;
            score += 1;
            correctCount++;
          } else {
            ans.isCorrect = false;
            ans.obtainedMarks = 0;
          }
        }

        // ✅ Coding Evaluation
        if (question.type === "coding") {
          const allTestCases = [
            ...question.sampleTestCases,
            ...question.hiddenTestCases,
          ];

          const evaluationResult = await evaluateCode({
            code: ans.codeSubmitted,
            language: "javascript",
            testCases: allTestCases,
            totalMarks: question.marks,
          });

          ans.obtainedMarks = evaluationResult.obtainedMarks;
          ans.isCorrect = evaluationResult.status === "accepted";
          ans.status = evaluationResult.status;
          ans.passedTestCases = evaluationResult.passedCount;
          ans.totalTestCases = evaluationResult.totalCount;

          totalMarks += question.marks;
          score += evaluationResult.obtainedMarks;
        }

        return ans;
      })
    );

    const accuracy =
      totalMCQ > 0 ? (correctCount / totalMCQ) * 100 : 0;

    attempt.answers = updatedAnswers;
    attempt.score = score;
    attempt.totalMarks = totalMarks;
    attempt.accuracy = accuracy;
    attempt.status = "evaluated";
    attempt.completedAt = new Date();

    await attempt.save();

    res.json({
      message: "Submitted successfully",
      score,
      totalMarks,
      accuracy,
    });

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
// exports.getUserAttempts = async (req, res) => {
//   try {
//     const attempts = await Attempt
//       .find({ userId: req.user._id }) // ✅ FIXED
//       .populate("interviewId", "title");

//     res.json({ success: true, data: attempts });

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
//new one
exports.getUserAttempts = async (req, res) => {
  try {
    const attempts = await Attempt
      .find({ userId: req.user._id })
      .populate("interviewId", "title")
      .sort({ createdAt: -1 }); 

    const activeAttempt = attempts.find(
      (a) => a.status === "in_progress"
    );

    const completedAttempts = attempts.filter(
      (a) => a.status === "completed"
    );

    res.json({
      success: true,
      activeAttempt,
      completedAttempts,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  Submit Interview
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