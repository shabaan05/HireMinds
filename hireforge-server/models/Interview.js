
const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Interview title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
    },

    experienceLevel: {
      type: String,
      enum: ["Junior", "Mid", "Senior"],
      required: [true, "Experience level is required"],
    },

    duration: {
      type: Number,
      required: [true, "Duration is required"],
      min: [1, "Duration must be at least 1 minute"],
    },

    totalMarks: {
      type: Number,
      default: 0,
      min: [0, "Total marks cannot be negative"],
    },

    passingMarks: {
      type: Number,
      default: 0,
      min: [0, "Passing marks cannot be negative"],
      validate: {
        validator: function (value) {
          return value <= this.totalMarks;
        },
        message: "Passing marks cannot exceed total marks",
      },
    },

    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Creator is required"],
    },
  },

  {
    timestamps: true,
  }
);

interviewSchema.index({ title: 1 });

interviewSchema.index({ createdBy: 1 });

interviewSchema.index({ isActive: 1, isDeleted: 1 });

/* VIRTUAL */
interviewSchema.virtual("questionCount").get(function () {
  return this.questions.length;
});

module.exports = mongoose.model("Interview", interviewSchema);

