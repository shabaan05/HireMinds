const express = require("express");
const cors = require("cors");

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
const app = express();
const helmet = require("helmet");
// Middleware
app.use(express.json());
// app.use(
//   cors({
//     origin: [
//     "http://localhost:5173",
//     "https://hire-minds-5qp7.vercel.app"
//   ],

//     credentials: true,
//   })
// );
app.use(helmet());

app.use(cors());
app.use("/api", apiLimiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/attempts", attemptRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/code", codeRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/roadmap", roadmapRoutes);
// Error handler (last)
app.use(errorHandler);

module.exports = app;