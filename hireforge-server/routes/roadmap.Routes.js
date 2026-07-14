const express = require("express");

const {
  getRoadmap,
} = require("../controllers/roadmap.controller.js");

const router = express.Router();

router.get("/:userId", getRoadmap);

module.exports = router;