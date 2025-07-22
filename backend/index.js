const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const otpRoutes = require('./otpRoutes');
const authRoutes = require('./authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Base route
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Mount OTP routes at /api/otp
app.use('/api/otp', otpRoutes);

// Mount Auth routes at /api/auth
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
