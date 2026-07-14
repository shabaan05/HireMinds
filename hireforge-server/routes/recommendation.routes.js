const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getRecommendations,
} = require("../controllers/recommendation.controller");

// GET /api/recommendations/:userId
router.get("/:userId", authMiddleware, getRecommendations);

module.exports = router;
