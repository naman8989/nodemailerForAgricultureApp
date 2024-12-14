const nodemailer = require("nodemailer");
const express = require('express');
const cors = require("cors");

const app = express();
const PORT = 9001;

app.use(cors({
    origin:"http://localhost:9090",
    methods:["GET","POST"]
}));
app.use(express.json())

// Create a transporter object using SMTP settings
let transporter = nodemailer.createTransport({
    secure: true,
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: "nam.chawlaa@gmail.com", // Your Gmail address
        pass: "wwthmcidknhcjglo", // Your Gmail password or App Password
    },
});

// // Email options
// let mailOptions = {
//   from: "nam.chawlaa@gmail.com", // Sender email
//   to: "nam.chawlaa@gmail.com", // Receiver email
//   subject: "Test Email with Nodemailer", // Email subject
//   text: "Hello! This is a test email sent using Nodemailer in Node.js.", // Email plain text
//   html: "<h1>Hello!</h1><p>This is a <strong>test email</strong> sent using <b>Nodemailer</b> in Node.js.</p>", // Email HTML content
// };


app.get("/sendEmail", async (req, res) => {
    try {
        const data = req.query;

        if (!data.name || !data.phone || !data.email || !data.message) {
            return res.status(400).send("Missing required query parameters.");
        }

        console.log(
            `Received Data - Name: ${data.name}, Phone: ${data.phone}, Email: ${data.email}, Message: ${data.message}`
        );

        let mailOptions = {
            from: "your-email@gmail.com", // Replace with your email
            to: data.email,
            subject: `Dear ${data.name}, Your message has been recorded.`,
            text: `Hello ${data.name},\n\nYour phone number: ${data.phone}\nYour message: ${data.message}\n\nThank you for reaching out!`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("Error occurred:", error);
            } else {
                console.log("Email sent successfully! Message ID:", info.messageId);
            }
        });

        res.status(200).send("Email sent successfully.");

    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).send("Failed to send email.");
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});