// routes/authRoutes.js
console.log('Auth routes loaded');

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Otp = require('../models/Otp'); // OTP model to store/verify OTPs
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';
const TOKEN_EXPIRY = '1h';

// ✅ Register user (only if OTP verified)
router.post('/register', async (req, res) => {
     console.log('Register route hit');
    const { name, email, password, otp } = req.body;

    try {
        // 1️⃣ Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        // 2️⃣ Verify OTP
        const otpRecord = await Otp.findOne({ email }).sort({ createdAt: -1 });
        if (!otpRecord || otpRecord.otp !== otp) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // 3️⃣ Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4️⃣ Save user
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        // 5️⃣ Delete OTP after successful registration
        await Otp.deleteMany({ email });

        res.status(201).json({ message: 'User registered successfully' });

    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// ✅ Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1️⃣ Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        // 2️⃣ Compare passwords
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(400).json({ message: 'Invalid email or password' });

        // 3️⃣ Generate JWT token
        const token = jwt.sign(
            { id: user._id, name: user.name, email: user.email },
            JWT_SECRET,
            { expiresIn: TOKEN_EXPIRY }
        );

        res.json({
            message: 'Login successful',
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
