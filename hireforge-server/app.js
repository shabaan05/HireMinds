const express = require("express");

const authRoutes = require("./routes/authRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const questionRoutes = require("./routes/questionRoutes");
const attemptRoutes = require("./routes/attemptRoutes");
const  adminRoutes = require("./routes/adminRoutes")
const codeRoutes = require("./routes/codeRoutes");
const recommendationRoutes = require("./routes/recommendation.routes");
const roadmapRoutes = require("./routes/roadmap.Routes.js")
const errorHandler = require("./middlewares/errorHandler");
const { apiLimiter } = require("./middlewares/rateLimiter.middleware");
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

app.use(helmet());

const allowedOrigins = [
  "http://localhost:5173",
  // Add after frontend deployment
  // "https://your-app.vercel.app",
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

app.use(express.json());

app.set("trust proxy", 1);



app.use("/api", apiLimiter);



app.use("/api/auth", authRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/attempts", attemptRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/code", codeRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/roadmap", roadmapRoutes);



app.use(errorHandler);

module.exports = app;