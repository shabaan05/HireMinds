const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const questionRoutes = require("./routes/questionRoutes");
const attemptRoutes = require("./routes/attemptRoutes");

const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/attempts", attemptRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("HireForge API Running...");
});

// Error handler (last)
app.use(errorHandler);

module.exports = app;