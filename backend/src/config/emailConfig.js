import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
        user: process.env.EMAIL_USER,  // ✅ Your email ID
        pass: process.env.EMAIL_PASS   // ✅ Your email password or App password
    }
});

// 🔹 Function to send stock alert emails
const sendStockAlert = async (email, subject, message) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject,
            text: message
        };

        await transporter.sendMail(mailOptions);
        console.log(`📧 Stock alert email sent to ${email}`);
    } catch (error) {
        console.error("❌ Error sending stock alert email:", error);
    }
};

// 🔹 Function to send an email with the Tally file attached
const sendEmailTally = async (to, subject, text, filePath) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
            attachments: [{ path: filePath }]
        };

        await transporter.sendMail(mailOptions);
        console.log(`📧 Tally file sent to ${to}`);
    } catch (error) {
        console.error("❌ Error sending Tally file email:", error);
    }
};

export { sendStockAlert, sendEmailTally };



// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();

// // Create transporter
// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL_USER,  // Your email ID
//         pass: process.env.EMAIL_PASS   // Your email password or App password
//     }
// });

// // Function to send email
// const sendStockAlert = async (email, productName, stock, threshold) => {
//     try {
//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: email,
//             subject: `Low Stock Alert for ${productName}`,
//             text: `Your stock for ${productName} is running low. Only ${stock} left, which is below the threshold of ${threshold}. Please restock soon!`
//         };

//         await transporter.sendMail(mailOptions);
//         console.log(`Stock alert email sent to ${email}`);
//     } catch (error) {
//         console.error("Error sending email:", error);
//     }
// };

// export default sendStockAlert;