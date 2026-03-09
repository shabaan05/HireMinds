const express = require("express");
const router = express.Router();

const {
  createInterview,
  getInterviews,
  updateInterview,
  deleteInterview,
  toggleInterviewStatus
} = require("../controllers/interviewController");

// Create interview
router.post("/", createInterview);

// Get all interviews
router.get("/", getInterviews);

// Update interview
router.put("/:id", updateInterview);

// Delete interview
router.delete("/:id", deleteInterview);

// Activate / Deactivate interview
router.patch("/:id/status", toggleInterviewStatus);

module.exports = router;