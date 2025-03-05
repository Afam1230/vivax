const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (to, subject, text) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "afamabuo@gmail.com",
                pass: "dris wgng afcv hrmg"
            },
        });

        let info = await transporter.sendMail({
            from: `"Logistics App" <${process.env.SMTP_USER}>`, 
            to, 
            subject, 
            text,
        });

        console.log("Email sent:", info.response);
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
};

module.exports = sendEmail;
