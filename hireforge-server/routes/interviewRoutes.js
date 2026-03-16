const express = require("express");
const router = express.Router();

const {
  createInterview,
  getInterviews,
  updateInterview,
  deleteInterview,
  toggleInterviewStatus,
  attachQuestions,
  getInterviewById
} = require("../controllers/interviewController");


console.log(getInterviews);
console.log({
  createInterview,
  getInterviews,
  updateInterview,
  deleteInterview,
  toggleInterviewStatus,
  attachQuestions,
  getInterviewById
});
const authMiddleware = require("../middlewares/authMiddleware");
// Create interview
router.post("/", createInterview);

// Get all interviews
router.get("/", getInterviews);
// Get single interview
router.get("/:id", getInterviewById);

// Update interview
router.put("/:id", updateInterview);

// Delete interview
router.delete("/:id", deleteInterview);

// Activate / Deactivate interview
router.patch("/:id/status", toggleInterviewStatus);
//
router.post("/:id/questions", authMiddleware, attachQuestions);
module.exports = router;
