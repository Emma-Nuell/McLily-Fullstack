import nodemailer from "nodemailer"
import orderConfirmedTemplate from "../emailTemplates/orderConfirmedTemplate.js";
import orderConfirmedText from "../emailTemplates/orderConfirmedText.js";

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
export const sendConfirmationEmail = async(order) => {
    try {
      const transporter = createTransporter()

      const mailOptions = {
        from: process.env.EMAIL_FROM || "mclilystores@gmail.com",
        to: order.customerDetails.email,
        subject: "Order Confirmed - McLily Stores",
        html: orderConfirmedTemplate(order),
        text: orderConfirmedText(order),
      };

      const info = await transporter.sendMail(mailOptions)
      console.log('Order confirmation email sent: ', info.messageId);
      return true
    } catch (error) {
        console.error('Error sending order confirmation email: ', error);
        return false
    }
}