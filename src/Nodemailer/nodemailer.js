const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.nodemaileruser,
    pass: process.env.nodemailerpassword,
  },
});



exports.otpsender = async (name, EmailId, randomOTP) => {

  const emailTemplate = {
    from: `"MoviesAll" <${process.env.nodemaileruser}>`,
    to: EmailId,
    subject: "Email Verification OTP - Deepanshu Rana",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; background-color: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
  <div style="background-color: #16253D; padding: 20px; border-radius: 10px; text-align: center;">
    <h1 style="color: #FF4500; margin: 0;">MoviesAll</h1>
  </div>

  <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; margin-top: 20px; text-align: center; color: #333;">
    <h2 style="color: #16253D; margin-bottom: 10px;">Verify Your Email</h2>
    <p style="font-size: 16px; margin: 10px 0;">Hello <strong>${name}</strong>,</p>
    <p style="font-size: 16px;">Your OTP is:</p>

    <div style="background-color: #f5f5f5; padding: 20px; font-size: 28px; font-weight: bold; color: #16253D; border-radius: 8px; margin: 15px 0;">
      ${randomOTP}
    </div>

    <p style="font-size: 14px; color: #666;">This code is valid for <strong>5 minutes</strong>. Please do not share it with anyone.</p>
    <p style="font-size: 14px; color: #666;">If you did not request this, you can safely ignore this email.</p>

    <p style="margin-top: 20px; font-size: 16px; color: #16253D;">Welcome aboard!<br><strong>Team MoviesAll</strong></p>
  </div>
</div>

    `,


  };

  



  try {
    const info = await transporter.sendMail(emailTemplate);
    console.log(`✅ Email sent successfully. Message ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw new Error("Failed to send OTP email");
  }
};

