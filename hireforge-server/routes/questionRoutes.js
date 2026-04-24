const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const {
  createQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
  getQuestionById
} = require("../controllers/questionController");

router.post("/",authMiddleware, createQuestion);
router.get("/", getQuestions);
router.get("/:id", getQuestionById);

router.put("/:id",authMiddleware, updateQuestion);
router.delete("/:id",authMiddleware, deleteQuestion);

module.exports = router;