const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const questionRoutes = require("./routes/questionRoutes");
const attemptRoutes = require("./routes/attemptRoutes");
const adminRoutes = require("./routes/adminRoutes");
const codeRoutes = require("./routes/codeRoutes");
const recommendationRoutes = require("./routes/recommendation.routes");
const roadmapRoutes = require("./routes/roadmap.Routes");
const errorHandler = require("./middlewares/errorHandler");
const { apiLimiter } = require("./middlewares/rateLimiter.middleware");

const app = express();

/* =========================
   Security Middleware
========================= */

app.use(helmet());

const allowedOrigins = [
  "http://localhost:5173",
    "https://hireforge05.netlify.app",


 
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

/* =========================
   General Middleware
========================= */

app.use(express.json());

app.set("trust proxy", 1);

/* =========================
   Rate Limiting
========================= */

app.use("/api", apiLimiter);
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "HireMinds API is running",
  });
});
/* =========================
   Routes
========================= */

app.use("/api/auth", authRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/attempts", attemptRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/code", codeRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/roadmap", roadmapRoutes);

/* =========================
   Error Handler
========================= */

app.use(errorHandler);

module.exports = app;