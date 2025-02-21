import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // App password (not normal password)
    },
});

// Function to send email
export const sendLowStockAlert = async (productName, quantity) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ALERT_EMAIL, // Admin or Manager's email
            subject: `⚠️ Low Stock Alert: ${productName}`,
            text: `The stock for "${productName}" is low. Only ${quantity} left in inventory. Please restock soon.`,
        };

        await transporter.sendMail(mailOptions);
        console.log(`📧 Email sent: Low stock alert for ${productName}`);
    } catch (error) {
        console.error("❌ Error sending email:", error.message);
    }
};
