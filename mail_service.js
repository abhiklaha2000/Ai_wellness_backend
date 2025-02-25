const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables

const sendEmail = async ({email}) => {
  try {
      // Configure the SMTP transporter
      const transporter = nodemailer.createTransport({       // Create a transporter
        host: process.env.BREVO_SMTP_HOST, // Brevo SMTP host
        port: process.env.BREVO_SMTP_PORT, // Use 587 for TLS or 465 for SSL
        secure: false, // False for 587, true for 465
        auth: {
          user: process.env.BREVO_SMTP_USER, // Replace with your Brevo email
          pass: process.env.BREVO_SMTP_PASS, // Replace with your SMTP password
        },
      });
      
      // Email options
      const mailOptions = {
        from: '"AI Wellness" <team@aiwellness.ai>',
        to: email,
        subject: "Test Email from Nodemailer",
        text: "Hello! This is a test email sent using Nodemailer.",
        html: "<b>Hello!</b> This is a test email sent using <i>Nodemailer</i>.",
      };

    // Send the email
    let info = await transporter.sendMail(mailOptions);
    console.log("info-------", info)
    console.log("Email sent: ", info.messageId);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};

module.exports = {
    sendEmail
}

