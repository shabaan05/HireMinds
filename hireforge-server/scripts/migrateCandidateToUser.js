/**
 * One-time migration: rename role "candidate" → "user" in MongoDB.
 * Run: node scripts/migrateCandidateToUser.js
 */
require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const mongoose = require("mongoose");
const User = require("../models/User");

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB\n");

  // Bulk update all candidate → user
  const result = await User.updateMany(
    { role: "candidate" },
    { $set: { role: "user" } }
  );

  console.log(`✅ Updated ${result.modifiedCount} user(s): candidate → user\n`);

  // Print final state
  const users = await User.find({}, "email role");
  console.log("Final roles in DB:");
  users.forEach((u) =>
    console.log(`  ${u.email.padEnd(42)} → ${u.role}`)
  );

  await mongoose.disconnect();
  console.log("\nDone.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
