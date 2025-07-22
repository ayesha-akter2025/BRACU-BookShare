const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

const users = []; // temporary in-memory user store

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

// Register user (called after OTP verification)
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ name, email, password: hashedPassword });

  res.status(201).json({ message: 'User registered successfully' });
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ message: 'Invalid email or password' });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(400).json({ message: 'Invalid email or password' });

  const token = jwt.sign({ email: user.email, name: user.name }, JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({
    message: 'Login successful',
    token,
    user: { email: user.email, name: user.name }
  });
});

module.exports = router;
