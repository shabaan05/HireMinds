const nodemailer = require("nodemailer");

// ─── Singleton transporter ────────────────────────────────────────────────────
// Created once on first use (not at module load time) so that dotenv has
// already populated process.env before we read EMAIL_USER / EMAIL_PASS.
let _transporter = null;

function getTransporter() {
  if (_transporter) return _transporter;

  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    throw new Error(
      "[sendEmail] EMAIL_USER or EMAIL_PASS is missing from environment variables. " +
        "Check your .env file."
    );
  }

  console.log("[sendEmail] Creating SMTP transporter for:", user);
  console.log("[sendEmail] App Password length:", pass.length, "(must be 16)");

 _transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: { user, pass },

  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});
  return _transporter;
}

// ─── verifyTransporter (call once at startup, optional) ──────────────────────
exports.verifyTransporter = async () => {
  try {
    const t = getTransporter();
    await t.verify();
    console.log("[sendEmail] ✅ SMTP connection verified successfully.");
  } catch (err) {
    console.error("[sendEmail] ❌ SMTP verification failed:", err.message);
    console.error(
      "[sendEmail] Hint: Make sure EMAIL_PASS is a Gmail App Password " +
        "(16 chars, no spaces). Generate one at: " +
        "https://myaccount.google.com/apppasswords"
    );
    // Don't crash the server — just warn. sendOTPEmail will throw if it fails.
  }
};

// ─── sendOTPEmail ─────────────────────────────────────────────────────────────
exports.sendOTPEmail = async (toEmail, otp) => {
  console.log(`[sendEmail] Sending OTP to: ${toEmail}`);

  const transporter = getTransporter();

  const mailOptions = {
    from: `"HireForge" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Your Login OTP — HireForge",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto;
                  padding:24px;border:1px solid #e5e7eb;border-radius:8px;">
        <h2 style="color:#4f46e5;">HireForge — One-Time Password</h2>
        <p style="color:#374151;">
          Use the OTP below to complete your login.
          It expires in <strong>5 minutes</strong>.
        </p>
        <div style="font-size:36px;font-weight:bold;letter-spacing:8px;
                    color:#111827;text-align:center;padding:16px 0;">
          ${otp}
        </div>
        <p style="color:#6b7280;font-size:13px;">
          If you did not request this, please ignore this email.
        </p>
      </div>
    `,
    text: `Your HireForge OTP is: ${otp}\nExpires in 5 minutes.`,
  };

  try {
    console.log("[sendEmail] Calling transporter.sendMail()...");
    const info = await transporter.sendMail(mailOptions);

    console.log("[sendEmail] ✅ Mail sent.");
    console.log("  messageId:", info.messageId);
    console.log("  accepted :", info.accepted);
    console.log("  rejected :", info.rejected);
    console.log("  response :", info.response);

    return info;
  } catch (err) {
    console.error("[sendEmail] ❌ sendMail() failed:");
    console.error("  code    :", err.code);
    console.error("  command :", err.command);
    console.error("  message :", err.message);
    throw err; // re-throw so authController can handle it
  }
};
