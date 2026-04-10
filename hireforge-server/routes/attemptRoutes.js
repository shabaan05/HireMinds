  const express = require("express");
  const router = express.Router();

  const authMiddleware = require("../middlewares/authMiddleware");

  const {
    startInterview,
    saveAnswer,
    getResult,
    getUserAttempts,
    getAttemptById,
    submitAttempt
    
  } = require("../controllers/attemptController");

router.use((req, res, next) => {
  console.log("ROUTE HIT:", req.method, req.originalUrl);
  next();
});


  // Start interview
  router.post("/:interviewId/start", authMiddleware, startInterview);

  // Save answer
  router.post("/:attemptId/answer", authMiddleware, saveAnswer);
  // router.get("/attempt/:id", getAttemptById);

  
  // // Submit interview
  // router.post("/:attemptId/submit", authMiddleware, submitInterview);
  // submit attempt
    router.post("/:attemptId/submit", authMiddleware, submitAttempt);

  router.get("/user", authMiddleware, getUserAttempts);

  // Get result
  router.get("/:attemptId/result", authMiddleware, getResult);

  //by id
  router.get("/single/:id",  getAttemptById);

  module.exports = router;