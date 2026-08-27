const mongoose = require("mongoose");


const answerSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: [true, "Question ID is required"],
    },

    selectedAnswer: {
      type: String,
      default: "",
      trim: true,
    },

    codeSubmitted: {
      type: String,
      default: "",
      trim: true,
    },

    subjectiveAnswer: {
      type: String,
      default: "",
      trim: true,
    },

    obtainedMarks: {
      type: Number,
      default: 0,
      min: [0, "Marks cannot be negative"],
    },

    isCorrect: {
      type: Boolean,
      default: false,
    },
  },

  { _id: false }
);

answerSchema.index({ questionId: 1 });

answerSchema.virtual("isAnswered").get(function () {
  return (
    !!this.selectedAnswer ||
    !!this.codeSubmitted ||
    !!this.subjectiveAnswer
  );
});

module.exports = answerSchema;


const attemptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },

    interviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interview",
      required: [true, "Interview ID is required"],
    },

    answers: {
      type: [answerSchema],
      default: [],

      validate: {
        validator: function (value) {
          return Array.isArray(value);
        },

        message: "Answers must be an array",
      },
    },

    totalMarks: {
      type: Number,
      required: [true, "Total marks are required"],
      min: [0, "Total marks cannot be negative"],
    },

    score: {
      type: Number,
      default: 0,
      min: [0, "Score cannot be negative"],
    },

    accuracy: {
      type: Number,
      default: 0,
      min: [0, "Accuracy cannot be less than 0"],
      max: [100, "Accuracy cannot exceed 100"],
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
      default: 0,
      min: [0, "Time spent cannot be negative"],
    },
  },

  { timestamps: true }
);

attemptSchema.index({ userId: 1 });

attemptSchema.index({ interviewId: 1 });

attemptSchema.index({ status: 1 });

attemptSchema.index({ createdAt: -1 });

attemptSchema.index({ userId: 1, interviewId: 1 });

/* VIRTUAL */
attemptSchema.virtual("isCompleted").get(function () {
  return this.status === "evaluated";
});

module.exports = mongoose.model("Attempt", attemptSchema);