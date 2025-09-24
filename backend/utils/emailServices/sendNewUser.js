import nodemailer from "nodemailer"
import newUserTemplate from "../emailTemplates/newUserTemplate.js";
import newUserText from "../emailTemplates/newUserText.js";


//Create Transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
};

// Send confirmation email
export const sendNewUserEmail = async (user) => {
    try {
      const transporter = createTransporter()

      const mailOptions = {
        from: process.env.EMAIL_FROM || "mclilystores@gmail.com",
        to: user.email,
        subject: "User Sign Up - McLily Stores",
        html: newUserTemplate(user),
        text: newUserText(user),
      };

      const info = await transporter.sendMail(mailOptions)
      console.log('New user email sent: ', info.messageId);
      return true
    } catch (error) {
        console.error('Error sending new user email: ', error);
        return false
    }
}