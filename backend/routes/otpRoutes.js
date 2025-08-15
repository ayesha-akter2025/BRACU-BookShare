const express = require('express');
const router = express.Router();
const Otp = require('../models/Otp');
const nodemailer = require('nodemailer');

// Configure mail transporter (Gmail example)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Gmail address
        pass: process.env.EMAIL_PASS  // Gmail App Password
    }
});

// 📌 Send OTP
router.post('/send-otp', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Generate a random 6-digit OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Store OTP in DB (replace if already exists for this email)
        await Otp.findOneAndUpdate(
            { email },
            { otp: otpCode, createdAt: new Date() },
            { upsert: true, new: true }
        );

        // Send OTP via email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP is ${otpCode}. It will expire in 5 minutes.`
        });

        res.status(200).json({ message: 'OTP sent successfully' });

    } catch (err) {
        console.error('Error sending OTP:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// 📌 Verify OTP
router.post('/verify-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ message: 'Email and OTP are required' });
        }

        const otpRecord = await Otp.findOne({ email, otp });
        if (!otpRecord) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Delete OTP after verification
        await Otp.deleteOne({ email });

        res.status(200).json({ message: 'OTP verified successfully' });

    } catch (err) {
        console.error('Error verifying OTP:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
