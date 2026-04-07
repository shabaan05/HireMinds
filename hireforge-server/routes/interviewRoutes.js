const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

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
// Create interview
router.post("/",authMiddleware,  createInterview);

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
