// const Interview = require("../models/Interview");
// const Attempt = require("../models/Attempt");
// const { evaluateSubjective } = require("../services/aiService");

// exports.startInterview = async (req, res) => {
//   try {
//     const interviewId = req.params.id;
//     const userId = req.user.id;

//     // 1️⃣ Check if interview exists and is active
//     const interview = await Interview.findById(interviewId);

//     if (!interview || !interview.isActive) {
//       return res.status(404).json({
//         success: false,
//         message: "Interview not found or not active",
//       });
//     }

//     // 2️⃣ Check if user already started this interview
//     const existingAttempt = await Attempt.findOne({
//       userId,
//       interviewId,
//       status: { $in: ["in-progress", "submitted"] },
//     });

//     if (existingAttempt) {
//       return res.status(400).json({
//         success: false,
//         message: "You have already started this interview",
//       });
//     }

//     // 3️⃣ Create attempt
//     const attempt = await Attempt.create({
//       userId,
//       interviewId,
//       totalMarks: interview.totalMarks || 0,
//       status: "in-progress",
//       startedAt: new Date(),
//       timeSpent: 0,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Interview started successfully",
//       data: attempt,
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// //..this create answer push to 

// exports.saveAnswer = async (req, res) => {
//   try {
//     const { attemptId } = req.params;
//     const { questionId, selectedAnswer, codeSubmitted, subjectiveAnswer } = req.body;

//     const attempt = await Attempt.findById(attemptId);

//     if (!attempt) {
//       return res.status(404).json({
//         success: false,
//         message: "Attempt not found",
//       });
//     }

//     if (attempt.status !== "in-progress") {
//       return res.status(400).json({
//         success: false,
//         message: "Interview already submitted",
//       });
//     }

//     // Check if answer already exists
//     const existingAnswerIndex = attempt.answers.findIndex(
//       (ans) => ans.questionId.toString() === questionId
//     );

//     if (existingAnswerIndex > -1) {
//       // Update existing answer
//       attempt.answers[existingAnswerIndex] = {
//         ...attempt.answers[existingAnswerIndex]._doc,
//         selectedAnswer: selectedAnswer || "",
//         codeSubmitted: codeSubmitted || "",
//         subjectiveAnswer: subjectiveAnswer || "",
//       };
//     } else {
//       // Add new answer
//       attempt.answers.push({
//         questionId,
//         selectedAnswer: selectedAnswer || "",
//         codeSubmitted: codeSubmitted || "",
//         subjectiveAnswer: subjectiveAnswer || "",
//       });
//     }

//     await attempt.save();

//     res.status(200).json({
//       success: true,
//       message: "Answer saved successfully",
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// //.........submitting interview
// const Question = require("../models/Question");
// const Attempt = require("../models/Attempt");

// exports.submitInterview = async (req, res) => {
//   try {
//     const { attemptId } = req.params;

//     const attempt = await Attempt.findById(attemptId);

//     if (!attempt) {
//       return res.status(404).json({
//         success: false,
//         message: "Attempt not found",
//       });
//     }

//     if (attempt.status !== "in-progress") {
//       return res.status(400).json({
//         success: false,
//         message: "Interview already submitted",
//       });
//     }

//     let totalScore = 0;
//     let correctAnswers = 0;

//     // Loop through answers
//     for (let answer of attempt.answers) {
//       const question = await Question.findById(answer.questionId);

//       if (!question) continue;

//       // ✅ MCQ scoring
//       if (question.type === "mcq") {
//         if (answer.selectedAnswer === question.correctAnswer) {
//           answer.isCorrect = true;
//           answer.obtainedMarks = question.marks;
//           totalScore += question.marks;
//           correctAnswers++;
//         } else {
//           answer.isCorrect = false;
//           answer.obtainedMarks = 0;
//         }
//       }

//       // 🔹 Coding  tempoaray later use sandbox enviroument
//       if (question.type === "coding") {
//   let passedCount = 0;
//   const totalTestCases = question.testCases.length;

//   for (let testCase of question.testCases) {
//     try {
//       // ⚠ Example only — replace with safe code runner
//       const userFunction = new Function("input", answer.codeSubmitted);
//       const output = userFunction(testCase.input);

//       if (String(output).trim() === String(testCase.expectedOutput).trim()) {
//         passedCount++;
//       }

//     } catch (err) {
//       // If code crashes → test case fails
//     }
//   }

//   const marksEarned =
//     totalTestCases > 0
//       ? (passedCount / totalTestCases) * question.marks
//       : 0;

//   answer.obtainedMarks = marksEarned;
//   totalScore += marksEarned;
// }
// //subjective  uisng ai 
// if (question.type === "subjective") {

//   const aiScore = await evaluateSubjective(
//     question.questionText,
//     answer.subjectiveAnswer,
//     question.marks
//   );

//   answer.obtainedMarks = aiScore;
//   totalScore += aiScore;
// }

//     }

//     // Calculate accuracy
//     const accuracy =
//       attempt.answers.length > 0
//         ? (correctAnswers / attempt.answers.length) * 100
//         : 0;

//     // Update attempt
//     attempt.score = totalScore;
//     attempt.accuracy = accuracy;
//     attempt.status = "submitted";
//     attempt.submittedAt = new Date();

//     await attempt.save();

//     res.status(200).json({
//       success: true,
//       message: "Interview submitted successfully",
//       data: {
//         score: attempt.score,
//         accuracy: attempt.accuracy,
//       },
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// //. result


// exports.getResult = async (req, res) => {
//   try {
//     const { attemptId } = req.params;

//     const attempt = await Attempt.findById(attemptId)
//       .populate("answers.questionId", "questionText marks type")
//       .populate("interviewId", "title passingMarks");

//     if (!attempt) {
//       return res.status(404).json({
//         success: false,
//         message: "Attempt not found",
//       });
//     }

//     if (attempt.status !== "submitted") {
//       return res.status(400).json({
//         success: false,
//         message: "Interview not submitted yet",
//       });
//     }

//     const passingMarks = attempt.interviewId.passingMarks || 0;

//     const resultStatus =
//       attempt.score >= passingMarks ? "PASS" : "FAIL";

//     res.status(200).json({
//       success: true,
//       data: {
//         interviewTitle: attempt.interviewId.title,
//         score: attempt.score,
//         totalMarks: attempt.totalMarks,
//         accuracy: attempt.accuracy,
//         status: resultStatus,
//         answers: attempt.answers,
//       },
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

const Attempt = require("../models/Attempt");
const Interview = require("../models/Interview");
const Question = require("../models/Question");
const { evaluateInterview } = require("../services/evaluationService");

exports.startInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview || !interview.isActive) {
      return res.status(404).json({ message: "Interview not available" });
    }

    const attempt = await Attempt.create({
      userId: req.user.id,
      interviewId: interview._id,
      totalMarks: interview.totalMarks || 0,
      status: "in-progress",
    });

    res.json({ success: true, data: attempt });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.saveAnswer = async (req, res) => {
  try {
    const { attemptId } = req.params;
    const { questionId, selectedAnswer, codeSubmitted, subjectiveAnswer } = req.body;

    const attempt = await Attempt.findById(attemptId);

    const existing = attempt.answers.find(
      a => a.questionId.toString() === questionId
    );

    if (existing) {
      existing.selectedAnswer = selectedAnswer || "";
      existing.codeSubmitted = codeSubmitted || "";
      existing.subjectiveAnswer = subjectiveAnswer || "";
    } else {
      attempt.answers.push({
        questionId,
        selectedAnswer,
        codeSubmitted,
        subjectiveAnswer
      });
    }

    await attempt.save();

    res.json({ success: true, message: "Answer saved" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.submitInterview = async (req, res) => {
  try {
    const attempt = await Attempt.findById(req.params.attemptId)
      .populate("answers.questionId");

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


exports.getResult = async (req, res) => {
  try {
    const attempt = await Attempt.findById(req.params.attemptId)
      .populate("answers.questionId", "questionText marks");

    res.json({ success: true, data: attempt });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
