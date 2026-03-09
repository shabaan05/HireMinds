const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
  

});



exports.sendOTPEmail = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Login OTP - HireForge",
    html: `<h3>Your OTP is: ${otp}</h3>
           <p>This OTP will expire in 5 minutes.</p>`
  });
};
