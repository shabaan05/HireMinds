const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  selectedAnswer: {
    type: String,
    default: "",
  },
  codeSubmitted: {
    type: String,
    default: "",
  },
  obtainedMarks: {
  type: Number,
  default: 0,
},

  subjectiveAnswer: {
    type: String,
    default: "",
  },
  isCorrect: {
    type: Boolean,
    default: false,
  },
});

const attemptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    interviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interview",
      required: true,
    },

    answers: {
      type: [answerSchema],
      default: [],
    },

    totalMarks: {
      type: Number,
      required: true,
    },

    score: {
      type: Number,
      default: 0,
    },

    accuracy: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    status: {
      type: String,
      enum: ["in-progress", "submitted", "evaluated"],
      default: "in-progress",
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    submittedAt: {
      type: Date,
    },

    timeSpent: {
      type: Number,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attempt", attemptSchema);
