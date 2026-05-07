const express = require("express");
const router = express.Router();
const { getAdminStats } = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");
const { getAllAttempts, getAdminProfile, updateAdminProfile } = require("../controllers/adminController");

// Admin - all attempts
router.get("/", getAllAttempts); 

router.get("/stats",authMiddleware, getAdminStats);
router.get("/profile", authMiddleware, getAdminProfile);

// UPDATE PROFILE
router.put("/profile", authMiddleware, updateAdminProfile);
module.exports = router;
