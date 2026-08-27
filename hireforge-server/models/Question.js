const mongoose = require("mongoose");

// ─── Test Case Sub-Schema ────────────────────────────────────────────────────
const testCaseSchema = new mongoose.Schema(
  {
    input: {
      type: String,
      required: [true, "Input is required"],
      trim: true,
    },
    output: {
      type: String,
      required: [true, "Output is required"],
      trim: true,
    },
  },
  { _id: false }
);

// ─── Question Schema ─────────────────────────────────────────────────────────
const questionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["mcq", "coding", "subjective"],
      required: [true, "Question type is required"],
    },

    questionText: {
      type: String,
      required: [true, "Question text is required"],
      trim: true,
      minlength: [5, "Question must be at least 5 characters"],
    },

    options: {
      type: [String],
      default: [],
      validate: {
        validator: function (value) {
          if (this.type === "mcq") return value.length >= 2;
          return true;
        },
        message: "MCQ must contain at least 2 options",
      },
    },

    correctAnswer: {
      type: String,
      required: function () {
        return this.type === "mcq";
      },
      trim: true,
    },

    sampleTestCases: {
      type: [testCaseSchema],
      default: [],
      validate: {
        validator: function (value) {
          if (this.type === "coding") return value.length > 0;
          return true;
        },
        message: "Coding questions must have sample test cases",
      },
    },

    hiddenTestCases: {
      type: [testCaseSchema],
      default: [],
      validate: {
        validator: function (value) {
          if (this.type === "coding") return value.length > 0;
          return true;
        },
        message: "Coding questions must have hidden test cases",
      },
    },

    marks: {
      type: Number,
      required: [true, "Marks are required"],
      min: [1, "Marks must be at least 1"],
    },

    topic: {
      type: String,
      required: [true, "Topic is required"],
      trim: true,
    },

    subtopic: {
      type: String,
      required: [true, "Subtopic is required"],
      trim: true,
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: [true, "Difficulty is required"],
      default: "medium",
    },
  },
  { timestamps: true }
);

questionSchema.index({ type: 1 });
questionSchema.index({ difficulty: 1 });
questionSchema.index({ topic: 1 });

// ─── Virtuals ────────────────────────────────────────────────────────────────
questionSchema.virtual("isCoding").get(function () {
  return this.type === "coding";
});

module.exports = mongoose.model("Question", questionSchema);
