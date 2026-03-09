const mongoose = require("mongoose");


const testCaseSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true,
  },
  expectedOutput: {
    type: String,
    required: true,
  },
});
// question schema
const questionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["mcq", "coding", "subjective"],
      required: true,
    },

    questionText: {
      type: String,
      required: true,
      trim: true,
    },

    options: {
      type: [String],
      default: [],
    },

    correctAnswer: {
      type: String,
      required: function () {
        return this.type === "mcq";
      },
    },

    testCases: {
      type: [testCaseSchema],
      validate: {
        validator: function (value) {
          if (this.type === "coding") {
            return value.length > 0;
          }
          return true;
        },
            message: "Coding question must have at least one test case"

      },
    },

    marks: {
      type: Number,
      required: true,
      min: 1,
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },

    topic: String,
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
