const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

let currentOTP = null;

// Create transporter once
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter configuration on startup
transporter.verify(function (error, success) {
  if (error) {
    console.error('Nodemailer verify failed:', error);
  } else {
    console.log('Nodemailer is ready to send emails');
  }
});

// POST /api/otp/send-otp - send OTP to user email
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  console.log('Received send-otp request for email:', email);

  if (!email || !email.endsWith('@g.bracu.ac.bd')) {
    return res.status(400).json({ message: 'Please use your BRACU email.' });
  }

  currentOTP = Math.floor(100000 + Math.random() * 900000).toString();
  console.log('Generated OTP:', currentOTP);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP for BRACU BookShare Registration',
    text: `Your OTP is: ${currentOTP}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('OTP email sent:', info.response);
    res.status(200).json({ message: 'OTP sent successfully!' });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});

// POST /api/otp/verify-otp - verify the OTP submitted by user
router.post('/verify-otp', (req, res) => {
  const { otp } = req.body;
  console.log('Received verify-otp request with OTP:', otp);

  if (!otp) {
    return res.status(400).json({ message: 'OTP is required' });
  }

  if (otp === currentOTP) {
    currentOTP = null; // reset OTP after success
    console.log('OTP verified successfully');
    res.status(200).json({ message: 'OTP verified successfully!' });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
});

module.exports = router;
