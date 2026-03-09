const express = require("express");
const router = express.Router();
const { getAllAttempts } = require("../controllers/adminController");
const adminAuth = require("../middleware/adminAuth");

router.get("/attempts", adminAuth, getAllAttempts);

module.exports = router;
