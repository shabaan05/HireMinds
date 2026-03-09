const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {
  startInterview,
  saveAnswer,
  submitInterview,
  getResult
} = require("../controllers/attemptController");


// Start interview
router.post("/:interviewId/start", authMiddleware, startInterview);

// Save answer
router.post("/:attemptId/answer", authMiddleware, saveAnswer);

// Submit interview
router.post("/:attemptId/submit", authMiddleware, submitInterview);

// Get result
router.get("/:attemptId/result", authMiddleware, getResult);

module.exports = router;