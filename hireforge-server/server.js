
require("dotenv").config();

const REQUIRED_ENV = [
  "MONGO_URI",
  "JWT_ACCESS_SECRET",
  "JWT_REFRESH_SECRET",
  "EMAIL_USER",
  "EMAIL_PASS",
];

const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
if (missing.length > 0) {
  console.error(
    `[server] ❌ Missing required environment variables: ${missing.join(", ")}`
  );
  console.error("[server] Check your .env file and restart the server.");
  process.exit(1);
}



const http = require("http");
const app = require("./app");
const connectDB = require("./config/db");
const { verifyTransporter } = require("./utils/sendEmail");

connectDB();

verifyTransporter();

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`[server] 🚀 Server running on port ${PORT}`);
});
