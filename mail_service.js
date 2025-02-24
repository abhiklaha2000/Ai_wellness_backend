const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables

const sendEmail = async () => {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "abhiklaha2000@gmail.com", // ✅ Fixed typo: "gamil.com" -> "gmail.com"
          pass: process.env.APP_PASSWORD, // ✅ Removed spaces from App Password
        },
      });
      
      // Email options
      const mailOptions = {
        from: '"Your Name" <abhiklaha2000@gmail.com>',
        to: "abhiklaha2000@gmail.com",
        subject: "Test Email from Nodemailer",
        text: "Hello! This is a test email sent using Nodemailer.",
        html: "<b>Hello!</b> This is a test email sent using <i>Nodemailer</i>.",
      };

    // Send the email
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.messageId);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};

module.exports = {
    sendEmail
}

