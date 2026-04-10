const express = require("express");
const router = express.Router();
const { getAdminStats } = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");
const { getAllAttempts } = require("../controllers/adminController");

// Admin - all attempts
router.get("/", getAllAttempts); 

router.get("/stats",authMiddleware, getAdminStats);

module.exports = router;
