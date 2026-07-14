const mongoose = require("mongoose");

// ─── TestResult Schema ────────────────────────────────────────────────────────
// Stores per-question performance data for every submitted attempt.
// Used exclusively by the recommendation engine — not by saveAnswer().
const testResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userId is required"],
    },

    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: [true, "questionId is required"],
    },

    topic: {
      type: String,
      required: [true, "topic is required"],
      trim: true,
    },

    subtopic: {
      type: String,
      required: [true, "subtopic is required"],
      trim: true,
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: [true, "difficulty is required"],
    },

    isCorrect: {
      type: Boolean,
      required: [true, "isCorrect is required"],
    },

    timeTaken: {
      type: Number, // seconds
      default: 0,
      min: [0, "timeTaken cannot be negative"],
    },
  },
  { timestamps: true }
);

// ─── Indexes ──────────────────────────────────────────────────────────────────
testResultSchema.index({ userId: 1 });
testResultSchema.index({ topic: 1 });
testResultSchema.index({ userId: 1, topic: 1 });

module.exports = mongoose.model("TestResult", testResultSchema);
