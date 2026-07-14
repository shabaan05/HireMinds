/**
 * One-time migration script — fixes users who were registered with role:"admin"
 * due to the old schema default.
 *
 * Run once:  node scripts/fixUserRoles.js
 *
 * It will:
 *   - Print every user and their current role
 *   - Update all non-admin emails to role:"candidate"
 *   - Leave your real admin email untouched
 *
 * Edit REAL_ADMIN_EMAILS below before running.
 */

require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const User = require("../models/User");

// ── Put your actual admin email(s) here ──────────────────────────────────────
const REAL_ADMIN_EMAILS = [
  "shabaansatarkar2003@gmail.com", // replace / add your real admin emails
];
// ─────────────────────────────────────────────────────────────────────────────

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB\n");

  const users = await User.find({}, "name email role");

  console.log("Current users in DB:");
  users.forEach((u) =>
    console.log(`  ${u.email.padEnd(40)} role: ${u.role}`)
  );

  // Find users who are marked admin but shouldn't be
  const wrongAdmins = users.filter(
    (u) => u.role === "admin" && !REAL_ADMIN_EMAILS.includes(u.email)
  );

  if (wrongAdmins.length === 0) {
    console.log("\n✅ No role fixes needed.");
  } else {
    console.log(`\nFixing ${wrongAdmins.length} user(s) with wrong role:`);
    for (const u of wrongAdmins) {
      await User.updateOne({ _id: u._id }, { role: "user" });
      console.log(`  ✅ ${u.email} → user`);
    }
  }

  await mongoose.disconnect();
  console.log("\nDone.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
