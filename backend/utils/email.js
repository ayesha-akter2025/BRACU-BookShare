const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

transporter.verify((error, success) => {
    if (error) console.error('Nodemailer verify failed:', error);
    else console.log('Nodemailer is ready to send emails');
});

const sendEmail = async (to, subject, text) => {
    try {
        const info = await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, text });
        console.log('Email sent:', info.response);
    } catch (err) {
        console.error('Send email error:', err);
        throw err;
    }
};

module.exports = sendEmail;
