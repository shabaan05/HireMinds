const express = require("express");
const router = express.Router();
const { getAllAttempts,getAdminStats } = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/attempts", authMiddleware, getAllAttempts);
router.get("/stats",authMiddleware, getAdminStats);

module.exports = router;
